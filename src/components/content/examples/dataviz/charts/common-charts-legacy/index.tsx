import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ChartCategoricalAxisSorting } from "./chart-categoricalAxisSorting/chart-categoricalAxisSorting";
import { chartCategoricalAxisSortingDescription } from "./chart-categoricalAxisSorting/description";
import { chartCategoricalAxisSortingRecipe } from "./chart-categoricalAxisSorting/recipe";
import { ChartCategoricalAxisStyling } from "./chart-categoricalAxisStyling/chart-categoricalAxisStyling";
import { chartCategoricalAxisStylingDescription } from "./chart-categoricalAxisStyling/description";
import { chartCategoricalAxisStylingRecipe } from "./chart-categoricalAxisStyling/recipe";
import { ChartContextMenu } from "./chart-contextMenu/chart-contextMenu";
import { chartContextMenuDescription } from "./chart-contextMenu/description";
import { chartContextMenuRecipe } from "./chart-contextMenu/recipe";
import { ChartCustomImages } from "./chart-customImages/chart-customImages";
import { chartCustomImagesDescription } from "./chart-customImages/description";
import { chartCustomImagesRecipe } from "./chart-customImages/recipe";
import { ChartCustomMarkers } from "./chart-customMarkers/chart-customMarkers";
import { chartCustomMarkersDescription } from "./chart-customMarkers/description";
import { chartCustomMarkersRecipe } from "./chart-customMarkers/recipe";
import { ChartCustomStyling } from "./chart-customStyling/chart-customStyling";
import { chartCustomStylingDescription } from "./chart-customStyling/description";
import { chartCustomStylingRecipe } from "./chart-customStyling/recipe";
import { ChartDataCursor } from "./chart-dataCursor/chart-dataCursor";
import { chartDataCursorDescription } from "./chart-dataCursor/description";
import { chartDataCursorRecipe } from "./chart-dataCursor/recipe";
import { ChartDataLabel } from "./chart-dataLabel/chart-dataLabel";
import { chartDataLabelDescription } from "./chart-dataLabel/description";
import { chartDataLabelRecipe } from "./chart-dataLabel/recipe";
import { ChartDndEvents } from "./chart-dndEvents/chart-dndEvents";
import { chartDndEventsDescription } from "./chart-dndEvents/description";
import { chartDndEventsRecipe } from "./chart-dndEvents/recipe";
import { ChartDndSample } from "./chart-dndSample/chart-dndSample";
import { chartDndSampleDescription } from "./chart-dndSample/description";
import { chartDndSampleRecipe } from "./chart-dndSample/recipe";
import { ChartDragMode } from "./chart-dragMode/chart-dragMode";
import { chartDragModeDescription } from "./chart-dragMode/description";
import { chartDragModeRecipe } from "./chart-dragMode/recipe";
import { ChartDrillingEvents } from "./chart-drillingEvents/chart-drillingEvents";
import { chartDrillingEventsDescription } from "./chart-drillingEvents/description";
import { chartDrillingEventsRecipe } from "./chart-drillingEvents/recipe";
import { ChartDrillingSample } from "./chart-drillingSample/chart-drillingSample";
import { chartDrillingSampleDescription } from "./chart-drillingSample/description";
import { chartDrillingSampleRecipe } from "./chart-drillingSample/recipe";
import { ChartFiltering } from "./chart-filtering/chart-filtering";
import { chartFilteringDescription } from "./chart-filtering/description";
import { chartFilteringRecipe } from "./chart-filtering/recipe";
import { ChartHighlighting } from "./chart-highlighting/chart-highlighting";
import { chartHighlightingDescription } from "./chart-highlighting/description";
import { chartHighlightingRecipe } from "./chart-highlighting/recipe";
import { ChartLogAxis } from "./chart-logAxis/chart-logAxis";
import { chartLogAxisDescription } from "./chart-logAxis/description";
import { chartLogAxisRecipe } from "./chart-logAxis/recipe";
import { ChartNumberFormat } from "./chart-numberFormat/chart-numberFormat";
import { chartNumberFormatDescription } from "./chart-numberFormat/description";
import { chartNumberFormatRecipe } from "./chart-numberFormat/recipe";
import { ChartPerformanceCategorical } from "./chart-performanceCategorical/chart-performanceCategorical";
import { chartPerformanceCategoricalDescription } from "./chart-performanceCategorical/description";
import { chartPerformanceCategoricalRecipe } from "./chart-performanceCategorical/recipe";
import { ChartPerformanceListOfCharts } from "./chart-performanceListOfCharts/chart-performanceListOfCharts";
import { chartPerformanceListOfChartsDescription } from "./chart-performanceListOfCharts/description";
import { chartPerformanceListOfChartsRecipe } from "./chart-performanceListOfCharts/recipe";
import { ChartPerformanceMultiple } from "./chart-performanceMultiple/chart-performanceMultiple";
import { chartPerformanceMultipleDescription } from "./chart-performanceMultiple/description";
import { chartPerformanceMultipleRecipe } from "./chart-performanceMultiple/recipe";
import { ChartPerformanceScatterBubble } from "./chart-performanceScatterBubble/chart-performanceScatterBubble";
import { chartPerformanceScatterBubbleDescription } from "./chart-performanceScatterBubble/description";
import { chartPerformanceScatterBubbleRecipe } from "./chart-performanceScatterBubble/recipe";
import { ChartPerformanceTime } from "./chart-performanceTime/chart-performanceTime";
import { chartPerformanceTimeDescription } from "./chart-performanceTime/description";
import { chartPerformanceTimeRecipe } from "./chart-performanceTime/recipe";
import { ChartPopup } from "./chart-popup/chart-popup";
import { chartPopupDescription } from "./chart-popup/description";
import { chartPopupRecipe } from "./chart-popup/recipe";
import { ChartProgressiveLoading } from "./chart-progressiveLoading/chart-progressiveLoading";
import { chartProgressiveLoadingDescription } from "./chart-progressiveLoading/description";
import { chartProgressiveLoadingRecipe } from "./chart-progressiveLoading/recipe";
import { ChartRefObject } from "./chart-refObject/chart-refObject";
import { chartRefObjectDescription } from "./chart-refObject/description";
import { chartRefObjectRecipe } from "./chart-refObject/recipe";
import { ChartSelecting } from "./chart-selecting/chart-selecting";
import { chartSelectingDescription } from "./chart-selecting/description";
import { chartSelectingRecipe } from "./chart-selecting/recipe";
import { ChartStackCategory } from "./chart-stackCategory/chart-stackCategory";
import { chartStackCategoryDescription } from "./chart-stackCategory/description";
import { chartStackCategoryRecipe } from "./chart-stackCategory/recipe";
import { ChartTimeAxis } from "./chart-timeAxis/chart-timeAxis";
import { chartTimeAxisDescription } from "./chart-timeAxis/description";
import { chartTimeAxisRecipe } from "./chart-timeAxis/recipe";
import { ChartTooltip } from "./chart-tooltip/chart-tooltip";
import { chartTooltipDescription } from "./chart-tooltip/description";
import { chartTooltipRecipe } from "./chart-tooltip/recipe";
import { ChartTooltipTemplate } from "./chart-tooltipTemplate/chart-tooltipTemplate";
import { chartTooltipTemplateDescription } from "./chart-tooltipTemplate/description";
import { chartTooltipTemplateRecipe } from "./chart-tooltipTemplate/recipe";
import { ChartValueformats } from "./chart-valueformats/chart-valueformats";
import { chartValueformatsDescription } from "./chart-valueformats/description";
import { chartValueformatsRecipe } from "./chart-valueformats/recipe";
import { ChartZoomScrollCategorical } from "./chart-zoomScrollCategorical/chart-zoomScrollCategorical";
import { chartZoomScrollCategoricalDescription } from "./chart-zoomScrollCategorical/description";
import { chartZoomScrollCategoricalRecipe } from "./chart-zoomScrollCategorical/recipe";
import { ChartZoomScrollTime } from "./chart-zoomScrollTime/chart-zoomScrollTime";
import { chartZoomScrollTimeDescription } from "./chart-zoomScrollTime/description";
import { chartZoomScrollTimeRecipe } from "./chart-zoomScrollTime/recipe";

