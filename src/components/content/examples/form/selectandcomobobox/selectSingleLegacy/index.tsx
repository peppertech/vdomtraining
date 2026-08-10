import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import SelectSingleLegacyAddToListExample from "./selectSingle-addToList";
import selectSingleLegacyAddToListPlaygroundSource from "./selectSingle-addToList-source";
import SelectSingleLegacyAdvancedSearchExample from "./selectSingle-advancedSearch";
import selectSingleLegacyAdvancedSearchPlaygroundSource from "./selectSingle-advancedSearch-source";
import SelectSingleLegacyBasicExample from "./selectSingle-basic";
import selectSingleLegacyBasicPlaygroundSource from "./selectSingle-basic-source";
import SelectSingleLegacyCollectionTemplateListViewExample from "./selectSingle-collectionTemplateListView";
import selectSingleLegacyCollectionTemplateListViewPlaygroundSource from "./selectSingle-collectionTemplateListView-source";
import SelectSingleLegacyCollectionTemplateTableExample from "./selectSingle-collectionTemplateTable";
import selectSingleLegacyCollectionTemplateTablePlaygroundSource from "./selectSingle-collectionTemplateTable-source";
import {
  selectSingleLegacyDocs,
  type SelectSingleLegacyDemoId,
} from "./selectSingle-docs";
import SelectSingleLegacyEventsExample from "./selectSingle-events";
import selectSingleLegacyEventsPlaygroundSource from "./selectSingle-events-source";
import SelectSingleLegacyItemTemplateExample from "./selectSingle-itemTemplate";
import selectSingleLegacyItemTemplatePlaygroundSource from "./selectSingle-itemTemplate-source";
import SelectSingleLegacyItemTextExample from "./selectSingle-itemText";
import selectSingleLegacyItemTextPlaygroundSource from "./selectSingle-itemText-source";
import SelectSingleLegacyStatesExample from "./selectSingle-states";
import selectSingleLegacyStatesPlaygroundSource from "./selectSingle-states-source";
import SelectSingleLegacyValueItemExample from "./selectSingle-valueItem";
import selectSingleLegacyValueItemPlaygroundSource from "./selectSingle-valueItem-source";
import SelectSingleLegacyVirtualKeyboardExample from "./selectSingle-virtualKeyboard";
import selectSingleLegacyVirtualKeyboardPlaygroundSource from "./selectSingle-virtualKeyboard-source";
import SelectSingleLegacyWidthExample from "./selectSingle-width";
import selectSingleLegacyWidthPlaygroundSource from "./selectSingle-width-source";
import {
  browserOptions,
  createBrowserDataProvider,
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  renderEmployeeCollectionListView,
  renderEmployeeCollectionTable,
  renderEmployeeItemTemplate,
} from "./selectSingle-shared";

type SelectSingleLegacyNavItem = {
  id: SelectSingleLegacyDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
  playground?: PlaygroundConfig;
};

