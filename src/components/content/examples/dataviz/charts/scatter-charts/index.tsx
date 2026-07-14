import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { scatterChartAnimationDescription } from "./scatterChart-animation/description";
import { scatterChartAnimationRecipe } from "./scatterChart-animation/recipe";
import { ScatterChartAnimation } from "./scatterChart-animation/scatterChart-animation";
import { scatterChartAttrGroupsDescription } from "./scatterChart-attrGroups/description";
import { scatterChartAttrGroupsRecipe } from "./scatterChart-attrGroups/recipe";
import { ScatterChartAttrGroups } from "./scatterChart-attrGroups/scatterChart-attrGroups";
import { scatterChartDataLabelsDescription } from "./scatterChart-dataLabels/description";
import { scatterChartDataLabelsRecipe } from "./scatterChart-dataLabels/recipe";
import { ScatterChartDataLabels } from "./scatterChart-dataLabels/scatterChart-dataLabels";
import { scatterChartDefaultDescription } from "./scatterChart-default/description";
import { scatterChartDefaultRecipe } from "./scatterChart-default/recipe";
import { ScatterChartDefault } from "./scatterChart-default/scatterChart-default";
import { scatterChartHideShowDescription } from "./scatterChart-hideShow/description";
import { scatterChartHideShowRecipe } from "./scatterChart-hideShow/recipe";
import { ScatterChartHideShow } from "./scatterChart-hideShow/scatterChart-hideShow";
import { scatterChartLineTypesDescription } from "./scatterChart-lineTypes/description";
import { scatterChartLineTypesRecipe } from "./scatterChart-lineTypes/recipe";
import { ScatterChartLineTypes } from "./scatterChart-lineTypes/scatterChart-lineTypes";
import { scatterChartRefObjectDescription } from "./scatterChart-refObject/description";
import { scatterChartRefObjectRecipe } from "./scatterChart-refObject/recipe";
import { ScatterChartRefObject } from "./scatterChart-refObject/scatterChart-refObject";
import { scatterChartSelectionDescription } from "./scatterChart-selection/description";
import { scatterChartSelectionRecipe } from "./scatterChart-selection/recipe";
import { ScatterChartSelection } from "./scatterChart-selection/scatterChart-selection";
import { scatterChartShapedDataDescription } from "./scatterChart-shapedData/description";
import { scatterChartShapedDataRecipe } from "./scatterChart-shapedData/recipe";
import { ScatterChartShapedData } from "./scatterChart-shapedData/scatterChart-shapedData";
import { scatterChartStylesDescription } from "./scatterChart-styles/description";
import { scatterChartStylesRecipe } from "./scatterChart-styles/recipe";
import { ScatterChartStyles } from "./scatterChart-styles/scatterChart-styles";
import { scatterChartZoomScrollDescription } from "./scatterChart-zoomScroll/description";
import { scatterChartZoomScrollRecipe } from "./scatterChart-zoomScroll/recipe";
import { ScatterChartZoomScroll } from "./scatterChart-zoomScroll/scatterChart-zoomScroll";

const scatterChartItems = [
  { id: "overview", name: "Basic", description: scatterChartDefaultDescription, recipe: scatterChartDefaultRecipe, Component: ScatterChartDefault },
  { id: "shaped-data", name: "Shaped Data", description: scatterChartShapedDataDescription, recipe: scatterChartShapedDataRecipe, Component: ScatterChartShapedData },
  { id: "selection", name: "Selection", description: scatterChartSelectionDescription, recipe: scatterChartSelectionRecipe, Component: ScatterChartSelection },
  { id: "hide-show", name: "Hide & Show", description: scatterChartHideShowDescription, recipe: scatterChartHideShowRecipe, Component: ScatterChartHideShow },
  { id: "data-labels", name: "Data Labels", description: scatterChartDataLabelsDescription, recipe: scatterChartDataLabelsRecipe, Component: ScatterChartDataLabels },
  { id: "line-types", name: "Line Types", description: scatterChartLineTypesDescription, recipe: scatterChartLineTypesRecipe, Component: ScatterChartLineTypes },
  { id: "reference-objects", name: "Reference Objects", description: scatterChartRefObjectDescription, recipe: scatterChartRefObjectRecipe, Component: ScatterChartRefObject },
  { id: "attribute-groups", name: "Attribute Groups", description: scatterChartAttrGroupsDescription, recipe: scatterChartAttrGroupsRecipe, Component: ScatterChartAttrGroups },
  { id: "zoom-scroll", name: "Zoom & Scroll", description: scatterChartZoomScrollDescription, recipe: scatterChartZoomScrollRecipe, Component: ScatterChartZoomScroll },
  { id: "animation", name: "Animations", description: scatterChartAnimationDescription, recipe: scatterChartAnimationRecipe, Component: ScatterChartAnimation },
  { id: "styling", name: "Styles", description: scatterChartStylesDescription, recipe: scatterChartStylesRecipe, Component: ScatterChartStyles },
];

export default function ScatterChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Scatter chart examples"
      componentType="oj-chart"
      layoutId="scatterChartsNavigationLayout"
      items={scatterChartItems}
      initialItemId="overview"
      navigationTitle="Scatter Charts"
    />
  );
}
