import * as preact from 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputTextCorePackClearIconExample from "./inputTextCorePack-clearIcon";
import inputTextCorePackClearIconPlaygroundSource from "./inputTextCorePack-clearIcon-source";
import {
  inputTextCorePackDocs,
  type InputTextCorePackDemoId,
} from "./inputTextCorePack-docs";
import InputTextCorePackInputWithButtonExample from "./inputTextCorePack-inputWithButton";
import inputTextCorePackInputWithButtonPlaygroundSource from "./inputTextCorePack-inputWithButton-source";
import InputTextCorePackMaxLengthExample from "./inputTextCorePack-maxLength";
import inputTextCorePackMaxLengthPlaygroundSource from "./inputTextCorePack-maxLength-source";
import InputTextCorePackNoLabelExample from "./inputTextCorePack-noLabel";
import inputTextCorePackNoLabelPlaygroundSource from "./inputTextCorePack-noLabel-source";
import InputTextCorePackPrefixSuffixExample from "./inputTextCorePack-prefixSuffix";
import inputTextCorePackPrefixSuffixPlaygroundSource from "./inputTextCorePack-prefixSuffix-source";
import InputTextCorePackRawValueExample from "./inputTextCorePack-rawValue";
import inputTextCorePackRawValuePlaygroundSource from "./inputTextCorePack-rawValue-source";
import InputTextCorePackStartEndSlotsExample from "./inputTextCorePack-startEndSlots";
import inputTextCorePackStartEndSlotsPlaygroundSource from "./inputTextCorePack-startEndSlots-source";
import InputTextCorePackStatesExample from "./inputTextCorePack-states";
import inputTextCorePackStatesPlaygroundSource from "./inputTextCorePack-states-source";
import {
  buttonsetItems,
  confirmationMessages,
  createBrowserDataProvider,
  errorMessages,
  infoMessages,
  labelEdgeOptions,
  maxLengthConfig,
  overviewMaxLengthConfig,
  stateOptions,
  textAlignOptions,
  valueOptions,
  warningMessages,
} from "./inputTextCorePack-shared";
import InputTextCorePackTextExample from "./inputTextCorePack-text";
import inputTextCorePackTextPlaygroundSource from "./inputTextCorePack-text-source";
import InputTextCorePackTextAlignExample from "./inputTextCorePack-textAlign";
import inputTextCorePackTextAlignPlaygroundSource from "./inputTextCorePack-textAlign-source";
import InputTextCorePackVirtualKeyboardExample from "./inputTextCorePack-virtualKeyboard";
import inputTextCorePackVirtualKeyboardPlaygroundSource from "./inputTextCorePack-virtualKeyboard-source";
import InputTextCorePackWidthExample from "./inputTextCorePack-width";
import inputTextCorePackWidthPlaygroundSource from "./inputTextCorePack-width-source";

