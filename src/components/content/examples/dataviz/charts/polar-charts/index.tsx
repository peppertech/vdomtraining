import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { PolarChartAnimation } from "./polarChart-animation/polarChart-animation";
import { polarChartAnimationDescription } from "./polarChart-animation/description";
import { polarChartAnimationRecipe } from "./polarChart-animation/recipe";
import { PolarChartDefault } from "./polarChart-default/polarChart-default";
import { polarChartDefaultDescription } from "./polarChart-default/description";
import { polarChartDefaultRecipe } from "./polarChart-default/recipe";
import { PolarChartHideShow } from "./polarChart-hideShow/polarChart-hideShow";
import { polarChartHideShowDescription } from "./polarChart-hideShow/description";
import { polarChartHideShowRecipe } from "./polarChart-hideShow/recipe";
import { PolarChartLineConnectors } from "./polarChart-lineConnectors/polarChart-lineConnectors";
import { polarChartLineConnectorsDescription } from "./polarChart-lineConnectors/description";
import { polarChartLineConnectorsRecipe } from "./polarChart-lineConnectors/recipe";
import { PolarChartLineTypes } from "./polarChart-lineTypes/polarChart-lineTypes";
import { polarChartLineTypesDescription } from "./polarChart-lineTypes/description";
import { polarChartLineTypesRecipe } from "./polarChart-lineTypes/recipe";
import { PolarChartRange } from "./polarChart-range/polarChart-range";
import { polarChartRangeDescription } from "./polarChart-range/description";
import { polarChartRangeRecipe } from "./polarChart-range/recipe";
import { PolarChartRefObject } from "./polarChart-refObject/polarChart-refObject";
import { polarChartRefObjectDescription } from "./polarChart-refObject/description";
import { polarChartRefObjectRecipe } from "./polarChart-refObject/recipe";
import { PolarChartSelection } from "./polarChart-selection/polarChart-selection";
import { polarChartSelectionDescription } from "./polarChart-selection/description";
import { polarChartSelectionRecipe } from "./polarChart-selection/recipe";
import { PolarChartShapedData } from "./polarChart-shapedData/polarChart-shapedData";
import { polarChartShapedDataDescription } from "./polarChart-shapedData/description";
import { polarChartShapedDataRecipe } from "./polarChart-shapedData/recipe";
import { PolarChartStyles } from "./polarChart-styles/polarChart-styles";
import { polarChartStylesDescription } from "./polarChart-styles/description";
import { polarChartStylesRecipe } from "./polarChart-styles/recipe";

const polarChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: polarChartDefaultDescription,
    recipe: polarChartDefaultRecipe,
    Component: PolarChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: polarChartAnimationDescription,
    recipe: polarChartAnimationRecipe,
    Component: PolarChartAnimation,
  },
  {
    id: "hide-show",
    name: "Hide and Show",
    description: polarChartHideShowDescription,
    recipe: polarChartHideShowRecipe,
    Component: PolarChartHideShow,
  },
  {
    id: "line-connectors",
    name: "Line Connectors",
    description: polarChartLineConnectorsDescription,
    recipe: polarChartLineConnectorsRecipe,
    Component: PolarChartLineConnectors,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: polarChartLineTypesDescription,
    recipe: polarChartLineTypesRecipe,
    Component: PolarChartLineTypes,
  },
  {
    id: "range",
    name: "Range Series",
    description: polarChartRangeDescription,
    recipe: polarChartRangeRecipe,
    Component: PolarChartRange,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: polarChartRefObjectDescription,
    recipe: polarChartRefObjectRecipe,
    Component: PolarChartRefObject,
  },
  {
    id: "selection",
    name: "Selection",
    description: polarChartSelectionDescription,
    recipe: polarChartSelectionRecipe,
    Component: PolarChartSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: polarChartShapedDataDescription,
    recipe: polarChartShapedDataRecipe,
    Component: PolarChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: polarChartStylesDescription,
    recipe: polarChartStylesRecipe,
    Component: PolarChartStyles,
  },
];

export default function PolarChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Polar chart examples"
      componentType="oj-chart"
      layoutId="polarChartsNavigationLayout"
      items={polarChartItems}
      initialItemId="overview"
      navigationTitle="Polar Charts"
    />
  );
}
