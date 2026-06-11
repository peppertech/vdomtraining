import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import TextArea from "./textAreaLegacy/index";
import TextAreaCorePack from "./textAreaCorePack/index";
import {
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "../form-breadcrumb";

type TextAreaComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: () => h.JSX.Element;
};

const textAreaComponents: TextAreaComponent[] = [
  {
    id: 1,
    name: "Text Area",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-area",
    render: () => <TextArea />,
  },
  {
    id: 2,
    name: "Text Area (oj-c)",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-area",
    isCorePack: true,
    render: () => <TextAreaCorePack />,
  },
];

const dataProvider = new MutableArrayDataProvider<
  TextAreaComponent["id"],
  TextAreaComponent
>(textAreaComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type TextAreaSelectedChangedEvent = ojListView.selectedChanged<
  TextAreaComponent["id"],
  TextAreaComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION = new KeySetImpl([]) as KeySet<TextAreaComponent["id"]>;

const TextAreaHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
}: NestedFormHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<TextAreaComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        TextAreaComponent["id"],
        TextAreaComponent
      >,
    ) => {
      return (
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
      );
    },
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    const entry = textAreaComponents.find(
      (component) => component.id === activeComponentId,
    );
    return entry?.render() ?? null;
  }, [activeComponentId]);

  const activeComponent = textAreaComponents.find(
    (component) => component.id === activeComponentId,
  );

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<TextAreaComponent["id"]>,
    );
    onBreadcrumbChange?.(null);
  }, [onBreadcrumbChange]);

  useEffect(() => {
    if (!onBreadcrumbChange || !showComponentDetail || !activeComponent) {
      onBreadcrumbChange?.(null);
      return;
    }

    onBreadcrumbChange([
      { label: "Forms", onSelect: onNavigateFormsHome },
      { label: "Text Area", onSelect: handleHomeNavigation },
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
    handleHomeNavigation,
    onBreadcrumbChange,
    onNavigateFormsHome,
    showComponentDetail,
  ]);

  const handleSelectedChanged = (event: TextAreaSelectedChangedEvent) => {
    const selectedKey = event.detail.items[0]?.key as TextAreaComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<TextAreaComponent["id"]>;
      setSelectedItems(selection);
    }
  };

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
          {ComponentDetail() ?? (
            <div class="comingsoon">Coming soon....</div>
          )}
        </div>
      )}
    </div>
  );
};


export default TextAreaHome;
