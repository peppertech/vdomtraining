import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { TimelineAnimations } from "./timeline-animations/timeline-animations";
import { timelineAnimationsDescription } from "./timeline-animations/description";
import { timelineAnimationsRecipe } from "./timeline-animations/recipe";
import { TimelineBasicDualOverviewTimeline } from "./timeline-basicDualOverviewTimeline/timeline-basicDualOverviewTimeline";
import { timelineBasicDualOverviewTimelineDescription } from "./timeline-basicDualOverviewTimeline/description";
import { timelineBasicDualOverviewTimelineRecipe } from "./timeline-basicDualOverviewTimeline/recipe";
import { TimelineBasicDualTimeline } from "./timeline-basicDualTimeline/timeline-basicDualTimeline";
import { timelineBasicDualTimelineDescription } from "./timeline-basicDualTimeline/description";
import { timelineBasicDualTimelineRecipe } from "./timeline-basicDualTimeline/recipe";
import { TimelineBasicOverviewTimeline } from "./timeline-basicOverviewTimeline/timeline-basicOverviewTimeline";
import { timelineBasicOverviewTimelineDescription } from "./timeline-basicOverviewTimeline/description";
import { timelineBasicOverviewTimelineRecipe } from "./timeline-basicOverviewTimeline/recipe";
import { TimelineBasicTimeline } from "./timeline-basicTimeline/timeline-basicTimeline";
import { timelineBasicTimelineDescription } from "./timeline-basicTimeline/description";
import { timelineBasicTimelineRecipe } from "./timeline-basicTimeline/recipe";
import { TimelineBasicVertDualTimeline } from "./timeline-basicVertDualTimeline/timeline-basicVertDualTimeline";
import { timelineBasicVertDualTimelineDescription } from "./timeline-basicVertDualTimeline/description";
import { timelineBasicVertDualTimelineRecipe } from "./timeline-basicVertDualTimeline/recipe";
import { TimelineContextMenuTimeline } from "./timeline-contextMenuTimeline/timeline-contextMenuTimeline";
import { timelineContextMenuTimelineDescription } from "./timeline-contextMenuTimeline/description";
import { timelineContextMenuTimelineRecipe } from "./timeline-contextMenuTimeline/recipe";
import { TimelineControlsTimeline } from "./timeline-controlsTimeline/timeline-controlsTimeline";
import { timelineControlsTimelineDescription } from "./timeline-controlsTimeline/description";
import { timelineControlsTimelineRecipe } from "./timeline-controlsTimeline/recipe";
import { TimelineCustomDatesTimeline } from "./timeline-customDatesTimeline/timeline-customDatesTimeline";
import { timelineCustomDatesTimelineDescription } from "./timeline-customDatesTimeline/description";
import { timelineCustomDatesTimelineRecipe } from "./timeline-customDatesTimeline/recipe";
import { TimelineCustomRendererTimeline } from "./timeline-customRendererTimeline/timeline-customRendererTimeline";
import { timelineCustomRendererTimelineDescription } from "./timeline-customRendererTimeline/description";
import { timelineCustomRendererTimelineRecipe } from "./timeline-customRendererTimeline/recipe";
import { TimelineCustomScaleTimeline } from "./timeline-customScaleTimeline/timeline-customScaleTimeline";
import { timelineCustomScaleTimelineDescription } from "./timeline-customScaleTimeline/description";
import { timelineCustomScaleTimelineRecipe } from "./timeline-customScaleTimeline/recipe";
import { TimelineDateFormatsTimeline } from "./timeline-dateFormatsTimeline/timeline-dateFormatsTimeline";
import { timelineDateFormatsTimelineDescription } from "./timeline-dateFormatsTimeline/description";
import { timelineDateFormatsTimelineRecipe } from "./timeline-dateFormatsTimeline/recipe";
import { TimelineDiscreteNavigationTimeline } from "./timeline-discreteNavigationTimeline/timeline-discreteNavigationTimeline";
import { timelineDiscreteNavigationTimelineDescription } from "./timeline-discreteNavigationTimeline/description";
import { timelineDiscreteNavigationTimelineRecipe } from "./timeline-discreteNavigationTimeline/recipe";
import { TimelineDurationEventBackground } from "./timeline-durationEventBackground/timeline-durationEventBackground";
import { timelineDurationEventBackgroundDescription } from "./timeline-durationEventBackground/description";
import { timelineDurationEventBackgroundRecipe } from "./timeline-durationEventBackground/recipe";
import { TimelineItemLayoutsTimeline } from "./timeline-itemLayoutsTimeline/timeline-itemLayoutsTimeline";
import { timelineItemLayoutsTimelineDescription } from "./timeline-itemLayoutsTimeline/description";
import { timelineItemLayoutsTimelineRecipe } from "./timeline-itemLayoutsTimeline/recipe";
import { TimelineMoveResizeDurationTimeline } from "./timeline-moveResizeDurationTimeline/timeline-moveResizeDurationTimeline";
import { timelineMoveResizeDurationTimelineDescription } from "./timeline-moveResizeDurationTimeline/description";
import { timelineMoveResizeDurationTimelineRecipe } from "./timeline-moveResizeDurationTimeline/recipe";
import { TimelineOverviewTimeline } from "./timeline-overviewTimeline/timeline-overviewTimeline";
import { timelineOverviewTimelineDescription } from "./timeline-overviewTimeline/description";
import { timelineOverviewTimelineRecipe } from "./timeline-overviewTimeline/recipe";
import { TimelinePerformanceMultipleInstances } from "./timeline-performanceMultipleInstances/timeline-performanceMultipleInstances";
import { timelinePerformanceMultipleInstancesDescription } from "./timeline-performanceMultipleInstances/description";
import { timelinePerformanceMultipleInstancesRecipe } from "./timeline-performanceMultipleInstances/recipe";
import { TimelineSelection } from "./timeline-selection/timeline-selection";
import { timelineSelectionDescription } from "./timeline-selection/description";
import { timelineSelectionRecipe } from "./timeline-selection/recipe";
import { TimelineShapedData } from "./timeline-shapedData/timeline-shapedData";
import { timelineShapedDataDescription } from "./timeline-shapedData/description";
import { timelineShapedDataRecipe } from "./timeline-shapedData/recipe";
import { TimelineSmallScaleTimeline } from "./timeline-smallScaleTimeline/timeline-smallScaleTimeline";
import { timelineSmallScaleTimelineDescription } from "./timeline-smallScaleTimeline/description";
import { timelineSmallScaleTimelineRecipe } from "./timeline-smallScaleTimeline/recipe";
import { TimelineTooltip } from "./timeline-tooltip/timeline-tooltip";
import { timelineTooltipDescription } from "./timeline-tooltip/description";
import { timelineTooltipRecipe } from "./timeline-tooltip/recipe";
import { TimelineTooltipTemplate } from "./timeline-tooltipTemplate/timeline-tooltipTemplate";
import { timelineTooltipTemplateDescription } from "./timeline-tooltipTemplate/description";
import { timelineTooltipTemplateRecipe } from "./timeline-tooltipTemplate/recipe";
import { TimelineValueFormats } from "./timeline-valueFormats/timeline-valueFormats";
import { timelineValueFormatsDescription } from "./timeline-valueFormats/description";
import { timelineValueFormatsRecipe } from "./timeline-valueFormats/recipe";
import { TimelineVertTimeline } from "./timeline-vertTimeline/timeline-vertTimeline";
import { timelineVertTimelineDescription } from "./timeline-vertTimeline/description";
import { timelineVertTimelineRecipe } from "./timeline-vertTimeline/recipe";

