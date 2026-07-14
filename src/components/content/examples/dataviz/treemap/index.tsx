import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { treemapAnimationDescription } from "./treemap-animation/description";
import { treemapAnimationRecipe } from "./treemap-animation/recipe";
import { TreemapAnimation } from "./treemap-animation/treemap-animation";
import { treemapContextMenuDescription } from "./treemap-contextMenu/description";
import { treemapContextMenuRecipe } from "./treemap-contextMenu/recipe";
import { TreemapContextMenu } from "./treemap-contextMenu/treemap-contextMenu";
import { treemapDefaultDescription } from "./treemap-default/description";
import { treemapDefaultRecipe } from "./treemap-default/recipe";
import { TreemapDefault } from "./treemap-default/treemap-default";
import { treemapDrillDescription } from "./treemap-drill/description";
import { treemapDrillRecipe } from "./treemap-drill/recipe";
import { TreemapDrill } from "./treemap-drill/treemap-drill";
import { treemapHighlightingDescription } from "./treemap-highlighting/description";
import { treemapHighlightingRecipe } from "./treemap-highlighting/recipe";
import { TreemapHighlighting } from "./treemap-highlighting/treemap-highlighting";
import { treemapIsolateDescription } from "./treemap-isolate/description";
import { treemapIsolateRecipe } from "./treemap-isolate/recipe";
import { TreemapIsolate } from "./treemap-isolate/treemap-isolate";
import { treemapLegendDescription } from "./treemap-legend/description";
import { treemapLegendRecipe } from "./treemap-legend/recipe";
import { TreemapLegend } from "./treemap-legend/treemap-legend";
import { treemapPerformanceDescription } from "./treemap-performance/description";
import { treemapPerformanceRecipe } from "./treemap-performance/recipe";
import { TreemapPerformance } from "./treemap-performance/treemap-performance";
import { treemapPopupDescription } from "./treemap-popup/description";
import { treemapPopupRecipe } from "./treemap-popup/recipe";
import { TreemapPopup } from "./treemap-popup/treemap-popup";
import { treemapProgressiveLoadingDescription } from "./treemap-progressiveLoading/description";
import { treemapProgressiveLoadingRecipe } from "./treemap-progressiveLoading/recipe";
import { TreemapProgressiveLoading } from "./treemap-progressiveLoading/treemap-progressiveLoading";
import { treemapSelectionDescription } from "./treemap-selection/description";
import { treemapSelectionRecipe } from "./treemap-selection/recipe";
import { TreemapSelection } from "./treemap-selection/treemap-selection";
import { treemapShapedDataDescription } from "./treemap-shapedData/description";
import { treemapShapedDataRecipe } from "./treemap-shapedData/recipe";
import { TreemapShapedData } from "./treemap-shapedData/treemap-shapedData";
import { treemapSmallFormFactorDescription } from "./treemap-smallFormFactor/description";
import { treemapSmallFormFactorRecipe } from "./treemap-smallFormFactor/recipe";
import { TreemapSmallFormFactor } from "./treemap-smallFormFactor/treemap-smallFormFactor";
import { treemapSortingDescription } from "./treemap-sorting/description";
import { treemapSortingRecipe } from "./treemap-sorting/recipe";
import { TreemapSorting } from "./treemap-sorting/treemap-sorting";
import { treemapStylesDescription } from "./treemap-styles/description";
import { treemapStylesRecipe } from "./treemap-styles/recipe";
import { TreemapStyles } from "./treemap-styles/treemap-styles";
import { treemapTooltipDescription } from "./treemap-tooltip/description";
import { treemapTooltipRecipe } from "./treemap-tooltip/recipe";
import { TreemapTooltip } from "./treemap-tooltip/treemap-tooltip";

const treemapItems: RecipePageItem[] = [
   {
    id: "default",
    name: "Basic",
    description: treemapDefaultDescription,
    recipe: treemapDefaultRecipe,
    Component: TreemapDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: treemapAnimationDescription,
    recipe: treemapAnimationRecipe,
    Component: TreemapAnimation,
  },
  {
    id: "drill",
    name: "Drilling",
    description: treemapDrillDescription,
    recipe: treemapDrillRecipe,
    Component: TreemapDrill,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: treemapContextMenuDescription,
    recipe: treemapContextMenuRecipe,
    Component: TreemapContextMenu,
  },
  
  {
    id: "highlighting",
    name: "Highlighting",
    description: treemapHighlightingDescription,
    recipe: treemapHighlightingRecipe,
    Component: TreemapHighlighting,
  },
  {
    id: "isolate",
    name: "Isolate",
    description: treemapIsolateDescription,
    recipe: treemapIsolateRecipe,
    Component: TreemapIsolate,
  },
  {
    id: "legend",
    name: "Legend",
    description: treemapLegendDescription,
    recipe: treemapLegendRecipe,
    Component: TreemapLegend,
  },
  {
    id: "performance",
    name: "Performance",
    description: treemapPerformanceDescription,
    recipe: treemapPerformanceRecipe,
    Component: TreemapPerformance,
  },
  {
    id: "popup",
    name: "Popups",
    description: treemapPopupDescription,
    recipe: treemapPopupRecipe,
    Component: TreemapPopup,
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: treemapProgressiveLoadingDescription,
    recipe: treemapProgressiveLoadingRecipe,
    Component: TreemapProgressiveLoading,
  },
  {
    id: "selection",
    name: "Selection",
    description: treemapSelectionDescription,
    recipe: treemapSelectionRecipe,
    Component: TreemapSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: treemapShapedDataDescription,
    recipe: treemapShapedDataRecipe,
    Component: TreemapShapedData,
  },
  {
    id: "small-form-factor",
    name: "Small Form Factor",
    description: treemapSmallFormFactorDescription,
    recipe: treemapSmallFormFactorRecipe,
    Component: TreemapSmallFormFactor,
  },
  {
    id: "sorting",
    name: "Sorting",
    description: treemapSortingDescription,
    recipe: treemapSortingRecipe,
    Component: TreemapSorting,
  },
  {
    id: "styles",
    name: "Styles",
    description: treemapStylesDescription,
    recipe: treemapStylesRecipe,
    Component: TreemapStyles,
  },
  {
    id: "tooltip",
    name: "Tooltip Customization",
    description: treemapTooltipDescription,
    recipe: treemapTooltipRecipe,
    Component: TreemapTooltip,
  },
];

export default function TreemapRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Treemap examples"
      componentType="oj-treemap"
      layoutId="treemapNavigationLayout"
      items={treemapItems}
      initialItemId="default"
      navigationTitle="Treemap"
    />
  );
}
