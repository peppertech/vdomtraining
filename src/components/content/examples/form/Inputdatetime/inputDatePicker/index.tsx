import * as preact from 'preact';
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputDatePickerCustomizeDaysExample from "./inputDatePicker-customizeDays";
import inputDatePickerCustomizeDaysPlaygroundSource from "./inputDatePicker-customizeDays-source";
import {
  inputDatePickerDocsVdom,
  type InputDatePickerVdomDemoId,
} from "./inputDatePicker-docs";
import InputDatePickerOverviewExample from "./inputDatePicker-overview";
import inputDatePickerOverviewPlaygroundSource from "./inputDatePicker-overview-source";
import InputDatePickerRestrictRangeExample from "./inputDatePicker-restrictRange";
import inputDatePickerRestrictRangePlaygroundSource from "./inputDatePicker-restrictRange-source";
import InputDatePickerSelectRangeExample from "./inputDatePicker-selectRange";
import inputDatePickerSelectRangePlaygroundSource from "./inputDatePicker-selectRange-source";
import { getWeekday, labelEdgeOptions, messageSets, todayIsoDate } from "./inputDatePicker-shared";
import InputDatePickerShowWeekOfYearExample from "./inputDatePicker-showWeekOfYear";
import inputDatePickerShowWeekOfYearPlaygroundSource from "./inputDatePicker-showWeekOfYear-source";
import InputDatePickerSimpleExample from "./inputDatePicker-simple";
import inputDatePickerSimplePlaygroundSource from "./inputDatePicker-simple-source";
import InputDatePickerWidthExample from "./inputDatePicker-width";
import inputDatePickerWidthPlaygroundSource from "./inputDatePicker-width-source";

const inputDatePickerItemsVdom: {
  id: InputDatePickerVdomDemoId;
  name: string;
  description: (typeof inputDatePickerDocsVdom)[InputDatePickerVdomDemoId]["description"];
  recipe: (typeof inputDatePickerDocsVdom)[InputDatePickerVdomDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputDatePickerDocsVdom.overview.description,
    recipe: inputDatePickerDocsVdom.overview.recipe,
    Component: InputDatePickerOverviewExample,
    playground: {
      initialSource: inputDatePickerOverviewPlaygroundSource,
      fileName: "inputDatePicker-overview.tsx",
      runtimeBindings: {
        messageSets,
      },
    },
  },
  {
    id: "simple",
    name: "Simple",
    description: inputDatePickerDocsVdom.simple.description,
    recipe: inputDatePickerDocsVdom.simple.recipe,
    Component: InputDatePickerSimpleExample,
    playground: {
      initialSource: inputDatePickerSimplePlaygroundSource,
      fileName: "inputDatePicker-simple.tsx",
      runtimeBindings: {
        todayIsoDate,
      },
    },
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputDatePickerDocsVdom["restrict-range"].description,
    recipe: inputDatePickerDocsVdom["restrict-range"].recipe,
    Component: InputDatePickerRestrictRangeExample,
    playground: {
      initialSource: inputDatePickerRestrictRangePlaygroundSource,
      fileName: "inputDatePicker-restrictRange.tsx",
    },
  },
  {
    id: "show-week-of-year",
    name: "Show Week Of Year",
    description: inputDatePickerDocsVdom["show-week-of-year"].description,
    recipe: inputDatePickerDocsVdom["show-week-of-year"].recipe,
    Component: InputDatePickerShowWeekOfYearExample,
    playground: {
      initialSource: inputDatePickerShowWeekOfYearPlaygroundSource,
      fileName: "inputDatePicker-showWeekOfYear.tsx",
    },
  },
  {
    id: "customize-days",
    name: "Customize Days",
    description: inputDatePickerDocsVdom["customize-days"].description,
    recipe: inputDatePickerDocsVdom["customize-days"].recipe,
    Component: InputDatePickerCustomizeDaysExample,
    playground: {
      initialSource: inputDatePickerCustomizeDaysPlaygroundSource,
      fileName: "inputDatePicker-customizeDays.tsx",
      runtimeBindings: {
        getWeekday,
      },
    },
  },
  {
    id: "select-range",
    name: "Select Range",
    description: inputDatePickerDocsVdom["select-range"].description,
    recipe: inputDatePickerDocsVdom["select-range"].recipe,
    Component: InputDatePickerSelectRangeExample,
    playground: {
      initialSource: inputDatePickerSelectRangePlaygroundSource,
      fileName: "inputDatePicker-selectRange.tsx",
      runtimeBindings: {
        todayIsoDate,
      },
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputDatePickerDocsVdom.width.description,
    recipe: inputDatePickerDocsVdom.width.recipe,
    Component: InputDatePickerWidthExample,
    playground: {
      initialSource: inputDatePickerWidthPlaygroundSource,
      fileName: "inputDatePicker-width.tsx",
      runtimeBindings: {
        labelEdgeOptions,
      },
    },
  },
];

export default function InputDatePickerRecipePageVdom() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Picker examples"
      componentType="oj-c-input-date-picker"
      packLabel="Core Pack"
      layoutId="inputDatePickerNavigationLayoutVdom"
      items={inputDatePickerItemsVdom}
      initialItemId="overview"
    />
  );
}
