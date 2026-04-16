import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import { RadiosetCorePackExample } from "./radiosetCorePackExample";
import RichRadioset from "./richRadioSet";
import RadiosetExample from "./radioset";
import {
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "../form-breadcrumb";

type RadiosetComponent = {
  id: number;
  name: string;
  description: string;
  image: string;
  isCorePack?: boolean;
};

const radiosetComponents: RadiosetComponent[] = [
  {
    id: 1,
    name: "Radioset",
    description: "Classic oj-radioset with layout, messaging, and help variations.",
    image: "oj-ux-icon-size-12x  oj-ux-ico-radio-set",
    isCorePack: false,
  },
  {
    id: 2,
    name: "Radioset",
    description: "Core Pack radioset showcasing states, layout variations, messages, and wrap behavior.",
    image: "oj-ux-icon-size-12x  oj-ux-ico-radio-set",
    isCorePack: true,
  },
  {
    id: 3,
    name: "Rich Radioset",
    description: "Card-style rich radioset with responsive layouts and assistive content.",
    image: "oj-ux-icon-size-12x  oj-ux-ico-radio-set",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<RadiosetComponent["id"], RadiosetComponent>(
  radiosetComponents,
  {
    keyAttributes: "id",
  },
);

const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<RadiosetComponent["id"]>;

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const RadiosetHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
}: NestedFormHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<RadiosetComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(null);

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        RadiosetComponent["id"],
        RadiosetComponent
      >,
    ) => (
      <li>
        <oj-action-card>
          <div class="component-item" key={item.data.id}>
            <div class="componentImage">
              {item.data.isCorePack ? (
                <span class="demo-badge-position oj-sm-margin-2x-vertical oj-badge oj-badge-end oj-badge-success oj-badge-sm">
                  Core Pack
                </span>
              ) : null}
              <div
                class="oj-helper-text-align-center"
                style={{ paddingTop: "25px" }}
              >
                <div className={item.data.image}></div>
              </div>
              <div class="oj-flex-item oj-text-sm componentInfo oj-typography-body-md oj-typography-bold">
                {item.data.name}
              </div>
              
            </div>
          </div>
        </oj-action-card>
      </li>
    ),
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    switch (activeComponentId) {
      case 1:
        return <RadiosetExample />;
      case 2:
        return <RadiosetCorePackExample />;
      case 3:
        return <RichRadioset />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const activeComponent = radiosetComponents.find(
    (component) => component.id === activeComponentId,
  );

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as RadiosetComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<RadiosetComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  const handleBack = useCallback(() => {
    setShowComponentDetail(false);
    setActiveComponentId(null);
    setSelectedItems(new KeySetImpl([]) as KeySet<RadiosetComponent["id"]>);
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Forms", onSelect: onNavigateFormsHome },
      { label: "Radioset", onSelect: handleBack },
      {
        label: formatCorePackLabel(
          activeComponent.name,
          activeComponent.isCorePack,
        ),
        current: true,
      },
    ]);

    return () => onBreadcrumbChange(null);
  }, [
    activeComponent,
    handleBack,
    onBreadcrumbChange,
    onNavigateFormsHome,
    showComponentDetail,
  ]);

  return (
    <div class="component-wrapper">
      {!showComponentDetail ? (
        <oj-list-view
          data={dataProvider}
          selectionMode="single"
          selected={selectedItems}
          gridlines={gridlines}
          onselectedChanged={handleSelectedChanged}
          display="card"
          class="listview-sizing"
        >
          <template slot="itemTemplate" render={renderListItem}></template>
        </oj-list-view>
      ) : (
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          {ComponentDetail()}
        </div>
      )}
    </div>
  );
};

export default RadiosetHome;
