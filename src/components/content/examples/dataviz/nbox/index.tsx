import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { nBoxContextMenuDescription } from "./nBox-contextMenu/description";
import { NBoxContextMenu } from "./nBox-contextMenu/nBox-contextMenu";
import { nBoxContextMenuRecipe } from "./nBox-contextMenu/recipe";
import { nBoxDefaultDescription } from "./nBox-default/description";
import { NBoxDefault } from "./nBox-default/nBox-default";
import { nBoxDefaultRecipe } from "./nBox-default/recipe";
import { nBoxDndEventsDescription } from "./nBox-dndEvents/description";
import { NBoxDndEvents } from "./nBox-dndEvents/nBox-dndEvents";
import { nBoxDndEventsRecipe } from "./nBox-dndEvents/recipe";
import { nBoxDndSampleDescription } from "./nBox-dndSample/description";
import { NBoxDndSample } from "./nBox-dndSample/nBox-dndSample";
import { nBoxDndSampleRecipe } from "./nBox-dndSample/recipe";
import { nBoxGroupingDescription } from "./nBox-grouping/description";
import { NBoxGrouping } from "./nBox-grouping/nBox-grouping";
import { nBoxGroupingRecipe } from "./nBox-grouping/recipe";
import { nBoxPerformanceDescription } from "./nBox-performance/description";
import { NBoxPerformance } from "./nBox-performance/nBox-performance";
import { nBoxPerformanceRecipe } from "./nBox-performance/recipe";
import { nBoxShapedDataDescription } from "./nBox-shapedData/description";
import { NBoxShapedData } from "./nBox-shapedData/nBox-shapedData";
import { nBoxShapedDataRecipe } from "./nBox-shapedData/recipe";
import { nBoxStylesDescription } from "./nBox-styles/description";
import { NBoxStyles } from "./nBox-styles/nBox-styles";
import { nBoxStylesRecipe } from "./nBox-styles/recipe";
import { nBoxTooltipDescription } from "./nBox-tooltip/description";
import { NBoxTooltip } from "./nBox-tooltip/nBox-tooltip";
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
    id: "context-menu",
    name: "Context Menu",
    description: nBoxContextMenuDescription,
    recipe: nBoxContextMenuRecipe,
    Component: NBoxContextMenu,
  },
  {
    id: "tooltip",
    name: "Custom Tooltip",
    description: nBoxTooltipDescription,
    recipe: nBoxTooltipRecipe,
    Component: NBoxTooltip,
  },
  {
    id: "grouping",
    name: "Grouping",
    description: nBoxGroupingDescription,
    recipe: nBoxGroupingRecipe,
    Component: NBoxGrouping,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: nBoxShapedDataDescription,
    recipe: nBoxShapedDataRecipe,
    Component: NBoxShapedData,
  },
  {
    id: "styles",
    name: "Styles",
    description: nBoxStylesDescription,
    recipe: nBoxStylesRecipe,
    Component: NBoxStyles,
  },
  {
    id: "performance",
    name: "Performance",
    description: nBoxPerformanceDescription,
    recipe: nBoxPerformanceRecipe,
    Component: NBoxPerformance,
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
