import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import AsyncNumberRangeValidator = require("ojs/ojasyncvalidator-numberrange");
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import InputNumberConverterExample from "./inputNumber-converter";
import {
  inputNumberDocs,
  type InputNumberDemoId,
} from "./inputNumber-docs";
import InputNumberEatNonNumbersExample from "./inputNumber-eatNonNumbers";
import InputNumberMinMaxExample from "./inputNumber-minMax";
import InputNumberNoLabelExample from "./inputNumber-noLabel";
import InputNumberOverviewExample from "./inputNumber-overview";
import InputNumberRawValueExample from "./inputNumber-rawValue";
import InputNumberStepExample from "./inputNumber-step";
import InputNumberStylingExample from "./inputNumber-styling";
import InputNumberTextAlignExample from "./inputNumber-textAlign";
import InputNumberValidatorExample from "./inputNumber-validator";
import InputNumberVirtualKeyboardExample from "./inputNumber-virtualKeyboard";
import InputNumberWidthExample from "./inputNumber-width";
import inputNumberConverterPlaygroundSource from "./inputNumber-converter-source";
import inputNumberCssPlaygroundSource from "./inputNumber.css-source";
import inputNumberEatNonNumbersPlaygroundSource from "./inputNumber-eatNonNumbers-source";
import inputNumberMinMaxPlaygroundSource from "./inputNumber-minMax-source";
import inputNumberNoLabelPlaygroundSource from "./inputNumber-noLabel-source";
import inputNumberOverviewPlaygroundSource from "./inputNumber-overview-source";
import inputNumberRawValuePlaygroundSource from "./inputNumber-rawValue-source";
import inputNumberStepPlaygroundSource from "./inputNumber-step-source";
import inputNumberStylingPlaygroundSource from "./inputNumber-styling-source";
import inputNumberTextAlignPlaygroundSource from "./inputNumber-textAlign-source";
import inputNumberValidatorPlaygroundSource from "./inputNumber-validator-source";
import inputNumberVirtualKeyboardPlaygroundSource from "./inputNumber-virtualKeyboard-source";
import inputNumberWidthPlaygroundSource from "./inputNumber-width-source";
import { messageSets, noGroupingNumberConverter } from "./inputNumber-shared";

const inputNumberItems: {
  id: InputNumberDemoId;
  name: string;
  description: (typeof inputNumberDocs)[InputNumberDemoId]["description"];
  recipe: (typeof inputNumberDocs)[InputNumberDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputNumberDocs.overview.description,
    recipe: inputNumberDocs.overview.recipe,
    Component: InputNumberOverviewExample,
    playground: {
      initialSource: inputNumberOverviewPlaygroundSource,
      fileName: "inputNumber-overview.tsx",
      runtimeBindings: { messageSets },
    },
  },
  {
    id: "min-max",
    name: "Min Max Range",
    description: inputNumberDocs["min-max"].description,
    recipe: inputNumberDocs["min-max"].recipe,
    Component: InputNumberMinMaxExample,
    playground: {
      initialSource: inputNumberMinMaxPlaygroundSource,
      fileName: "inputNumber-minMax.tsx",
    },
  },
  {
    id: "step-match",
    name: "Step Match",
    description: inputNumberDocs["step-match"].description,
    recipe: inputNumberDocs["step-match"].recipe,
    Component: InputNumberStepExample,
    playground: {
      initialSource: inputNumberStepPlaygroundSource,
      fileName: "inputNumber-step.tsx",
      runtimeBindings: { IntlNumberConverter },
    },
  },
  {
    id: "converter",
    name: "Converter",
    description: inputNumberDocs.converter.description,
    recipe: inputNumberDocs.converter.recipe,
    Component: InputNumberConverterExample,
    playground: {
      initialSource: inputNumberConverterPlaygroundSource,
      fileName: "inputNumber-converter.tsx",
      runtimeBindings: { IntlNumberConverter },
    },
  },
  {
    id: "validator",
    name: "Validator",
    description: inputNumberDocs.validator.description,
    recipe: inputNumberDocs.validator.recipe,
    Component: InputNumberValidatorExample,
    playground: {
      initialSource: inputNumberValidatorPlaygroundSource,
      fileName: "inputNumber-validator.tsx",
      runtimeBindings: {
        AsyncNumberRangeValidator,
        AsyncRegExpValidator,
        IntlNumberConverter,
      },
    },
  },
  {
    id: "raw-value",
    name: "RawValue and TransientValue",
    description: inputNumberDocs["raw-value"].description,
    recipe: inputNumberDocs["raw-value"].recipe,
    Component: InputNumberRawValueExample,
    playground: {
      initialSource: inputNumberRawValuePlaygroundSource,
      fileName: "inputNumber-rawValue.tsx",
      runtimeBindings: { AsyncRegExpValidator, IntlNumberConverter },
    },
  },
  {
    id: "eat-non-numbers",
    name: "Eat Non-Numbers",
    description: inputNumberDocs["eat-non-numbers"].description,
    recipe: inputNumberDocs["eat-non-numbers"].recipe,
    Component: InputNumberEatNonNumbersExample,
    playground: {
      initialSource: inputNumberEatNonNumbersPlaygroundSource,
      fileName: "inputNumber-eatNonNumbers.tsx",
    },
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputNumberDocs["no-label"].description,
    recipe: inputNumberDocs["no-label"].recipe,
    Component: InputNumberNoLabelExample,
    playground: {
      initialSource: inputNumberNoLabelPlaygroundSource,
      fileName: "inputNumber-noLabel.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputNumberDocs.width.description,
    recipe: inputNumberDocs.width.recipe,
    Component: InputNumberWidthExample,
    playground: {
      initialSource: inputNumberWidthPlaygroundSource,
      fileName: "inputNumber-width.tsx",
      supportingFiles: [
        {
          fileName: "inputNumber.css",
          initialSource: inputNumberCssPlaygroundSource,
          language: "css",
          importSpecifier: "css!./inputNumber.css",
        },
      ],
    },
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputNumberDocs["text-align"].description,
    recipe: inputNumberDocs["text-align"].recipe,
    Component: InputNumberTextAlignExample,
    playground: {
      initialSource: inputNumberTextAlignPlaygroundSource,
      fileName: "inputNumber-textAlign.tsx",
    },
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputNumberDocs["virtual-keyboard"].description,
    recipe: inputNumberDocs["virtual-keyboard"].recipe,
    Component: InputNumberVirtualKeyboardExample,
    playground: {
      initialSource: inputNumberVirtualKeyboardPlaygroundSource,
      fileName: "inputNumber-virtualKeyboard.tsx",
      runtimeBindings: { noGroupingNumberConverter },
    },
  },
  {
    id: "styling",
    name: "Styling",
    description: inputNumberDocs.styling.description,
    recipe: inputNumberDocs.styling.recipe,
    Component: InputNumberStylingExample,
    playground: {
      initialSource: inputNumberStylingPlaygroundSource,
      fileName: "inputNumber-styling.tsx",
      supportingFiles: [
        {
          fileName: "inputNumber.css",
          initialSource: inputNumberCssPlaygroundSource,
          language: "css",
          importSpecifier: "css!./inputNumber.css",
        },
      ],
    },
  },
];

export default function InputNumberRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Number examples"
      componentType="oj-input-number"
      layoutId="inputNumberNavigationLayout"
      items={inputNumberItems}
      initialItemId="overview"
    />
  );
}
