import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputDateCustomizeDaysVdomExample from "./inputDate-customizeDays";
import {
  inputDateDocsVdom,
  type InputDateVdomDemoId,
} from "./inputDate-docs";
import InputDateRestrictRangeVdomExample from "./inputDate-restrictRange";
import InputDateSelectRangeVdomExample from "./inputDate-selectRange";
import InputDateShowWeekOfYearVdomExample from "./inputDate-showWeekOfYear";
import InputDateSimpleVdomExample from "./inputDate-simple";
import InputDateStatesVdomExample from "./inputDate-states";
import InputDateWidthVdomExample from "./inputDate-width";

const inputDateItemsVdom: {
  id: InputDateVdomDemoId;
  name: string;
  description: (typeof inputDateDocsVdom)[InputDateVdomDemoId]["description"];
  recipe: (typeof inputDateDocsVdom)[InputDateVdomDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputDateDocsVdom.states.description,
    recipe: inputDateDocsVdom.states.recipe,
    Component: InputDateStatesVdomExample,
  },
  {
    id: "simple",
    name: "Simple",
    description: inputDateDocsVdom.simple.description,
    recipe: inputDateDocsVdom.simple.recipe,
    Component: InputDateSimpleVdomExample,
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputDateDocsVdom["restrict-range"].description,
    recipe: inputDateDocsVdom["restrict-range"].recipe,
    Component: InputDateRestrictRangeVdomExample,
  },
  {
    id: "show-week-of-year",
    name: "Show Week Of Year",
    description: inputDateDocsVdom["show-week-of-year"].description,
    recipe: inputDateDocsVdom["show-week-of-year"].recipe,
    Component: InputDateShowWeekOfYearVdomExample,
  },
  {
    id: "customize-days",
    name: "Customize Days",
    description: inputDateDocsVdom["customize-days"].description,
    recipe: inputDateDocsVdom["customize-days"].recipe,
    Component: InputDateCustomizeDaysVdomExample,
  },
  {
    id: "select-range",
    name: "Select Range",
    description: inputDateDocsVdom["select-range"].description,
    recipe: inputDateDocsVdom["select-range"].recipe,
    Component: InputDateSelectRangeVdomExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputDateDocsVdom.width.description,
    recipe: inputDateDocsVdom.width.recipe,
    Component: InputDateWidthVdomExample,
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
