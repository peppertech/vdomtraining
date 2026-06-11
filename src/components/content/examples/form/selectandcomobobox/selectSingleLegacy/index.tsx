import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
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
import {
  selectSingleLegacyDocs,
  type SelectSingleLegacyDemoId,
} from "./selectSingle-docs";

type SelectSingleLegacyNavItem = {
  id: SelectSingleLegacyDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const selectSingleLegacyNavItems: SelectSingleLegacyNavItem[] = [
  {
    id: "states",
    name: "Overview",
    description: selectSingleLegacyDocs.states.description,
    recipe: selectSingleLegacyDocs.states.recipe,
    Component: SelectSingleLegacyStatesExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: selectSingleLegacyDocs.basic.description,
    recipe: selectSingleLegacyDocs.basic.recipe,
    Component: SelectSingleLegacyBasicExample,
  },
  
  {
    id: "events",
    name: "Events",
    description: selectSingleLegacyDocs.events.description,
    recipe: selectSingleLegacyDocs.events.recipe,
    Component: SelectSingleLegacyEventsExample,
  },
  {
    id: "item-text",
    name: "Item Text",
    description: selectSingleLegacyDocs["item-text"].description,
    recipe: selectSingleLegacyDocs["item-text"].recipe,
    Component: SelectSingleLegacyItemTextExample,
  },
  {
    id: "item-template",
    name: "Item Template",
    description: selectSingleLegacyDocs["item-template"].description,
    recipe: selectSingleLegacyDocs["item-template"].recipe,
    Component: SelectSingleLegacyItemTemplateExample,
  },
   {
    id: "collection-list-view",
    name: "Collection Template (ListView)",
    description: selectSingleLegacyDocs["collection-list-view"].description,
    recipe: selectSingleLegacyDocs["collection-list-view"].recipe,
    Component: SelectSingleLegacyCollectionTemplateListViewExample,
  },
  {
    id: "collection-table",
    name: "Collection Template (Table)",
    description: selectSingleLegacyDocs["collection-table"].description,
    recipe: selectSingleLegacyDocs["collection-table"].recipe,
    Component: SelectSingleLegacyCollectionTemplateTableExample,
  },
  {
    id: "value-item",
    name: "Page Load Performance",
    description: selectSingleLegacyDocs["value-item"].description,
    recipe: selectSingleLegacyDocs["value-item"].recipe,
    Component: SelectSingleLegacyValueItemExample,
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: selectSingleLegacyDocs["virtual-keyboard"].description,
    recipe: selectSingleLegacyDocs["virtual-keyboard"].recipe,
    Component: SelectSingleLegacyVirtualKeyboardExample,
  },
  {
    id: "width",
    name: "Width",
    description: selectSingleLegacyDocs.width.description,
    recipe: selectSingleLegacyDocs.width.recipe,
    Component: SelectSingleLegacyWidthExample,
  },
  {
    id: "add-to-list",
    name: "Add to List",
    description: selectSingleLegacyDocs["add-to-list"].description,
    recipe: selectSingleLegacyDocs["add-to-list"].recipe,
    Component: SelectSingleLegacyAddToListExample,
  },
  {
    id: "advanced-search",
    name: "Advanced Search",
    description: selectSingleLegacyDocs["advanced-search"].description,
    recipe: selectSingleLegacyDocs["advanced-search"].recipe,
    Component: SelectSingleLegacyAdvancedSearchExample,
  }
];

const selectSingleLegacyNavDataProvider = new MutableArrayTreeDataProvider<
  SelectSingleLegacyNavItem["id"],
  SelectSingleLegacyNavItem
>(selectSingleLegacyNavItems, "id", {
  keyAttributeScope: "global",
});

export default function SelectSingleLegacyIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<SelectSingleLegacyDemoId>("states");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        SelectSingleLegacyNavItem["id"],
        SelectSingleLegacyNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as SelectSingleLegacyDemoId));
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
        <a href="#" style="color: inherit; text-decoration: none;">
          {item.data.name}
        </a>
      </li>
    ),
    [],
  );

  const activeExample = useMemo(
    () =>
      selectSingleLegacyNavItems.find((item) => item.id === activeExampleId) ??
      selectSingleLegacyNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="selectSingleLegacyNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Select Single legacy examples"
          selection={activeExampleId}
          data={selectSingleLegacyNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-select-single"
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
        />
      </div>
    </div>
  );
}
