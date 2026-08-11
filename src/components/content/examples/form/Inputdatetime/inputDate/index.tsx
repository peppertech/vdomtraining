import * as preact from 'preact';
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputDateCustomizeDaysVdomExample from "./inputDate-customizeDays";
import inputDateCustomizeDaysPlaygroundSource from "./inputDate-customizeDays-source";
import {
  inputDateDocsVdom,
  type InputDateVdomDemoId,
} from "./inputDate-docs";
import InputDateRestrictRangeVdomExample from "./inputDate-restrictRange";
import inputDateRestrictRangePlaygroundSource from "./inputDate-restrictRange-source";
import InputDateSelectRangeVdomExample from "./inputDate-selectRange";
import inputDateSelectRangePlaygroundSource from "./inputDate-selectRange-source";
import InputDateShowWeekOfYearVdomExample from "./inputDate-showWeekOfYear";
import inputDateShowWeekOfYearPlaygroundSource from "./inputDate-showWeekOfYear-source";
import InputDateSimpleVdomExample from "./inputDate-simple";
import inputDateSimplePlaygroundSource from "./inputDate-simple-source";
import InputDateStatesVdomExample from "./inputDate-states";
import inputDateStatesPlaygroundSource from "./inputDate-states-source";
import InputDateWidthVdomExample from "./inputDate-width";
import inputDateWidthCssPlaygroundSource from "./inputDate-width-css-source";
import inputDateWidthPlaygroundSource from "./inputDate-width-source";
import { messageSets,sampleIsoDate,todayIsoDate } from "./inputDate-shared";

const inputDateItemsVdom: {
  id: InputDateVdomDemoId;
  name: string;
  description: (typeof inputDateDocsVdom)[InputDateVdomDemoId]["description"];
  recipe: (typeof inputDateDocsVdom)[InputDateVdomDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputDateDocsVdom.states.description,
    recipe: inputDateDocsVdom.states.recipe,
    Component: InputDateStatesVdomExample,
    playground: {
      initialSource: inputDateStatesPlaygroundSource,
      fileName: "inputDate-states.tsx",
      runtimeBindings: {
        messageSets,
        sampleIsoDate,
      },
    },
  },
  {
    id: "simple",
    name: "Simple",
    description: inputDateDocsVdom.simple.description,
    recipe: inputDateDocsVdom.simple.recipe,
    Component: InputDateSimpleVdomExample,
    playground: {
      initialSource: inputDateSimplePlaygroundSource,
      fileName: "inputDate-simple.tsx",
      runtimeBindings: {
        sampleIsoDate,
      },
    },
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputDateDocsVdom["restrict-range"].description,
    recipe: inputDateDocsVdom["restrict-range"].recipe,
    Component: InputDateRestrictRangeVdomExample,
    playground: {
      initialSource: inputDateRestrictRangePlaygroundSource,
      fileName: "inputDate-restrictRange.tsx",
    },
  },
  {
    id: "show-week-of-year",
    name: "Show Week Of Year",
    description: inputDateDocsVdom["show-week-of-year"].description,
    recipe: inputDateDocsVdom["show-week-of-year"].recipe,
    Component: InputDateShowWeekOfYearVdomExample,
    playground: {
      initialSource: inputDateShowWeekOfYearPlaygroundSource,
      fileName: "inputDate-showWeekOfYear.tsx",
      runtimeBindings: {
        todayIsoDate,
      },
    },
  },
  {
    id: "customize-days",
    name: "Customize Days",
    description: inputDateDocsVdom["customize-days"].description,
    recipe: inputDateDocsVdom["customize-days"].recipe,
    Component: InputDateCustomizeDaysVdomExample,
    playground: {
      initialSource: inputDateCustomizeDaysPlaygroundSource,
      fileName: "inputDate-customizeDays.tsx",
    },
  },
  {
    id: "select-range",
    name: "Select Range",
    description: inputDateDocsVdom["select-range"].description,
    recipe: inputDateDocsVdom["select-range"].recipe,
    Component: InputDateSelectRangeVdomExample,
    playground: {
      initialSource: inputDateSelectRangePlaygroundSource,
      fileName: "inputDate-selectRange.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputDateDocsVdom.width.description,
    recipe: inputDateDocsVdom.width.recipe,
    Component: InputDateWidthVdomExample,
    playground: {
      initialSource: inputDateWidthPlaygroundSource,
      fileName: "inputDate-width.tsx",
      runtimeBindings: {
        sampleIsoDate,
      },
      supportingFiles: [
        {
          fileName: "inputTextLegacy.css",
          initialSource: inputDateWidthCssPlaygroundSource,
          language: "css",
          importSpecifier: "css!../../inputtext/inputTextLegacy/inputTextLegacy.css",
        },
      ],
    },
  },
];

export default function InputDateRecipePageVdom() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date examples"
      componentType="oj-input-date"
      layoutId="inputDateNavigationLayoutVdom"
      items={inputDateItemsVdom}
      initialItemId="states"
    />
  );
}