const commonChartItems = [
  {
    id: "filtering",
    name: "Associate Views: Filtering",
    description: chartFilteringDescription,
    recipe: chartFilteringRecipe,
    Component: ChartFiltering,
  },
  {
    id: "highlighting",
    name: "Associate Views:Highlighting",
    description: chartHighlightingDescription,
    recipe: chartHighlightingRecipe,
    Component: ChartHighlighting,
  },
  {
    id: "selection",
    name: "Associate Views: Selection",
    description: chartSelectingDescription,
    recipe: chartSelectingRecipe,
    Component: ChartSelecting,
  },
  {
    id: "categorical-axis-sorting",
    name: "Categorical Axis: Sorting",
    description: chartCategoricalAxisSortingDescription,
    recipe: chartCategoricalAxisSortingRecipe,
    Component: ChartCategoricalAxisSorting,
  },
  {
    id: "categorical-axis-styling",
    name: "Categorical Axis: Styling & Tooltip",
    description: chartCategoricalAxisStylingDescription,
    recipe: chartCategoricalAxisStylingRecipe,
    Component: ChartCategoricalAxisStyling,
  },
  
  
  {
    id: "context-menu",
    name: "Context Menus",
    description: chartContextMenuDescription,
    recipe: chartContextMenuRecipe,
    Component: ChartContextMenu,
  },
  {
    id: "data-cursor",
    name: "Data Cursor",
    description: chartDataCursorDescription,
    recipe: chartDataCursorRecipe,
    Component: ChartDataCursor,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: chartDataLabelDescription,
    recipe: chartDataLabelRecipe,
    Component: ChartDataLabel,
  },
  {
    id: "dnd-events",
    name: "Drag and Drop Events",
    description: chartDndEventsDescription,
    recipe: chartDndEventsRecipe,
    Component: ChartDndEvents,
  },
  {
    id: "dnd-sample",
    name: "Drag and Drop Examples",
    description: chartDndSampleDescription,
    recipe: chartDndSampleRecipe,
    Component: ChartDndSample,
  },
   {
    id: "drag-mode",
    name: "Drag Mode",
    description: chartDragModeDescription,
    recipe: chartDragModeRecipe,
    Component: ChartDragMode,
  },
  {
    id: "drilling-events",
    name: "Drilling Events",
    description: chartDrillingEventsDescription,
    recipe: chartDrillingEventsRecipe,
    Component: ChartDrillingEvents,
  },
  {
    id: "drilling-sample",
    name: "Drilling Examples",
    description: chartDrillingSampleDescription,
    recipe: chartDrillingSampleRecipe,
    Component: ChartDrillingSample,
  },
  {
    id: "custom-images",
    name: "Custom Images",
    description: chartCustomImagesDescription,
    recipe: chartCustomImagesRecipe,
    Component: ChartCustomImages,
  },
  
  
  
  {
    id: "log-axis",
    name: "Logarithmic Axis",
    description: chartLogAxisDescription,
    recipe: chartLogAxisRecipe,
    Component: ChartLogAxis,
  },
  {
    id: "custom-markers",
    name: "Markers: Custom Markers",
    description: chartCustomMarkersDescription,
    recipe: chartCustomMarkersRecipe,
    Component: ChartCustomMarkers,
  },
  {
    id: "custom-styling",
    name: "Markers: Custom Shapes",
    description: chartCustomStylingDescription,
    recipe: chartCustomStylingRecipe,
    Component: ChartCustomStyling,
  },
  {
    id: "number-format",
    name: "Number Format",
    description: chartNumberFormatDescription,
    recipe: chartNumberFormatRecipe,
    Component: ChartNumberFormat,
  },
  {
    id: "performance-categorical",
    name: "Performance: Categorical Axix",
    description: chartPerformanceCategoricalDescription,
    recipe: chartPerformanceCategoricalRecipe,
    Component: ChartPerformanceCategorical,
  },
  {
    id: "performance-list-of-charts",
    name: "Performance: List Of Charts",
    description: chartPerformanceListOfChartsDescription,
    recipe: chartPerformanceListOfChartsRecipe,
    Component: ChartPerformanceListOfCharts,
  },
  {
    id: "performance-multiple",
    name: "Performance: Multiple Instances",
    description: chartPerformanceMultipleDescription,
    recipe: chartPerformanceMultipleRecipe,
    Component: ChartPerformanceMultiple,
  },
  {
    id: "performance-scatter-bubble",
    name: "Performance: Scatter & Bubble charts",
    description: chartPerformanceScatterBubbleDescription,
    recipe: chartPerformanceScatterBubbleRecipe,
    Component: ChartPerformanceScatterBubble,
  },
  {
    id: "performance-time",
    name: "Performance: Time Axis",
    description: chartPerformanceTimeDescription,
    recipe: chartPerformanceTimeRecipe,
    Component: ChartPerformanceTime,
  },
  {
    id: "popup",
    name: "Popups",
    description: chartPopupDescription,
    recipe: chartPopupRecipe,
    Component: ChartPopup,
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: chartProgressiveLoadingDescription,
    recipe: chartProgressiveLoadingRecipe,
    Component: ChartProgressiveLoading,
  },
  {
    id: "reference-objects",
    name: "Reference Object Interactivity",
    description: chartRefObjectDescription,
    recipe: chartRefObjectRecipe,
    Component: ChartRefObject,
  },
  
  {
    id: "stack-category",
    name: "Stack Categories",
    description: chartStackCategoryDescription,
    recipe: chartStackCategoryRecipe,
    Component: ChartStackCategory,
  },
  {
    id: "time-axis",
    name: "Time Axis",
    description: chartTimeAxisDescription,
    recipe: chartTimeAxisRecipe,
    Component: ChartTimeAxis,
  },
  {
    id: "tooltip",
    name: "Tooltip callback",
    description: chartTooltipDescription,
    recipe: chartTooltipRecipe,
    Component: ChartTooltip,
  },
  {
    id: "tooltip-template",
    name: "Tooltip Template",
    description: chartTooltipTemplateDescription,
    recipe: chartTooltipTemplateRecipe,
    Component: ChartTooltipTemplate,
  },
  {
    id: "value-formats",
    name: "Tooltip Value Formats",
    description: chartValueformatsDescription,
    recipe: chartValueformatsRecipe,
    Component: ChartValueformats,
  },
  {
    id: "zoom-scroll-categorical",
    name: "Zoom & Scroll: Categorical Axis",
    description: chartZoomScrollCategoricalDescription,
    recipe: chartZoomScrollCategoricalRecipe,
    Component: ChartZoomScrollCategorical,
  },
  {
    id: "zoom-scroll-time",
    name: "Zoom & Scroll: Time Axis",
    description: chartZoomScrollTimeDescription,
    recipe: chartZoomScrollTimeRecipe,
    Component: ChartZoomScrollTime,
  },
];

export default function CommonChartsLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Common chart examples"
      componentType="oj-chart"
      layoutId="commonChartsLegacyNavigationLayout"
      items={commonChartItems}
      initialItemId="data-labels"
      navigationTitle="Common Charts"
    />
  );
}
