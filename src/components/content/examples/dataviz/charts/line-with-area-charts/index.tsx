import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { lineWithAreaChartAnimationDescription } from "./lineWithAreaChart-animation/description";
import { LineWithAreaChartAnimation } from "./lineWithAreaChart-animation/lineWithAreaChart-animation";
import { lineWithAreaChartAnimationRecipe } from "./lineWithAreaChart-animation/recipe";
import { lineWithAreaChartDataLabelsDescription } from "./lineWithAreaChart-dataLabels/description";
import { LineWithAreaChartDataLabels } from "./lineWithAreaChart-dataLabels/lineWithAreaChart-dataLabels";
import { lineWithAreaChartDataLabelsRecipe } from "./lineWithAreaChart-dataLabels/recipe";
import { lineWithAreaChartDefaultDescription } from "./lineWithAreaChart-default/description";
import { LineWithAreaChartDefault } from "./lineWithAreaChart-default/lineWithAreaChart-default";
import { lineWithAreaChartDefaultRecipe } from "./lineWithAreaChart-default/recipe";
import { lineWithAreaChartHideShowDescription } from "./lineWithAreaChart-hideShow/description";
import { LineWithAreaChartHideShow } from "./lineWithAreaChart-hideShow/lineWithAreaChart-hideShow";
import { lineWithAreaChartHideShowRecipe } from "./lineWithAreaChart-hideShow/recipe";
import { lineWithAreaChartLineTypesDescription } from "./lineWithAreaChart-lineTypes/description";
import { LineWithAreaChartLineTypes } from "./lineWithAreaChart-lineTypes/lineWithAreaChart-lineTypes";
import { lineWithAreaChartLineTypesRecipe } from "./lineWithAreaChart-lineTypes/recipe";
import { lineWithAreaChartRefObjectDescription } from "./lineWithAreaChart-refObject/description";
import { LineWithAreaChartRefObject } from "./lineWithAreaChart-refObject/lineWithAreaChart-refObject";
import { lineWithAreaChartRefObjectRecipe } from "./lineWithAreaChart-refObject/recipe";
import { lineWithAreaChartSelectionDescription } from "./lineWithAreaChart-selection/description";
import { LineWithAreaChartSelection } from "./lineWithAreaChart-selection/lineWithAreaChart-selection";
import { lineWithAreaChartSelectionRecipe } from "./lineWithAreaChart-selection/recipe";
import { lineWithAreaChartShapedDataDescription } from "./lineWithAreaChart-shapedData/description";
import { LineWithAreaChartShapedData } from "./lineWithAreaChart-shapedData/lineWithAreaChart-shapedData";
import { lineWithAreaChartShapedDataRecipe } from "./lineWithAreaChart-shapedData/recipe";
import { lineWithAreaChartStylesDescription } from "./lineWithAreaChart-styles/description";
import { LineWithAreaChartStyles } from "./lineWithAreaChart-styles/lineWithAreaChart-styles";
import { lineWithAreaChartStylesRecipe } from "./lineWithAreaChart-styles/recipe";

const lineWithAreaChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: lineWithAreaChartDefaultDescription,
    recipe: lineWithAreaChartDefaultRecipe,
    Component: LineWithAreaChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: lineWithAreaChartAnimationDescription,
    recipe: lineWithAreaChartAnimationRecipe,
    Component: LineWithAreaChartAnimation,
  },
   {
    id: "data-labels",
    name: "Data Labels",
    description: lineWithAreaChartDataLabelsDescription,
    recipe: lineWithAreaChartDataLabelsRecipe,
    Component: LineWithAreaChartDataLabels,
  },
  {
    id: "hide-show",
    name: "Hide and Show",
    description: lineWithAreaChartHideShowDescription,
    recipe: lineWithAreaChartHideShowRecipe,
    Component: LineWithAreaChartHideShow,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: lineWithAreaChartLineTypesDescription,
    recipe: lineWithAreaChartLineTypesRecipe,
    Component: LineWithAreaChartLineTypes,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: lineWithAreaChartRefObjectDescription,
    recipe: lineWithAreaChartRefObjectRecipe,
    Component: LineWithAreaChartRefObject,
  },
  {
    id: "selection",
    name: "Selection",
    description: lineWithAreaChartSelectionDescription,
    recipe: lineWithAreaChartSelectionRecipe,
    Component: LineWithAreaChartSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: lineWithAreaChartShapedDataDescription,
    recipe: lineWithAreaChartShapedDataRecipe,
    Component: LineWithAreaChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: lineWithAreaChartStylesDescription,
    recipe: lineWithAreaChartStylesRecipe,
    Component: LineWithAreaChartStyles,
  },
];

export default function LineWithAreaChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Line with area chart examples"
      componentType="oj-chart"
      layoutId="lineWithAreaChartsNavigationLayout"
      items={lineWithAreaChartItems}
      initialItemId="overview"
      navigationTitle="Line with Area Charts"
    />
  );
}
