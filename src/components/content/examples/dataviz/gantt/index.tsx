import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { ganttAnimationsDescription } from "./gantt-animations/description";
import { GanttAnimations } from "./gantt-animations/gantt-animations";
import { ganttAnimationsRecipe } from "./gantt-animations/recipe";
import { ganttContextMenuDescription } from "./gantt-contextMenu/description";
import { GanttContextMenu } from "./gantt-contextMenu/gantt-contextMenu";
import { ganttContextMenuRecipe } from "./gantt-contextMenu/recipe";
import { ganttCustomScalesDescription } from "./gantt-customScales/description";
import { GanttCustomScales } from "./gantt-customScales/gantt-customScales";
import { ganttCustomScalesRecipe } from "./gantt-customScales/recipe";
import { ganttDependenciesDescription } from "./gantt-dependencies/description";
import { GanttDependencies } from "./gantt-dependencies/gantt-dependencies";
import { ganttDependenciesRecipe } from "./gantt-dependencies/recipe";
import { ganttDrillDescription } from "./gantt-drill/description";
import { GanttDrill } from "./gantt-drill/gantt-drill";
import { ganttDrillRecipe } from "./gantt-drill/recipe";
import { ganttDrillTimeAxisDescription } from "./gantt-drillTimeAxis/description";
import { GanttDrillTimeAxis } from "./gantt-drillTimeAxis/gantt-drillTimeAxis";
import { ganttDrillTimeAxisRecipe } from "./gantt-drillTimeAxis/recipe";
import { ganttHierarchicalTasksDescription } from "./gantt-hierarchicalTasks/description";
import { GanttHierarchicalTasks } from "./gantt-hierarchicalTasks/gantt-hierarchicalTasks";
import { ganttHierarchicalTasksRecipe } from "./gantt-hierarchicalTasks/recipe";
import { ganttMultipleTasksDescription } from "./gantt-multipleTasks/description";
import { GanttMultipleTasks } from "./gantt-multipleTasks/gantt-multipleTasks";
import { ganttMultipleTasksRecipe } from "./gantt-multipleTasks/recipe";
import { ganttOverviewDescription } from "./gantt-overview/description";
import { GanttOverview } from "./gantt-overview/gantt-overview";
import { ganttOverviewRecipe } from "./gantt-overview/recipe";
import { ganttPerformanceDescription } from "./gantt-performance/description";
import { GanttPerformance } from "./gantt-performance/gantt-performance";
import { ganttPerformanceRecipe } from "./gantt-performance/recipe";
import { ganttSelectionDescription } from "./gantt-selection/description";
import { GanttSelection } from "./gantt-selection/gantt-selection";
import { ganttSelectionRecipe } from "./gantt-selection/recipe";
import { ganttTaskDepTemplatesDescription } from "./gantt-taskDepTemplates/description";
import { GanttTaskDepTemplates } from "./gantt-taskDepTemplates/gantt-taskDepTemplates";
import { ganttTaskDepTemplatesRecipe } from "./gantt-taskDepTemplates/recipe";
import { ganttTaskManipulateDescription } from "./gantt-taskManipulate/description";
import { GanttTaskManipulate } from "./gantt-taskManipulate/gantt-taskManipulate";
import { ganttTaskManipulateRecipe } from "./gantt-taskManipulate/recipe";
import { ganttTooltipDescription } from "./gantt-tooltip/description";
import { GanttTooltip } from "./gantt-tooltip/gantt-tooltip";
import { ganttTooltipRecipe } from "./gantt-tooltip/recipe";
import { ganttTooltipTemplateDescription } from "./gantt-tooltipTemplate/description";
import { GanttTooltipTemplate } from "./gantt-tooltipTemplate/gantt-tooltipTemplate";
import { ganttTooltipTemplateRecipe } from "./gantt-tooltipTemplate/recipe";
import { ganttValueFormatsDescription } from "./gantt-valueFormats/description";
import { GanttValueFormats } from "./gantt-valueFormats/gantt-valueFormats";
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
