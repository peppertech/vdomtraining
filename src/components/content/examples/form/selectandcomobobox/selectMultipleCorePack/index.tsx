import 'preact';
import { type FunctionComponent } from 'preact';
import { RecipePageTemplate,type RecipePageItem } from "../../../../../shared/demo-page-layout/recipe-page-template";
import SelectMultipleAddToListExample from "./selectMultiple-addToList";
import SelectMultipleBasicExample from "./selectMultiple-basic";
import selectMultipleBasicPlaygroundSource from "./selectMultiple-basic-source";
import SelectMultipleCollectionTemplateTableExample from "./selectMultiple-collectionTemplateTable";
import selectMultipleCollectionTemplateTablePlaygroundSource from "./selectMultiple-collectionTemplateTable-source";
import SelectMultipleItemTemplateExample from "./selectMultiple-itemTemplate";
import selectMultipleItemTemplatePlaygroundSource from "./selectMultiple-itemTemplate-source";
import SelectMultipleItemTextExample from "./selectMultiple-itemText";
import selectMultipleItemTextPlaygroundSource from "./selectMultiple-itemText-source";
import SelectMultipleStatesExample from "./selectMultiple-states";
import selectMultipleStatesPlaygroundSource from "./selectMultiple-states-source";
import SelectMultipleValueItemsExample from "./selectMultiple-valueItems";
import selectMultipleValueItemsPlaygroundSource from "./selectMultiple-valueItems-source";
import SelectMultipleWidthExample from "./selectMultiple-width";
import selectMultipleWidthPlaygroundSource from "./selectMultiple-width-source";
import {
  browserOptions,
  createBrowserDataProvider,
  createOracleEmployeeDataProvider,
  getBrowserLabels,
  getEmployeeItemText,
  getEmployeeNames,
  labelEdgeOptions,
  renderEmployeeCollectionTable,
  renderEmployeeItemTemplate,
  trimValueItems,
} from "./selectMultiple-shared";
import {
  selectMultipleCorePackDocs,
  type SelectMultipleCorePackDemoId,
} from "./selectMultipleCorePack-docs";

type SelectMultipleRecipeItem = Omit<RecipePageItem, "id" | "Component"> & {
  id: SelectMultipleCorePackDemoId;
  Component: FunctionComponent;
};

const items: SelectMultipleRecipeItem[] = [
  {
    id: "states",
    name: "Overview",
    description: selectMultipleCorePackDocs.states.description,
    recipe: selectMultipleCorePackDocs.states.recipe,
    Component: SelectMultipleStatesExample,
    playground: {
      initialSource: selectMultipleStatesPlaygroundSource,
      fileName: "selectMultiple-states.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        getBrowserLabels,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: selectMultipleCorePackDocs.basic.description,
    recipe: selectMultipleCorePackDocs.basic.recipe,
    Component: SelectMultipleBasicExample,
    playground: {
      initialSource: selectMultipleBasicPlaygroundSource,
      fileName: "selectMultiple-basic.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        getBrowserLabels,
      },
    },
  },
  {
    id: "value-items",
    name: "Page Load Performance",
    description: selectMultipleCorePackDocs["value-items"].description,
    recipe: selectMultipleCorePackDocs["value-items"].recipe,
    Component: SelectMultipleValueItemsExample,
    playground: {
      initialSource: selectMultipleValueItemsPlaygroundSource,
      fileName: "selectMultiple-valueItems.tsx",
      runtimeBindings: {
        browserOptions,
        createBrowserDataProvider,
        trimValueItems,
      },
    },
  },
  {
    id: "item-text",
    name: "Item Text",
    description: selectMultipleCorePackDocs["item-text"].description,
    recipe: selectMultipleCorePackDocs["item-text"].recipe,
    Component: SelectMultipleItemTextExample,
    playground: {
      initialSource: selectMultipleItemTextPlaygroundSource,
      fileName: "selectMultiple-itemText.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        getEmployeeNames,
      },
    },
  },
  {
    id: "item-template",
    name: "Item Template",
    description: selectMultipleCorePackDocs["item-template"].description,
    recipe: selectMultipleCorePackDocs["item-template"].recipe,
    Component: SelectMultipleItemTemplateExample,
    playground: {
      initialSource: selectMultipleItemTemplatePlaygroundSource,
      fileName: "selectMultiple-itemTemplate.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        getEmployeeNames,
        renderEmployeeItemTemplate,
      },
    },
  },
  {
    id: "collection-table",
    name: "Collection Template (Table)",
    description: selectMultipleCorePackDocs["collection-table"].description,
    recipe: selectMultipleCorePackDocs["collection-table"].recipe,
    Component: SelectMultipleCollectionTemplateTableExample,
    playground: {
      initialSource: selectMultipleCollectionTemplateTablePlaygroundSource,
      fileName: "selectMultiple-collectionTemplateTable.tsx",
      runtimeBindings: {
        createOracleEmployeeDataProvider,
        getEmployeeItemText,
        getEmployeeNames,
        renderEmployeeCollectionTable,
      },
    },
  },
  {
    id: "width",
    name: "Width",
    description: selectMultipleCorePackDocs.width.description,
    recipe: selectMultipleCorePackDocs.width.recipe,
    Component: SelectMultipleWidthExample,
    playground: {
      initialSource: selectMultipleWidthPlaygroundSource,
      fileName: "selectMultiple-width.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        labelEdgeOptions,
      },
    },
  },
  // {
  //   id: "add-to-list",
  //   name: "Add to List",
  //   description: selectMultipleCorePackDocs["add-to-list"].description,
  //   recipe: selectMultipleCorePackDocs["add-to-list"].recipe,
  //   Component: SelectMultipleAddToListExample,
  // },
];

export default function SelectMultipleCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Select Multiple core pack examples"
      componentType="oj-c-select-multiple"
      packLabel="Core Pack"
      layoutId="selectMultipleCorePackNavigationLayout"
      items={items}
      initialItemId="states"
    />
  );
}
