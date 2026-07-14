import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { listViewArrayListViewDescription } from "./listView-arrayListView/description";
import { ListViewArrayListView } from "./listView-arrayListView/listView-arrayListView";
import { listViewArrayListViewRecipe } from "./listView-arrayListView/recipe";
import { listViewBasicListViewDescription } from "./listView-basicListView/description";
import { ListViewBasicListView } from "./listView-basicListView/listView-basicListView";
import { listViewBasicListViewRecipe } from "./listView-basicListView/recipe";
import { listViewCardLayoutHierListViewDescription } from "./listView-cardLayoutHierListView/description";
import { ListViewCardLayoutHierListView } from "./listView-cardLayoutHierListView/listView-cardLayoutHierListView";
import { listViewCardLayoutHierListViewRecipe } from "./listView-cardLayoutHierListView/recipe";
import { listViewCollapsibleListViewDescription } from "./listView-collapsibleListView/description";
import { ListViewCollapsibleListView } from "./listView-collapsibleListView/listView-collapsibleListView";
import { listViewCollapsibleListViewRecipe } from "./listView-collapsibleListView/recipe";
import { listViewCollectionListViewDescription } from "./listView-collectionListView/description";
import { ListViewCollectionListView } from "./listView-collectionListView/listView-collectionListView";
import { listViewCollectionListViewRecipe } from "./listView-collectionListView/recipe";
import { listViewCustomContextMenuListViewDescription } from "./listView-customContextMenuListView/description";
import { ListViewCustomContextMenuListView } from "./listView-customContextMenuListView/listView-customContextMenuListView";
import { listViewCustomContextMenuListViewRecipe } from "./listView-customContextMenuListView/recipe";
import { listViewDrillableListViewDescription } from "./listView-drillableListView/description";
import { ListViewDrillableListView } from "./listView-drillableListView/listView-drillableListView";
import { listViewDrillableListViewRecipe } from "./listView-drillableListView/recipe";
import { listViewFilterSortListViewDescription } from "./listView-filterSortListView/description";
import { ListViewFilterSortListView } from "./listView-filterSortListView/listView-filterSortListView";
import { listViewFilterSortListViewRecipe } from "./listView-filterSortListView/recipe";
import { listViewGridlinesListViewDescription } from "./listView-gridlinesListView/description";
import { ListViewGridlinesListView } from "./listView-gridlinesListView/listView-gridlinesListView";
import { listViewGridlinesListViewRecipe } from "./listView-gridlinesListView/recipe";
import { listViewGroupHeaderListViewDescription } from "./listView-groupHeaderListView/description";
import { ListViewGroupHeaderListView } from "./listView-groupHeaderListView/listView-groupHeaderListView";
import { listViewGroupHeaderListViewRecipe } from "./listView-groupHeaderListView/recipe";
import { listViewHighWaterMarkScrollingListViewDescription } from "./listView-highWaterMarkScrollingListView/description";
import { ListViewHighWaterMarkScrollingListView } from "./listView-highWaterMarkScrollingListView/listView-highWaterMarkScrollingListView";
import { listViewHighWaterMarkScrollingListViewRecipe } from "./listView-highWaterMarkScrollingListView/recipe";
import { listViewJsonHierListViewDescription } from "./listView-jsonHierListView/description";
import { ListViewJsonHierListView } from "./listView-jsonHierListView/listView-jsonHierListView";
import { listViewJsonHierListViewRecipe } from "./listView-jsonHierListView/recipe";
import { listViewNoDataListViewDescription } from "./listView-noDataListView/description";
import { ListViewNoDataListView } from "./listView-noDataListView/listView-noDataListView";
import { listViewNoDataListViewRecipe } from "./listView-noDataListView/recipe";
import { listViewObservableArrayListViewDescription } from "./listView-observableArrayListView/description";
import { ListViewObservableArrayListView } from "./listView-observableArrayListView/listView-observableArrayListView";
import { listViewObservableArrayListViewRecipe } from "./listView-observableArrayListView/recipe";
import { ListViewObservableNestedArrayListView } from "./listView-observableNestedArrayListView";
import { listViewObservableNestedArrayListViewDescription } from "./listView-observableNestedArrayListView/description";
import { listViewObservableNestedArrayListViewRecipe } from "./listView-observableNestedArrayListView/recipe";
import { listViewOverviewListViewDescription } from "./listView-overviewListView/description";
import { ListViewOverviewListView } from "./listView-overviewListView/listView-overviewListView";
import { listViewOverviewListViewRecipe } from "./listView-overviewListView/recipe";
import { listViewPerformanceListViewDescription } from "./listView-performanceListView/description";
import { ListViewPerformanceListView } from "./listView-performanceListView/listView-performanceListView";
import { listViewPerformanceListViewRecipe } from "./listView-performanceListView/recipe";
import { listViewProgressiveLoadHierListViewDescription } from "./listView-progressiveLoadHierListView/description";
import { ListViewProgressiveLoadHierListView } from "./listView-progressiveLoadHierListView/listView-progressiveLoadHierListView";
import { listViewProgressiveLoadHierListViewRecipe } from "./listView-progressiveLoadHierListView/recipe";
import { listViewProgressiveLoadListViewDescription } from "./listView-progressiveLoadListView/description";
import { ListViewProgressiveLoadListView } from "./listView-progressiveLoadListView/listView-progressiveLoadListView";
import { listViewProgressiveLoadListViewRecipe } from "./listView-progressiveLoadListView/recipe";
import { listViewReorderListViewDescription } from "./listView-reorderListView/description";
import { ListViewReorderListView } from "./listView-reorderListView/listView-reorderListView";
import { listViewReorderListViewRecipe } from "./listView-reorderListView/recipe";
import { listViewScrollPosListViewDescription } from "./listView-scrollPosListView/description";
import { ListViewScrollPosListView } from "./listView-scrollPosListView/listView-scrollPosListView";
import { listViewScrollPosListViewRecipe } from "./listView-scrollPosListView/recipe";
import { listViewSelectionListViewDescription } from "./listView-selectionListView/description";
import { ListViewSelectionListView } from "./listView-selectionListView/listView-selectionListView";
import { listViewSelectionListViewRecipe } from "./listView-selectionListView/recipe";
import { listViewSmartSuggestionsListViewDescription } from "./listView-smartSuggestionsListView/description";
import { ListViewSmartSuggestionsListView } from "./listView-smartSuggestionsListView/listView-smartSuggestionsListView";
import { listViewSmartSuggestionsListViewRecipe } from "./listView-smartSuggestionsListView/recipe";
import { listViewStickyGroupHeaderListViewDescription } from "./listView-stickyGroupHeaderListView/description";
import { ListViewStickyGroupHeaderListView } from "./listView-stickyGroupHeaderListView/listView-stickyGroupHeaderListView";
import { listViewStickyGroupHeaderListViewRecipe } from "./listView-stickyGroupHeaderListView/recipe";
import { listViewWithTableDndListViewDescription } from "./listView-withTableDndListView/description";
import { ListViewWithTableDndListView } from "./listView-withTableDndListView/listView-withTableDndListView";
import { listViewWithTableDndListViewRecipe } from "./listView-withTableDndListView/recipe";

