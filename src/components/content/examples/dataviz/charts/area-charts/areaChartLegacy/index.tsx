import { h } from "preact";
import { RecipePageTemplate } from "../../../../../../shared/demo-page-layout/recipe-page-template";
import { AreaChartAnimation } from "./areaChart-animation/areaChart-animation";
import { areaChartAnimationDescription } from "./areaChart-animation/description";
import { areaChartAnimationRecipe } from "./areaChart-animation/recipe";
import { AreaChartDataLabels } from "./areaChart-dataLabels/areaChart-dataLabels";
import { areaChartDataLabelsDescription } from "./areaChart-dataLabels/description";
import { areaChartDataLabelsRecipe } from "./areaChart-dataLabels/recipe";
import { AreaChartDefault } from "./areaChart-default/areaChart-default";
import { areaChartDefaultDescription } from "./areaChart-default/description";
import { areaChartDefaultRecipe } from "./areaChart-default/recipe";
import { AreaChartHideShow } from "./areaChart-hideShow/areaChart-hideShow";
import { areaChartHideShowDescription } from "./areaChart-hideShow/description";
import { areaChartHideShowRecipe } from "./areaChart-hideShow/recipe";
import { AreaChartLineTypes } from "./areaChart-lineTypes/areaChart-lineTypes";
import { areaChartLineTypesDescription } from "./areaChart-lineTypes/description";
import { areaChartLineTypesRecipe } from "./areaChart-lineTypes/recipe";
import { AreaChartRefObject } from "./areaChart-refObject/areaChart-refObject";
import { areaChartRefObjectDescription } from "./areaChart-refObject/description";
import { areaChartRefObjectRecipe } from "./areaChart-refObject/recipe";
import { AreaChartSelection } from "./areaChart-selection/areaChart-selection";
import { areaChartSelectionDescription } from "./areaChart-selection/description";
import { areaChartSelectionRecipe } from "./areaChart-selection/recipe";
import { AreaChartShapedData } from "./areaChart-shapedData/areaChart-shapedData";
import { areaChartShapedDataDescription } from "./areaChart-shapedData/description";
import { areaChartShapedDataRecipe } from "./areaChart-shapedData/recipe";
import { AreaChartStyles } from "./areaChart-styles/areaChart-styles";
import { areaChartStylesDescription } from "./areaChart-styles/description";
import { areaChartStylesRecipe } from "./areaChart-styles/recipe";

const areaChartLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: areaChartDefaultDescription,
    recipe: areaChartDefaultRecipe,
    Component: AreaChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: areaChartAnimationDescription,
    recipe: areaChartAnimationRecipe,
    Component: AreaChartAnimation,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: areaChartDataLabelsDescription,
    recipe: areaChartDataLabelsRecipe,
    Component: AreaChartDataLabels,
  },
  {
    id: "hide-show",
    name: "Hide and Show",
    description: areaChartHideShowDescription,
    recipe: areaChartHideShowRecipe,
    Component: AreaChartHideShow,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: areaChartLineTypesDescription,
    recipe: areaChartLineTypesRecipe,
    Component: AreaChartLineTypes,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: areaChartRefObjectDescription,
    recipe: areaChartRefObjectRecipe,
    Component: AreaChartRefObject,
  },
  {
    id: "selection",
    name: "Selection",
    description: areaChartSelectionDescription,
    recipe: areaChartSelectionRecipe,
    Component: AreaChartSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: areaChartShapedDataDescription,
    recipe: areaChartShapedDataRecipe,
    Component: AreaChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: areaChartStylesDescription,
    recipe: areaChartStylesRecipe,
    Component: AreaChartStyles,
  },
];

export default function AreaChartLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Area chart legacy examples"
      componentType="oj-chart"
      layoutId="areaChartLegacyNavigationLayout"
      items={areaChartLegacyItems}
      initialItemId="overview"
      navigationTitle="Area Chart"
    />
  );
}
