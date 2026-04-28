import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { NBoxContextMenu } from "./nBox-contextMenu/nBox-contextMenu";
import { nBoxContextMenuDescription } from "./nBox-contextMenu/description";
import { nBoxContextMenuRecipe } from "./nBox-contextMenu/recipe";
import { NBoxDefault } from "./nBox-default/nBox-default";
import { nBoxDefaultDescription } from "./nBox-default/description";
import { nBoxDefaultRecipe } from "./nBox-default/recipe";
import { NBoxDndEvents } from "./nBox-dndEvents/nBox-dndEvents";
import { nBoxDndEventsDescription } from "./nBox-dndEvents/description";
import { nBoxDndEventsRecipe } from "./nBox-dndEvents/recipe";
import { NBoxDndSample } from "./nBox-dndSample/nBox-dndSample";
import { nBoxDndSampleDescription } from "./nBox-dndSample/description";
import { nBoxDndSampleRecipe } from "./nBox-dndSample/recipe";
import { NBoxGrouping } from "./nBox-grouping/nBox-grouping";
import { nBoxGroupingDescription } from "./nBox-grouping/description";
import { nBoxGroupingRecipe } from "./nBox-grouping/recipe";
import { NBoxPerformance } from "./nBox-performance/nBox-performance";
import { nBoxPerformanceDescription } from "./nBox-performance/description";
import { nBoxPerformanceRecipe } from "./nBox-performance/recipe";
import { NBoxShapedData } from "./nBox-shapedData/nBox-shapedData";
import { nBoxShapedDataDescription } from "./nBox-shapedData/description";
import { nBoxShapedDataRecipe } from "./nBox-shapedData/recipe";
import { NBoxStyles } from "./nBox-styles/nBox-styles";
import { nBoxStylesDescription } from "./nBox-styles/description";
import { nBoxStylesRecipe } from "./nBox-styles/recipe";
import { NBoxTooltip } from "./nBox-tooltip/nBox-tooltip";
import { nBoxTooltipDescription } from "./nBox-tooltip/description";
import { nBoxTooltipRecipe } from "./nBox-tooltip/recipe";

const nBoxItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Basic",
    description: nBoxDefaultDescription,
    recipe: nBoxDefaultRecipe,
    Component: NBoxDefault,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: nBoxShapedDataDescription,
    recipe: nBoxShapedDataRecipe,
    Component: NBoxShapedData,
  },
  {
    id: "grouping",
    name: "Grouping",
    description: nBoxGroupingDescription,
    recipe: nBoxGroupingRecipe,
    Component: NBoxGrouping,
  },
  {
    id: "styles",
    name: "Styles",
    description: nBoxStylesDescription,
    recipe: nBoxStylesRecipe,
    Component: NBoxStyles,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: nBoxTooltipDescription,
    recipe: nBoxTooltipRecipe,
    Component: NBoxTooltip,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: nBoxContextMenuDescription,
    recipe: nBoxContextMenuRecipe,
    Component: NBoxContextMenu,
  },
  {
    id: "drag-and-drop-events",
    name: "Drag and Drop Events",
    description: nBoxDndEventsDescription,
    recipe: nBoxDndEventsRecipe,
    Component: NBoxDndEvents,
  },
  {
    id: "drag-and-drop-sample",
    name: "Drag and Drop with List View",
    description: nBoxDndSampleDescription,
    recipe: nBoxDndSampleRecipe,
    Component: NBoxDndSample,
  },
  {
    id: "performance",
    name: "Performance",
    description: nBoxPerformanceDescription,
    recipe: nBoxPerformanceRecipe,
    Component: NBoxPerformance,
  },
];

export default function NBoxRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="NBox examples"
      componentType="oj-n-box"
      layoutId="nBoxNavigationLayout"
      items={nBoxItems}
      initialItemId="default"
      navigationTitle="NBox"
    />
  );
}
