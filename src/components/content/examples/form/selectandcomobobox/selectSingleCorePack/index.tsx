import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import SelectSingleAddToListExample from "./selectSingle-addToList";
import SelectSingleAdvancedSearchExample from "./selectSingle-advancedSearch";
import SelectSingleBasicExample from "./selectSingle-basic";
import SelectSingleCollectionTemplateListViewExample from "./selectSingle-collectionTemplateListView";
import SelectSingleCollectionTemplateTableExample from "./selectSingle-collectionTemplateTable";
import {
  selectSingleCorePackDocs,
  type SelectSingleCorePackDemoId,
} from "./selectSingle-docs";
import SelectSingleEventsExample from "./selectSingle-events";
import SelectSingleItemTemplateExample from "./selectSingle-itemTemplate";
import SelectSingleItemTextExample from "./selectSingle-itemText";
import SelectSingleStatesExample from "./selectSingle-states";
import SelectSingleValueItemExample from "./selectSingle-valueItem";
import SelectSingleVirtualKeyboardExample from "./selectSingle-virtualKeyboard";
import SelectSingleWidthExample from "./selectSingle-width";

type SelectSingleNavItem = {
  id: SelectSingleCorePackDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const selectSingleNavItems: SelectSingleNavItem[] = [
  {
    id: "states",
    name: "Overview",
    description: selectSingleCorePackDocs.states.description,
    recipe: selectSingleCorePackDocs.states.recipe,
    Component: SelectSingleStatesExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: selectSingleCorePackDocs.basic.description,
    recipe: selectSingleCorePackDocs.basic.recipe,
    Component: SelectSingleBasicExample,
  },
  {
    id: "add-to-list",
    name: "Add to List",
    description: selectSingleCorePackDocs["add-to-list"].description,
    recipe: selectSingleCorePackDocs["add-to-list"].recipe,
    Component: SelectSingleAddToListExample,
  },
  {
    id: "advanced-search",
    name: "Advanced Search",
    description: selectSingleCorePackDocs["advanced-search"].description,
    recipe: selectSingleCorePackDocs["advanced-search"].recipe,
    Component: SelectSingleAdvancedSearchExample,
  },
  {
    id: "collection-list-view",
    name: "Collection Template (ListView)",
    description: selectSingleCorePackDocs["collection-list-view"].description,
    recipe: selectSingleCorePackDocs["collection-list-view"].recipe,
    Component: SelectSingleCollectionTemplateListViewExample,
  },
  {
    id: "collection-table",
    name: "Collection Template (Table)",
    description: selectSingleCorePackDocs["collection-table"].description,
    recipe: selectSingleCorePackDocs["collection-table"].recipe,
    Component: SelectSingleCollectionTemplateTableExample,
  },
  {
    id: "events",
    name: "Events",
    description: selectSingleCorePackDocs.events.description,
    recipe: selectSingleCorePackDocs.events.recipe,
    Component: SelectSingleEventsExample,
  },
  {
    id: "item-template",
    name: "Item Template",
    description: selectSingleCorePackDocs["item-template"].description,
    recipe: selectSingleCorePackDocs["item-template"].recipe,
    Component: SelectSingleItemTemplateExample,
  },
  {
    id: "item-text",
    name: "Item Text",
    description: selectSingleCorePackDocs["item-text"].description,
    recipe: selectSingleCorePackDocs["item-text"].recipe,
    Component: SelectSingleItemTextExample,
  },
  {
    id: "value-item",
    name: "Page Load Performance",
    description: selectSingleCorePackDocs["value-item"].description,
    recipe: selectSingleCorePackDocs["value-item"].recipe,
    Component: SelectSingleValueItemExample,
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: selectSingleCorePackDocs["virtual-keyboard"].description,
    recipe: selectSingleCorePackDocs["virtual-keyboard"].recipe,
    Component: SelectSingleVirtualKeyboardExample,
  },
  {
    id: "width",
    name: "Width",
    description: selectSingleCorePackDocs.width.description,
    recipe: selectSingleCorePackDocs.width.recipe,
    Component: SelectSingleWidthExample,
  },
];

const selectSingleNavDataProvider = new MutableArrayTreeDataProvider<
  SelectSingleNavItem["id"],
  SelectSingleNavItem
>(selectSingleNavItems, "id", {
  keyAttributeScope: "global",
});

export default function SelectSingleIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<SelectSingleCorePackDemoId>("states");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        SelectSingleNavItem["id"],
        SelectSingleNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as SelectSingleCorePackDemoId));
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
        <a href="#" style="color: inherit; text-decoration: none;">
          {item.data.name}
        </a>
      </li>
    ),
    [],
  );

  const activeExample = useMemo(
    () =>
      selectSingleNavItems.find((item) => item.id === activeExampleId) ??
      selectSingleNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="selectSingleNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Select Single examples"
          selection={activeExampleId}
          data={selectSingleNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-c-select-single"
          packLabel="Core Pack"
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
        />
      </div>
    </div>
  );
}
