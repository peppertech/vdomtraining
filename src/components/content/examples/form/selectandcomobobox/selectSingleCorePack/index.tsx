import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import SelectSingleAddToListExample from "./selectSingle-addToList";
import SelectSingleAdvancedSearchExample from "./selectSingle-advancedSearch";
import SelectSingleBasicExample from "./selectSingle-basic";
import SelectSingleCollectionTemplateListViewExample from "./selectSingle-collectionTemplateListView";
import SelectSingleCollectionTemplateTableExample from "./selectSingle-collectionTemplateTable";
import SelectSingleEventsExample from "./selectSingle-events";
import SelectSingleItemTemplateExample from "./selectSingle-itemTemplate";
import SelectSingleItemTextExample from "./selectSingle-itemText";
import SelectSingleStatesExample from "./selectSingle-states";
import SelectSingleValueItemExample from "./selectSingle-valueItem";
import SelectSingleVirtualKeyboardExample from "./selectSingle-virtualKeyboard";
import SelectSingleWidthExample from "./selectSingle-width";

type SelectSingleNavItem = {
  id: string;
  name: string;
};

const selectSingleNavItems: SelectSingleNavItem[] = [
  { id: "states", name: "Overview" },
  { id: "basic", name: "Basic" },
  { id: "add-to-list", name: "Add to List" },
  { id: "advanced-search", name: "Advanced Search" },
  { id: "collection-list-view", name: "Collection Template (ListView)" },
  { id: "collection-table", name: "Collection Template (Table)" },
  { id: "events", name: "Events" },
  { id: "item-template", name: "Item Template" },
  { id: "item-text", name: "Item Text" },
  { id: "value-item", name: "Page Load Performance" },
  { id: "virtual-keyboard", name: "Virtual Keyboard" },
  { id: "width", name: "Width" },
];

const selectSingleNavDataProvider = new MutableArrayTreeDataProvider<
  SelectSingleNavItem["id"],
  SelectSingleNavItem
>(selectSingleNavItems, "id", {
  keyAttributeScope: "global",
});

export default function SelectSingleIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<SelectSingleNavItem["id"]>("states");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        SelectSingleNavItem["id"],
        SelectSingleNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId(event.detail.value);
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        SelectSingleNavItem["id"],
        SelectSingleNavItem
      >,
    ) => (
      <li id={item.data.id}>
        <a href="" style="color: inherit; text-decoration: none;">
          {item.data.name}
        </a>
      </li>
    ),
    [],
  );

  const activeExampleTitle = useMemo(
    () =>
      selectSingleNavItems.find((item) => item.id === activeExampleId)?.name ??
      "Select Single",
    [activeExampleId],
  );

  const renderActiveExample = () => {
    switch (activeExampleId) {
      case "states":
        return <SelectSingleStatesExample />;
      case "basic":
        return <SelectSingleBasicExample />;
      case "add-to-list":
        return <SelectSingleAddToListExample />;
      case "advanced-search":
        return <SelectSingleAdvancedSearchExample />;
      case "collection-list-view":
        return <SelectSingleCollectionTemplateListViewExample />;
      case "collection-table":
        return <SelectSingleCollectionTemplateTableExample />;
      case "events":
        return <SelectSingleEventsExample />;
      case "item-template":
        return <SelectSingleItemTemplateExample />;
      case "item-text":
        return <SelectSingleItemTextExample />;
      case "value-item":
        return <SelectSingleValueItemExample />;
      case "virtual-keyboard":
        return <SelectSingleVirtualKeyboardExample />;
      case "width":
        return <SelectSingleWidthExample />;
      default:
        return null;
    }
  };

  return (
    <div
      id="selectSingleNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div
        class="oj-flex-item oj-sm-padding-2x oj-sm-border-radius-md"
        style="width: 24%; max-width: 24%; flex: 0 0 24%; background-color: #1f2937;"
      >
        <oj-navigation-list
          aria-label="Select Single examples"
          selection={activeExampleId}
          data={selectSingleNavDataProvider}
          onselectionChanged={handleNavigationChange}
          style="
            --oj-navigation-list-item-label-color: #f9fafb;
            --oj-navigation-list-item-label-color-hover: #ffffff;
            --oj-navigation-list-item-label-color-selected: #ffffff;
            --oj-navigation-list-item-bg-color-hover: rgba(255, 255, 255, 0.08);
            --oj-navigation-list-item-bg-color-selected: rgba(255, 255, 255, 0.14);
            --oj-navigation-list-item-border-color-selected: #ffffff;
            color: #f9fafb;
          "
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div
        class="oj-flex-item"
        style="width: 76%; max-width: 76%; flex: 0 0 76%; padding-left: 25px;"
      >
        <h6>{activeExampleTitle}</h6>
        {renderActiveExample()}
      </div>
    </div>
  );
}