const selectSingleLegacyNavItems: SelectSingleLegacyNavItem[] = [
  {
    id: "states",
    name: "Overview",
    description: selectSingleLegacyDocs.states.description,
    recipe: selectSingleLegacyDocs.states.recipe,
    Component: SelectSingleLegacyStatesExample,
    playground: {
      initialSource: selectSingleLegacyStatesPlaygroundSource,
      fileName: "selectSingle-states.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: selectSingleLegacyDocs.basic.description,
    recipe: selectSingleLegacyDocs.basic.recipe,
    Component: SelectSingleLegacyBasicExample,
    playground: {
      initialSource: selectSingleLegacyBasicPlaygroundSource,
      fileName: "selectSingle-basic.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  
  {
    id: "events",
    name: "Events",
    description: selectSingleLegacyDocs.events.description,
    recipe: selectSingleLegacyDocs.events.recipe,
    Component: SelectSingleLegacyEventsExample,
    playground: {
      initialSource: selectSingleLegacyEventsPlaygroundSource,
      fileName: "selectSingle-events.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "item-text",
    name: "Item Text",
    description: selectSingleLegacyDocs["item-text"].description,
    recipe: selectSingleLegacyDocs["item-text"].recipe,
    Component: SelectSingleLegacyItemTextExample,
    playground: {
      initialSource: selectSingleLegacyItemTextPlaygroundSource,
      fileName: "selectSingle-itemText.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
      },
    },
  },
  {
    id: "item-template",
    name: "Item Template",
    description: selectSingleLegacyDocs["item-template"].description,
    recipe: selectSingleLegacyDocs["item-template"].recipe,
    Component: SelectSingleLegacyItemTemplateExample,
    playground: {
      initialSource: selectSingleLegacyItemTemplatePlaygroundSource,
      fileName: "selectSingle-itemTemplate.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        renderEmployeeItemTemplate,
      },
    },
  },
   {
    id: "collection-list-view",
    name: "Collection Template (ListView)",
    description: selectSingleLegacyDocs["collection-list-view"].description,
    recipe: selectSingleLegacyDocs["collection-list-view"].recipe,
    Component: SelectSingleLegacyCollectionTemplateListViewExample,
    playground: {
      initialSource: selectSingleLegacyCollectionTemplateListViewPlaygroundSource,
      fileName: "selectSingle-collectionTemplateListView.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        renderEmployeeCollectionListView,
      },
    },
  },
  {
    id: "collection-table",
    name: "Collection Template (Table)",
    description: selectSingleLegacyDocs["collection-table"].description,
    recipe: selectSingleLegacyDocs["collection-table"].recipe,
    Component: SelectSingleLegacyCollectionTemplateTableExample,
    playground: {
      initialSource: selectSingleLegacyCollectionTemplateTablePlaygroundSource,
      fileName: "selectSingle-collectionTemplateTable.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        renderEmployeeCollectionTable,
      },
    },
  },
  {
    id: "value-item",
    name: "Page Load Performance",
    description: selectSingleLegacyDocs["value-item"].description,
    recipe: selectSingleLegacyDocs["value-item"].recipe,
    Component: SelectSingleLegacyValueItemExample,
    playground: {
      initialSource: selectSingleLegacyValueItemPlaygroundSource,
      fileName: "selectSingle-valueItem.tsx",
      runtimeBindings: {
        browserOptions,
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: selectSingleLegacyDocs["virtual-keyboard"].description,
    recipe: selectSingleLegacyDocs["virtual-keyboard"].recipe,
    Component: SelectSingleLegacyVirtualKeyboardExample,
    playground: {
      initialSource: selectSingleLegacyVirtualKeyboardPlaygroundSource,
      fileName: "selectSingle-virtualKeyboard.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "width",
    name: "Width",
    description: selectSingleLegacyDocs.width.description,
    recipe: selectSingleLegacyDocs.width.recipe,
    Component: SelectSingleLegacyWidthExample,
    playground: {
      initialSource: selectSingleLegacyWidthPlaygroundSource,
      fileName: "selectSingle-width.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "add-to-list",
    name: "Add to List",
    description: selectSingleLegacyDocs["add-to-list"].description,
    recipe: selectSingleLegacyDocs["add-to-list"].recipe,
    Component: SelectSingleLegacyAddToListExample,
    playground: {
      initialSource: selectSingleLegacyAddToListPlaygroundSource,
      fileName: "selectSingle-addToList.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "advanced-search",
    name: "Advanced Search",
    description: selectSingleLegacyDocs["advanced-search"].description,
    recipe: selectSingleLegacyDocs["advanced-search"].recipe,
    Component: SelectSingleLegacyAdvancedSearchExample,
    playground: {
      initialSource: selectSingleLegacyAdvancedSearchPlaygroundSource,
      fileName: "selectSingle-advancedSearch.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
      },
    },
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
          playground={activeExample.playground}
        />
      </div>
    </div>
  );
}
