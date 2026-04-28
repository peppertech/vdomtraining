import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { BarChartAnimation } from "./barChart-animation/barChart-animation";
import { barChartAnimationDescription } from "./barChart-animation/description";
import { barChartAnimationRecipe } from "./barChart-animation/recipe";
import { BarChartAttrGroups } from "./barChart-attrGroups/barChart-attrGroups";
import { barChartAttrGroupsDescription } from "./barChart-attrGroups/description";
import { barChartAttrGroupsRecipe } from "./barChart-attrGroups/recipe";
import { BarChartDataLabels } from "./barChart-dataLabels/barChart-dataLabels";
import { barChartDataLabelsDescription } from "./barChart-dataLabels/description";
import { barChartDataLabelsRecipe } from "./barChart-dataLabels/recipe";
import { BarChartDefault } from "./barChart-default/barChart-default";
import { barChartDefaultDescription } from "./barChart-default/description";
import { barChartDefaultRecipe } from "./barChart-default/recipe";
import { BarChartDualY } from "./barChart-dualY/barChart-dualY";
import { barChartDualYDescription } from "./barChart-dualY/description";
import { barChartDualYRecipe } from "./barChart-dualY/recipe";
import { BarChartHideShow } from "./barChart-hideShow/barChart-hideShow";
import { barChartHideShowDescription } from "./barChart-hideShow/description";
import { barChartHideShowRecipe } from "./barChart-hideShow/recipe";
import { BarChartRefObject } from "./barChart-refObject/barChart-refObject";
import { barChartRefObjectDescription } from "./barChart-refObject/description";
import { barChartRefObjectRecipe } from "./barChart-refObject/recipe";
import { BarChartSelection } from "./barChart-selection/barChart-selection";
import { barChartSelectionDescription } from "./barChart-selection/description";
import { barChartSelectionRecipe } from "./barChart-selection/recipe";
import { BarChartShapedData } from "./barChart-shapedData/barChart-shapedData";
import { barChartShapedDataDescription } from "./barChart-shapedData/description";
import { barChartShapedDataRecipe } from "./barChart-shapedData/recipe";
import { BarChartStackLabelProvider } from "./barChart-stackLabelProvider/barChart-stackLabelProvider";
import { barChartStackLabelProviderDescription } from "./barChart-stackLabelProvider/description";
import { barChartStackLabelProviderRecipe } from "./barChart-stackLabelProvider/recipe";
import { BarChartStyles } from "./barChart-styles/barChart-styles";
import { barChartStylesDescription } from "./barChart-styles/description";
import { barChartStylesRecipe } from "./barChart-styles/recipe";
import { BarChartVariableBarWidth } from "./barChart-variableBarWidth/barChart-variableBarWidth";
import { barChartVariableBarWidthDescription } from "./barChart-variableBarWidth/description";
import { barChartVariableBarWidthRecipe } from "./barChart-variableBarWidth/recipe";

const barChartItems = [
  {
    id: "overview",
    name: "Overview",
    description: barChartDefaultDescription,
    recipe: barChartDefaultRecipe,
    Component: BarChartDefault,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: barChartShapedDataDescription,
    recipe: barChartShapedDataRecipe,
    Component: BarChartShapedData,
  },
  {
    id: "selection",
    name: "Selection",
    description: barChartSelectionDescription,
    recipe: barChartSelectionRecipe,
    Component: BarChartSelection,
  },
  {
    id: "hide-show",
    name: "Hide and Show",
    description: barChartHideShowDescription,
    recipe: barChartHideShowRecipe,
    Component: BarChartHideShow,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: barChartDataLabelsDescription,
    recipe: barChartDataLabelsRecipe,
    Component: BarChartDataLabels,
  },
  {
    id: "stack-labels",
    name: "Stack Labels",
    description: barChartStackLabelProviderDescription,
    recipe: barChartStackLabelProviderRecipe,
    Component: BarChartStackLabelProvider,
  },
  {
    id: "dual-y-axis",
    name: "Dual Y Axis",
    description: barChartDualYDescription,
    recipe: barChartDualYRecipe,
    Component: BarChartDualY,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: barChartRefObjectDescription,
    recipe: barChartRefObjectRecipe,
    Component: BarChartRefObject,
  },
  {
    id: "attribute-groups",
    name: "Attribute Groups",
    description: barChartAttrGroupsDescription,
    recipe: barChartAttrGroupsRecipe,
    Component: BarChartAttrGroups,
  },
  {
    id: "variable-bar-width",
    name: "Variable Bar Width",
    description: barChartVariableBarWidthDescription,
    recipe: barChartVariableBarWidthRecipe,
    Component: BarChartVariableBarWidth,
  },
  {
    id: "animation",
    name: "Animation",
    description: barChartAnimationDescription,
    recipe: barChartAnimationRecipe,
    Component: BarChartAnimation,
  },
  {
    id: "styling",
    name: "Styling",
    description: barChartStylesDescription,
    recipe: barChartStylesRecipe,
    Component: BarChartStyles,
  },
];

export default function BarChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Bar chart examples"
      componentType="oj-chart"
      layoutId="barChartsNavigationLayout"
      items={barChartItems}
      initialItemId="overview"
      navigationTitle="Bar Charts"
    />
  );
}
