import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { LineChartAnimation } from "./lineChart-animation/lineChart-animation";
import { lineChartAnimationDescription } from "./lineChart-animation/description";
import { lineChartAnimationRecipe } from "./lineChart-animation/recipe";
import { LineChartDataLabels } from "./lineChart-dataLabels/lineChart-dataLabels";
import { lineChartDataLabelsDescription } from "./lineChart-dataLabels/description";
import { lineChartDataLabelsRecipe } from "./lineChart-dataLabels/recipe";
import { LineChartDefault } from "./lineChart-default/lineChart-default";
import { lineChartDefaultDescription } from "./lineChart-default/description";
import { lineChartDefaultRecipe } from "./lineChart-default/recipe";
import { LineChartDualY } from "./lineChart-dualY/lineChart-dualY";
import { lineChartDualYDescription } from "./lineChart-dualY/description";
import { lineChartDualYRecipe } from "./lineChart-dualY/recipe";
import { LineChartHideShow } from "./lineChart-hideShow/lineChart-hideShow";
import { lineChartHideShowDescription } from "./lineChart-hideShow/description";
import { lineChartHideShowRecipe } from "./lineChart-hideShow/recipe";
import { LineChartLineTypes } from "./lineChart-lineTypes/lineChart-lineTypes";
import { lineChartLineTypesDescription } from "./lineChart-lineTypes/description";
import { lineChartLineTypesRecipe } from "./lineChart-lineTypes/recipe";
import { LineChartRefObject } from "./lineChart-refObject/lineChart-refObject";
import { lineChartRefObjectDescription } from "./lineChart-refObject/description";
import { lineChartRefObjectRecipe } from "./lineChart-refObject/recipe";
import { LineChartSelection } from "./lineChart-selection/lineChart-selection";
import { lineChartSelectionDescription } from "./lineChart-selection/description";
import { lineChartSelectionRecipe } from "./lineChart-selection/recipe";
import { LineChartShapedData } from "./lineChart-shapedData/lineChart-shapedData";
import { lineChartShapedDataDescription } from "./lineChart-shapedData/description";
import { lineChartShapedDataRecipe } from "./lineChart-shapedData/recipe";
import { LineChartStyles } from "./lineChart-styles/lineChart-styles";
import { lineChartStylesDescription } from "./lineChart-styles/description";
import { lineChartStylesRecipe } from "./lineChart-styles/recipe";

const lineChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: lineChartDefaultDescription,
    recipe: lineChartDefaultRecipe,
    Component: LineChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: lineChartAnimationDescription,
    recipe: lineChartAnimationRecipe,
    Component: LineChartAnimation,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: lineChartDataLabelsDescription,
    recipe: lineChartDataLabelsRecipe,
    Component: LineChartDataLabels,
  },
  {
    id: "dual-y-axis",
    name: "Dual Y Axis",
    description: lineChartDualYDescription,
    recipe: lineChartDualYRecipe,
    Component: LineChartDualY,
  },
  {
    id: "hide-show",
    name: "Hide & Show",
    description: lineChartHideShowDescription,
    recipe: lineChartHideShowRecipe,
    Component: LineChartHideShow,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: lineChartLineTypesDescription,
    recipe: lineChartLineTypesRecipe,
    Component: LineChartLineTypes,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: lineChartRefObjectDescription,
    recipe: lineChartRefObjectRecipe,
    Component: LineChartRefObject,
  },
  {
    id: "selection",
    name: "Selection",
    description: lineChartSelectionDescription,
    recipe: lineChartSelectionRecipe,
    Component: LineChartSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: lineChartShapedDataDescription,
    recipe: lineChartShapedDataRecipe,
    Component: LineChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: lineChartStylesDescription,
    recipe: lineChartStylesRecipe,
    Component: LineChartStyles,
  },
];

export default function LineChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Line chart examples"
      componentType="oj-chart"
      layoutId="lineChartsNavigationLayout"
      items={lineChartItems}
      initialItemId="overview"
      navigationTitle="Line Charts"
    />
  );
}
