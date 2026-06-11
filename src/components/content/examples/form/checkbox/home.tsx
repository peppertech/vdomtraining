import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import CheckBoxSet from "./checkBoxSet/index";
import CheckBoxCorePack from "./checkBoxCorePack/index";
import CheckBoxSetCorePack  from "./checkBoxSetCorePack/index";
import  RichCheckBoxsetCorePack  from "./richCheckBoxsetCorePack/index";
import {
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "../form-breadcrumb";

type CheckboxComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: () => h.JSX.Element;
};

const checkboxComponents: CheckboxComponent[] = [
  {
    id: 1,
    name: "Checkbox Set",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    render: () => <CheckBoxSet />,
  },
  {
    id: 2,
    name: "Checkbox",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: () => <CheckBoxCorePack />,
  },
  {
    id: 3,
    name: "Checkbox Set",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: () => <CheckBoxSetCorePack />,
  },
  {
    id: 4,
    name: "Rich Checkbox Set",
    image: "oj-ux-icon-size-12x oj-ux-ico-checkbox-on",
    isCorePack: true,
    render: () => <RichCheckBoxsetCorePack />,
  },
];

const dataProvider = new MutableArrayDataProvider<
  CheckboxComponent["id"],
  CheckboxComponent
>(checkboxComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type CheckboxSelectedChangedEvent = ojListView.selectedChanged<
  CheckboxComponent["id"],
  CheckboxComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<CheckboxComponent["id"]>;

const CheckboxHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
}: NestedFormHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<CheckboxComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        CheckboxComponent["id"],
        CheckboxComponent
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
    const entry = checkboxComponents.find(
      (component) => component.id === activeComponentId,
    );
    return entry?.render() ?? null;
  }, [activeComponentId]);

  const activeComponent = checkboxComponents.find(
    (component) => component.id === activeComponentId,
  );

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<CheckboxComponent["id"]>,
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
      { label: "Checkboxes", onSelect: handleHomeNavigation },
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

  const handleSelectedChanged = (event: CheckboxSelectedChangedEvent) => {
    const selectedKey = event.detail.items[0]?.key as CheckboxComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<CheckboxComponent["id"]>;
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

export default CheckboxHome;
