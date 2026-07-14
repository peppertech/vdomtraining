import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { timelineAnimationsDescription } from "./timeline-animations/description";
import { timelineAnimationsRecipe } from "./timeline-animations/recipe";
import { TimelineAnimations } from "./timeline-animations/timeline-animations";
import { timelineBasicTimelineDescription } from "./timeline-basicTimeline/description";
import { timelineBasicTimelineRecipe } from "./timeline-basicTimeline/recipe";
import { TimelineBasicTimeline } from "./timeline-basicTimeline/timeline-basicTimeline";
import { timelineContextMenuTimelineDescription } from "./timeline-contextMenuTimeline/description";
import { timelineContextMenuTimelineRecipe } from "./timeline-contextMenuTimeline/recipe";
import { TimelineContextMenuTimeline } from "./timeline-contextMenuTimeline/timeline-contextMenuTimeline";
import { timelineControlsTimelineDescription } from "./timeline-controlsTimeline/description";
import { timelineControlsTimelineRecipe } from "./timeline-controlsTimeline/recipe";
import { TimelineControlsTimeline } from "./timeline-controlsTimeline/timeline-controlsTimeline";
import { timelineCustomDatesTimelineDescription } from "./timeline-customDatesTimeline/description";
import { timelineCustomDatesTimelineRecipe } from "./timeline-customDatesTimeline/recipe";
import { TimelineCustomDatesTimeline } from "./timeline-customDatesTimeline/timeline-customDatesTimeline";
import { timelineCustomRendererTimelineDescription } from "./timeline-customRendererTimeline/description";
import { timelineCustomRendererTimelineRecipe } from "./timeline-customRendererTimeline/recipe";
import { TimelineCustomRendererTimeline } from "./timeline-customRendererTimeline/timeline-customRendererTimeline";
import { timelineCustomScaleTimelineDescription } from "./timeline-customScaleTimeline/description";
import { timelineCustomScaleTimelineRecipe } from "./timeline-customScaleTimeline/recipe";
import { TimelineCustomScaleTimeline } from "./timeline-customScaleTimeline/timeline-customScaleTimeline";
import { timelineDateFormatsTimelineDescription } from "./timeline-dateFormatsTimeline/description";
import { timelineDateFormatsTimelineRecipe } from "./timeline-dateFormatsTimeline/recipe";
import { TimelineDateFormatsTimeline } from "./timeline-dateFormatsTimeline/timeline-dateFormatsTimeline";
import { timelineDiscreteNavigationTimelineDescription } from "./timeline-discreteNavigationTimeline/description";
import { timelineDiscreteNavigationTimelineRecipe } from "./timeline-discreteNavigationTimeline/recipe";
import { TimelineDiscreteNavigationTimeline } from "./timeline-discreteNavigationTimeline/timeline-discreteNavigationTimeline";
import { timelineDurationEventBackgroundDescription } from "./timeline-durationEventBackground/description";
import { timelineDurationEventBackgroundRecipe } from "./timeline-durationEventBackground/recipe";
import { TimelineDurationEventBackground } from "./timeline-durationEventBackground/timeline-durationEventBackground";
import { timelineItemLayoutsTimelineDescription } from "./timeline-itemLayoutsTimeline/description";
import { timelineItemLayoutsTimelineRecipe } from "./timeline-itemLayoutsTimeline/recipe";
import { TimelineItemLayoutsTimeline } from "./timeline-itemLayoutsTimeline/timeline-itemLayoutsTimeline";
import { timelineMoveResizeDurationTimelineDescription } from "./timeline-moveResizeDurationTimeline/description";
import { timelineMoveResizeDurationTimelineRecipe } from "./timeline-moveResizeDurationTimeline/recipe";
import { TimelineMoveResizeDurationTimeline } from "./timeline-moveResizeDurationTimeline/timeline-moveResizeDurationTimeline";
import { timelineOverviewTimelineDescription } from "./timeline-overviewTimeline/description";
import { timelineOverviewTimelineRecipe } from "./timeline-overviewTimeline/recipe";
import { TimelineOverviewTimeline } from "./timeline-overviewTimeline/timeline-overviewTimeline";
import { timelinePerformanceMultipleInstancesDescription } from "./timeline-performanceMultipleInstances/description";
import { timelinePerformanceMultipleInstancesRecipe } from "./timeline-performanceMultipleInstances/recipe";
import { TimelinePerformanceMultipleInstances } from "./timeline-performanceMultipleInstances/timeline-performanceMultipleInstances";
import { timelineSelectionDescription } from "./timeline-selection/description";
import { timelineSelectionRecipe } from "./timeline-selection/recipe";
import { TimelineSelection } from "./timeline-selection/timeline-selection";
import { timelineShapedDataDescription } from "./timeline-shapedData/description";
import { timelineShapedDataRecipe } from "./timeline-shapedData/recipe";
import { TimelineShapedData } from "./timeline-shapedData/timeline-shapedData";
import { timelineSmallScaleTimelineDescription } from "./timeline-smallScaleTimeline/description";
import { timelineSmallScaleTimelineRecipe } from "./timeline-smallScaleTimeline/recipe";
import { TimelineSmallScaleTimeline } from "./timeline-smallScaleTimeline/timeline-smallScaleTimeline";
import { timelineTooltipDescription } from "./timeline-tooltip/description";
import { timelineTooltipRecipe } from "./timeline-tooltip/recipe";
import { TimelineTooltip } from "./timeline-tooltip/timeline-tooltip";
import { timelineTooltipTemplateDescription } from "./timeline-tooltipTemplate/description";
import { timelineTooltipTemplateRecipe } from "./timeline-tooltipTemplate/recipe";
import { TimelineTooltipTemplate } from "./timeline-tooltipTemplate/timeline-tooltipTemplate";
import { timelineValueFormatsDescription } from "./timeline-valueFormats/description";
import { timelineValueFormatsRecipe } from "./timeline-valueFormats/recipe";
import { TimelineValueFormats } from "./timeline-valueFormats/timeline-valueFormats";
import { timelineVertTimelineDescription } from "./timeline-vertTimeline/description";
import { timelineVertTimelineRecipe } from "./timeline-vertTimeline/recipe";
import { TimelineVertTimeline } from "./timeline-vertTimeline/timeline-vertTimeline";

