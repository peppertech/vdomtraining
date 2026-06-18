import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { GanttAnimations } from "./gantt-animations/gantt-animations";
import { ganttAnimationsDescription } from "./gantt-animations/description";
import { ganttAnimationsRecipe } from "./gantt-animations/recipe";
import { GanttContextMenu } from "./gantt-contextMenu/gantt-contextMenu";
import { ganttContextMenuDescription } from "./gantt-contextMenu/description";
import { ganttContextMenuRecipe } from "./gantt-contextMenu/recipe";
import { GanttCustomScales } from "./gantt-customScales/gantt-customScales";
import { ganttCustomScalesDescription } from "./gantt-customScales/description";
import { ganttCustomScalesRecipe } from "./gantt-customScales/recipe";
import { GanttDependencies } from "./gantt-dependencies/gantt-dependencies";
import { ganttDependenciesDescription } from "./gantt-dependencies/description";
import { ganttDependenciesRecipe } from "./gantt-dependencies/recipe";
import { GanttDrill } from "./gantt-drill/gantt-drill";
import { ganttDrillDescription } from "./gantt-drill/description";
import { ganttDrillRecipe } from "./gantt-drill/recipe";
import { GanttDrillTimeAxis } from "./gantt-drillTimeAxis/gantt-drillTimeAxis";
import { ganttDrillTimeAxisDescription } from "./gantt-drillTimeAxis/description";
import { ganttDrillTimeAxisRecipe } from "./gantt-drillTimeAxis/recipe";
import { GanttHierarchicalTasks } from "./gantt-hierarchicalTasks/gantt-hierarchicalTasks";
import { ganttHierarchicalTasksDescription } from "./gantt-hierarchicalTasks/description";
import { ganttHierarchicalTasksRecipe } from "./gantt-hierarchicalTasks/recipe";
import { GanttMultipleTasks } from "./gantt-multipleTasks/gantt-multipleTasks";
import { ganttMultipleTasksDescription } from "./gantt-multipleTasks/description";
import { ganttMultipleTasksRecipe } from "./gantt-multipleTasks/recipe";
import { GanttOverview } from "./gantt-overview/gantt-overview";
import { ganttOverviewDescription } from "./gantt-overview/description";
import { ganttOverviewRecipe } from "./gantt-overview/recipe";
import { GanttPerformance } from "./gantt-performance/gantt-performance";
import { ganttPerformanceDescription } from "./gantt-performance/description";
import { ganttPerformanceRecipe } from "./gantt-performance/recipe";
import { GanttSelection } from "./gantt-selection/gantt-selection";
import { ganttSelectionDescription } from "./gantt-selection/description";
import { ganttSelectionRecipe } from "./gantt-selection/recipe";
import { GanttTaskDepTemplates } from "./gantt-taskDepTemplates/gantt-taskDepTemplates";
import { ganttTaskDepTemplatesDescription } from "./gantt-taskDepTemplates/description";
import { ganttTaskDepTemplatesRecipe } from "./gantt-taskDepTemplates/recipe";
import { GanttTaskManipulate } from "./gantt-taskManipulate/gantt-taskManipulate";
import { ganttTaskManipulateDescription } from "./gantt-taskManipulate/description";
import { ganttTaskManipulateRecipe } from "./gantt-taskManipulate/recipe";
import { GanttTooltip } from "./gantt-tooltip/gantt-tooltip";
import { ganttTooltipDescription } from "./gantt-tooltip/description";
import { ganttTooltipRecipe } from "./gantt-tooltip/recipe";
import { GanttTooltipTemplate } from "./gantt-tooltipTemplate/gantt-tooltipTemplate";
import { ganttTooltipTemplateDescription } from "./gantt-tooltipTemplate/description";
import { ganttTooltipTemplateRecipe } from "./gantt-tooltipTemplate/recipe";
import { GanttValueFormats } from "./gantt-valueFormats/gantt-valueFormats";
import { ganttValueFormatsDescription } from "./gantt-valueFormats/description";
import { ganttValueFormatsRecipe } from "./gantt-valueFormats/recipe";

const ganttItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: ganttOverviewDescription,
    recipe: ganttOverviewRecipe,
    Component: GanttOverview,
  },
  {
    id: "multiple-tasks",
    name: "Multiple Tasks per Row",
    description: ganttMultipleTasksDescription,
    recipe: ganttMultipleTasksRecipe,
    Component: GanttMultipleTasks,
  },
  {
    id: "dependencies",
    name: "Dependencies",
    description: ganttDependenciesDescription,
    recipe: ganttDependenciesRecipe,
    Component: GanttDependencies,
  },
  {
    id: "animations",
    name: "Animations",
    description: ganttAnimationsDescription,
    recipe: ganttAnimationsRecipe,
    Component: GanttAnimations,
  },
  {
    id: "hierarchical-tasks",
    name: "Hierarchical Tasks",
    description: ganttHierarchicalTasksDescription,
    recipe: ganttHierarchicalTasksRecipe,
    Component: GanttHierarchicalTasks,
  },
  {
    id: "drill",
    name: "Drill Rows",
    description: ganttDrillDescription,
    recipe: ganttDrillRecipe,
    Component: GanttDrill,
  },
  {
    id: "drill-time-axis",
    name: "Drill Time Axis",
    description: ganttDrillTimeAxisDescription,
    recipe: ganttDrillTimeAxisRecipe,
    Component: GanttDrillTimeAxis,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: ganttContextMenuDescription,
    recipe: ganttContextMenuRecipe,
    Component: GanttContextMenu,
  },
  {
    id: "selection",
    name: "Selection",
    description: ganttSelectionDescription,
    recipe: ganttSelectionRecipe,
    Component: GanttSelection,
  },
  {
    id: "custom-scales",
    name: "Custom Timescales and Labels",
    description: ganttCustomScalesDescription,
    recipe: ganttCustomScalesRecipe,
    Component: GanttCustomScales,
  },
  {
    id: "task-dependency-templates",
    name: "Task and Dependency Templates",
    description: ganttTaskDepTemplatesDescription,
    recipe: ganttTaskDepTemplatesRecipe,
    Component: GanttTaskDepTemplates,
  },
  {
    id: "tooltips",
    name: "Tooltip Renderer",
    description: ganttTooltipDescription,
    recipe: ganttTooltipRecipe,
    Component: GanttTooltip,
  },
  {
    id: "tooltip-template",
    name: "Tooltip Template",
    description: ganttTooltipTemplateDescription,
    recipe: ganttTooltipTemplateRecipe,
    Component: GanttTooltipTemplate,
  },
  {
    id: "value-formats",
    name: "Tooltip Value Formats",
    description: ganttValueFormatsDescription,
    recipe: ganttValueFormatsRecipe,
    Component: GanttValueFormats,
  },
  
  {
    id: "task-manipulation",
    name: "Move and Resize Tasks",
    description: ganttTaskManipulateDescription,
    recipe: ganttTaskManipulateRecipe,
    Component: GanttTaskManipulate,
  },
  
  {
    id: "performance",
    name: "Performance",
    description: ganttPerformanceDescription,
    recipe: ganttPerformanceRecipe,
    Component: GanttPerformance,
  },
];

export default function GanttRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Gantt examples"
      componentType="oj-gantt"
      layoutId="ganttNavigationLayout"
      items={ganttItems}
      initialItemId="overview"
      navigationTitle="Gantt"
    />
  );
}
