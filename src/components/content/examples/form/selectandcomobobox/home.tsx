import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";

import SelectSingleLegacyDemoWrapper from "./selectSingleLegacy/index";
import SelectSingleDemoWrapper from "./selectSingleCorePack/index";
import SelectMultipleCorePack from "./selectMultipleCorePack/index";
import  SelectManyIndex from "./selectMany/index";
import ComboboxOneExample from "./comboBoxOne/index";
import ComboboxManyDemoWrapper from "./comboboxMany/index";
import {
  type NestedFormHomeProps,
  formatCorePackLabel,
} from "../form-breadcrumb";

type SelectComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
  render: () => h.JSX.Element;
};

const selectComponents: SelectComponent[] = [
  {
    id: 1,
    name: "Select Single",
    image: "oj-ux-icon-size-12x oj-ux-ico-select-tab",
    render: () => <SelectSingleLegacyDemoWrapper />,
  },
  {
    id: 2,
    name: "Select Single",
    image: "oj-ux-icon-size-12x oj-ux-ico-select-tab",
    isCorePack: true,
    render: () => <SelectSingleDemoWrapper />,
  },
  {
    id: 3,
    name: "Select Multiple",
    image: "oj-ux-icon-size-12x oj-ux-ico-select",
    isCorePack: true,
    render: () => <SelectMultipleCorePack />,
  },
  {
    id: 4,
    name: "Select Many",
    image: "oj-ux-icon-size-12x oj-ux-ico-select-all",
    render: () => <SelectManyIndex />,
  },
  {
    id: 5,
    name: "Combobox One",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-combo",
    render: () => <ComboboxOneExample />,
  },
  {
    id: 6,
    name: "Combobox Many",
    image: "oj-ux-icon-size-12x oj-ux-ico-text-input-combo-many",
    render: () => <ComboboxManyDemoWrapper />,
  },
];

const dataProvider = new MutableArrayDataProvider<
  SelectComponent["id"],
  SelectComponent
>(selectComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
type SelectSelectedChangedEvent = ojListView.selectedChanged<
  SelectComponent["id"],
  SelectComponent
>;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<SelectComponent["id"]>;

const SelectAndComboboxHome = ({
  onBreadcrumbChange,
  onNavigateFormsHome,
}: NestedFormHomeProps) => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<SelectComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        SelectComponent["id"],
        SelectComponent
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
    const entry = selectComponents.find(
      (component) => component.id === activeComponentId,
    );
    return entry?.render() ?? null;
  }, [activeComponentId]);

  const activeComponent = selectComponents.find(
    (component) => component.id === activeComponentId,
  );

  const handleHomeNavigation = useCallback(() => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<SelectComponent["id"]>,
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
      { label: "Select & Combobox", onSelect: handleHomeNavigation },
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

  const handleSelectedChanged = (event: SelectSelectedChangedEvent) => {
    const selectedKey = event.detail.items[0]?.key as SelectComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<SelectComponent["id"]>;
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

export default SelectAndComboboxHome;
