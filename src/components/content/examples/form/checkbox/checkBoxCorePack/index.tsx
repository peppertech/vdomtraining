import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import CheckBoxCorePackCrossFieldValidationExample from "./checkBoxCorePack-crossFieldValidation";
import {
  checkBoxCorePackDocs,
  type CheckBoxCorePackDemoId,
} from "./checkBoxCorePack-docs";
import CheckBoxCorePackOverviewExample from "./checkBoxCorePack-overview";

const checkBoxCorePackItems: {
  id: CheckBoxCorePackDemoId;
  name: string;
  description: (typeof checkBoxCorePackDocs)[CheckBoxCorePackDemoId]["description"];
  recipe: (typeof checkBoxCorePackDocs)[CheckBoxCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: checkBoxCorePackDocs.overview.description,
    recipe: checkBoxCorePackDocs.overview.recipe,
    Component: CheckBoxCorePackOverviewExample,
  },
  {
    id: "cross-field-validation",
    name: "Component Validation",
    description: checkBoxCorePackDocs["cross-field-validation"].description,
    recipe: checkBoxCorePackDocs["cross-field-validation"].recipe,
    Component: CheckBoxCorePackCrossFieldValidationExample,
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
