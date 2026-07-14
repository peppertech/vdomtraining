import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputNumberCorePackConverterExample from "./inputNumberCorePack-converter";
import {
  inputNumberCorePackDocs,
  type InputNumberCorePackDemoId,
} from "./inputNumberCorePack-docs";
import InputNumberCorePackMinMaxExample from "./inputNumberCorePack-minMax";
import InputNumberCorePackPrefixSuffixExample from "./inputNumberCorePack-prefixSuffix";
import InputNumberCorePackRawValueExample from "./inputNumberCorePack-rawValue";
import InputNumberCorePackStatesExample from "./inputNumberCorePack-states";
import InputNumberCorePackVirtualKeyboardExample from "./inputNumberCorePack-virtualKeyboard";
import InputNumberCorePackWidthExample from "./inputNumberCorePack-width";

const inputNumberCorePackItems: {
  id: InputNumberCorePackDemoId;
  name: string;
  description: (typeof inputNumberCorePackDocs)[InputNumberCorePackDemoId]["description"];
  recipe: (typeof inputNumberCorePackDocs)[InputNumberCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputNumberCorePackDocs.states.description,
    recipe: inputNumberCorePackDocs.states.recipe,
    Component: InputNumberCorePackStatesExample,
  },
  {
    id: "converter",
    name: "Converter",
    description: inputNumberCorePackDocs.converter.description,
    recipe: inputNumberCorePackDocs.converter.recipe,
    Component: InputNumberCorePackConverterExample,
  },
  {
    id: "min-max",
    name: "Min Max Range",
    description: inputNumberCorePackDocs["min-max"].description,
    recipe: inputNumberCorePackDocs["min-max"].recipe,
    Component: InputNumberCorePackMinMaxExample,
  },
  {
    id: "raw-value",
    name: "Raw Value and Transient Value",
    description: inputNumberCorePackDocs["raw-value"].description,
    recipe: inputNumberCorePackDocs["raw-value"].recipe,
    Component: InputNumberCorePackRawValueExample,
  },
  {
    id: "prefix-suffix",
    name: "Input Prefix & Suffix",
    description: inputNumberCorePackDocs["prefix-suffix"].description,
    recipe: inputNumberCorePackDocs["prefix-suffix"].recipe,
    Component: InputNumberCorePackPrefixSuffixExample,
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputNumberCorePackDocs["virtual-keyboard"].description,
    recipe: inputNumberCorePackDocs["virtual-keyboard"].recipe,
    Component: InputNumberCorePackVirtualKeyboardExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputNumberCorePackDocs.width.description,
    recipe: inputNumberCorePackDocs.width.recipe,
    Component: InputNumberCorePackWidthExample,
  },
];

export default function InputNumberCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Number core pack examples"
      componentType="oj-c-input-number"
      packLabel="Core Pack"
      layoutId="inputNumberCorePackNavigationLayout"
      items={inputNumberCorePackItems}
      initialItemId="states"
    />
  );
}
