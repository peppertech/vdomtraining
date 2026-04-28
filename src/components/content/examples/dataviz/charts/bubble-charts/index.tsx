import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { BubbleChartAnimation } from "./bubbleChart-animation/bubbleChart-animation";
import { bubbleChartAnimationDescription } from "./bubbleChart-animation/description";
import { bubbleChartAnimationRecipe } from "./bubbleChart-animation/recipe";
import { BubbleChartAttrGroups } from "./bubbleChart-attrGroups/bubbleChart-attrGroups";
import { bubbleChartAttrGroupsDescription } from "./bubbleChart-attrGroups/description";
import { bubbleChartAttrGroupsRecipe } from "./bubbleChart-attrGroups/recipe";
import { BubbleChartDataLabels } from "./bubbleChart-dataLabels/bubbleChart-dataLabels";
import { bubbleChartDataLabelsDescription } from "./bubbleChart-dataLabels/description";
import { bubbleChartDataLabelsRecipe } from "./bubbleChart-dataLabels/recipe";
import { BubbleChartDefault } from "./bubbleChart-default/bubbleChart-default";
import { bubbleChartDefaultDescription } from "./bubbleChart-default/description";
import { bubbleChartDefaultRecipe } from "./bubbleChart-default/recipe";
import { BubbleChartHideShow } from "./bubbleChart-hideShow/bubbleChart-hideShow";
import { bubbleChartHideShowDescription } from "./bubbleChart-hideShow/description";
import { bubbleChartHideShowRecipe } from "./bubbleChart-hideShow/recipe";
import { BubbleChartLineTypes } from "./bubbleChart-lineTypes/bubbleChart-lineTypes";
import { bubbleChartLineTypesDescription } from "./bubbleChart-lineTypes/description";
import { bubbleChartLineTypesRecipe } from "./bubbleChart-lineTypes/recipe";
import { BubbleChartRefObject } from "./bubbleChart-refObject/bubbleChart-refObject";
import { bubbleChartRefObjectDescription } from "./bubbleChart-refObject/description";
import { bubbleChartRefObjectRecipe } from "./bubbleChart-refObject/recipe";
import { BubbleChartSelection } from "./bubbleChart-selection/bubbleChart-selection";
import { bubbleChartSelectionDescription } from "./bubbleChart-selection/description";
import { bubbleChartSelectionRecipe } from "./bubbleChart-selection/recipe";
import { BubbleChartShapedData } from "./bubbleChart-shapedData/bubbleChart-shapedData";
import { bubbleChartShapedDataDescription } from "./bubbleChart-shapedData/description";
import { bubbleChartShapedDataRecipe } from "./bubbleChart-shapedData/recipe";
import { BubbleChartStyles } from "./bubbleChart-styles/bubbleChart-styles";
import { bubbleChartStylesDescription } from "./bubbleChart-styles/description";
import { bubbleChartStylesRecipe } from "./bubbleChart-styles/recipe";
import { BubbleChartZoomScroll } from "./bubbleChart-zoomScroll/bubbleChart-zoomScroll";
import { bubbleChartZoomScrollDescription } from "./bubbleChart-zoomScroll/description";
import { bubbleChartZoomScrollRecipe } from "./bubbleChart-zoomScroll/recipe";

const bubbleChartItems = [
  { id: "overview", name: "Overview", description: bubbleChartDefaultDescription, recipe: bubbleChartDefaultRecipe, Component: BubbleChartDefault },
  { id: "shaped-data", name: "Shaped Data", description: bubbleChartShapedDataDescription, recipe: bubbleChartShapedDataRecipe, Component: BubbleChartShapedData },
  { id: "selection", name: "Selection", description: bubbleChartSelectionDescription, recipe: bubbleChartSelectionRecipe, Component: BubbleChartSelection },
  { id: "hide-show", name: "Hide and Show", description: bubbleChartHideShowDescription, recipe: bubbleChartHideShowRecipe, Component: BubbleChartHideShow },
  { id: "data-labels", name: "Data Labels", description: bubbleChartDataLabelsDescription, recipe: bubbleChartDataLabelsRecipe, Component: BubbleChartDataLabels },
  { id: "line-types", name: "Line Types", description: bubbleChartLineTypesDescription, recipe: bubbleChartLineTypesRecipe, Component: BubbleChartLineTypes },
  { id: "reference-objects", name: "Reference Objects", description: bubbleChartRefObjectDescription, recipe: bubbleChartRefObjectRecipe, Component: BubbleChartRefObject },
  { id: "attribute-groups", name: "Attribute Groups", description: bubbleChartAttrGroupsDescription, recipe: bubbleChartAttrGroupsRecipe, Component: BubbleChartAttrGroups },
  { id: "zoom-scroll", name: "Zoom and Scroll", description: bubbleChartZoomScrollDescription, recipe: bubbleChartZoomScrollRecipe, Component: BubbleChartZoomScroll },
  { id: "animation", name: "Animation", description: bubbleChartAnimationDescription, recipe: bubbleChartAnimationRecipe, Component: BubbleChartAnimation },
  { id: "styling", name: "Styling", description: bubbleChartStylesDescription, recipe: bubbleChartStylesRecipe, Component: BubbleChartStyles },
];

export default function BubbleChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Bubble chart examples"
      componentType="oj-chart"
      layoutId="bubbleChartsNavigationLayout"
      items={bubbleChartItems}
      initialItemId="overview"
      navigationTitle="Bubble Charts"
    />
  );
}
