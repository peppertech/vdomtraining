import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputPasswordBindingExample from "./inputPassword-binding";
import {
  inputPasswordDocs,
  type InputPasswordDemoId,
} from "./inputPassword-docs";
import InputPasswordNoLabelExample from "./inputPassword-noLabel";
import InputPasswordOverviewExample from "./inputPassword-overview";
import InputPasswordPatternMatchingExample from "./inputPassword-patternMatching";
import InputPasswordReadOnlyExample from "./inputPassword-readOnly";
import InputPasswordStylingExample from "./inputPassword-styling";
import InputPasswordTextAlignExample from "./inputPassword-textAlign";
import InputPasswordWidthExample from "./inputPassword-width";

const inputPasswordItems: {
  id: InputPasswordDemoId;
  name: string;
  description: (typeof inputPasswordDocs)[InputPasswordDemoId]["description"];
  recipe: (typeof inputPasswordDocs)[InputPasswordDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputPasswordDocs.overview.description,
    recipe: inputPasswordDocs.overview.recipe,
    Component: InputPasswordOverviewExample,
  },
  {
    id: "binding",
    name: "Binding",
    description: inputPasswordDocs.binding.description,
    recipe: inputPasswordDocs.binding.recipe,
    Component: InputPasswordBindingExample,
  },
  {
    id: "pattern-matching",
    name: "Pattern Matching",
    description: inputPasswordDocs["pattern-matching"].description,
    recipe: inputPasswordDocs["pattern-matching"].recipe,
    Component: InputPasswordPatternMatchingExample,
  },
  {
    id: "read-only",
    name: "Read Only",
    description: inputPasswordDocs["read-only"].description,
    recipe: inputPasswordDocs["read-only"].recipe,
    Component: InputPasswordReadOnlyExample,
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputPasswordDocs["no-label"].description,
    recipe: inputPasswordDocs["no-label"].recipe,
    Component: InputPasswordNoLabelExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputPasswordDocs.width.description,
    recipe: inputPasswordDocs.width.recipe,
    Component: InputPasswordWidthExample,
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputPasswordDocs["text-align"].description,
    recipe: inputPasswordDocs["text-align"].recipe,
    Component: InputPasswordTextAlignExample,
  },
  {
    id: "styling",
    name: "Styling",
    description: inputPasswordDocs.styling.description,
    recipe: inputPasswordDocs.styling.recipe,
    Component: InputPasswordStylingExample,
  },
];

export default function InputPasswordRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Password examples"
      componentType="oj-input-password"
      layoutId="inputPasswordNavigationLayout"
      items={inputPasswordItems}
      initialItemId="overview"
    />
  );
}
