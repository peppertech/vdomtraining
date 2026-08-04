import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import InputPasswordCorePackClearIconExample from "./inputPasswordCorePack-clearIcon";
import {
  inputPasswordCorePackDocs,
  type InputPasswordCorePackDemoId,
} from "./inputPasswordCorePack-docs";
import InputPasswordCorePackStatesExample from "./inputPasswordCorePack-states";
import InputPasswordCorePackWidthExample from "./inputPasswordCorePack-width";
import inputPasswordCorePackClearIconPlaygroundSource from "./inputPasswordCorePack-clearIcon-source";
import inputPasswordCorePackStatesPlaygroundSource from "./inputPasswordCorePack-states-source";
import inputPasswordCorePackWidthPlaygroundSource from "./inputPasswordCorePack-width-source";
import {
  labelEdgeOptions,
  messageSets,
} from "./inputPasswordCorePack-shared";

const inputPasswordCorePackItems: {
  id: InputPasswordCorePackDemoId;
  name: string;
  description: (typeof inputPasswordCorePackDocs)[InputPasswordCorePackDemoId]["description"];
  recipe: (typeof inputPasswordCorePackDocs)[InputPasswordCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputPasswordCorePackDocs.states.description,
    recipe: inputPasswordCorePackDocs.states.recipe,
    Component: InputPasswordCorePackStatesExample,
    playground: {
      initialSource: inputPasswordCorePackStatesPlaygroundSource,
      fileName: "inputPasswordCorePack-states.tsx",
      runtimeBindings: { messageSets },
    },
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputPasswordCorePackDocs["clear-icon"].description,
    recipe: inputPasswordCorePackDocs["clear-icon"].recipe,
    Component: InputPasswordCorePackClearIconExample,
    playground: {
      initialSource: inputPasswordCorePackClearIconPlaygroundSource,
      fileName: "inputPasswordCorePack-clearIcon.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputPasswordCorePackDocs.width.description,
    recipe: inputPasswordCorePackDocs.width.recipe,
    Component: InputPasswordCorePackWidthExample,
    playground: {
      initialSource: inputPasswordCorePackWidthPlaygroundSource,
      fileName: "inputPasswordCorePack-width.tsx",
      runtimeBindings: { labelEdgeOptions },
    },
  },
];

export default function InputPasswordCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Password core pack examples"
      componentType="oj-c-input-password"
      packLabel="Core Pack"
      layoutId="inputPasswordCorePackNavigationLayout"
      items={inputPasswordCorePackItems}
      initialItemId="states"
    />
  );
}
