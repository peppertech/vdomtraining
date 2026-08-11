import * as preact from 'preact';
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import InputTimeCustomValidatorExample from "./inputTime-customValidator";
import inputTimeCustomValidatorPlaygroundSource from "./inputTime-customValidator-source";
import {
  inputTimeDocs,
  type InputTimeDemoId,
} from "./inputTime-docs";
import InputTimeMinMaxExample from "./inputTime-minmax";
import inputTimeMinMaxPlaygroundSource from "./inputTime-minmax-source";
import { defaultTimeValue, messageSets, militaryTimeConverter, shortTimeValue, timeFullConverter } from "./inputTime-shared";
import InputTimeSimpleExample from "./inputTime-simple";
import inputTimeSimplePlaygroundSource from "./inputTime-simple-source";
import InputTimeStatesExample from "./inputTime-states";
import inputTimeStatesPlaygroundSource from "./inputTime-states-source";
import InputTimeTimeZoneExample from "./inputTime-timeZone";
import inputTimeTimeZonePlaygroundSource from "./inputTime-timeZone-source";

const inputTimeItems: {
  id: InputTimeDemoId;
  name: string;
  description: (typeof inputTimeDocs)[InputTimeDemoId]["description"];
  recipe: (typeof inputTimeDocs)[InputTimeDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputTimeDocs.states.description,
    recipe: inputTimeDocs.states.recipe,
    Component: InputTimeStatesExample,
    playground: {
      initialSource: inputTimeStatesPlaygroundSource,
      fileName: "inputTime-states.tsx",
      runtimeBindings: {
        defaultTimeValue,
        messageSets,
        militaryTimeConverter,
        timeFullConverter,
      },
    },
  },
  {
    id: "simple",
    name: "Simple",
    description: inputTimeDocs.simple.description,
    recipe: inputTimeDocs.simple.recipe,
    Component: InputTimeSimpleExample,
    playground: {
      initialSource: inputTimeSimplePlaygroundSource,
      fileName: "inputTime-simple.tsx",
      runtimeBindings: {
        shortTimeValue,
      },
    },
  },
  {
    id: "minmax",
    name: "Min Max",
    description: inputTimeDocs.minmax.description,
    recipe: inputTimeDocs.minmax.recipe,
    Component: InputTimeMinMaxExample,
    playground: {
      initialSource: inputTimeMinMaxPlaygroundSource,
      fileName: "inputTime-minmax.tsx",
      runtimeBindings: {
        IntlDateTimeConverter,
      },
    },
  },
  {
    id: "time-zone",
    name: "Time Zone",
    description: inputTimeDocs["time-zone"].description,
    recipe: inputTimeDocs["time-zone"].recipe,
    Component: InputTimeTimeZoneExample,
    playground: {
      initialSource: inputTimeTimeZonePlaygroundSource,
      fileName: "inputTime-timeZone.tsx",
      runtimeBindings: {
        IntlDateTimeConverter,
      },
    },
  },
  {
    id: "custom-validator",
    name: "Custom Validator",
    description: inputTimeDocs["custom-validator"].description,
    recipe: inputTimeDocs["custom-validator"].recipe,
    Component: InputTimeCustomValidatorExample,
    playground: {
      initialSource: inputTimeCustomValidatorPlaygroundSource,
      fileName: "inputTime-customValidator.tsx",
      runtimeBindings: {
        IntlConverterUtils,
        IntlDateTimeConverter,
      },
    },
  },
];

export default function InputTimeRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Time examples"
      componentType="oj-input-time"
      layoutId="inputTimeNavigationLayout"
      items={inputTimeItems}
      initialItemId="states"
    />
  );
}
