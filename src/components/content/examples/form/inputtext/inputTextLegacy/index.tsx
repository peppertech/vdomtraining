import "css!./inputTextLegacy.css";
import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputTextLegacyClearIconExample from "./inputTextLegacy-clearIcon";
import {
  inputTextLegacyDocs,
  type InputTextLegacyDemoId,
} from "./inputTextLegacy-docs";
import InputTextLegacyInputWrapExample from "./inputTextLegacy-inputWrap";
import InputTextLegacyMaxLengthExample from "./inputTextLegacy-maxLength";
import InputTextLegacyNoLabelExample from "./inputTextLegacy-noLabel";
import InputTextLegacyRawValueExample from "./inputTextLegacy-rawValue";
import InputTextLegacyStartEndSlotsExample from "./inputTextLegacy-startEndSlots";
import InputTextLegacyStatesExample from "./inputTextLegacy-states";
import InputTextLegacyTextExample from "./inputTextLegacy-text";
import InputTextLegacyTextAlignExample from "./inputTextLegacy-textAlign";
import InputTextLegacyVirtualKeyboardExample from "./inputTextLegacy-virtualKeyboard";
import InputTextLegacyWidthExample from "./inputTextLegacy-width";

const inputTextLegacyItems: {
  id: InputTextLegacyDemoId;
  name: string;
  description: (typeof inputTextLegacyDocs)[InputTextLegacyDemoId]["description"];
  recipe: (typeof inputTextLegacyDocs)[InputTextLegacyDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputTextLegacyDocs.states.description,
    recipe: inputTextLegacyDocs.states.recipe,
    Component: InputTextLegacyStatesExample,
  },
  {
    id: "text",
    name: "Value Binding",
    description: inputTextLegacyDocs.text.description,
    recipe: inputTextLegacyDocs.text.recipe,
    Component: InputTextLegacyTextExample,
  },
  {
    id: "raw-value",
    name: "Raw Value",
    description: inputTextLegacyDocs["raw-value"].description,
    recipe: inputTextLegacyDocs["raw-value"].recipe,
    Component: InputTextLegacyRawValueExample,
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputTextLegacyDocs["no-label"].description,
    recipe: inputTextLegacyDocs["no-label"].recipe,
    Component: InputTextLegacyNoLabelExample,
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputTextLegacyDocs["clear-icon"].description,
    recipe: inputTextLegacyDocs["clear-icon"].recipe,
    Component: InputTextLegacyClearIconExample,
  },
  {
    id: "max-length",
    name: "Max Length",
    description: inputTextLegacyDocs["max-length"].description,
    recipe: inputTextLegacyDocs["max-length"].recipe,
    Component: InputTextLegacyMaxLengthExample,
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputTextLegacyDocs["text-align"].description,
    recipe: inputTextLegacyDocs["text-align"].recipe,
    Component: InputTextLegacyTextAlignExample,
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputTextLegacyDocs["virtual-keyboard"].description,
    recipe: inputTextLegacyDocs["virtual-keyboard"].recipe,
    Component: InputTextLegacyVirtualKeyboardExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputTextLegacyDocs.width.description,
    recipe: inputTextLegacyDocs.width.recipe,
    Component: InputTextLegacyWidthExample,
  },
  {
    id: "input-wrap",
    name: "Input Wrap",
    description: inputTextLegacyDocs["input-wrap"].description,
    recipe: inputTextLegacyDocs["input-wrap"].recipe,
    Component: InputTextLegacyInputWrapExample,
  },
  {
    id: "start-end-slots",
    name: "Start & End Slots",
    description: inputTextLegacyDocs["start-end-slots"].description,
    recipe: inputTextLegacyDocs["start-end-slots"].recipe,
    Component: InputTextLegacyStartEndSlotsExample,
  },
];

export default function InputTextLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Text legacy examples"
      componentType="oj-input-text"
      layoutId="inputTextLegacyNavigationLayout"
      items={inputTextLegacyItems}
      initialItemId="states"
    />
  );
}
