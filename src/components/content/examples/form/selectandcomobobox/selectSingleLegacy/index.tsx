import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import SelectSingleLegacyAddToListExample from "./selectSingle-addToList";
import SelectSingleLegacyAdvancedSearchExample from "./selectSingle-advancedSearch";
import SelectSingleLegacyBasicExample from "./selectSingle-basic";
import SelectSingleLegacyCollectionTemplateListViewExample from "./selectSingle-collectionTemplateListView";
import SelectSingleLegacyCollectionTemplateTableExample from "./selectSingle-collectionTemplateTable";
import SelectSingleLegacyEventsExample from "./selectSingle-events";
import SelectSingleLegacyItemTemplateExample from "./selectSingle-itemTemplate";
import SelectSingleLegacyItemTextExample from "./selectSingle-itemText";
import SelectSingleLegacyStatesExample from "./selectSingle-states";
import SelectSingleLegacyValueItemExample from "./selectSingle-valueItem";
import SelectSingleLegacyVirtualKeyboardExample from "./selectSingle-virtualKeyboard";
import SelectSingleLegacyWidthExample from "./selectSingle-width";

type SelectSingleLegacyNavItem = {
  id: string;
  name: string;
};

const selectSingleLegacyNavItems: SelectSingleLegacyNavItem[] = [
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

const selectSingleLegacyNavDataProvider = new MutableArrayTreeDataProvider<
  SelectSingleLegacyNavItem["id"],
  SelectSingleLegacyNavItem
>(selectSingleLegacyNavItems, "id", {
  keyAttributeScope: "global",
});

export default function SelectSingleLegacyIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<SelectSingleLegacyNavItem["id"]>("states");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        SelectSingleLegacyNavItem["id"],
        SelectSingleLegacyNavItem
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
        SelectSingleLegacyNavItem["id"],
        SelectSingleLegacyNavItem
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
      selectSingleLegacyNavItems.find((item) => item.id === activeExampleId)
        ?.name ?? "Select Single",
    [activeExampleId],
  );

  const renderActiveExample = () => {
    switch (activeExampleId) {
      case "states":
        return <SelectSingleLegacyStatesExample />;
      case "basic":
        return <SelectSingleLegacyBasicExample />;
      case "add-to-list":
        return <SelectSingleLegacyAddToListExample />;
      case "advanced-search":
        return <SelectSingleLegacyAdvancedSearchExample />;
      case "collection-list-view":
        return <SelectSingleLegacyCollectionTemplateListViewExample />;
      case "collection-table":
        return <SelectSingleLegacyCollectionTemplateTableExample />;
      case "events":
        return <SelectSingleLegacyEventsExample />;
      case "item-template":
        return <SelectSingleLegacyItemTemplateExample />;
      case "item-text":
        return <SelectSingleLegacyItemTextExample />;
      case "value-item":
        return <SelectSingleLegacyValueItemExample />;
      case "virtual-keyboard":
        return <SelectSingleLegacyVirtualKeyboardExample />;
      case "width":
        return <SelectSingleLegacyWidthExample />;
      default:
        return null;
    }
  };

  return (
    <div
      id="selectSingleLegacyNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div
        class="oj-flex-item oj-sm-padding-2x oj-sm-border-radius-md"
        style="width: 24%; max-width: 24%; flex: 0 0 24%; background-color: #1f2937;"
      >
        <oj-navigation-list
          aria-label="Select Single legacy examples"
          selection={activeExampleId}
          data={selectSingleLegacyNavDataProvider}
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