const timelineItems: RecipePageItem[] = [
  {
    id: "animations",
    name: "Animations",
    description: timelineAnimationsDescription,
    recipe: timelineAnimationsRecipe,
    Component: TimelineAnimations,
  },
  {
    id: "basic-dual-overview-timeline",
    name: "Basic Dual Overview",
    description: timelineBasicDualOverviewTimelineDescription,
    recipe: timelineBasicDualOverviewTimelineRecipe,
    Component: TimelineBasicDualOverviewTimeline,
  },
  {
    id: "basic-dual-timeline",
    name: "Basic Dual",
    description: timelineBasicDualTimelineDescription,
    recipe: timelineBasicDualTimelineRecipe,
    Component: TimelineBasicDualTimeline,
  },
  {
    id: "basic-overview-timeline",
    name: "Basic Overview",
    description: timelineBasicOverviewTimelineDescription,
    recipe: timelineBasicOverviewTimelineRecipe,
    Component: TimelineBasicOverviewTimeline,
  },
  {
    id: "basic-timeline",
    name: "Basic",
    description: timelineBasicTimelineDescription,
    recipe: timelineBasicTimelineRecipe,
    Component: TimelineBasicTimeline,
  },
  {
    id: "basic-vert-dual-timeline",
    name: "Basic Vert Dual",
    description: timelineBasicVertDualTimelineDescription,
    recipe: timelineBasicVertDualTimelineRecipe,
    Component: TimelineBasicVertDualTimeline,
  },
  {
    id: "context-menu-timeline",
    name: "Context Menu",
    description: timelineContextMenuTimelineDescription,
    recipe: timelineContextMenuTimelineRecipe,
    Component: TimelineContextMenuTimeline,
  },
  {
    id: "controls-timeline",
    name: "Controls",
    description: timelineControlsTimelineDescription,
    recipe: timelineControlsTimelineRecipe,
    Component: TimelineControlsTimeline,
  },
  {
    id: "custom-dates-timeline",
    name: "Custom Dates",
    description: timelineCustomDatesTimelineDescription,
    recipe: timelineCustomDatesTimelineRecipe,
    Component: TimelineCustomDatesTimeline,
  },
  {
    id: "custom-renderer-timeline",
    name: "Custom Renderer",
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
    id: "date-formats-timeline",
    name: "Date Formats",
    description: timelineDateFormatsTimelineDescription,
    recipe: timelineDateFormatsTimelineRecipe,
    Component: TimelineDateFormatsTimeline,
  },
  {
    id: "discrete-navigation-timeline",
    name: "Discrete Navigation",
    description: timelineDiscreteNavigationTimelineDescription,
    recipe: timelineDiscreteNavigationTimelineRecipe,
    Component: TimelineDiscreteNavigationTimeline,
  },
  {
    id: "duration-event-background",
    name: "Duration Event Background",
    description: timelineDurationEventBackgroundDescription,
    recipe: timelineDurationEventBackgroundRecipe,
    Component: TimelineDurationEventBackground,
  },
  {
    id: "item-layouts-timeline",
    name: "Item Layouts",
    description: timelineItemLayoutsTimelineDescription,
    recipe: timelineItemLayoutsTimelineRecipe,
    Component: TimelineItemLayoutsTimeline,
  },
  {
    id: "move-resize-duration-timeline",
    name: "Move Resize Duration",
    description: timelineMoveResizeDurationTimelineDescription,
    recipe: timelineMoveResizeDurationTimelineRecipe,
    Component: TimelineMoveResizeDurationTimeline,
  },
  {
    id: "overview-timeline",
    name: "Overview",
    description: timelineOverviewTimelineDescription,
    recipe: timelineOverviewTimelineRecipe,
    Component: TimelineOverviewTimeline,
  },
  {
    id: "performance-multiple-instances",
    name: "Performance Multiple Instances",
    description: timelinePerformanceMultipleInstancesDescription,
    recipe: timelinePerformanceMultipleInstancesRecipe,
    Component: TimelinePerformanceMultipleInstances,
  },
  {
    id: "selection",
    name: "Selection",
    description: timelineSelectionDescription,
    recipe: timelineSelectionRecipe,
    Component: TimelineSelection,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: timelineShapedDataDescription,
    recipe: timelineShapedDataRecipe,
    Component: TimelineShapedData,
  },
  {
    id: "small-scale-timeline",
    name: "Small Scale",
    description: timelineSmallScaleTimelineDescription,
    recipe: timelineSmallScaleTimelineRecipe,
    Component: TimelineSmallScaleTimeline,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: timelineTooltipDescription,
    recipe: timelineTooltipRecipe,
    Component: TimelineTooltip,
  },
  {
    id: "tooltip-template",
    name: "Tooltip Template",
    description: timelineTooltipTemplateDescription,
    recipe: timelineTooltipTemplateRecipe,
    Component: TimelineTooltipTemplate,
  },
  {
    id: "value-formats",
    name: "Value Formats",
    description: timelineValueFormatsDescription,
    recipe: timelineValueFormatsRecipe,
    Component: TimelineValueFormats,
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
