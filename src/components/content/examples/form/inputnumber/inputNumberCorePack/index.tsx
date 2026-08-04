import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
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
import inputNumberCorePackConverterPlaygroundSource from "./inputNumberCorePack-converter-source";
import inputNumberCorePackMinMaxPlaygroundSource from "./inputNumberCorePack-minMax-source";
import inputNumberCorePackPrefixSuffixPlaygroundSource from "./inputNumberCorePack-prefixSuffix-source";
import inputNumberCorePackRawValuePlaygroundSource from "./inputNumberCorePack-rawValue-source";
import inputNumberCorePackStatesPlaygroundSource from "./inputNumberCorePack-states-source";
import inputNumberCorePackVirtualKeyboardPlaygroundSource from "./inputNumberCorePack-virtualKeyboard-source";
import inputNumberCorePackWidthPlaygroundSource from "./inputNumberCorePack-width-source";
import {
  labelEdgeOptions,
  messageSets,
  noGroupingNumberConverter,
  stateOptions,
  textAlignOptions,
  valueOptions,
} from "./inputNumberCorePack-shared";

const inputNumberCorePackItems: {
  id: InputNumberCorePackDemoId;
  name: string;
  description: (typeof inputNumberCorePackDocs)[InputNumberCorePackDemoId]["description"];
  recipe: (typeof inputNumberCorePackDocs)[InputNumberCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputNumberCorePackDocs.states.description,
    recipe: inputNumberCorePackDocs.states.recipe,
    Component: InputNumberCorePackStatesExample,
    playground: {
      initialSource: inputNumberCorePackStatesPlaygroundSource,
      fileName: "inputNumberCorePack-states.tsx",
      runtimeBindings: { messageSets },
    },
  },
  {
    id: "converter",
    name: "Converter",
    description: inputNumberCorePackDocs.converter.description,
    recipe: inputNumberCorePackDocs.converter.recipe,
    Component: InputNumberCorePackConverterExample,
    playground: {
      initialSource: inputNumberCorePackConverterPlaygroundSource,
      fileName: "inputNumberCorePack-converter.tsx",
      runtimeBindings: { IntlNumberConverter },
    },
  },
  {
    id: "min-max",
    name: "Min Max Range",
    description: inputNumberCorePackDocs["min-max"].description,
    recipe: inputNumberCorePackDocs["min-max"].recipe,
    Component: InputNumberCorePackMinMaxExample,
    playground: {
      initialSource: inputNumberCorePackMinMaxPlaygroundSource,
      fileName: "inputNumberCorePack-minMax.tsx",
    },
  },
  {
    id: "raw-value",
    name: "Raw Value and Transient Value",
    description: inputNumberCorePackDocs["raw-value"].description,
    recipe: inputNumberCorePackDocs["raw-value"].recipe,
    Component: InputNumberCorePackRawValueExample,
    playground: {
      initialSource: inputNumberCorePackRawValuePlaygroundSource,
      fileName: "inputNumberCorePack-rawValue.tsx",
      runtimeBindings: { AsyncRegExpValidator, IntlNumberConverter },
    },
  },
  {
    id: "prefix-suffix",
    name: "Input Prefix & Suffix",
    description: inputNumberCorePackDocs["prefix-suffix"].description,
    recipe: inputNumberCorePackDocs["prefix-suffix"].recipe,
    Component: InputNumberCorePackPrefixSuffixExample,
    playground: {
      initialSource: inputNumberCorePackPrefixSuffixPlaygroundSource,
      fileName: "inputNumberCorePack-prefixSuffix.tsx",
      runtimeBindings: {
        labelEdgeOptions,
        stateOptions,
        textAlignOptions,
        valueOptions,
      },
    },
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputNumberCorePackDocs["virtual-keyboard"].description,
    recipe: inputNumberCorePackDocs["virtual-keyboard"].recipe,
    Component: InputNumberCorePackVirtualKeyboardExample,
    playground: {
      initialSource: inputNumberCorePackVirtualKeyboardPlaygroundSource,
      fileName: "inputNumberCorePack-virtualKeyboard.tsx",
      runtimeBindings: { noGroupingNumberConverter },
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputNumberCorePackDocs.width.description,
    recipe: inputNumberCorePackDocs.width.recipe,
    Component: InputNumberCorePackWidthExample,
    playground: {
      initialSource: inputNumberCorePackWidthPlaygroundSource,
      fileName: "inputNumberCorePack-width.tsx",
      runtimeBindings: { labelEdgeOptions },
    },
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