const timelineItems: RecipePageItem[] = [
  {
    id: "basic-timeline",
    name: "Overview",
    description: timelineBasicTimelineDescription,
    recipe: timelineBasicTimelineRecipe,
    Component: TimelineBasicTimeline,
  },
  {
    id: "animations",
    name: "Animations",
    description: timelineAnimationsDescription,
    recipe: timelineAnimationsRecipe,
    Component: TimelineAnimations,
  },
  {
    id: "selection",
    name: "Selection",
    description: timelineSelectionDescription,
    recipe: timelineSelectionRecipe,
    Component: TimelineSelection,
  },
  {
    id: "context-menu-timeline",
    name: "Context Menu",
    description: timelineContextMenuTimelineDescription,
    recipe: timelineContextMenuTimelineRecipe,
    Component: TimelineContextMenuTimeline,
  },
  {
    id: "date-formats-timeline",
    name: "Date & Time Formats",
    description: timelineDateFormatsTimelineDescription,
    recipe: timelineDateFormatsTimelineRecipe,
    Component: TimelineDateFormatsTimeline,
  },
  {
    id: "discrete-navigation-timeline",
    name: "Discrete Navigation Timeline",
    description: timelineDiscreteNavigationTimelineDescription,
    recipe: timelineDiscreteNavigationTimelineRecipe,
    Component: TimelineDiscreteNavigationTimeline,
  },
   {
    id: "item-layouts-timeline",
    name: "Item Layouts",
    description: timelineItemLayoutsTimelineDescription,
    recipe: timelineItemLayoutsTimelineRecipe,
    Component: TimelineItemLayoutsTimeline,
  },
  {
    id: "small-scale-timeline",
    name: "Small Scale Timeline",
    description: timelineSmallScaleTimelineDescription,
    recipe: timelineSmallScaleTimelineRecipe,
    Component: TimelineSmallScaleTimeline,
  },
  {
    id: "overview-timeline",
    name: "Two Series with Duration & Overview",
    description: timelineOverviewTimelineDescription,
    recipe: timelineOverviewTimelineRecipe,
    Component: TimelineOverviewTimeline,
  },
  // {
  //   id: "basic-vert-dual-timeline",
  //   name: "Basic Vert Dual",
  //   description: timelineBasicVertDualTimelineDescription,
  //   recipe: timelineBasicVertDualTimelineRecipe,
  //   Component: TimelineBasicVertDualTimeline,
  // },
  {
    id: "custom-dates-timeline",
    name: "Custom Time Axis Formatting",
    description: timelineCustomDatesTimelineDescription,
    recipe: timelineCustomDatesTimelineRecipe,
    Component: TimelineCustomDatesTimeline,
  },
  {
    id: "custom-renderer-timeline",
    name: "Custom Bubble Renderer",
    description: timelineCustomRendererTimelineDescription,
    recipe: timelineCustomRendererTimelineRecipe,
    Component: TimelineCustomRendererTimeline,
  },
  {
    id: "custom-scale-timeline",
    name: "Custom Scale",
    description: timelineCustomScaleTimelineDescription,
    recipe: timelineCustomScaleTimelineRecipe,
    Component: TimelineCustomScaleTimeline,
  },
  
  {
    id: "duration-event-background",
    name: "Background (Duration & Event)",
    description: timelineDurationEventBackgroundDescription,
    recipe: timelineDurationEventBackgroundRecipe,
    Component: TimelineDurationEventBackground,
  },
  
  {
    id: "controls-timeline",
    name: "Response with Controls",
    description: timelineControlsTimelineDescription,
    recipe: timelineControlsTimelineRecipe,
    Component: TimelineControlsTimeline,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: timelineShapedDataDescription,
    recipe: timelineShapedDataRecipe,
    Component: TimelineShapedData,
  },
  {
    id: "performance-multiple-instances",
    name: "Performance: Multiple Instances",
    description: timelinePerformanceMultipleInstancesDescription,
    recipe: timelinePerformanceMultipleInstancesRecipe,
    Component: TimelinePerformanceMultipleInstances,
  },
  {
    id: "value-formats",
    name: "Tooltip Value Formats",
    description: timelineValueFormatsDescription,
    recipe: timelineValueFormatsRecipe,
    Component: TimelineValueFormats,
  },
  {
    id: "tooltip-template",
    name: "Tooltip Template",
    description: timelineTooltipTemplateDescription,
    recipe: timelineTooltipTemplateRecipe,
    Component: TimelineTooltipTemplate,
  },
  {
    id: "tooltip",
    name: "Tooltip Callback",
    description: timelineTooltipDescription,
    recipe: timelineTooltipRecipe,
    Component: TimelineTooltip,
  },
   {
    id: "move-resize-duration-timeline",
    name: "Move Resize Duration",
    description: timelineMoveResizeDurationTimelineDescription,
    recipe: timelineMoveResizeDurationTimelineRecipe,
    Component: TimelineMoveResizeDurationTimeline,
  },
  {
    id: "vert-timeline",
    name: "Vert",
    description: timelineVertTimelineDescription,
    recipe: timelineVertTimelineRecipe,
    Component: TimelineVertTimeline,
  },
];

export default function TimelineRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Timeline examples"
      componentType="oj-timeline"
      layoutId="timelineNavigationLayout"
      items={timelineItems}
      initialItemId="basic-timeline"
      navigationTitle="Timeline"
    />
  );
}
