import 'preact';
import { type FunctionComponent } from 'preact';
import { RecipePageTemplate,type RecipePageItem } from "../../../../../shared/demo-page-layout/recipe-page-template";
import SelectMultipleAddToListExample from "./selectMultiple-addToList";
import SelectMultipleBasicExample from "./selectMultiple-basic";
import SelectMultipleCollectionTemplateTableExample from "./selectMultiple-collectionTemplateTable";
import SelectMultipleItemTemplateExample from "./selectMultiple-itemTemplate";
import SelectMultipleItemTextExample from "./selectMultiple-itemText";
import SelectMultipleStatesExample from "./selectMultiple-states";
import SelectMultipleValueItemsExample from "./selectMultiple-valueItems";
import SelectMultipleWidthExample from "./selectMultiple-width";
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
  },
  {
    id: "basic",
    name: "Basic",
    description: selectMultipleCorePackDocs.basic.description,
    recipe: selectMultipleCorePackDocs.basic.recipe,
    Component: SelectMultipleBasicExample,
  },
  {
    id: "value-items",
    name: "Page Load Performance",
    description: selectMultipleCorePackDocs["value-items"].description,
    recipe: selectMultipleCorePackDocs["value-items"].recipe,
    Component: SelectMultipleValueItemsExample,
  },
  {
    id: "item-text",
    name: "Item Text",
    description: selectMultipleCorePackDocs["item-text"].description,
    recipe: selectMultipleCorePackDocs["item-text"].recipe,
    Component: SelectMultipleItemTextExample,
  },
  {
    id: "item-template",
    name: "Item Template",
    description: selectMultipleCorePackDocs["item-template"].description,
    recipe: selectMultipleCorePackDocs["item-template"].recipe,
    Component: SelectMultipleItemTemplateExample,
  },
  {
    id: "collection-table",
    name: "Collection Template (Table)",
    description: selectMultipleCorePackDocs["collection-table"].description,
    recipe: selectMultipleCorePackDocs["collection-table"].recipe,
    Component: SelectMultipleCollectionTemplateTableExample,
  },
  {
    id: "width",
    name: "Width",
    description: selectMultipleCorePackDocs.width.description,
    recipe: selectMultipleCorePackDocs.width.recipe,
    Component: SelectMultipleWidthExample,
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
