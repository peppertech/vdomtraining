import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputDatePickerCustomizeDaysExample from "./inputDatePicker-customizeDays";
import {
  inputDatePickerDocsVdom,
  type InputDatePickerVdomDemoId,
} from "./inputDatePicker-docs";
import InputDatePickerOverviewExample from "./inputDatePicker-overview";
import InputDatePickerRestrictRangeExample from "./inputDatePicker-restrictRange";
import InputDatePickerSelectRangeExample from "./inputDatePicker-selectRange";
import InputDatePickerShowWeekOfYearExample from "./inputDatePicker-showWeekOfYear";
import InputDatePickerSimpleExample from "./inputDatePicker-simple";
import InputDatePickerWidthExample from "./inputDatePicker-width";

const inputDatePickerItemsVdom: {
  id: InputDatePickerVdomDemoId;
  name: string;
  description: (typeof inputDatePickerDocsVdom)[InputDatePickerVdomDemoId]["description"];
  recipe: (typeof inputDatePickerDocsVdom)[InputDatePickerVdomDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputDatePickerDocsVdom.overview.description,
    recipe: inputDatePickerDocsVdom.overview.recipe,
    Component: InputDatePickerOverviewExample,
  },
  {
    id: "simple",
    name: "Simple",
    description: inputDatePickerDocsVdom.simple.description,
    recipe: inputDatePickerDocsVdom.simple.recipe,
    Component: InputDatePickerSimpleExample,
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputDatePickerDocsVdom["restrict-range"].description,
    recipe: inputDatePickerDocsVdom["restrict-range"].recipe,
    Component: InputDatePickerRestrictRangeExample,
  },
  {
    id: "show-week-of-year",
    name: "Show Week Of Year",
    description: inputDatePickerDocsVdom["show-week-of-year"].description,
    recipe: inputDatePickerDocsVdom["show-week-of-year"].recipe,
    Component: InputDatePickerShowWeekOfYearExample,
  },
  {
    id: "customize-days",
    name: "Customize Days",
    description: inputDatePickerDocsVdom["customize-days"].description,
    recipe: inputDatePickerDocsVdom["customize-days"].recipe,
    Component: InputDatePickerCustomizeDaysExample,
  },
  {
    id: "select-range",
    name: "Select Range",
    description: inputDatePickerDocsVdom["select-range"].description,
    recipe: inputDatePickerDocsVdom["select-range"].recipe,
    Component: InputDatePickerSelectRangeExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputDatePickerDocsVdom.width.description,
    recipe: inputDatePickerDocsVdom.width.recipe,
    Component: InputDatePickerWidthExample,
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
