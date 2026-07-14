import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { rangeChartAnimationDescription } from "./rangeChart-animation/description";
import { RangeChartAnimation } from "./rangeChart-animation/rangeChart-animation";
import { rangeChartAnimationRecipe } from "./rangeChart-animation/recipe";
import { rangeChartDataLabelsDescription } from "./rangeChart-dataLabels/description";
import { RangeChartDataLabels } from "./rangeChart-dataLabels/rangeChart-dataLabels";
import { rangeChartDataLabelsRecipe } from "./rangeChart-dataLabels/recipe";
import { rangeChartDefaultDescription } from "./rangeChart-default/description";
import { RangeChartDefault } from "./rangeChart-default/rangeChart-default";
import { rangeChartDefaultRecipe } from "./rangeChart-default/recipe";
import { rangeChartHideShowDescription } from "./rangeChart-hideShow/description";
import { RangeChartHideShow } from "./rangeChart-hideShow/rangeChart-hideShow";
import { rangeChartHideShowRecipe } from "./rangeChart-hideShow/recipe";
import { rangeChartLineTypesDescription } from "./rangeChart-lineTypes/description";
import { RangeChartLineTypes } from "./rangeChart-lineTypes/rangeChart-lineTypes";
import { rangeChartLineTypesRecipe } from "./rangeChart-lineTypes/recipe";
import { rangeChartPolarDescription } from "./rangeChart-polar/description";
import { RangeChartPolar } from "./rangeChart-polar/rangeChart-polar";
import { rangeChartPolarRecipe } from "./rangeChart-polar/recipe";
import { rangeChartRefObjectDescription } from "./rangeChart-refObject/description";
import { RangeChartRefObject } from "./rangeChart-refObject/rangeChart-refObject";
import { rangeChartRefObjectRecipe } from "./rangeChart-refObject/recipe";
import { rangeChartSelectionDescription } from "./rangeChart-selection/description";
import { RangeChartSelection } from "./rangeChart-selection/rangeChart-selection";
import { rangeChartSelectionRecipe } from "./rangeChart-selection/recipe";
import { rangeChartShapedDataDescription } from "./rangeChart-shapedData/description";
import { RangeChartShapedData } from "./rangeChart-shapedData/rangeChart-shapedData";
import { rangeChartShapedDataRecipe } from "./rangeChart-shapedData/recipe";
import { rangeChartVariableBarWidthDescription } from "./rangeChart-variableBarWidth/description";
import { RangeChartVariableBarWidth } from "./rangeChart-variableBarWidth/rangeChart-variableBarWidth";
import { rangeChartVariableBarWidthRecipe } from "./rangeChart-variableBarWidth/recipe";

const rangeChartItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Basic",
    description: rangeChartDefaultDescription,
    recipe: rangeChartDefaultRecipe,
    Component: RangeChartDefault,
  },
    {
    id: "animation",
    name: "Animations",
    description: rangeChartAnimationDescription,
    recipe: rangeChartAnimationRecipe,
    Component: RangeChartAnimation,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: rangeChartDataLabelsDescription,
    recipe: rangeChartDataLabelsRecipe,
    Component: RangeChartDataLabels,
  },
  {
    id: "hide-show",
    name: "Hide & Show",
    description: rangeChartHideShowDescription,
    recipe: rangeChartHideShowRecipe,
    Component: RangeChartHideShow,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: rangeChartLineTypesDescription,
    recipe: rangeChartLineTypesRecipe,
    Component: RangeChartLineTypes,
  },
  {
    id: "polar",
    name: "Polar Coordinates",
    description: rangeChartPolarDescription,
    recipe: rangeChartPolarRecipe,
    Component: RangeChartPolar,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: rangeChartRefObjectDescription,
    recipe: rangeChartRefObjectRecipe,
    Component: RangeChartRefObject,
  },
  {
    id: "selection",
    name: "Selection",
    description: rangeChartSelectionDescription,
    recipe: rangeChartSelectionRecipe,
    Component: RangeChartSelection,
  },
  
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: rangeChartShapedDataDescription,
    recipe: rangeChartShapedDataRecipe,
    Component: RangeChartShapedData,
  },
  
  {
    id: "variable-bar-width",
    name: "Variable Bar Width",
    description: rangeChartVariableBarWidthDescription,
    recipe: rangeChartVariableBarWidthRecipe,
    Component: RangeChartVariableBarWidth,
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
