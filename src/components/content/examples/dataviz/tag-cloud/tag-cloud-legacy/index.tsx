import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TagCloudDefault } from "./tagCloud-default/tagCloud-default";
import { tagCloudDefaultDescription } from "./tagCloud-default/description";
import { tagCloudDefaultRecipe } from "./tagCloud-default/recipe";
import { TagCloudShapedData } from "./tagCloud-shapedData/tagCloud-shapedData";
import { tagCloudShapedDataDescription } from "./tagCloud-shapedData/description";
import { tagCloudShapedDataRecipe } from "./tagCloud-shapedData/recipe";
import { TagCloudAnimation } from "./tagCloud-animation/tagCloud-animation";
import { tagCloudAnimationDescription } from "./tagCloud-animation/description";
import { tagCloudAnimationRecipe } from "./tagCloud-animation/recipe";
import { TagCloudSelection } from "./tagCloud-selection/tagCloud-selection";
import { tagCloudSelectionDescription } from "./tagCloud-selection/description";
import { tagCloudSelectionRecipe } from "./tagCloud-selection/recipe";
import { TagCloudLegend } from "./tagCloud-legend/tagCloud-legend";
import { tagCloudLegendDescription } from "./tagCloud-legend/description";
import { tagCloudLegendRecipe } from "./tagCloud-legend/recipe";
import { TagCloudLinks } from "./tagCloud-links/tagCloud-links";
import { tagCloudLinksDescription } from "./tagCloud-links/description";
import { tagCloudLinksRecipe } from "./tagCloud-links/recipe";
import { TagCloudStyles } from "./tagCloud-styles/tagCloud-styles";
import { tagCloudStylesDescription } from "./tagCloud-styles/description";
import { tagCloudStylesRecipe } from "./tagCloud-styles/recipe";
import { TagCloudTooltip } from "./tagCloud-tooltip/tagCloud-tooltip";
import { tagCloudTooltipDescription } from "./tagCloud-tooltip/description";
import { tagCloudTooltipRecipe } from "./tagCloud-tooltip/recipe";
import { TagCloudContextMenu } from "./tagCloud-contextMenu/tagCloud-contextMenu";
import { tagCloudContextMenuDescription } from "./tagCloud-contextMenu/description";
import { tagCloudContextMenuRecipe } from "./tagCloud-contextMenu/recipe";
import { TagCloudPerformance } from "./tagCloud-performance/tagCloud-performance";
import { tagCloudPerformanceDescription } from "./tagCloud-performance/description";
import { tagCloudPerformanceRecipe } from "./tagCloud-performance/recipe";

const tagCloudLegacyItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Default",
    description: tagCloudDefaultDescription,
    recipe: tagCloudDefaultRecipe,
    Component: TagCloudDefault,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: tagCloudShapedDataDescription,
    recipe: tagCloudShapedDataRecipe,
    Component: TagCloudShapedData,
  },
  {
    id: "animation",
    name: "Animation",
    description: tagCloudAnimationDescription,
    recipe: tagCloudAnimationRecipe,
    Component: TagCloudAnimation,
  },
  {
    id: "selection",
    name: "Selection",
    description: tagCloudSelectionDescription,
    recipe: tagCloudSelectionRecipe,
    Component: TagCloudSelection,
  },
  {
    id: "legend",
    name: "Legend",
    description: tagCloudLegendDescription,
    recipe: tagCloudLegendRecipe,
    Component: TagCloudLegend,
  },
  {
    id: "links",
    name: "Links",
    description: tagCloudLinksDescription,
    recipe: tagCloudLinksRecipe,
    Component: TagCloudLinks,
  },
  {
    id: "styles",
    name: "Styles",
    description: tagCloudStylesDescription,
    recipe: tagCloudStylesRecipe,
    Component: TagCloudStyles,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: tagCloudTooltipDescription,
    recipe: tagCloudTooltipRecipe,
    Component: TagCloudTooltip,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: tagCloudContextMenuDescription,
    recipe: tagCloudContextMenuRecipe,
    Component: TagCloudContextMenu,
  },
  {
    id: "performance",
    name: "Performance",
    description: tagCloudPerformanceDescription,
    recipe: tagCloudPerformanceRecipe,
    Component: TagCloudPerformance,
  },
];

export default function TagCloudLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Tag Cloud examples"
      componentType="oj-tag-cloud"
      layoutId="tagCloudLegacyNavigationLayout"
      items={tagCloudLegacyItems}
      initialItemId="default"
      navigationTitle="Tag Cloud"
    />
  );
}
