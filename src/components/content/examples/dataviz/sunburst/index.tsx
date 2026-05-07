import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { SunburstDefault } from "./sunburst-default/sunburst-default";
import { sunburstDefaultDescription } from "./sunburst-default/description";
import { sunburstDefaultRecipe } from "./sunburst-default/recipe";
import { SunburstShapedData } from "./sunburst-shapedData/sunburst-shapedData";
import { sunburstShapedDataDescription } from "./sunburst-shapedData/description";
import { sunburstShapedDataRecipe } from "./sunburst-shapedData/recipe";
import { SunburstDrill } from "./sunburst-drill/sunburst-drill";
import { sunburstDrillDescription } from "./sunburst-drill/description";
import { sunburstDrillRecipe } from "./sunburst-drill/recipe";
import { SunburstExpand } from "./sunburst-expand/sunburst-expand";
import { sunburstExpandDescription } from "./sunburst-expand/description";
import { sunburstExpandRecipe } from "./sunburst-expand/recipe";
import { SunburstSelection } from "./sunburst-selection/sunburst-selection";
import { sunburstSelectionDescription } from "./sunburst-selection/description";
import { sunburstSelectionRecipe } from "./sunburst-selection/recipe";
import { SunburstHighlighting } from "./sunburst-highlighting/sunburst-highlighting";
import { sunburstHighlightingDescription } from "./sunburst-highlighting/description";
import { sunburstHighlightingRecipe } from "./sunburst-highlighting/recipe";
import { SunburstSorting } from "./sunburst-sorting/sunburst-sorting";
import { sunburstSortingDescription } from "./sunburst-sorting/description";
import { sunburstSortingRecipe } from "./sunburst-sorting/recipe";
import { SunburstRadius } from "./sunburst-radius/sunburst-radius";
import { sunburstRadiusDescription } from "./sunburst-radius/description";
import { sunburstRadiusRecipe } from "./sunburst-radius/recipe";
import { SunburstRootNodeContent } from "./sunburst-rootNodeContent/sunburst-rootNodeContent";
import { sunburstRootNodeContentDescription } from "./sunburst-rootNodeContent/description";
import { sunburstRootNodeContentRecipe } from "./sunburst-rootNodeContent/recipe";
import { SunburstLegend } from "./sunburst-legend/sunburst-legend";
import { sunburstLegendDescription } from "./sunburst-legend/description";
import { sunburstLegendRecipe } from "./sunburst-legend/recipe";
import { SunburstTooltip } from "./sunburst-tooltip/sunburst-tooltip";
import { sunburstTooltipDescription } from "./sunburst-tooltip/description";
import { sunburstTooltipRecipe } from "./sunburst-tooltip/recipe";
import { SunburstPopup } from "./sunburst-popup/sunburst-popup";
import { sunburstPopupDescription } from "./sunburst-popup/description";
import { sunburstPopupRecipe } from "./sunburst-popup/recipe";
import { SunburstContextMenu } from "./sunburst-contextMenu/sunburst-contextMenu";
import { sunburstContextMenuDescription } from "./sunburst-contextMenu/description";
import { sunburstContextMenuRecipe } from "./sunburst-contextMenu/recipe";
import { SunburstStyles } from "./sunburst-styles/sunburst-styles";
import { sunburstStylesDescription } from "./sunburst-styles/description";
import { sunburstStylesRecipe } from "./sunburst-styles/recipe";
import { SunburstAnimation } from "./sunburst-animation/sunburst-animation";
import { sunburstAnimationDescription } from "./sunburst-animation/description";
import { sunburstAnimationRecipe } from "./sunburst-animation/recipe";
import { SunburstProgressiveLoading } from "./sunburst-progressiveLoading/sunburst-progressiveLoading";
import { sunburstProgressiveLoadingDescription } from "./sunburst-progressiveLoading/description";
import { sunburstProgressiveLoadingRecipe } from "./sunburst-progressiveLoading/recipe";
import { SunburstPerformance } from "./sunburst-performance/sunburst-performance";
import { sunburstPerformanceDescription } from "./sunburst-performance/description";
import { sunburstPerformanceRecipe } from "./sunburst-performance/recipe";

const sunburstItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Basic",
    description: sunburstDefaultDescription,
    recipe: sunburstDefaultRecipe,
    Component: SunburstDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: sunburstAnimationDescription,
    recipe: sunburstAnimationRecipe,
    Component: SunburstAnimation,
  },
   {
     id: "context-menu",
    name: "Context Menus",
    description: sunburstContextMenuDescription,
    recipe: sunburstContextMenuRecipe,
    Component: SunburstContextMenu,
  },
  {
    id: "drill",
    name: "Drilling",
    description: sunburstDrillDescription,
    recipe: sunburstDrillRecipe,
    Component: SunburstDrill,
  },
  {
    id: "expand",
    name: "Expand/Collapse",
    description: sunburstExpandDescription,
    recipe: sunburstExpandRecipe,
    Component: SunburstExpand,
  },
  {
    id: "highlighting",
    name: "Highlighting",
    description: sunburstHighlightingDescription,
    recipe: sunburstHighlightingRecipe,
    Component: SunburstHighlighting,
  },
  {
    id: "legend",
    name: "Legend",
    description: sunburstLegendDescription,
    recipe: sunburstLegendRecipe,
    Component: SunburstLegend,
  }, 
  {
    id: "performance",
    name: "Performance",
    description: sunburstPerformanceDescription,
    recipe: sunburstPerformanceRecipe,
    Component: SunburstPerformance,
  },
  {
    id: "popup",
    name: "Popups",
    description: sunburstPopupDescription,
    recipe: sunburstPopupRecipe,
    Component: SunburstPopup,
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: sunburstProgressiveLoadingDescription,
    recipe: sunburstProgressiveLoadingRecipe,
    Component: SunburstProgressiveLoading,
  },
  {
    id: "selection",
    name: "Selection",
    description: sunburstSelectionDescription,
    recipe: sunburstSelectionRecipe,
    Component: SunburstSelection,
  },
  {
    id: "radius",
    name: "Node Radius",
    description: sunburstRadiusDescription,
    recipe: sunburstRadiusRecipe,
    Component: SunburstRadius,
  },
  {
    id: "root-node-content",
    name: "Root Node Content",
    description: sunburstRootNodeContentDescription,
    recipe: sunburstRootNodeContentRecipe,
    Component: SunburstRootNodeContent,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: sunburstShapedDataDescription,
    recipe: sunburstShapedDataRecipe,
    Component: SunburstShapedData,
  },
   {
    id: "sorting",
    name: "Sorting",
    description: sunburstSortingDescription,
    recipe: sunburstSortingRecipe,
    Component: SunburstSorting,
  },
  {
    id: "styles",
    name: "Styles",
    description: sunburstStylesDescription,
    recipe: sunburstStylesRecipe,
    Component: SunburstStyles,
  },
   {
    id: "tooltip",
    name: "Tooltip Customization",
    description: sunburstTooltipDescription,
    recipe: sunburstTooltipRecipe,
    Component: SunburstTooltip,
  }
];

export default function SunburstRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Sunburst examples"
      componentType="oj-sunburst"
      layoutId="sunburstNavigationLayout"
      items={sunburstItems}
      initialItemId="default"
      navigationTitle="Sunburst"
    />
  );
}
