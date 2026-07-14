import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { pyramidChartAnimationDescription } from "./pyramidChart-animation/description";
import { PyramidChartAnimation } from "./pyramidChart-animation/pyramidChart-animation";
import { pyramidChartAnimationRecipe } from "./pyramidChart-animation/recipe";
import { pyramidChartDefaultDescription } from "./pyramidChart-default/description";
import { PyramidChartDefault } from "./pyramidChart-default/pyramidChart-default";
import { pyramidChartDefaultRecipe } from "./pyramidChart-default/recipe";
import { pyramidChartLegendDescription } from "./pyramidChart-legend/description";
import { PyramidChartLegend } from "./pyramidChart-legend/pyramidChart-legend";
import { pyramidChartLegendRecipe } from "./pyramidChart-legend/recipe";
import { pyramidChartSelectionDescription } from "./pyramidChart-selection/description";
import { PyramidChartSelection } from "./pyramidChart-selection/pyramidChart-selection";
import { pyramidChartSelectionRecipe } from "./pyramidChart-selection/recipe";
import { pyramidChartShapedDataDescription } from "./pyramidChart-shapedData/description";
import { PyramidChartShapedData } from "./pyramidChart-shapedData/pyramidChart-shapedData";
import { pyramidChartShapedDataRecipe } from "./pyramidChart-shapedData/recipe";
import { pyramidChartStylesDescription } from "./pyramidChart-styles/description";
import { PyramidChartStyles } from "./pyramidChart-styles/pyramidChart-styles";
import { pyramidChartStylesRecipe } from "./pyramidChart-styles/recipe";

const pyramidChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: pyramidChartDefaultDescription,
    recipe: pyramidChartDefaultRecipe,
    Component: PyramidChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: pyramidChartAnimationDescription,
    recipe: pyramidChartAnimationRecipe,
    Component: PyramidChartAnimation,
  },
  {
    id: "legend",
    name: "Legend",
    description: pyramidChartLegendDescription,
    recipe: pyramidChartLegendRecipe,
    Component: PyramidChartLegend,
  },
  {
    id: "selection",
    name: "Selection",
    description: pyramidChartSelectionDescription,
    recipe: pyramidChartSelectionRecipe,
    Component: PyramidChartSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: pyramidChartShapedDataDescription,
    recipe: pyramidChartShapedDataRecipe,
    Component: PyramidChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: pyramidChartStylesDescription,
    recipe: pyramidChartStylesRecipe,
    Component: PyramidChartStyles,
  },
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
