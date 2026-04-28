import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { RangeChartAnimation } from "./rangeChart-animation/rangeChart-animation";
import { rangeChartAnimationDescription } from "./rangeChart-animation/description";
import { rangeChartAnimationRecipe } from "./rangeChart-animation/recipe";
import { RangeChartDataLabels } from "./rangeChart-dataLabels/rangeChart-dataLabels";
import { rangeChartDataLabelsDescription } from "./rangeChart-dataLabels/description";
import { rangeChartDataLabelsRecipe } from "./rangeChart-dataLabels/recipe";
import { RangeChartDefault } from "./rangeChart-default/rangeChart-default";
import { rangeChartDefaultDescription } from "./rangeChart-default/description";
import { rangeChartDefaultRecipe } from "./rangeChart-default/recipe";
import { RangeChartHideShow } from "./rangeChart-hideShow/rangeChart-hideShow";
import { rangeChartHideShowDescription } from "./rangeChart-hideShow/description";
import { rangeChartHideShowRecipe } from "./rangeChart-hideShow/recipe";
import { RangeChartLineTypes } from "./rangeChart-lineTypes/rangeChart-lineTypes";
import { rangeChartLineTypesDescription } from "./rangeChart-lineTypes/description";
import { rangeChartLineTypesRecipe } from "./rangeChart-lineTypes/recipe";
import { RangeChartPolar } from "./rangeChart-polar/rangeChart-polar";
import { rangeChartPolarDescription } from "./rangeChart-polar/description";
import { rangeChartPolarRecipe } from "./rangeChart-polar/recipe";
import { RangeChartRefObject } from "./rangeChart-refObject/rangeChart-refObject";
import { rangeChartRefObjectDescription } from "./rangeChart-refObject/description";
import { rangeChartRefObjectRecipe } from "./rangeChart-refObject/recipe";
import { RangeChartSelection } from "./rangeChart-selection/rangeChart-selection";
import { rangeChartSelectionDescription } from "./rangeChart-selection/description";
import { rangeChartSelectionRecipe } from "./rangeChart-selection/recipe";
import { RangeChartShapedData } from "./rangeChart-shapedData/rangeChart-shapedData";
import { rangeChartShapedDataDescription } from "./rangeChart-shapedData/description";
import { rangeChartShapedDataRecipe } from "./rangeChart-shapedData/recipe";
import { RangeChartVariableBarWidth } from "./rangeChart-variableBarWidth/rangeChart-variableBarWidth";
import { rangeChartVariableBarWidthDescription } from "./rangeChart-variableBarWidth/description";
import { rangeChartVariableBarWidthRecipe } from "./rangeChart-variableBarWidth/recipe";

const rangeChartItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: rangeChartDefaultDescription,
    recipe: rangeChartDefaultRecipe,
    Component: RangeChartDefault,
  },
  {
    id: "polar",
    name: "Polar",
    description: rangeChartPolarDescription,
    recipe: rangeChartPolarRecipe,
    Component: RangeChartPolar,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: rangeChartShapedDataDescription,
    recipe: rangeChartShapedDataRecipe,
    Component: RangeChartShapedData,
  },
  {
    id: "selection",
    name: "Selection",
    description: rangeChartSelectionDescription,
    recipe: rangeChartSelectionRecipe,
    Component: RangeChartSelection,
  },
  {
    id: "hide-show",
    name: "Hide and Show",
    description: rangeChartHideShowDescription,
    recipe: rangeChartHideShowRecipe,
    Component: RangeChartHideShow,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: rangeChartDataLabelsDescription,
    recipe: rangeChartDataLabelsRecipe,
    Component: RangeChartDataLabels,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: rangeChartLineTypesDescription,
    recipe: rangeChartLineTypesRecipe,
    Component: RangeChartLineTypes,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: rangeChartRefObjectDescription,
    recipe: rangeChartRefObjectRecipe,
    Component: RangeChartRefObject,
  },
  {
    id: "variable-bar-width",
    name: "Variable Bar Width",
    description: rangeChartVariableBarWidthDescription,
    recipe: rangeChartVariableBarWidthRecipe,
    Component: RangeChartVariableBarWidth,
  },
  {
    id: "animation",
    name: "Animation",
    description: rangeChartAnimationDescription,
    recipe: rangeChartAnimationRecipe,
    Component: RangeChartAnimation,
  },
];

export default function RangeChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Range chart examples"
      componentType="oj-chart"
      layoutId="rangeChartsNavigationLayout"
      items={rangeChartItems}
      initialItemId="overview"
      navigationTitle="Range Charts"
    />
  );
}
