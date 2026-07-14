import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { diagramAnimationsDescription } from "./diagram-animations/description";
import { DiagramAnimations } from "./diagram-animations/diagram-animations";
import { diagramAnimationsRecipe } from "./diagram-animations/recipe";
import { diagramAsynchronousLayoutDescription } from "./diagram-asynchronousLayout/description";
import { DiagramAsynchronousLayout } from "./diagram-asynchronousLayout/diagram-asynchronousLayout";
import { diagramAsynchronousLayoutRecipe } from "./diagram-asynchronousLayout/recipe";
import { diagramContainersDescription } from "./diagram-containers/description";
import { DiagramContainers } from "./diagram-containers/diagram-containers";
import { diagramContainersRecipe } from "./diagram-containers/recipe";
import { diagramContextDnDDescription } from "./diagram-contextDnD/description";
import { DiagramContextDnD } from "./diagram-contextDnD/diagram-contextDnD";
import { diagramContextDnDRecipe } from "./diagram-contextDnD/recipe";
import { diagramContextMenuDescription } from "./diagram-contextMenu/description";
import { DiagramContextMenu } from "./diagram-contextMenu/diagram-contextMenu";
import { diagramContextMenuRecipe } from "./diagram-contextMenu/recipe";
import { diagramCustomContainersDescription } from "./diagram-customContainers/description";
import { DiagramCustomContainers } from "./diagram-customContainers/diagram-customContainers";
import { diagramCustomContainersRecipe } from "./diagram-customContainers/recipe";
import { diagramCustomRendererDescription } from "./diagram-customRenderer/description";
import { DiagramCustomRenderer } from "./diagram-customRenderer/diagram-customRenderer";
import { diagramCustomRendererRecipe } from "./diagram-customRenderer/recipe";
import { diagramCustomTemplatesDescription } from "./diagram-customTemplates/description";
import { DiagramCustomTemplates } from "./diagram-customTemplates/diagram-customTemplates";
import { diagramCustomTemplatesRecipe } from "./diagram-customTemplates/recipe";
import { diagramDefaultDescription } from "./diagram-default/description";
import { DiagramDefault } from "./diagram-default/diagram-default";
import { diagramDefaultRecipe } from "./diagram-default/recipe";
import { diagramDndEventsDescription } from "./diagram-dndEvents/description";
import { DiagramDndEvents } from "./diagram-dndEvents/diagram-dndEvents";
import { diagramDndEventsRecipe } from "./diagram-dndEvents/recipe";
import { diagramDndSampleDescription } from "./diagram-dndSample/description";
import { DiagramDndSample } from "./diagram-dndSample/diagram-dndSample";
import { diagramDndSampleRecipe } from "./diagram-dndSample/recipe";
import { diagramForeignObjectDescription } from "./diagram-foreignObject/description";
import { DiagramForeignObject } from "./diagram-foreignObject/diagram-foreignObject";
import { diagramForeignObjectRecipe } from "./diagram-foreignObject/recipe";
import { diagramHighlightingDescription } from "./diagram-highlighting/description";
import { DiagramHighlighting } from "./diagram-highlighting/diagram-highlighting";
import { diagramHighlightingRecipe } from "./diagram-highlighting/recipe";
import { diagramLayoutHelperDescription } from "./diagram-layoutHelper/description";
import { DiagramLayoutHelper } from "./diagram-layoutHelper/diagram-layoutHelper";
import { diagramLayoutHelperRecipe } from "./diagram-layoutHelper/recipe";
import { diagramLinkCreationDescription } from "./diagram-linkCreation/description";
import { DiagramLinkCreation } from "./diagram-linkCreation/diagram-linkCreation";
import { diagramLinkCreationRecipe } from "./diagram-linkCreation/recipe";
import { diagramLinkStylesDescription } from "./diagram-linkStyles/description";
import { DiagramLinkStyles } from "./diagram-linkStyles/diagram-linkStyles";
import { diagramLinkStylesRecipe } from "./diagram-linkStyles/recipe";
import { diagramOverviewDescription } from "./diagram-overview/description";
import { DiagramOverview } from "./diagram-overview/diagram-overview";
import { diagramOverviewRecipe } from "./diagram-overview/recipe";
import { diagramPanDirectionDescription } from "./diagram-panDirection/description";
import { DiagramPanDirection } from "./diagram-panDirection/diagram-panDirection";
import { diagramPanDirectionRecipe } from "./diagram-panDirection/recipe";
import { diagramPanZoomStateDescription } from "./diagram-panZoomState/description";
import { DiagramPanZoomState } from "./diagram-panZoomState/diagram-panZoomState";
import { diagramPanZoomStateRecipe } from "./diagram-panZoomState/recipe";
import { diagramPerformanceDescription } from "./diagram-performance/description";
import { DiagramPerformance } from "./diagram-performance/diagram-performance";
import { diagramPerformanceRecipe } from "./diagram-performance/recipe";
import { diagramSankeyLayoutDescription } from "./diagram-sankeyLayout/description";
import { DiagramSankeyLayout } from "./diagram-sankeyLayout/diagram-sankeyLayout";
import { diagramSankeyLayoutRecipe } from "./diagram-sankeyLayout/recipe";
import { diagramSelectionDescription } from "./diagram-selection/description";
import { DiagramSelection } from "./diagram-selection/diagram-selection";
import { diagramSelectionRecipe } from "./diagram-selection/recipe";
import { diagramShapedDataDescription } from "./diagram-shapedData/description";
import { DiagramShapedData } from "./diagram-shapedData/diagram-shapedData";
import { diagramShapedDataRecipe } from "./diagram-shapedData/recipe";
import { diagramStyleClassDescription } from "./diagram-styleClass/description";
import { DiagramStyleClass } from "./diagram-styleClass/diagram-styleClass";
import { diagramStyleClassRecipe } from "./diagram-styleClass/recipe";
import { diagramTooltipDescription } from "./diagram-tooltip/description";
import { DiagramTooltip } from "./diagram-tooltip/diagram-tooltip";
import { diagramTooltipRecipe } from "./diagram-tooltip/recipe";

const diagramItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Basic",
    description: diagramDefaultDescription,
    recipe: diagramDefaultRecipe,
    Component: DiagramDefault,
  },
  {
    id: "animations",
    name: "Animations",
    description: diagramAnimationsDescription,
    recipe: diagramAnimationsRecipe,
    Component: DiagramAnimations,
  },
  {
    id: "asynchronous-layout",
    name: "Asynchronous Layout",
    description: diagramAsynchronousLayoutDescription,
    recipe: diagramAsynchronousLayoutRecipe,
    Component: DiagramAsynchronousLayout,
  },
   {
    id: "style-class",
    name: "Style Name & Class",
    description: diagramStyleClassDescription,
    recipe: diagramStyleClassRecipe,
    Component: DiagramStyleClass,
  },
  {
    id: "containers",
    name: "Containers",
    description: diagramContainersDescription,
    recipe: diagramContainersRecipe,
    Component: DiagramContainers,
  },
  {
    id: "context-drag-and-drop",
    name: "Context Drag and Drop",
    description: diagramContextDnDDescription,
    recipe: diagramContextDnDRecipe,
    Component: DiagramContextDnD,
  },
  {
    id: "context-menu",
    name: "Context Menus",
    description: diagramContextMenuDescription,
    recipe: diagramContextMenuRecipe,
    Component: DiagramContextMenu,
  },
  {
    id: "custom-containers",
    name: "Custom Containers",
    description: diagramCustomContainersDescription,
    recipe: diagramCustomContainersRecipe,
    Component: DiagramCustomContainers,
  },
    
   {
    id: "custom-renderer",
    name: "Custom Renderer",
    description: diagramCustomRendererDescription,
    recipe: diagramCustomRendererRecipe,
    Component: DiagramCustomRenderer,
  },
  {
    id: "custom-templates",
    name: "Custom Templates",
    description: diagramCustomTemplatesDescription,
    recipe: diagramCustomTemplatesRecipe,
    Component: DiagramCustomTemplates,
  },
  {
    id: "drag-and-drop-events",
    name: "Drag and Drop Events",
    description: diagramDndEventsDescription,
    recipe: diagramDndEventsRecipe,
    Component: DiagramDndEvents,
  },
  {
    id: "drag-and-drop-sample",
    name: "Drag and Drop Examples",
    description: diagramDndSampleDescription,
    recipe: diagramDndSampleRecipe,
    Component: DiagramDndSample,
  },
  {
    id: "foreign-object",
    name: "Foreign Object",
    description: diagramForeignObjectDescription,
    recipe: diagramForeignObjectRecipe,
    Component: DiagramForeignObject,
  },
  {
    id: "highlighting",
    name: "Highlighting",
    description: diagramHighlightingDescription,
    recipe: diagramHighlightingRecipe,
    Component: DiagramHighlighting,
  },
  {
    id: "layout-helper",
    name: "Layout Helper",
    description: diagramLayoutHelperDescription,
    recipe: diagramLayoutHelperRecipe,
    Component: DiagramLayoutHelper,
  },
  {
    id: "link-creation",
    name: "Link Creation",
    description: diagramLinkCreationDescription,
    recipe: diagramLinkCreationRecipe,
    Component: DiagramLinkCreation,
  },
  {
    id: "link-styles",
    name: "Link Styles",
    description: diagramLinkStylesDescription,
    recipe: diagramLinkStylesRecipe,
    Component: DiagramLinkStyles,
  },
  {
    id: "overview",
    name: "Overview",
    description: diagramOverviewDescription,
    recipe: diagramOverviewRecipe,
    Component: DiagramOverview,
  },
  {
    id: "pan-direction",
    name: "Pan Direction",
    description: diagramPanDirectionDescription,
    recipe: diagramPanDirectionRecipe,
    Component: DiagramPanDirection,
  },
  {
    id: "pan-zoom-state",
    name: "Pan & Zoom State",
    description: diagramPanZoomStateDescription,
    recipe: diagramPanZoomStateRecipe,
    Component: DiagramPanZoomState,
  },
  {
    id: "performance",
    name: "Performance",
    description: diagramPerformanceDescription,
    recipe: diagramPerformanceRecipe,
    Component: DiagramPerformance,
  },
  {
    id: "selection",
    name: "Selection",
    description: diagramSelectionDescription,
    recipe: diagramSelectionRecipe,
    Component: DiagramSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: diagramShapedDataDescription,
    recipe: diagramShapedDataRecipe,
    Component: DiagramShapedData,
  },
  {
    id: "tooltip",
    name: "Tooltip Customization",
    description: diagramTooltipDescription,
    recipe: diagramTooltipRecipe,
    Component: DiagramTooltip,
  },
  {
    id: "sankey-layout",
    name: "Use case: Sankey Layout",
    description: diagramSankeyLayoutDescription,
    recipe: diagramSankeyLayoutRecipe,
    Component: DiagramSankeyLayout,
  },
];

export default function DiagramRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Diagram examples"
      componentType="oj-diagram"
      layoutId="diagramNavigationLayout"
      items={diagramItems}
      initialItemId="default"
      navigationTitle="Diagram"
    />
  );
}
