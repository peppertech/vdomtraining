import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputTextCorePackClearIconExample from "./inputTextCorePack-clearIcon";
import {
  inputTextCorePackDocs,
  type InputTextCorePackDemoId,
} from "./inputTextCorePack-docs";
import InputTextCorePackInputWithButtonExample from "./inputTextCorePack-inputWithButton";
import InputTextCorePackMaxLengthExample from "./inputTextCorePack-maxLength";
import InputTextCorePackNoLabelExample from "./inputTextCorePack-noLabel";
import InputTextCorePackPrefixSuffixExample from "./inputTextCorePack-prefixSuffix";
import InputTextCorePackRawValueExample from "./inputTextCorePack-rawValue";
import InputTextCorePackStartEndSlotsExample from "./inputTextCorePack-startEndSlots";
import InputTextCorePackStatesExample from "./inputTextCorePack-states";
import InputTextCorePackTextExample from "./inputTextCorePack-text";
import InputTextCorePackTextAlignExample from "./inputTextCorePack-textAlign";
import InputTextCorePackVirtualKeyboardExample from "./inputTextCorePack-virtualKeyboard";
import InputTextCorePackWidthExample from "./inputTextCorePack-width";

const inputTextCorePackItems: {
  id: InputTextCorePackDemoId;
  name: string;
  description: (typeof inputTextCorePackDocs)[InputTextCorePackDemoId]["description"];
  recipe: (typeof inputTextCorePackDocs)[InputTextCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputTextCorePackDocs.states.description,
    recipe: inputTextCorePackDocs.states.recipe,
    Component: InputTextCorePackStatesExample,
  },
  {
    id: "text",
    name: "Value Binding",
    description: inputTextCorePackDocs.text.description,
    recipe: inputTextCorePackDocs.text.recipe,
    Component: InputTextCorePackTextExample,
  },
  {
    id: "raw-value",
    name: "Raw Value",
    description: inputTextCorePackDocs["raw-value"].description,
    recipe: inputTextCorePackDocs["raw-value"].recipe,
    Component: InputTextCorePackRawValueExample,
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputTextCorePackDocs["no-label"].description,
    recipe: inputTextCorePackDocs["no-label"].recipe,
    Component: InputTextCorePackNoLabelExample,
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputTextCorePackDocs["clear-icon"].description,
    recipe: inputTextCorePackDocs["clear-icon"].recipe,
    Component: InputTextCorePackClearIconExample,
  },
  {
    id: "max-length",
    name: "Max Length",
    description: inputTextCorePackDocs["max-length"].description,
    recipe: inputTextCorePackDocs["max-length"].recipe,
    Component: InputTextCorePackMaxLengthExample,
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputTextCorePackDocs["text-align"].description,
    recipe: inputTextCorePackDocs["text-align"].recipe,
    Component: InputTextCorePackTextAlignExample,
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputTextCorePackDocs["virtual-keyboard"].description,
    recipe: inputTextCorePackDocs["virtual-keyboard"].recipe,
    Component: InputTextCorePackVirtualKeyboardExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputTextCorePackDocs.width.description,
    recipe: inputTextCorePackDocs.width.recipe,
    Component: InputTextCorePackWidthExample,
  },
  {
    id: "start-end-slots",
    name: "Start & End Slots",
    description: inputTextCorePackDocs["start-end-slots"].description,
    recipe: inputTextCorePackDocs["start-end-slots"].recipe,
    Component: InputTextCorePackStartEndSlotsExample,
  },
  {
    id: "prefix-suffix",
    name: "Prefix & Suffix",
    description: inputTextCorePackDocs["prefix-suffix"].description,
    recipe: inputTextCorePackDocs["prefix-suffix"].recipe,
    Component: InputTextCorePackPrefixSuffixExample,
  },
  {
    id: "input-with-button",
    name: "Input With Button",
    description: inputTextCorePackDocs["input-with-button"].description,
    recipe: inputTextCorePackDocs["input-with-button"].recipe,
    Component: InputTextCorePackInputWithButtonExample,
  },
];

export default function InputTextCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Text core pack examples"
      componentType="oj-c-input-text"
      packLabel="Core Pack"
      layoutId="inputTextCorePackNavigationLayout"
      items={inputTextCorePackItems}
      initialItemId="states"
    />
  );
}
