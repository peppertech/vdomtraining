import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import SwitchCrossFieldValidationExample from "./switch-crossFieldValidation";
import {
  switchDocs,
  type SwitchDemoId,
} from "./switch-docs";
import SwitchReadonlyExample from "./switch-readonly";
import SwitchStatesExample from "./switch-states";
import SwitchComponentExample from "./switch-switchComponent";

const switchItems: {
  id: SwitchDemoId;
  name: string;
  description: (typeof switchDocs)[SwitchDemoId]["description"];
  recipe: (typeof switchDocs)[SwitchDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: switchDocs.states.description,
    recipe: switchDocs.states.recipe,
    Component: SwitchStatesExample,
  },
  {
    id: "switch-component",
    name: "Binding to Switch Component",
    description: switchDocs["switch-component"].description,
    recipe: switchDocs["switch-component"].recipe,
    Component: SwitchComponentExample,
  },
  {
    id: "readonly",
    name: "Readonly",
    description: switchDocs.readonly.description,
    recipe: switchDocs.readonly.recipe,
    Component: SwitchReadonlyExample,
  },
  {
    id: "cross-field-validation",
    name: "Component Validation",
    description: switchDocs["cross-field-validation"].description,
    recipe: switchDocs["cross-field-validation"].recipe,
    Component: SwitchCrossFieldValidationExample,
  },
];

export default function SwitchRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Switch examples"
      componentType="oj-switch"
      layoutId="switchNavigationLayout"
      items={switchItems}
      initialItemId="states"
    />
  );
}
