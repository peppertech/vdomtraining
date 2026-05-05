import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { StockChartAnimations } from "./stockChart-animations/stockChart-animations";
import { stockChartAnimationsDescription } from "./stockChart-animations/description";
import { stockChartAnimationsRecipe } from "./stockChart-animations/recipe";
import { StockChartComparison } from "./stockChart-comparison/stockChart-comparison";
import { stockChartComparisonDescription } from "./stockChart-comparison/description";
import { stockChartComparisonRecipe } from "./stockChart-comparison/recipe";
import { StockChartDefault } from "./stockChart-default/stockChart-default";
import { stockChartDefaultDescription } from "./stockChart-default/description";
import { stockChartDefaultRecipe } from "./stockChart-default/recipe";
import { StockChartSelection } from "./stockChart-selection/stockChart-selection";
import { stockChartSelectionDescription } from "./stockChart-selection/description";
import { stockChartSelectionRecipe } from "./stockChart-selection/recipe";
import { StockChartShapedData } from "./stockChart-shapedData/stockChart-shapedData";
import { stockChartShapedDataDescription } from "./stockChart-shapedData/description";
import { stockChartShapedDataRecipe } from "./stockChart-shapedData/recipe";
import { StockChartStyles } from "./stockChart-styles/stockChart-styles";
import { stockChartStylesDescription } from "./stockChart-styles/description";
import { stockChartStylesRecipe } from "./stockChart-styles/recipe";

const stockChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: stockChartDefaultDescription,
    recipe: stockChartDefaultRecipe,
    Component: StockChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: stockChartAnimationsDescription,
    recipe: stockChartAnimationsRecipe,
    Component: StockChartAnimations,
  },
  {
    id: "comparison",
    name: "Comparison",
    description: stockChartComparisonDescription,
    recipe: stockChartComparisonRecipe,
    Component: StockChartComparison,
  },
  {
    id: "selection",
    name: "Selection",
    description: stockChartSelectionDescription,
    recipe: stockChartSelectionRecipe,
    Component: StockChartSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: stockChartShapedDataDescription,
    recipe: stockChartShapedDataRecipe,
    Component: StockChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: stockChartStylesDescription,
    recipe: stockChartStylesRecipe,
    Component: StockChartStyles,
  },
];

export default function StockChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Stock chart examples"
      componentType="oj-chart"
      layoutId="stockChartsNavigationLayout"
      items={stockChartItems}
      initialItemId="overview"
      navigationTitle="Stock Charts"
    />
  );
}
