import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { BoxPlotAnimation } from "./boxPlot-animation/boxPlot-animation";
import { boxPlotAnimationDescription } from "./boxPlot-animation/description";
import { boxPlotAnimationRecipe } from "./boxPlot-animation/recipe";
import { BoxPlotDefault } from "./boxPlot-default/boxPlot-default";
import { boxPlotDefaultDescription } from "./boxPlot-default/description";
import { boxPlotDefaultRecipe } from "./boxPlot-default/recipe";
import { BoxPlotHideShow } from "./boxPlot-hideShow/boxPlot-hideShow";
import { boxPlotHideShowDescription } from "./boxPlot-hideShow/description";
import { boxPlotHideShowRecipe } from "./boxPlot-hideShow/recipe";
import { BoxPlotMeans } from "./boxPlot-means/boxPlot-means";
import { boxPlotMeansDescription } from "./boxPlot-means/description";
import { boxPlotMeansRecipe } from "./boxPlot-means/recipe";
import { BoxPlotRefObject } from "./boxPlot-refObject/boxPlot-refObject";
import { boxPlotRefObjectDescription } from "./boxPlot-refObject/description";
import { boxPlotRefObjectRecipe } from "./boxPlot-refObject/recipe";
import { BoxPlotSelection } from "./boxPlot-selection/boxPlot-selection";
import { boxPlotSelectionDescription } from "./boxPlot-selection/description";
import { boxPlotSelectionRecipe } from "./boxPlot-selection/recipe";
import { BoxPlotShapedData } from "./boxPlot-shapedData/boxPlot-shapedData";
import { boxPlotShapedDataDescription } from "./boxPlot-shapedData/description";
import { boxPlotShapedDataRecipe } from "./boxPlot-shapedData/recipe";
import { BoxPlotStyles } from "./boxPlot-styles/boxPlot-styles";
import { boxPlotStylesDescription } from "./boxPlot-styles/description";
import { boxPlotStylesRecipe } from "./boxPlot-styles/recipe";
import { BoxPlotVariableBoxWidth } from "./boxPlot-variableBoxWidth/boxPlot-variableBoxWidth";
import { boxPlotVariableBoxWidthDescription } from "./boxPlot-variableBoxWidth/description";
import { boxPlotVariableBoxWidthRecipe } from "./boxPlot-variableBoxWidth/recipe";

const boxPlotItems = [
  {
    id: "overview",
    name: "Overview",
    description: boxPlotDefaultDescription,
    recipe: boxPlotDefaultRecipe,
    Component: BoxPlotDefault,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: boxPlotShapedDataDescription,
    recipe: boxPlotShapedDataRecipe,
    Component: BoxPlotShapedData,
  },
  {
    id: "selection",
    name: "Selection",
    description: boxPlotSelectionDescription,
    recipe: boxPlotSelectionRecipe,
    Component: BoxPlotSelection,
  },
  {
    id: "hide-show",
    name: "Hide and Show",
    description: boxPlotHideShowDescription,
    recipe: boxPlotHideShowRecipe,
    Component: BoxPlotHideShow,
  },
  {
    id: "means",
    name: "Means",
    description: boxPlotMeansDescription,
    recipe: boxPlotMeansRecipe,
    Component: BoxPlotMeans,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: boxPlotRefObjectDescription,
    recipe: boxPlotRefObjectRecipe,
    Component: BoxPlotRefObject,
  },
  {
    id: "variable-box-width",
    name: "Variable Box Width",
    description: boxPlotVariableBoxWidthDescription,
    recipe: boxPlotVariableBoxWidthRecipe,
    Component: BoxPlotVariableBoxWidth,
  },
  {
    id: "animation",
    name: "Animation",
    description: boxPlotAnimationDescription,
    recipe: boxPlotAnimationRecipe,
    Component: BoxPlotAnimation,
  },
  {
    id: "styling",
    name: "Styling",
    description: boxPlotStylesDescription,
    recipe: boxPlotStylesRecipe,
    Component: BoxPlotStyles,
  },
];

export default function BoxPlotChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Box plot chart examples"
      componentType="oj-chart"
      layoutId="boxPlotChartsNavigationLayout"
      items={boxPlotItems}
      initialItemId="overview"
      navigationTitle="Box Plot Charts"
    />
  );
}
