import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { polarChartAnimationDescription } from "./polarChart-animation/description";
import { PolarChartAnimation } from "./polarChart-animation/polarChart-animation";
import { polarChartAnimationRecipe } from "./polarChart-animation/recipe";
import { polarChartDefaultDescription } from "./polarChart-default/description";
import { PolarChartDefault } from "./polarChart-default/polarChart-default";
import { polarChartDefaultRecipe } from "./polarChart-default/recipe";
import { polarChartHideShowDescription } from "./polarChart-hideShow/description";
import { PolarChartHideShow } from "./polarChart-hideShow/polarChart-hideShow";
import { polarChartHideShowRecipe } from "./polarChart-hideShow/recipe";
import { polarChartLineConnectorsDescription } from "./polarChart-lineConnectors/description";
import { PolarChartLineConnectors } from "./polarChart-lineConnectors/polarChart-lineConnectors";
import { polarChartLineConnectorsRecipe } from "./polarChart-lineConnectors/recipe";
import { polarChartLineTypesDescription } from "./polarChart-lineTypes/description";
import { PolarChartLineTypes } from "./polarChart-lineTypes/polarChart-lineTypes";
import { polarChartLineTypesRecipe } from "./polarChart-lineTypes/recipe";
import { polarChartRangeDescription } from "./polarChart-range/description";
import { PolarChartRange } from "./polarChart-range/polarChart-range";
import { polarChartRangeRecipe } from "./polarChart-range/recipe";
import { polarChartRefObjectDescription } from "./polarChart-refObject/description";
import { PolarChartRefObject } from "./polarChart-refObject/polarChart-refObject";
import { polarChartRefObjectRecipe } from "./polarChart-refObject/recipe";
import { polarChartSelectionDescription } from "./polarChart-selection/description";
import { PolarChartSelection } from "./polarChart-selection/polarChart-selection";
import { polarChartSelectionRecipe } from "./polarChart-selection/recipe";
import { polarChartShapedDataDescription } from "./polarChart-shapedData/description";
import { PolarChartShapedData } from "./polarChart-shapedData/polarChart-shapedData";
import { polarChartShapedDataRecipe } from "./polarChart-shapedData/recipe";
import { polarChartStylesDescription } from "./polarChart-styles/description";
import { PolarChartStyles } from "./polarChart-styles/polarChart-styles";
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
