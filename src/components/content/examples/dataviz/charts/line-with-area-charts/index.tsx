import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { LineWithAreaChartAnimation } from "./lineWithAreaChart-animation/lineWithAreaChart-animation";
import { lineWithAreaChartAnimationDescription } from "./lineWithAreaChart-animation/description";
import { lineWithAreaChartAnimationRecipe } from "./lineWithAreaChart-animation/recipe";
import { LineWithAreaChartDataLabels } from "./lineWithAreaChart-dataLabels/lineWithAreaChart-dataLabels";
import { lineWithAreaChartDataLabelsDescription } from "./lineWithAreaChart-dataLabels/description";
import { lineWithAreaChartDataLabelsRecipe } from "./lineWithAreaChart-dataLabels/recipe";
import { LineWithAreaChartDefault } from "./lineWithAreaChart-default/lineWithAreaChart-default";
import { lineWithAreaChartDefaultDescription } from "./lineWithAreaChart-default/description";
import { lineWithAreaChartDefaultRecipe } from "./lineWithAreaChart-default/recipe";
import { LineWithAreaChartHideShow } from "./lineWithAreaChart-hideShow/lineWithAreaChart-hideShow";
import { lineWithAreaChartHideShowDescription } from "./lineWithAreaChart-hideShow/description";
import { lineWithAreaChartHideShowRecipe } from "./lineWithAreaChart-hideShow/recipe";
import { LineWithAreaChartLineTypes } from "./lineWithAreaChart-lineTypes/lineWithAreaChart-lineTypes";
import { lineWithAreaChartLineTypesDescription } from "./lineWithAreaChart-lineTypes/description";
import { lineWithAreaChartLineTypesRecipe } from "./lineWithAreaChart-lineTypes/recipe";
import { LineWithAreaChartRefObject } from "./lineWithAreaChart-refObject/lineWithAreaChart-refObject";
import { lineWithAreaChartRefObjectDescription } from "./lineWithAreaChart-refObject/description";
import { lineWithAreaChartRefObjectRecipe } from "./lineWithAreaChart-refObject/recipe";
import { LineWithAreaChartSelection } from "./lineWithAreaChart-selection/lineWithAreaChart-selection";
import { lineWithAreaChartSelectionDescription } from "./lineWithAreaChart-selection/description";
import { lineWithAreaChartSelectionRecipe } from "./lineWithAreaChart-selection/recipe";
import { LineWithAreaChartShapedData } from "./lineWithAreaChart-shapedData/lineWithAreaChart-shapedData";
import { lineWithAreaChartShapedDataDescription } from "./lineWithAreaChart-shapedData/description";
import { lineWithAreaChartShapedDataRecipe } from "./lineWithAreaChart-shapedData/recipe";
import { LineWithAreaChartStyles } from "./lineWithAreaChart-styles/lineWithAreaChart-styles";
import { lineWithAreaChartStylesDescription } from "./lineWithAreaChart-styles/description";
import { lineWithAreaChartStylesRecipe } from "./lineWithAreaChart-styles/recipe";

const lineWithAreaChartItems = [
  { id: "overview", name: "Overview", description: lineWithAreaChartDefaultDescription, recipe: lineWithAreaChartDefaultRecipe, Component: LineWithAreaChartDefault },
  { id: "shaped-data", name: "Shaped Data", description: lineWithAreaChartShapedDataDescription, recipe: lineWithAreaChartShapedDataRecipe, Component: LineWithAreaChartShapedData },
  { id: "selection", name: "Selection", description: lineWithAreaChartSelectionDescription, recipe: lineWithAreaChartSelectionRecipe, Component: LineWithAreaChartSelection },
  { id: "hide-show", name: "Hide and Show", description: lineWithAreaChartHideShowDescription, recipe: lineWithAreaChartHideShowRecipe, Component: LineWithAreaChartHideShow },
  { id: "data-labels", name: "Data Labels", description: lineWithAreaChartDataLabelsDescription, recipe: lineWithAreaChartDataLabelsRecipe, Component: LineWithAreaChartDataLabels },
  { id: "line-types", name: "Line Types", description: lineWithAreaChartLineTypesDescription, recipe: lineWithAreaChartLineTypesRecipe, Component: LineWithAreaChartLineTypes },
  { id: "reference-objects", name: "Reference Objects", description: lineWithAreaChartRefObjectDescription, recipe: lineWithAreaChartRefObjectRecipe, Component: LineWithAreaChartRefObject },
  { id: "animation", name: "Animation", description: lineWithAreaChartAnimationDescription, recipe: lineWithAreaChartAnimationRecipe, Component: LineWithAreaChartAnimation },
  { id: "styling", name: "Styling", description: lineWithAreaChartStylesDescription, recipe: lineWithAreaChartStylesRecipe, Component: LineWithAreaChartStyles },
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
