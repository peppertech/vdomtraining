import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { PyramidChartAnimation } from "./pyramidChart-animation/pyramidChart-animation";
import { pyramidChartAnimationDescription } from "./pyramidChart-animation/description";
import { pyramidChartAnimationRecipe } from "./pyramidChart-animation/recipe";
import { PyramidChartDefault } from "./pyramidChart-default/pyramidChart-default";
import { pyramidChartDefaultDescription } from "./pyramidChart-default/description";
import { pyramidChartDefaultRecipe } from "./pyramidChart-default/recipe";
import { PyramidChartLegend } from "./pyramidChart-legend/pyramidChart-legend";
import { pyramidChartLegendDescription } from "./pyramidChart-legend/description";
import { pyramidChartLegendRecipe } from "./pyramidChart-legend/recipe";
import { PyramidChartSelection } from "./pyramidChart-selection/pyramidChart-selection";
import { pyramidChartSelectionDescription } from "./pyramidChart-selection/description";
import { pyramidChartSelectionRecipe } from "./pyramidChart-selection/recipe";
import { PyramidChartShapedData } from "./pyramidChart-shapedData/pyramidChart-shapedData";
import { pyramidChartShapedDataDescription } from "./pyramidChart-shapedData/description";
import { pyramidChartShapedDataRecipe } from "./pyramidChart-shapedData/recipe";
import { PyramidChartStyles } from "./pyramidChart-styles/pyramidChart-styles";
import { pyramidChartStylesDescription } from "./pyramidChart-styles/description";
import { pyramidChartStylesRecipe } from "./pyramidChart-styles/recipe";

const pyramidChartItems = [
  { id: "overview", name: "Overview", description: pyramidChartDefaultDescription, recipe: pyramidChartDefaultRecipe, Component: PyramidChartDefault },
  { id: "shaped-data", name: "Shaped Data", description: pyramidChartShapedDataDescription, recipe: pyramidChartShapedDataRecipe, Component: PyramidChartShapedData },
  { id: "selection", name: "Selection", description: pyramidChartSelectionDescription, recipe: pyramidChartSelectionRecipe, Component: PyramidChartSelection },
  { id: "legend", name: "Legend", description: pyramidChartLegendDescription, recipe: pyramidChartLegendRecipe, Component: PyramidChartLegend },
  { id: "animation", name: "Animation", description: pyramidChartAnimationDescription, recipe: pyramidChartAnimationRecipe, Component: PyramidChartAnimation },
  { id: "styling", name: "Styling", description: pyramidChartStylesDescription, recipe: pyramidChartStylesRecipe, Component: PyramidChartStyles },
];

export default function PyramidChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Pyramid chart examples"
      componentType="oj-chart"
      layoutId="pyramidChartsNavigationLayout"
      items={pyramidChartItems}
      initialItemId="overview"
      navigationTitle="Pyramid Charts"
    />
  );
}
