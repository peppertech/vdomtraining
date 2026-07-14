import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
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

const inputNumberItems: {
  id: InputNumberDemoId;
  name: string;
  description: (typeof inputNumberDocs)[InputNumberDemoId]["description"];
  recipe: (typeof inputNumberDocs)[InputNumberDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputNumberDocs.overview.description,
    recipe: inputNumberDocs.overview.recipe,
    Component: InputNumberOverviewExample,
  },
  {
    id: "min-max",
    name: "Min Max Range",
    description: inputNumberDocs["min-max"].description,
    recipe: inputNumberDocs["min-max"].recipe,
    Component: InputNumberMinMaxExample,
  },
  {
    id: "step-match",
    name: "Step Match",
    description: inputNumberDocs["step-match"].description,
    recipe: inputNumberDocs["step-match"].recipe,
    Component: InputNumberStepExample,
  },
  {
    id: "converter",
    name: "Converter",
    description: inputNumberDocs.converter.description,
    recipe: inputNumberDocs.converter.recipe,
    Component: InputNumberConverterExample,
  },
  {
    id: "validator",
    name: "Validator",
    description: inputNumberDocs.validator.description,
    recipe: inputNumberDocs.validator.recipe,
    Component: InputNumberValidatorExample,
  },
  {
    id: "raw-value",
    name: "RawValue and TransientValue",
    description: inputNumberDocs["raw-value"].description,
    recipe: inputNumberDocs["raw-value"].recipe,
    Component: InputNumberRawValueExample,
  },
  {
    id: "eat-non-numbers",
    name: "Eat Non-Numbers",
    description: inputNumberDocs["eat-non-numbers"].description,
    recipe: inputNumberDocs["eat-non-numbers"].recipe,
    Component: InputNumberEatNonNumbersExample,
  },
  {
    id: "no-label",
    name: "No Label",
    description: inputNumberDocs["no-label"].description,
    recipe: inputNumberDocs["no-label"].recipe,
    Component: InputNumberNoLabelExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputNumberDocs.width.description,
    recipe: inputNumberDocs.width.recipe,
    Component: InputNumberWidthExample,
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputNumberDocs["text-align"].description,
    recipe: inputNumberDocs["text-align"].recipe,
    Component: InputNumberTextAlignExample,
  },
  {
    id: "virtual-keyboard",
    name: "Virtual Keyboard",
    description: inputNumberDocs["virtual-keyboard"].description,
    recipe: inputNumberDocs["virtual-keyboard"].recipe,
    Component: InputNumberVirtualKeyboardExample,
  },
  {
    id: "styling",
    name: "Styling",
    description: inputNumberDocs.styling.description,
    recipe: inputNumberDocs.styling.recipe,
    Component: InputNumberStylingExample,
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
