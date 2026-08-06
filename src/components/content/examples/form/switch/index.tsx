import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";
import SwitchCrossFieldValidationExample from "./switch-crossFieldValidation";
import switchCrossFieldValidationPlaygroundSource from "./switch-crossFieldValidation-source";
import {
  switchDocs,
  type SwitchDemoId,
} from "./switch-docs";
import SwitchReadonlyExample from "./switch-readonly";
import switchReadonlyPlaygroundSource from "./switch-readonly-source";
import SwitchStatesExample from "./switch-states";
import switchStatesPlaygroundSource from "./switch-states-source";
import SwitchComponentExample from "./switch-switchComponent";
import switchComponentPlaygroundSource from "./switch-switchComponent-source";

const switchItems: {
  id: SwitchDemoId;
  name: string;
  description: (typeof switchDocs)[SwitchDemoId]["description"];
  recipe: (typeof switchDocs)[SwitchDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: switchDocs.states.description,
    recipe: switchDocs.states.recipe,
    Component: SwitchStatesExample,
    playground: {
      initialSource: switchStatesPlaygroundSource,
      fileName: "switch-states.tsx",
    },
  },
  {
    id: "switch-component",
    name: "Binding to Switch Component",
    description: switchDocs["switch-component"].description,
    recipe: switchDocs["switch-component"].recipe,
    Component: SwitchComponentExample,
    playground: {
      initialSource: switchComponentPlaygroundSource,
      fileName: "switch-switchComponent.tsx",
    },
  },
  {
    id: "readonly",
    name: "Readonly",
    description: switchDocs.readonly.description,
    recipe: switchDocs.readonly.recipe,
    Component: SwitchReadonlyExample,
    playground: {
      initialSource: switchReadonlyPlaygroundSource,
      fileName: "switch-readonly.tsx",
    },
  },
  {
    id: "cross-field-validation",
    name: "Component Validation",
    description: switchDocs["cross-field-validation"].description,
    recipe: switchDocs["cross-field-validation"].recipe,
    Component: SwitchCrossFieldValidationExample,
    playground: {
      initialSource: switchCrossFieldValidationPlaygroundSource,
      fileName: "switch-crossFieldValidation.tsx",
    },
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
