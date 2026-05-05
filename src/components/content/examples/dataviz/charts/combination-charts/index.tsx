import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { CombinationChartAnimation } from "./combinationChart-animation/combinationChart-animation";
import { combinationChartAnimationDescription } from "./combinationChart-animation/description";
import { combinationChartAnimationRecipe } from "./combinationChart-animation/recipe";
import { CombinationChartDataLabels } from "./combinationChart-dataLabels/combinationChart-dataLabels";
import { combinationChartDataLabelsDescription } from "./combinationChart-dataLabels/description";
import { combinationChartDataLabelsRecipe } from "./combinationChart-dataLabels/recipe";
import { CombinationChartDefault } from "./combinationChart-default/combinationChart-default";
import { combinationChartDefaultDescription } from "./combinationChart-default/description";
import { combinationChartDefaultRecipe } from "./combinationChart-default/recipe";
import { CombinationChartDualY } from "./combinationChart-dualY/combinationChart-dualY";
import { combinationChartDualYDescription } from "./combinationChart-dualY/description";
import { combinationChartDualYRecipe } from "./combinationChart-dualY/recipe";
import { CombinationChartHideShow } from "./combinationChart-hideShow/combinationChart-hideShow";
import { combinationChartHideShowDescription } from "./combinationChart-hideShow/description";
import { combinationChartHideShowRecipe } from "./combinationChart-hideShow/recipe";
import { CombinationChartRefObject } from "./combinationChart-refObject/combinationChart-refObject";
import { combinationChartRefObjectDescription } from "./combinationChart-refObject/description";
import { combinationChartRefObjectRecipe } from "./combinationChart-refObject/recipe";
import { CombinationChartSelection } from "./combinationChart-selection/combinationChart-selection";
import { combinationChartSelectionDescription } from "./combinationChart-selection/description";
import { combinationChartSelectionRecipe } from "./combinationChart-selection/recipe";
import { CombinationChartShapedData } from "./combinationChart-shapedData/combinationChart-shapedData";
import { combinationChartShapedDataDescription } from "./combinationChart-shapedData/description";
import { combinationChartShapedDataRecipe } from "./combinationChart-shapedData/recipe";
import { CombinationChartStyles } from "./combinationChart-styles/combinationChart-styles";
import { combinationChartStylesDescription } from "./combinationChart-styles/description";
import { combinationChartStylesRecipe } from "./combinationChart-styles/recipe";

const combinationChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: combinationChartDefaultDescription,
    recipe: combinationChartDefaultRecipe,
    Component: CombinationChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: combinationChartAnimationDescription,
    recipe: combinationChartAnimationRecipe,
    Component: CombinationChartAnimation,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: combinationChartDataLabelsDescription,
    recipe: combinationChartDataLabelsRecipe,
    Component: CombinationChartDataLabels,
  },
  {
    id: "dual-y-axis",
    name: "Dual Y",
    description: combinationChartDualYDescription,
    recipe: combinationChartDualYRecipe,
    Component: CombinationChartDualY,
  },
  {
    id: "hide-show",
    name: "Hide & Show",
    description: combinationChartHideShowDescription,
    recipe: combinationChartHideShowRecipe,
    Component: CombinationChartHideShow,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: combinationChartRefObjectDescription,
    recipe: combinationChartRefObjectRecipe,
    Component: CombinationChartRefObject,
  },
  {
    id: "selection",
    name: "Selection",
    description: combinationChartSelectionDescription,
    recipe: combinationChartSelectionRecipe,
    Component: CombinationChartSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: combinationChartShapedDataDescription,
    recipe: combinationChartShapedDataRecipe,
    Component: CombinationChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: combinationChartStylesDescription,
    recipe: combinationChartStylesRecipe,
    Component: CombinationChartStyles,
  },
];

export default function CombinationChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Combination chart examples"
      componentType="oj-chart"
      layoutId="combinationChartsNavigationLayout"
      items={combinationChartItems}
      initialItemId="overview"
      navigationTitle="Combination Charts"
    />
  );
}
