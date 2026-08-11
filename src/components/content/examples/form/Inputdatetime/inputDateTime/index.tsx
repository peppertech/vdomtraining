import * as preact from 'preact';
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import inputDateTimeCssPlaygroundSource from "./inputDateTime-css-source";
import {
  inputDateTimeDocs,
  type InputDateTimeDemoId,
} from "./inputDateTime-docs";
import InputDateTimeMultipleWidgetsExample from "./inputDateTime-multipleWidgets";
import inputDateTimeMultipleWidgetsPlaygroundSource from "./inputDateTime-multipleWidgets-source";
import { localDateTimeValue, messageSets, sampleDateTimeValue } from "./inputDateTime-shared";
import InputDateTimeSimpleExample from "./inputDateTime-simple";
import inputDateTimeSimplePlaygroundSource from "./inputDateTime-simple-source";
import InputDateTimeStatesExample from "./inputDateTime-states";
import inputDateTimeStatesPlaygroundSource from "./inputDateTime-states-source";
import InputDateTimeStylingExample from "./inputDateTime-styling";
import inputDateTimeStylingPlaygroundSource from "./inputDateTime-styling-source";
import InputDateTimeTextAlignExample from "./inputDateTime-textAlign";
import inputDateTimeTextAlignPlaygroundSource from "./inputDateTime-textAlign-source";
import InputDateTimeTimeZoneExample from "./inputDateTime-timeZone";
import inputDateTimeTimeZonePlaygroundSource from "./inputDateTime-timeZone-source";
import InputDateTimeWidthExample from "./inputDateTime-width";
import inputDateTimeWidthPlaygroundSource from "./inputDateTime-width-source";

const inputDateTimeItems: {
  id: InputDateTimeDemoId;
  name: string;
  description: (typeof inputDateTimeDocs)[InputDateTimeDemoId]["description"];
  recipe: (typeof inputDateTimeDocs)[InputDateTimeDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputDateTimeDocs.states.description,
    recipe: inputDateTimeDocs.states.recipe,
    Component: InputDateTimeStatesExample,
    playground: {
      initialSource: inputDateTimeStatesPlaygroundSource,
      fileName: "inputDateTime-states.tsx",
      runtimeBindings: {
        IntlDateTimeConverter,
        messageSets,
        sampleDateTimeValue,
      },
    },
  },
  {
    id: "simple",
    name: "ISO String Value",
    description: inputDateTimeDocs.simple.description,
    recipe: inputDateTimeDocs.simple.recipe,
    Component: InputDateTimeSimpleExample,
    playground: {
      initialSource: inputDateTimeSimplePlaygroundSource,
      fileName: "inputDateTime-simple.tsx",
      runtimeBindings: {
        sampleDateTimeValue,
      },
    },
  },
  {
    id: "time-zone",
    name: "Timezone",
    description: inputDateTimeDocs["time-zone"].description,
    recipe: inputDateTimeDocs["time-zone"].recipe,
    Component: InputDateTimeTimeZoneExample,
    playground: {
      initialSource: inputDateTimeTimeZonePlaygroundSource,
      fileName: "inputDateTime-timeZone.tsx",
      runtimeBindings: {
        IntlConverterUtils,
        IntlDateTimeConverter,
      },
    },
  },
  {
    id: "multiple-widgets",
    name: "Multiple Components",
    description: inputDateTimeDocs["multiple-widgets"].description,
    recipe: inputDateTimeDocs["multiple-widgets"].recipe,
    Component: InputDateTimeMultipleWidgetsExample,
    playground: {
      initialSource: inputDateTimeMultipleWidgetsPlaygroundSource,
      fileName: "inputDateTime-multipleWidgets.tsx",
      runtimeBindings: {
        IntlDateTimeConverter,
        localDateTimeValue,
      },
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputDateTimeDocs.width.description,
    recipe: inputDateTimeDocs.width.recipe,
    Component: InputDateTimeWidthExample,
    playground: {
      initialSource: inputDateTimeWidthPlaygroundSource,
      fileName: "inputDateTime-width.tsx",
      runtimeBindings: {
        localDateTimeValue,
      },
      supportingFiles: [
        {
          fileName: "inputDateTime.css",
          initialSource: inputDateTimeCssPlaygroundSource,
          language: "css",
          importSpecifier: "css!./inputDateTime.css",
        },
      ],
    },
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputDateTimeDocs["text-align"].description,
    recipe: inputDateTimeDocs["text-align"].recipe,
    Component: InputDateTimeTextAlignExample,
    playground: {
      initialSource: inputDateTimeTextAlignPlaygroundSource,
      fileName: "inputDateTime-textAlign.tsx",
      runtimeBindings: {
        localDateTimeValue,
      },
    },
  },
  {
    id: "styling",
    name: "Styling",
    description: inputDateTimeDocs.styling.description,
    recipe: inputDateTimeDocs.styling.recipe,
    Component: InputDateTimeStylingExample,
    playground: {
      initialSource: inputDateTimeStylingPlaygroundSource,
      fileName: "inputDateTime-styling.tsx",
      runtimeBindings: {
        localDateTimeValue,
      },
      supportingFiles: [
        {
          fileName: "inputDateTime.css",
          initialSource: inputDateTimeCssPlaygroundSource,
          language: "css",
          importSpecifier: "css!./inputDateTime.css",
        },
      ],
    },
  },
];

export default function InputDateTimeRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Time examples"
      componentType="oj-input-date-time"
      layoutId="inputDateTimeNavigationLayout"
      items={inputDateTimeItems}
      initialItemId="states"
    />
  );
}