const inputTextCorePackItems: (RecipePageItem & {
  id: InputTextCorePackDemoId;
  description: (typeof inputTextCorePackDocs)[InputTextCorePackDemoId]["description"];
  recipe: (typeof inputTextCorePackDocs)[InputTextCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
})[] = [
  {
    id: "states",
    name: "Overview",
    description: inputTextCorePackDocs.states.description,
    recipe: inputTextCorePackDocs.states.recipe,
    Component: InputTextCorePackStatesExample,
    playground: {
      initialSource: inputTextCorePackStatesPlaygroundSource,
      fileName: "inputTextCorePack-states.tsx",
      runtimeBindings: {
        confirmationMessages,
        errorMessages,
        infoMessages,
        overviewMaxLengthConfig,
        warningMessages,
      },
    },
  },
  {
    id: "text",
    name: "Value Binding",
    description: inputTextCorePackDocs.text.description,
    recipe: inputTextCorePackDocs.text.recipe,
    Component: InputTextCorePackTextExample,
    playground: {
      initialSource: inputTextCorePackTextPlaygroundSource,
      fileName: "inputTextCorePack-text.tsx",
    },
  },
  {
    id: "raw-value",
    name: "Raw Value",
    description: inputTextCorePackDocs["raw-value"].description,
    recipe: inputTextCorePackDocs["raw-value"].recipe,
    Component: InputTextCorePackRawValueExample,
    playground: {
      initialSource: inputTextCorePackRawValuePlaygroundSource,
      fileName: "inputTextCorePack-rawValue.tsx",
    },
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputTextCorePackDocs["no-label"].description,
    recipe: inputTextCorePackDocs["no-label"].recipe,
    Component: InputTextCorePackNoLabelExample,
    playground: {
      initialSource: inputTextCorePackNoLabelPlaygroundSource,
      fileName: "inputTextCorePack-noLabel.tsx",
    },
  },
  {
    id: "clear-icon",
    name: "Clear Icon",
    description: inputTextCorePackDocs["clear-icon"].description,
    recipe: inputTextCorePackDocs["clear-icon"].recipe,
    Component: InputTextCorePackClearIconExample,
    playground: {
      initialSource: inputTextCorePackClearIconPlaygroundSource,
      fileName: "inputTextCorePack-clearIcon.tsx",
    },
  },
  {
    id: "max-length",
    name: "Max Length",
    description: inputTextCorePackDocs["max-length"].description,
    recipe: inputTextCorePackDocs["max-length"].recipe,
    Component: InputTextCorePackMaxLengthExample,
    playground: {
      initialSource: inputTextCorePackMaxLengthPlaygroundSource,
      fileName: "inputTextCorePack-maxLength.tsx",
      runtimeBindings: {
        maxLengthConfig,
      },
    },
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputTextCorePackDocs["text-align"].description,
    recipe: inputTextCorePackDocs["text-align"].recipe,
    Component: InputTextCorePackTextAlignExample,
    playground: {
      initialSource: inputTextCorePackTextAlignPlaygroundSource,
      fileName: "inputTextCorePack-textAlign.tsx",
      runtimeBindings: {
        buttonsetItems,
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputTextCorePackDocs["virtual-keyboard"].description,
    recipe: inputTextCorePackDocs["virtual-keyboard"].recipe,
    Component: InputTextCorePackVirtualKeyboardExample,
    playground: {
      initialSource: inputTextCorePackVirtualKeyboardPlaygroundSource,
      fileName: "inputTextCorePack-virtualKeyboard.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputTextCorePackDocs.width.description,
    recipe: inputTextCorePackDocs.width.recipe,
    Component: InputTextCorePackWidthExample,
    playground: {
      initialSource: inputTextCorePackWidthPlaygroundSource,
      fileName: "inputTextCorePack-width.tsx",
      runtimeBindings: {
        labelEdgeOptions,
      },
    },
  },
  {
    id: "start-end-slots",
    name: "Start & End Slots",
    description: inputTextCorePackDocs["start-end-slots"].description,
    recipe: inputTextCorePackDocs["start-end-slots"].recipe,
    Component: InputTextCorePackStartEndSlotsExample,
    playground: {
      initialSource: inputTextCorePackStartEndSlotsPlaygroundSource,
      fileName: "inputTextCorePack-startEndSlots.tsx",
      runtimeBindings: {
        labelEdgeOptions,
        stateOptions,
        valueOptions,
      },
    },
  },
  {
    id: "prefix-suffix",
    name: "Prefix & Suffix",
    description: inputTextCorePackDocs["prefix-suffix"].description,
    recipe: inputTextCorePackDocs["prefix-suffix"].recipe,
    Component: InputTextCorePackPrefixSuffixExample,
    playground: {
      initialSource: inputTextCorePackPrefixSuffixPlaygroundSource,
      fileName: "inputTextCorePack-prefixSuffix.tsx",
      runtimeBindings: {
        labelEdgeOptions,
        stateOptions,
        textAlignOptions,
        valueOptions,
      },
    },
  },
  {
    id: "input-with-button",
    name: "Input With Button",
    description: inputTextCorePackDocs["input-with-button"].description,
    recipe: inputTextCorePackDocs["input-with-button"].recipe,
    Component: InputTextCorePackInputWithButtonExample,
    playground: {
      initialSource: inputTextCorePackInputWithButtonPlaygroundSource,
      fileName: "inputTextCorePack-inputWithButton.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
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
