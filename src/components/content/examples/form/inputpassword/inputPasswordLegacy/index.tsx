import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
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
import inputPasswordBindingPlaygroundSource from "./inputPassword-binding-source";
import inputPasswordCssPlaygroundSource from "./inputPassword.css-source";
import inputPasswordNoLabelPlaygroundSource from "./inputPassword-noLabel-source";
import inputPasswordOverviewPlaygroundSource from "./inputPassword-overview-source";
import inputPasswordPatternMatchingPlaygroundSource from "./inputPassword-patternMatching-source";
import inputPasswordReadOnlyPlaygroundSource from "./inputPassword-readOnly-source";
import inputPasswordStylingPlaygroundSource from "./inputPassword-styling-source";
import inputPasswordTextAlignPlaygroundSource from "./inputPassword-textAlign-source";
import inputPasswordWidthPlaygroundSource from "./inputPassword-width-source";
import { messageSets } from "./inputPassword-shared";

const inputPasswordItems: {
  id: InputPasswordDemoId;
  name: string;
  description: (typeof inputPasswordDocs)[InputPasswordDemoId]["description"];
  recipe: (typeof inputPasswordDocs)[InputPasswordDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputPasswordDocs.overview.description,
    recipe: inputPasswordDocs.overview.recipe,
    Component: InputPasswordOverviewExample,
    playground: {
      initialSource: inputPasswordOverviewPlaygroundSource,
      fileName: "inputPassword-overview.tsx",
      runtimeBindings: { messageSets },
    },
  },
  {
    id: "binding",
    name: "Binding",
    description: inputPasswordDocs.binding.description,
    recipe: inputPasswordDocs.binding.recipe,
    Component: InputPasswordBindingExample,
    playground: {
      initialSource: inputPasswordBindingPlaygroundSource,
      fileName: "inputPassword-binding.tsx",
    },
  },
  {
    id: "pattern-matching",
    name: "Pattern Matching",
    description: inputPasswordDocs["pattern-matching"].description,
    recipe: inputPasswordDocs["pattern-matching"].recipe,
    Component: InputPasswordPatternMatchingExample,
    playground: {
      initialSource: inputPasswordPatternMatchingPlaygroundSource,
      fileName: "inputPassword-patternMatching.tsx",
      supportingFiles: [{
        fileName: "inputPassword.css",
        initialSource: inputPasswordCssPlaygroundSource,
        language: "css",
        importSpecifier: "css!./inputPassword.css",
      }],
    },
  },
  {
    id: "read-only",
    name: "Read Only",
    description: inputPasswordDocs["read-only"].description,
    recipe: inputPasswordDocs["read-only"].recipe,
    Component: InputPasswordReadOnlyExample,
    playground: {
      initialSource: inputPasswordReadOnlyPlaygroundSource,
      fileName: "inputPassword-readOnly.tsx",
    },
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputPasswordDocs["no-label"].description,
    recipe: inputPasswordDocs["no-label"].recipe,
    Component: InputPasswordNoLabelExample,
    playground: {
      initialSource: inputPasswordNoLabelPlaygroundSource,
      fileName: "inputPassword-noLabel.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputPasswordDocs.width.description,
    recipe: inputPasswordDocs.width.recipe,
    Component: InputPasswordWidthExample,
    playground: {
      initialSource: inputPasswordWidthPlaygroundSource,
      fileName: "inputPassword-width.tsx",
      supportingFiles: [{
        fileName: "inputPassword.css",
        initialSource: inputPasswordCssPlaygroundSource,
        language: "css",
        importSpecifier: "css!./inputPassword.css",
      }],
    },
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputPasswordDocs["text-align"].description,
    recipe: inputPasswordDocs["text-align"].recipe,
    Component: InputPasswordTextAlignExample,
    playground: {
      initialSource: inputPasswordTextAlignPlaygroundSource,
      fileName: "inputPassword-textAlign.tsx",
    },
  },
  {
    id: "styling",
    name: "Styling",
    description: inputPasswordDocs.styling.description,
    recipe: inputPasswordDocs.styling.recipe,
    Component: InputPasswordStylingExample,
    playground: {
      initialSource: inputPasswordStylingPlaygroundSource,
      fileName: "inputPassword-styling.tsx",
      supportingFiles: [{
        fileName: "inputPassword.css",
        initialSource: inputPasswordCssPlaygroundSource,
        language: "css",
        importSpecifier: "css!./inputPassword.css",
      }],
    },
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
