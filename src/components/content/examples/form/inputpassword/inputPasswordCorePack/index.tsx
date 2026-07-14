import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputPasswordCorePackClearIconExample from "./inputPasswordCorePack-clearIcon";
import {
  inputPasswordCorePackDocs,
  type InputPasswordCorePackDemoId,
} from "./inputPasswordCorePack-docs";
import InputPasswordCorePackStatesExample from "./inputPasswordCorePack-states";
import InputPasswordCorePackWidthExample from "./inputPasswordCorePack-width";

const inputPasswordCorePackItems: {
  id: InputPasswordCorePackDemoId;
  name: string;
  description: (typeof inputPasswordCorePackDocs)[InputPasswordCorePackDemoId]["description"];
  recipe: (typeof inputPasswordCorePackDocs)[InputPasswordCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputPasswordCorePackDocs.states.description,
    recipe: inputPasswordCorePackDocs.states.recipe,
    Component: InputPasswordCorePackStatesExample,
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputPasswordCorePackDocs["clear-icon"].description,
    recipe: inputPasswordCorePackDocs["clear-icon"].recipe,
    Component: InputPasswordCorePackClearIconExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputPasswordCorePackDocs.width.description,
    recipe: inputPasswordCorePackDocs.width.recipe,
    Component: InputPasswordCorePackWidthExample,
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
