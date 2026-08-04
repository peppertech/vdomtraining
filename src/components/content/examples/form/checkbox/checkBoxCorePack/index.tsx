import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import CheckBoxCorePackCrossFieldValidationExample from "./checkBoxCorePack-crossFieldValidation";
import {
  checkBoxCorePackDocs,
  type CheckBoxCorePackDemoId,
} from "./checkBoxCorePack-docs";
import CheckBoxCorePackOverviewExample from "./checkBoxCorePack-overview";
import checkBoxCorePackCrossFieldValidationPlaygroundSource from "./checkBoxCorePack-crossFieldValidation-source";
import checkBoxCorePackOverviewPlaygroundSource from "./checkBoxCorePack-overview-source";
import { confirmationMessages, errorMessages, groceryOptions, infoMessages, warningMessages } from "./checkBoxCorePack-shared";

const checkBoxCorePackItems: {
  id: CheckBoxCorePackDemoId;
  name: string;
  description: (typeof checkBoxCorePackDocs)[CheckBoxCorePackDemoId]["description"];
  recipe: (typeof checkBoxCorePackDocs)[CheckBoxCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: checkBoxCorePackDocs.overview.description,
    recipe: checkBoxCorePackDocs.overview.recipe,
    Component: CheckBoxCorePackOverviewExample,
    playground: { initialSource: checkBoxCorePackOverviewPlaygroundSource, fileName: "checkBoxCorePack-overview.tsx", runtimeBindings: { confirmationMessages, errorMessages, infoMessages, warningMessages } },
  },
  {
    id: "cross-field-validation",
    name: "Component Validation",
    description: checkBoxCorePackDocs["cross-field-validation"].description,
    recipe: checkBoxCorePackDocs["cross-field-validation"].recipe,
    Component: CheckBoxCorePackCrossFieldValidationExample,
    playground: { initialSource: checkBoxCorePackCrossFieldValidationPlaygroundSource, fileName: "checkBoxCorePack-crossFieldValidation.tsx", runtimeBindings: { groceryOptions } },
  },
];

export default function CheckBoxCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Checkbox core pack examples"
      componentType="oj-c-checkbox"
      packLabel="Core Pack"
      layoutId="checkBoxCorePackNavigationLayout"
      items={checkBoxCorePackItems}
      initialItemId="overview"
    />
  );
}
