import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { pieChartAnimationDescription } from "./pieChart-animation/description";
import { PieChartAnimation } from "./pieChart-animation/pieChart-animation";
import { pieChartAnimationRecipe } from "./pieChart-animation/recipe";
import { pieChartCenterCallbackDescription } from "./pieChart-centerCallback/description";
import { PieChartCenterCallback } from "./pieChart-centerCallback/pieChart-centerCallback";
import { pieChartCenterCallbackRecipe } from "./pieChart-centerCallback/recipe";
import { pieChartDataLabelsDescription } from "./pieChart-dataLabels/description";
import { PieChartDataLabels } from "./pieChart-dataLabels/pieChart-dataLabels";
import { pieChartDataLabelsRecipe } from "./pieChart-dataLabels/recipe";
import { pieChartDefaultDescription } from "./pieChart-default/description";
import { PieChartDefault } from "./pieChart-default/pieChart-default";
import { pieChartDefaultRecipe } from "./pieChart-default/recipe";
import { pieChartDonutDescription } from "./pieChart-donut/description";
import { PieChartDonut } from "./pieChart-donut/pieChart-donut";
import { pieChartDonutRecipe } from "./pieChart-donut/recipe";
import { pieChartHideShowDescription } from "./pieChart-hideShow/description";
import { PieChartHideShow } from "./pieChart-hideShow/pieChart-hideShow";
import { pieChartHideShowRecipe } from "./pieChart-hideShow/recipe";
import { pieChartNumberFormatDescription } from "./pieChart-numberFormat/description";
import { PieChartNumberFormat } from "./pieChart-numberFormat/pieChart-numberFormat";
import { pieChartNumberFormatRecipe } from "./pieChart-numberFormat/recipe";
import { pieChartSelectionDescription } from "./pieChart-selection/description";
import { PieChartSelection } from "./pieChart-selection/pieChart-selection";
import { pieChartSelectionRecipe } from "./pieChart-selection/recipe";
import { pieChartShapedDataDescription } from "./pieChart-shapedData/description";
import { PieChartShapedData } from "./pieChart-shapedData/pieChart-shapedData";
import { pieChartShapedDataRecipe } from "./pieChart-shapedData/recipe";
import { pieChartSortingDescription } from "./pieChart-sorting/description";
import { PieChartSorting } from "./pieChart-sorting/pieChart-sorting";
import { pieChartSortingRecipe } from "./pieChart-sorting/recipe";
import { pieChartStylesDescription } from "./pieChart-styles/description";
import { PieChartStyles } from "./pieChart-styles/pieChart-styles";
import { pieChartStylesRecipe } from "./pieChart-styles/recipe";

const pieChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: pieChartDefaultDescription,
    recipe: pieChartDefaultRecipe,
    Component: PieChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: pieChartAnimationDescription,
    recipe: pieChartAnimationRecipe,
    Component: PieChartAnimation,
  },
  {
    id: "center-template",
    name: "Center Content",
    description: pieChartCenterCallbackDescription,
    recipe: pieChartCenterCallbackRecipe,
    Component: PieChartCenterCallback,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: pieChartDataLabelsDescription,
    recipe: pieChartDataLabelsRecipe,
    Component: PieChartDataLabels,
  },
  {
    id: "donut",
    name: "Donut Charts",
    description: pieChartDonutDescription,
    recipe: pieChartDonutRecipe,
    Component: PieChartDonut,
  },
  {
    id: "hide-show",
    name: "Hide & Show",
    description: pieChartHideShowDescription,
    recipe: pieChartHideShowRecipe,
    Component: PieChartHideShow,
  },
  {
    id: "number-format",
    name: "Number Format",
    description: pieChartNumberFormatDescription,
    recipe: pieChartNumberFormatRecipe,
    Component: PieChartNumberFormat,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: pieChartShapedDataDescription,
    recipe: pieChartShapedDataRecipe,
    Component: PieChartShapedData,
  },
  {
    id: "selection",
    name: "Selection",
    description: pieChartSelectionDescription,
    recipe: pieChartSelectionRecipe,
    Component: PieChartSelection,
  },
  {
    id: "sorting",
    name: "Sorting",
    description: pieChartSortingDescription,
    recipe: pieChartSortingRecipe,
    Component: PieChartSorting,
  },
  {
    id: "styling",
    name: "Styles",
    description: pieChartStylesDescription,
    recipe: pieChartStylesRecipe,
    Component: PieChartStyles,
  },
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
