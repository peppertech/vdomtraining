import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";
import InputSensitiveTextBindingVdomExample from "./inputSensitiveText-binding";
import inputSensitiveTextBindingPlaygroundSource from "./inputSensitiveText-binding-source";
import InputSensitiveTextClearIconVdomExample from "./inputSensitiveText-clearicon";
import inputSensitiveTextClearIconPlaygroundSource from "./inputSensitiveText-clearicon-source";
import {
  inputSensitiveTextDocsVdom,
  type InputSensitiveTextVdomDemoId,
} from "./inputSensitiveText-docs";
import InputSensitiveTextMaxLengthVdomExample from "./inputSensitiveText-maxLength";
import inputSensitiveTextMaxLengthPlaygroundSource from "./inputSensitiveText-maxLength-source";
import InputSensitiveTextNoLabelVdomExample from "./inputSensitiveText-nolabel";
import inputSensitiveTextNoLabelPlaygroundSource from "./inputSensitiveText-nolabel-source";
import InputSensitiveTextStatesVdomExample from "./inputSensitiveText-states";
import inputSensitiveTextStatesPlaygroundSource from "./inputSensitiveText-states-source";
import InputSensitiveTextTextAlignVdomExample from "./inputSensitiveText-textalign";
import inputSensitiveTextTextAlignPlaygroundSource from "./inputSensitiveText-textalign-source";
import InputSensitiveTextVirtualKeyboardVdomExample from "./inputSensitiveText-virtualKeyboard";
import inputSensitiveTextVirtualKeyboardPlaygroundSource from "./inputSensitiveText-virtualKeyboard-source";
import InputSensitiveTextWidthVdomExample from "./inputSensitiveText-width";
import inputSensitiveTextWidthPlaygroundSource from "./inputSensitiveText-width-source";
import {
  labelEdgeOptions,
  messageSets,
  textAlignItems,
} from "./inputSensitiveText-shared";

const inputSensitiveTextItemsVdom: {
  id: InputSensitiveTextVdomDemoId;
  name: string;
  description: (typeof inputSensitiveTextDocsVdom)[InputSensitiveTextVdomDemoId]["description"];
  recipe: (typeof inputSensitiveTextDocsVdom)[InputSensitiveTextVdomDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputSensitiveTextDocsVdom.states.description,
    recipe: inputSensitiveTextDocsVdom.states.recipe,
    Component: InputSensitiveTextStatesVdomExample,
    playground: {
      initialSource: inputSensitiveTextStatesPlaygroundSource,
      fileName: "inputSensitiveText-states.tsx",
      runtimeBindings: { messageSets },
    },
  },
  {
    id: "binding",
    name: "Binding",
    description: inputSensitiveTextDocsVdom.binding.description,
    recipe: inputSensitiveTextDocsVdom.binding.recipe,
    Component: InputSensitiveTextBindingVdomExample,
    playground: {
      initialSource: inputSensitiveTextBindingPlaygroundSource,
      fileName: "inputSensitiveText-binding.tsx",
    },
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputSensitiveTextDocsVdom["clear-icon"].description,
    recipe: inputSensitiveTextDocsVdom["clear-icon"].recipe,
    Component: InputSensitiveTextClearIconVdomExample,
    playground: {
      initialSource: inputSensitiveTextClearIconPlaygroundSource,
      fileName: "inputSensitiveText-clearicon.tsx",
    },
  },
  {
    id: "max-length",
    name: "Max Length",
    description: inputSensitiveTextDocsVdom["max-length"].description,
    recipe: inputSensitiveTextDocsVdom["max-length"].recipe,
    Component: InputSensitiveTextMaxLengthVdomExample,
    playground: {
      initialSource: inputSensitiveTextMaxLengthPlaygroundSource,
      fileName: "inputSensitiveText-maxLength.tsx",
    },
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputSensitiveTextDocsVdom["no-label"].description,
    recipe: inputSensitiveTextDocsVdom["no-label"].recipe,
    Component: InputSensitiveTextNoLabelVdomExample,
    playground: {
      initialSource: inputSensitiveTextNoLabelPlaygroundSource,
      fileName: "inputSensitiveText-nolabel.tsx",
    },
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputSensitiveTextDocsVdom["text-align"].description,
    recipe: inputSensitiveTextDocsVdom["text-align"].recipe,
    Component: InputSensitiveTextTextAlignVdomExample,
    playground: {
      initialSource: inputSensitiveTextTextAlignPlaygroundSource,
      fileName: "inputSensitiveText-textalign.tsx",
      runtimeBindings: { textAlignItems },
    },
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputSensitiveTextDocsVdom["virtual-keyboard"].description,
    recipe: inputSensitiveTextDocsVdom["virtual-keyboard"].recipe,
    Component: InputSensitiveTextVirtualKeyboardVdomExample,
    playground: {
      initialSource: inputSensitiveTextVirtualKeyboardPlaygroundSource,
      fileName: "inputSensitiveText-virtualKeyboard.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputSensitiveTextDocsVdom.width.description,
    recipe: inputSensitiveTextDocsVdom.width.recipe,
    Component: InputSensitiveTextWidthVdomExample,
    playground: {
      initialSource: inputSensitiveTextWidthPlaygroundSource,
      fileName: "inputSensitiveText-width.tsx",
      runtimeBindings: { labelEdgeOptions },
    },
  },
];

export default function InputSensitiveTextRecipePageVdom() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Sensitive Text examples"
      componentType="oj-c-input-sensitive-text"
      packLabel="Core Pack"
      layoutId="inputSensitiveTextNavigationLayoutVdom"
      items={inputSensitiveTextItemsVdom}
      initialItemId="states"
    />
  );
}
