import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import CheckBoxSetBasicExample from "./checkBoxSet-basic";
import CheckBoxSetContextMenuExample from "./checkBoxSet-contextMenu";
import CheckBoxSetDataProviderExample from "./checkBoxSet-dataProvider";
import {
  checkBoxSetDocs,
  type CheckBoxSetDemoId,
} from "./checkBoxSet-docs";
import CheckBoxSetFilterExample from "./checkBoxSet-filter";
import CheckBoxSetNoItemLabelExample from "./checkBoxSet-noItemLabel";
import CheckBoxSetOverviewExample from "./checkBoxSet-overview";
import CheckBoxSetReadonlyExample from "./checkBoxSet-readonly";
import CheckBoxSetSingleItemExample from "./checkBoxSet-singleItem";
import CheckBoxSetValidationExample from "./checkBoxSet-validation";

const checkBoxSetItems: {
  id: CheckBoxSetDemoId;
  name: string;
  description: (typeof checkBoxSetDocs)[CheckBoxSetDemoId]["description"];
  recipe: (typeof checkBoxSetDocs)[CheckBoxSetDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: checkBoxSetDocs.overview.description,
    recipe: checkBoxSetDocs.overview.recipe,
    Component: CheckBoxSetOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: checkBoxSetDocs.basic.description,
    recipe: checkBoxSetDocs.basic.recipe,
    Component: CheckBoxSetBasicExample,
  },
  {
    id: "readonly",
    name: "Readonly",
    description: checkBoxSetDocs.readonly.description,
    recipe: checkBoxSetDocs.readonly.recipe,
    Component: CheckBoxSetReadonlyExample,
  },
  {
    id: "validation",
    name: "Validation",
    description: checkBoxSetDocs.validation.description,
    recipe: checkBoxSetDocs.validation.recipe,
    Component: CheckBoxSetValidationExample,
  },
  {
    id: "data-provider",
    name: "Data Provider Options",
    description: checkBoxSetDocs["data-provider"].description,
    recipe: checkBoxSetDocs["data-provider"].recipe,
    Component: CheckBoxSetDataProviderExample,
  },
  {
    id: "filter",
    name: "Filter UI",
    description: checkBoxSetDocs.filter.description,
    recipe: checkBoxSetDocs.filter.recipe,
    Component: CheckBoxSetFilterExample,
  },
  {
    id: "single-item",
    name: "Single Item",
    description: checkBoxSetDocs["single-item"].description,
    recipe: checkBoxSetDocs["single-item"].recipe,
    Component: CheckBoxSetSingleItemExample,
  },
  {
    id: "no-item-label",
    name: "No Group Label",
    description: checkBoxSetDocs["no-item-label"].description,
    recipe: checkBoxSetDocs["no-item-label"].recipe,
    Component: CheckBoxSetNoItemLabelExample,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: checkBoxSetDocs["context-menu"].description,
    recipe: checkBoxSetDocs["context-menu"].recipe,
    Component: CheckBoxSetContextMenuExample,
  },
];

export default function CheckBoxSetRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Checkbox Set examples"
      componentType="oj-checkboxset"
      layoutId="checkBoxSetNavigationLayout"
      items={checkBoxSetItems}
      initialItemId="overview"
    />
  );
}
