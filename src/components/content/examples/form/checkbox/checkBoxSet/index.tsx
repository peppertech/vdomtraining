import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import CheckBoxSetBasicExample from "./checkBoxSet-basic";
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
import checkBoxSetBasicPlaygroundSource from "./checkBoxSet-basic-source";
import checkBoxSetDataProviderPlaygroundSource from "./checkBoxSet-dataProvider-source";
import checkBoxSetFilterPlaygroundSource from "./checkBoxSet-filter-source";
import checkBoxSetNoItemLabelPlaygroundSource from "./checkBoxSet-noItemLabel-source";
import checkBoxSetOverviewPlaygroundSource from "./checkBoxSet-overview-source";
import checkBoxSetReadonlyPlaygroundSource from "./checkBoxSet-readonly-source";
import checkBoxSetSingleItemPlaygroundSource from "./checkBoxSet-singleItem-source";
import checkBoxSetValidationPlaygroundSource from "./checkBoxSet-validation-source";
import { browserOptions, browserShortListOptions, colorOptions, confirmationMessages, createCheckboxOptionsDataProvider, drinkOptions, errorMessages, filterOptions, infoMessages, renderCheckboxOptions, technologyOptions, warningMessages, wrappingOptions } from "./checkBoxSet-shared";

const checkBoxSetItems: {
  id: CheckBoxSetDemoId;
  name: string;
  description: (typeof checkBoxSetDocs)[CheckBoxSetDemoId]["description"];
  recipe: (typeof checkBoxSetDocs)[CheckBoxSetDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: checkBoxSetDocs.overview.description,
    recipe: checkBoxSetDocs.overview.recipe,
    Component: CheckBoxSetOverviewExample,
    playground: { initialSource: checkBoxSetOverviewPlaygroundSource, fileName: "checkBoxSet-overview.tsx", runtimeBindings: { confirmationMessages, errorMessages, infoMessages, renderCheckboxOptions, technologyOptions, warningMessages, wrappingOptions } },
  },
  {
    id: "basic",
    name: "Basic",
    description: checkBoxSetDocs.basic.description,
    recipe: checkBoxSetDocs.basic.recipe,
    Component: CheckBoxSetBasicExample,
    playground: { initialSource: checkBoxSetBasicPlaygroundSource, fileName: "checkBoxSet-basic.tsx", runtimeBindings: { colorOptions, renderCheckboxOptions } },
  },
  {
    id: "data-provider",
    name: "Data Provider Options",
    description: checkBoxSetDocs["data-provider"].description,
    recipe: checkBoxSetDocs["data-provider"].recipe,
    Component: CheckBoxSetDataProviderExample,
    playground: { initialSource: checkBoxSetDataProviderPlaygroundSource, fileName: "checkBoxSet-dataProvider.tsx", runtimeBindings: { browserOptions, browserShortListOptions, createCheckboxOptionsDataProvider } },
  },
  {
    id: "readonly",
    name: "Readonly",
    description: checkBoxSetDocs.readonly.description,
    recipe: checkBoxSetDocs.readonly.recipe,
    Component: CheckBoxSetReadonlyExample,
    playground: { initialSource: checkBoxSetReadonlyPlaygroundSource, fileName: "checkBoxSet-readonly.tsx", runtimeBindings: { colorOptions, drinkOptions, renderCheckboxOptions } },
  },
  {
    id: "no-item-label",
    name: "No Group Label",
    description: checkBoxSetDocs["no-item-label"].description,
    recipe: checkBoxSetDocs["no-item-label"].recipe,
    Component: CheckBoxSetNoItemLabelExample,
    playground: { initialSource: checkBoxSetNoItemLabelPlaygroundSource, fileName: "checkBoxSet-noItemLabel.tsx" },
  },
  {
    id: "validation",
    name: "Validation",
    description: checkBoxSetDocs.validation.description,
    recipe: checkBoxSetDocs.validation.recipe,
    Component: CheckBoxSetValidationExample,
    playground: { initialSource: checkBoxSetValidationPlaygroundSource, fileName: "checkBoxSet-validation.tsx", runtimeBindings: { colorOptions, renderCheckboxOptions } },
  },
  {
    id: "single-item",
    name: "Single Item",
    description: checkBoxSetDocs["single-item"].description,
    recipe: checkBoxSetDocs["single-item"].recipe,
    Component: CheckBoxSetSingleItemExample,
    playground: { initialSource: checkBoxSetSingleItemPlaygroundSource, fileName: "checkBoxSet-singleItem.tsx" },
  },
  {
    id: "filter",
    name: "Filter UI",
    description: checkBoxSetDocs.filter.description,
    recipe: checkBoxSetDocs.filter.recipe,
    Component: CheckBoxSetFilterExample,
    playground: { initialSource: checkBoxSetFilterPlaygroundSource, fileName: "checkBoxSet-filter.tsx", runtimeBindings: { filterOptions } },
  }
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