const listViewItems = [
  {
    id: "overview",
    name: "Overview",
    description: listViewOverviewListViewDescription,
    recipe: listViewOverviewListViewRecipe,
    Component: ListViewOverviewListView,
  },
  {
    id: "basic",
    name: "Basic",
    description: listViewBasicListViewDescription,
    recipe: listViewBasicListViewRecipe,
    Component: ListViewBasicListView,
  },
  
  {
    id: "gridlines",
    name: "Gridlines",
    description: listViewGridlinesListViewDescription,
    recipe: listViewGridlinesListViewRecipe,
    Component: ListViewGridlinesListView,
  },
  {
    id: "array",
    name: "Single Selection",
    description: listViewArrayListViewDescription,
    recipe: listViewArrayListViewRecipe,
    Component: ListViewArrayListView,
  },
  {
    id: "selection",
    name: "Multiple Selection",
    description: listViewSelectionListViewDescription,
    recipe: listViewSelectionListViewRecipe,
    Component: ListViewSelectionListView,
  },
  {
    id: "high-water-mark-scrolling",
    name: "High-Water Mark Scrolling",
    description: listViewHighWaterMarkScrollingListViewDescription,
    recipe: listViewHighWaterMarkScrollingListViewRecipe,
    Component: ListViewHighWaterMarkScrollingListView,
  },
  {
    id: "json-hierarchical",
    name: "Group Headers",
    description: listViewJsonHierListViewDescription,
    recipe: listViewJsonHierListViewRecipe,
    Component: ListViewJsonHierListView,
  },
  {
    id: "collapsible",
    name: "Collapsible Group Headers",
    description: listViewCollapsibleListViewDescription,
    recipe: listViewCollapsibleListViewRecipe,
    Component: ListViewCollapsibleListView,
  },
  {
    id: "sticky-group-header",
    name: "Sticky Group Header",
    description: listViewStickyGroupHeaderListViewDescription,
    recipe: listViewStickyGroupHeaderListViewRecipe,
    Component: ListViewStickyGroupHeaderListView,
  },
  {
    id: "group-header",
    name: "Group Header Sizes",
    description: listViewGroupHeaderListViewDescription,
    recipe: listViewGroupHeaderListViewRecipe,
    Component: ListViewGroupHeaderListView,
  },
  {
    id: "collection",
    name: "Card Layout",
    description: listViewCollectionListViewDescription,
    recipe: listViewCollectionListViewRecipe,
    Component: ListViewCollectionListView,
  },
  {
    id: "card-layout-hierarchical",
    name: "Card Layout with Group Header",
    description: listViewCardLayoutHierListViewDescription,
    recipe: listViewCardLayoutHierListViewRecipe,
    Component: ListViewCardLayoutHierListView,
  },
  {
    id: "observable-array",
    name: "CRUD",
    description: listViewObservableArrayListViewDescription,
    recipe: listViewObservableArrayListViewRecipe,
    Component: ListViewObservableArrayListView,
  },
  {
    id: "observable-nested-array",
    name: "Add/Remove Hierarchical Data",
    description: listViewObservableNestedArrayListViewDescription,
    recipe: listViewObservableNestedArrayListViewRecipe,
    Component: ListViewObservableNestedArrayListView,
  },
  {
    id: "reorder",
    name: "Reordering Items",
    description: listViewReorderListViewDescription,
    recipe: listViewReorderListViewRecipe,
    Component: ListViewReorderListView,
  },
  {
    id: "with-table-dnd",
    name: "Drag & Drop",
    description: listViewWithTableDndListViewDescription,
    recipe: listViewWithTableDndListViewRecipe,
    Component: ListViewWithTableDndListView,
  },
  {
    id: "drillable",
    name: "Drill Down",
    description: listViewDrillableListViewDescription,
    recipe: listViewDrillableListViewRecipe,
    Component: ListViewDrillableListView,
  },
  {
    id: "custom-context-menu",
    name: "Custom Context Menu",
    description: listViewCustomContextMenuListViewDescription,
    recipe: listViewCustomContextMenuListViewRecipe,
    Component: ListViewCustomContextMenuListView,
  },
  {
    id: "progressive-load",
    name: "Progressive Loading",
    description: listViewProgressiveLoadListViewDescription,
    recipe: listViewProgressiveLoadListViewRecipe,
    Component: ListViewProgressiveLoadListView,
  },
  {
    id: "progressive-load-hierarchical",
    name: "Progressive Loading with Hierarchical Data",
    description: listViewProgressiveLoadHierListViewDescription,
    recipe: listViewProgressiveLoadHierListViewRecipe,
    Component: ListViewProgressiveLoadHierListView,
  },
  {
    id: "no-data",
    name: "No Data",
    description: listViewNoDataListViewDescription,
    recipe: listViewNoDataListViewRecipe,
    Component: ListViewNoDataListView,
  },
  {
    id: "scroll-position",
    name: "Preserving Scroll Position",
    description: listViewScrollPosListViewDescription,
    recipe: listViewScrollPosListViewRecipe,
    Component: ListViewScrollPosListView,
  },
  {
    id: "smart-suggestions",
    name: "Suggestions (Oracle Internal)",
    description: listViewSmartSuggestionsListViewDescription,
    recipe: listViewSmartSuggestionsListViewRecipe,
    Component: ListViewSmartSuggestionsListView,
  },
  {
    id: "performance",
    name: "Performance: Dataset Size",
    description: listViewPerformanceListViewDescription,
    recipe: listViewPerformanceListViewRecipe,
    Component: ListViewPerformanceListView,
  },
  {
    id: "filter-sort",
    name: "Sort & Filter",
    description: listViewFilterSortListViewDescription,
    recipe: listViewFilterSortListViewRecipe,
    Component: ListViewFilterSortListView,
  },
];

export default function ListViewHome() {
  return (
    <RecipePageTemplate
      ariaLabel="List View examples"
      componentType="oj-list-view"
      items={listViewItems}
      initialItemId="overview"
      navigationTitle="List View"
    />
  );
}
