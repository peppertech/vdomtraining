import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { PieChartAnimation } from "./pieChart-animation/pieChart-animation";
import { pieChartAnimationDescription } from "./pieChart-animation/description";
import { pieChartAnimationRecipe } from "./pieChart-animation/recipe";
import { PieChartCenterCallback } from "./pieChart-centerCallback/pieChart-centerCallback";
import { pieChartCenterCallbackDescription } from "./pieChart-centerCallback/description";
import { pieChartCenterCallbackRecipe } from "./pieChart-centerCallback/recipe";
import { PieChartDataLabels } from "./pieChart-dataLabels/pieChart-dataLabels";
import { pieChartDataLabelsDescription } from "./pieChart-dataLabels/description";
import { pieChartDataLabelsRecipe } from "./pieChart-dataLabels/recipe";
import { PieChartDefault } from "./pieChart-default/pieChart-default";
import { pieChartDefaultDescription } from "./pieChart-default/description";
import { pieChartDefaultRecipe } from "./pieChart-default/recipe";
import { PieChartDonut } from "./pieChart-donut/pieChart-donut";
import { pieChartDonutDescription } from "./pieChart-donut/description";
import { pieChartDonutRecipe } from "./pieChart-donut/recipe";
import { PieChartHideShow } from "./pieChart-hideShow/pieChart-hideShow";
import { pieChartHideShowDescription } from "./pieChart-hideShow/description";
import { pieChartHideShowRecipe } from "./pieChart-hideShow/recipe";
import { PieChartNumberFormat } from "./pieChart-numberFormat/pieChart-numberFormat";
import { pieChartNumberFormatDescription } from "./pieChart-numberFormat/description";
import { pieChartNumberFormatRecipe } from "./pieChart-numberFormat/recipe";
import { PieChartSelection } from "./pieChart-selection/pieChart-selection";
import { pieChartSelectionDescription } from "./pieChart-selection/description";
import { pieChartSelectionRecipe } from "./pieChart-selection/recipe";
import { PieChartShapedData } from "./pieChart-shapedData/pieChart-shapedData";
import { pieChartShapedDataDescription } from "./pieChart-shapedData/description";
import { pieChartShapedDataRecipe } from "./pieChart-shapedData/recipe";
import { PieChartSorting } from "./pieChart-sorting/pieChart-sorting";
import { pieChartSortingDescription } from "./pieChart-sorting/description";
import { pieChartSortingRecipe } from "./pieChart-sorting/recipe";
import { PieChartStyles } from "./pieChart-styles/pieChart-styles";
import { pieChartStylesDescription } from "./pieChart-styles/description";
import { pieChartStylesRecipe } from "./pieChart-styles/recipe";

const pieChartItems = [
  { id: "overview", name: "Overview", description: pieChartDefaultDescription, recipe: pieChartDefaultRecipe, Component: PieChartDefault },
  { id: "donut", name: "Donut", description: pieChartDonutDescription, recipe: pieChartDonutRecipe, Component: PieChartDonut },
  { id: "shaped-data", name: "Shaped Data", description: pieChartShapedDataDescription, recipe: pieChartShapedDataRecipe, Component: PieChartShapedData },
  { id: "selection", name: "Selection", description: pieChartSelectionDescription, recipe: pieChartSelectionRecipe, Component: PieChartSelection },
  { id: "hide-show", name: "Hide and Show", description: pieChartHideShowDescription, recipe: pieChartHideShowRecipe, Component: PieChartHideShow },
  { id: "data-labels", name: "Data Labels", description: pieChartDataLabelsDescription, recipe: pieChartDataLabelsRecipe, Component: PieChartDataLabels },
  { id: "center-template", name: "Center Template", description: pieChartCenterCallbackDescription, recipe: pieChartCenterCallbackRecipe, Component: PieChartCenterCallback },
  { id: "number-format", name: "Number Format", description: pieChartNumberFormatDescription, recipe: pieChartNumberFormatRecipe, Component: PieChartNumberFormat },
  { id: "sorting", name: "Sorting", description: pieChartSortingDescription, recipe: pieChartSortingRecipe, Component: PieChartSorting },
  { id: "animation", name: "Animation", description: pieChartAnimationDescription, recipe: pieChartAnimationRecipe, Component: PieChartAnimation },
  { id: "styling", name: "Styling", description: pieChartStylesDescription, recipe: pieChartStylesRecipe, Component: PieChartStyles },
];

export default function PieChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Pie and donut chart examples"
      componentType="oj-chart"
      layoutId="pieChartsNavigationLayout"
      items={pieChartItems}
      initialItemId="overview"
      navigationTitle="Pie / Donut Charts"
    />
  );
}
