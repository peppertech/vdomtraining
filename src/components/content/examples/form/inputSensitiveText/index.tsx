import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import InputSensitiveTextBindingVdomExample from "./inputSensitiveText-binding";
import InputSensitiveTextClearIconVdomExample from "./inputSensitiveText-clearicon";
import {
  inputSensitiveTextDocsVdom,
  type InputSensitiveTextVdomDemoId,
} from "./inputSensitiveText-docs";
import InputSensitiveTextMaxLengthVdomExample from "./inputSensitiveText-maxLength";
import InputSensitiveTextNoLabelVdomExample from "./inputSensitiveText-nolabel";
import InputSensitiveTextStatesVdomExample from "./inputSensitiveText-states";
import InputSensitiveTextTextAlignVdomExample from "./inputSensitiveText-textalign";
import InputSensitiveTextVirtualKeyboardVdomExample from "./inputSensitiveText-virtualKeyboard";
import InputSensitiveTextWidthVdomExample from "./inputSensitiveText-width";

const inputSensitiveTextItemsVdom: {
  id: InputSensitiveTextVdomDemoId;
  name: string;
  description: (typeof inputSensitiveTextDocsVdom)[InputSensitiveTextVdomDemoId]["description"];
  recipe: (typeof inputSensitiveTextDocsVdom)[InputSensitiveTextVdomDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputSensitiveTextDocsVdom.states.description,
    recipe: inputSensitiveTextDocsVdom.states.recipe,
    Component: InputSensitiveTextStatesVdomExample,
  },
  {
    id: "binding",
    name: "Binding",
    description: inputSensitiveTextDocsVdom.binding.description,
    recipe: inputSensitiveTextDocsVdom.binding.recipe,
    Component: InputSensitiveTextBindingVdomExample,
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputSensitiveTextDocsVdom["clear-icon"].description,
    recipe: inputSensitiveTextDocsVdom["clear-icon"].recipe,
    Component: InputSensitiveTextClearIconVdomExample,
  },
  {
    id: "max-length",
    name: "Max Length",
    description: inputSensitiveTextDocsVdom["max-length"].description,
    recipe: inputSensitiveTextDocsVdom["max-length"].recipe,
    Component: InputSensitiveTextMaxLengthVdomExample,
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputSensitiveTextDocsVdom["no-label"].description,
    recipe: inputSensitiveTextDocsVdom["no-label"].recipe,
    Component: InputSensitiveTextNoLabelVdomExample,
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputSensitiveTextDocsVdom["text-align"].description,
    recipe: inputSensitiveTextDocsVdom["text-align"].recipe,
    Component: InputSensitiveTextTextAlignVdomExample,
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputSensitiveTextDocsVdom["virtual-keyboard"].description,
    recipe: inputSensitiveTextDocsVdom["virtual-keyboard"].recipe,
    Component: InputSensitiveTextVirtualKeyboardVdomExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputSensitiveTextDocsVdom.width.description,
    recipe: inputSensitiveTextDocsVdom.width.recipe,
    Component: InputSensitiveTextWidthVdomExample,
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
