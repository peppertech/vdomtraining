import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import SelectSingleAddToListExample from "./selectSingle-addToList";
import selectSingleAddToListSource from "./selectSingle-addToList-source";
import SelectSingleAdvancedSearchExample from "./selectSingle-advancedSearch";
import selectSingleAdvancedSearchSource from "./selectSingle-advancedSearch-source";
import SelectSingleBasicExample from "./selectSingle-basic";
import selectSingleBasicSource from "./selectSingle-basic-source";
import SelectSingleCollectionTemplateListViewExample from "./selectSingle-collectionTemplateListView";
import selectSingleCollectionTemplateListViewSource from "./selectSingle-collectionTemplateListView-source";
import SelectSingleCollectionTemplateTableExample from "./selectSingle-collectionTemplateTable";
import selectSingleCollectionTemplateTableSource from "./selectSingle-collectionTemplateTable-source";
import selectSingleEmployeeDataSource from "./selectSingle-employeeData-source";
import {
  selectSingleCorePackDocs,
  type SelectSingleCorePackDemoId,
} from "./selectSingle-docs";
import SelectSingleEventsExample from "./selectSingle-events";
import selectSingleEventsSource from "./selectSingle-events-source";
import SelectSingleItemTemplateExample from "./selectSingle-itemTemplate";
import selectSingleItemTemplateSource from "./selectSingle-itemTemplate-source";
import SelectSingleItemTextExample from "./selectSingle-itemText";
import selectSingleItemTextSource from "./selectSingle-itemText-source";
import SelectSingleStatesExample from "./selectSingle-states";
import selectSingleStatesSource from "./selectSingle-states-source";
import SelectSingleValueItemExample from "./selectSingle-valueItem";
import selectSingleValueItemSource from "./selectSingle-valueItem-source";
import SelectSingleVirtualKeyboardExample from "./selectSingle-virtualKeyboard";
import selectSingleVirtualKeyboardSource from "./selectSingle-virtualKeyboard-source";
import SelectSingleWidthExample from "./selectSingle-width";
import selectSingleWidthSource from "./selectSingle-width-source";
import {
  browserOptions,
  createBrowserDataProvider,
  createOracleEmployeeDataProvider,
  getEmployeeItemText,
  labelEdgeOptions,
  renderEmployeeCollectionListView,
  renderEmployeeCollectionTable,
  renderEmployeeItemTemplate,
  virtualKeyboardOptions,
} from "./selectSingle-shared";

type SelectSingleNavItem = {
  id: SelectSingleCorePackDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
  playground?: PlaygroundConfig;
};

const collectionTemplateSupportingFiles: NonNullable<
  PlaygroundConfig["supportingFiles"]
> = [{
  fileName: "employeeData.json",
  initialSource: selectSingleEmployeeDataSource,
  language: "json",
  importSpecifier: "text!../../data/employeeData.json",
  bindingName: "employeeDataText",
}];

const selectSingleNavItems: SelectSingleNavItem[] = [
  {
    id: "states",
    name: "Overview",
    description: selectSingleCorePackDocs.states.description,
    recipe: selectSingleCorePackDocs.states.recipe,
    Component: SelectSingleStatesExample,
    playground: {
      initialSource: selectSingleStatesSource,
      fileName: "selectSingle-states.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: selectSingleCorePackDocs.basic.description,
    recipe: selectSingleCorePackDocs.basic.recipe,
    Component: SelectSingleBasicExample,
    playground: {
      initialSource: selectSingleBasicSource,
      fileName: "selectSingle-basic.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: selectSingleCorePackDocs["virtual-keyboard"].description,
    recipe: selectSingleCorePackDocs["virtual-keyboard"].recipe,
    Component: SelectSingleVirtualKeyboardExample,
    playground: {
      initialSource: selectSingleVirtualKeyboardSource,
      fileName: "selectSingle-virtualKeyboard.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        virtualKeyboardOptions,
      },
    },
  },
  {
    id: "events",
    name: "Events",
    description: selectSingleCorePackDocs.events.description,
    recipe: selectSingleCorePackDocs.events.recipe,
    Component: SelectSingleEventsExample,
    playground: {
      initialSource: selectSingleEventsSource,
      fileName: "selectSingle-events.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
    {
    id: "value-item",
    name: "Page Load Performance",
    description: selectSingleCorePackDocs["value-item"].description,
    recipe: selectSingleCorePackDocs["value-item"].recipe,
    Component: SelectSingleValueItemExample,
    playground: {
      initialSource: selectSingleValueItemSource,
      fileName: "selectSingle-valueItem.tsx",
      runtimeBindings: {
        browserOptions,
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "item-text",
    name: "Item Text",
    description: selectSingleCorePackDocs["item-text"].description,
    recipe: selectSingleCorePackDocs["item-text"].recipe,
    Component: SelectSingleItemTextExample,
    playground: {
      initialSource: selectSingleItemTextSource,
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
    description: selectSingleCorePackDocs["item-template"].description,
    recipe: selectSingleCorePackDocs["item-template"].recipe,
    Component: SelectSingleItemTemplateExample,
    playground: {
      initialSource: selectSingleItemTemplateSource,
      fileName: "selectSingle-itemTemplate.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        renderEmployeeItemTemplate,
      },
    },
  },
  {
    id: "add-to-list",
    name: "Add to List",
    description: selectSingleCorePackDocs["add-to-list"].description,
    recipe: selectSingleCorePackDocs["add-to-list"].recipe,
    Component: SelectSingleAddToListExample,
    playground: {
      initialSource: selectSingleAddToListSource,
      fileName: "selectSingle-addToList.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "advanced-search",
    name: "Advanced Search",
    description: selectSingleCorePackDocs["advanced-search"].description,
    recipe: selectSingleCorePackDocs["advanced-search"].recipe,
    Component: SelectSingleAdvancedSearchExample,
    playground: {
      initialSource: selectSingleAdvancedSearchSource,
      fileName: "selectSingle-advancedSearch.tsx",
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
    description: selectSingleCorePackDocs["collection-list-view"].description,
    recipe: selectSingleCorePackDocs["collection-list-view"].recipe,
    Component: SelectSingleCollectionTemplateListViewExample,
    playground: {
      initialSource: selectSingleCollectionTemplateListViewSource,
      fileName: "selectSingle-collectionTemplateListView.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        renderEmployeeCollectionListView,
      },
      supportingFiles: collectionTemplateSupportingFiles,
    },
  },
  {
    id: "collection-table",
    name: "Collection Template (Table)",
    description: selectSingleCorePackDocs["collection-table"].description,
    recipe: selectSingleCorePackDocs["collection-table"].recipe,
    Component: SelectSingleCollectionTemplateTableExample,
    playground: {
      initialSource: selectSingleCollectionTemplateTableSource,
      fileName: "selectSingle-collectionTemplateTable.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        renderEmployeeCollectionTable,
      },
      supportingFiles: collectionTemplateSupportingFiles,
    },
  },
  {
    id: "width",
    name: "Width",
    description: selectSingleCorePackDocs.width.description,
    recipe: selectSingleCorePackDocs.width.recipe,
    Component: SelectSingleWidthExample,
    playground: {
      initialSource: selectSingleWidthSource,
      fileName: "selectSingle-width.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        labelEdgeOptions,
      },
    },
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
          playground={activeExample.playground}
        />
      </div>
    </div>
  );
}
