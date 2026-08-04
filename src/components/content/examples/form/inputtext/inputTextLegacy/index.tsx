import "css!./inputTextLegacy.css";
import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import InputTextLegacyClearIconExample from "./inputTextLegacy-clearIcon";
import inputTextLegacyClearIconPlaygroundSource from "./inputTextLegacy-clearIcon-source";
import {
  inputTextLegacyDocs,
  type InputTextLegacyDemoId,
} from "./inputTextLegacy-docs";
import InputTextLegacyInputWrapExample from "./inputTextLegacy-inputWrap";
import inputTextLegacyInputWrapPlaygroundSource from "./inputTextLegacy-inputWrap-source";
import InputTextLegacyMaxLengthExample from "./inputTextLegacy-maxLength";
import inputTextLegacyMaxLengthPlaygroundSource from "./inputTextLegacy-maxLength-source";
import InputTextLegacyNoLabelExample from "./inputTextLegacy-noLabel";
import inputTextLegacyNoLabelPlaygroundSource from "./inputTextLegacy-noLabel-source";
import InputTextLegacyRawValueExample from "./inputTextLegacy-rawValue";
import inputTextLegacyRawValuePlaygroundSource from "./inputTextLegacy-rawValue-source";
import InputTextLegacyStartEndSlotsExample from "./inputTextLegacy-startEndSlots";
import inputTextLegacyStartEndSlotsPlaygroundSource from "./inputTextLegacy-startEndSlots-source";
import InputTextLegacyStatesExample from "./inputTextLegacy-states";
import inputTextLegacyStatesPlaygroundSource from "./inputTextLegacy-states-source";
import InputTextLegacyTextExample from "./inputTextLegacy-text";
import inputTextLegacyTextPlaygroundSource from "./inputTextLegacy-text-source";
import InputTextLegacyTextAlignExample from "./inputTextLegacy-textAlign";
import inputTextLegacyTextAlignPlaygroundSource from "./inputTextLegacy-textAlign-source";
import InputTextLegacyVirtualKeyboardExample from "./inputTextLegacy-virtualKeyboard";
import inputTextLegacyVirtualKeyboardPlaygroundSource from "./inputTextLegacy-virtualKeyboard-source";
import InputTextLegacyWidthExample from "./inputTextLegacy-width";
import inputTextLegacyWidthPlaygroundSource from "./inputTextLegacy-width-source";
import {
  confirmationMessages,
  errorMessages,
  infoMessages,
  maxLengthConfig,
  nowIsoDateTime,
  warningMessages,
} from "./inputTextLegacy-shared";

const inputTextLegacyItems: {
  id: InputTextLegacyDemoId;
  name: string;
  description: (typeof inputTextLegacyDocs)[InputTextLegacyDemoId]["description"];
  recipe: (typeof inputTextLegacyDocs)[InputTextLegacyDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputTextLegacyDocs.states.description,
    recipe: inputTextLegacyDocs.states.recipe,
    Component: InputTextLegacyStatesExample,
    playground: {
      initialSource: inputTextLegacyStatesPlaygroundSource,
      fileName: "inputTextLegacy-states.tsx",
      runtimeBindings: {
        confirmationMessages,
        errorMessages,
        infoMessages,
        maxLengthConfig,
        warningMessages,
      },
    },
  },
  {
    id: "text",
    name: "Value Binding",
    description: inputTextLegacyDocs.text.description,
    recipe: inputTextLegacyDocs.text.recipe,
    Component: InputTextLegacyTextExample,
    playground: {
      initialSource: inputTextLegacyTextPlaygroundSource,
      fileName: "inputTextLegacy-text.tsx",
    },
  },
  {
    id: "raw-value",
    name: "Raw Value",
    description: inputTextLegacyDocs["raw-value"].description,
    recipe: inputTextLegacyDocs["raw-value"].recipe,
    Component: InputTextLegacyRawValueExample,
    playground: {
      initialSource: inputTextLegacyRawValuePlaygroundSource,
      fileName: "inputTextLegacy-rawValue.tsx",
    },
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputTextLegacyDocs["no-label"].description,
    recipe: inputTextLegacyDocs["no-label"].recipe,
    Component: InputTextLegacyNoLabelExample,
    playground: {
      initialSource: inputTextLegacyNoLabelPlaygroundSource,
      fileName: "inputTextLegacy-noLabel.tsx",
    },
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputTextLegacyDocs["clear-icon"].description,
    recipe: inputTextLegacyDocs["clear-icon"].recipe,
    Component: InputTextLegacyClearIconExample,
    playground: {
      initialSource: inputTextLegacyClearIconPlaygroundSource,
      fileName: "inputTextLegacy-clearIcon.tsx",
    },
  },
  {
    id: "max-length",
    name: "Max Length",
    description: inputTextLegacyDocs["max-length"].description,
    recipe: inputTextLegacyDocs["max-length"].recipe,
    Component: InputTextLegacyMaxLengthExample,
    playground: {
      initialSource: inputTextLegacyMaxLengthPlaygroundSource,
      fileName: "inputTextLegacy-maxLength.tsx",
    },
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputTextLegacyDocs["text-align"].description,
    recipe: inputTextLegacyDocs["text-align"].recipe,
    Component: InputTextLegacyTextAlignExample,
    playground: {
      initialSource: inputTextLegacyTextAlignPlaygroundSource,
      fileName: "inputTextLegacy-textAlign.tsx",
    },
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputTextLegacyDocs["virtual-keyboard"].description,
    recipe: inputTextLegacyDocs["virtual-keyboard"].recipe,
    Component: InputTextLegacyVirtualKeyboardExample,
    playground: {
      initialSource: inputTextLegacyVirtualKeyboardPlaygroundSource,
      fileName: "inputTextLegacy-virtualKeyboard.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputTextLegacyDocs.width.description,
    recipe: inputTextLegacyDocs.width.recipe,
    Component: InputTextLegacyWidthExample,
    playground: {
      initialSource: inputTextLegacyWidthPlaygroundSource,
      fileName: "inputTextLegacy-width.tsx",
    },
  },
  {
    id: "input-wrap",
    name: "With Form Controls",
    description: inputTextLegacyDocs["input-wrap"].description,
    recipe: inputTextLegacyDocs["input-wrap"].recipe,
    Component: InputTextLegacyInputWrapExample,
    playground: {
      initialSource: inputTextLegacyInputWrapPlaygroundSource,
      fileName: "inputTextLegacy-inputWrap.tsx",
      runtimeBindings: {
        nowIsoDateTime,
      },
    },
  },
  {
    id: "start-end-slots",
    name: "Start & End Slots",
    description: inputTextLegacyDocs["start-end-slots"].description,
    recipe: inputTextLegacyDocs["start-end-slots"].recipe,
    Component: InputTextLegacyStartEndSlotsExample,
    playground: {
      initialSource: inputTextLegacyStartEndSlotsPlaygroundSource,
      fileName: "inputTextLegacy-startEndSlots.tsx",
    },
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
