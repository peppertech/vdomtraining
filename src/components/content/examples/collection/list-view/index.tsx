import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { ListViewArrayListView } from "./listView-arrayListView/listView-arrayListView";
import { listViewArrayListViewDescription } from "./listView-arrayListView/description";
import { listViewArrayListViewRecipe } from "./listView-arrayListView/recipe";
import { ListViewBasicListView } from "./listView-basicListView/listView-basicListView";
import { listViewBasicListViewDescription } from "./listView-basicListView/description";
import { listViewBasicListViewRecipe } from "./listView-basicListView/recipe";
import { ListViewCardLayoutHierListView } from "./listView-cardLayoutHierListView/listView-cardLayoutHierListView";
import { listViewCardLayoutHierListViewDescription } from "./listView-cardLayoutHierListView/description";
import { listViewCardLayoutHierListViewRecipe } from "./listView-cardLayoutHierListView/recipe";
import { ListViewCollapsibleListView } from "./listView-collapsibleListView/listView-collapsibleListView";
import { listViewCollapsibleListViewDescription } from "./listView-collapsibleListView/description";
import { listViewCollapsibleListViewRecipe } from "./listView-collapsibleListView/recipe";
import { ListViewCollectionListView } from "./listView-collectionListView/listView-collectionListView";
import { listViewCollectionListViewDescription } from "./listView-collectionListView/description";
import { listViewCollectionListViewRecipe } from "./listView-collectionListView/recipe";
import { ListViewCustomContextMenuListView } from "./listView-customContextMenuListView/listView-customContextMenuListView";
import { listViewCustomContextMenuListViewDescription } from "./listView-customContextMenuListView/description";
import { listViewCustomContextMenuListViewRecipe } from "./listView-customContextMenuListView/recipe";
import { ListViewDrillableListView } from "./listView-drillableListView/listView-drillableListView";
import { listViewDrillableListViewDescription } from "./listView-drillableListView/description";
import { listViewDrillableListViewRecipe } from "./listView-drillableListView/recipe";
import { ListViewFilterSortListView } from "./listView-filterSortListView/listView-filterSortListView";
import { listViewFilterSortListViewDescription } from "./listView-filterSortListView/description";
import { listViewFilterSortListViewRecipe } from "./listView-filterSortListView/recipe";
import { ListViewGridlinesListView } from "./listView-gridlinesListView/listView-gridlinesListView";
import { listViewGridlinesListViewDescription } from "./listView-gridlinesListView/description";
import { listViewGridlinesListViewRecipe } from "./listView-gridlinesListView/recipe";
import { ListViewGroupHeaderListView } from "./listView-groupHeaderListView/listView-groupHeaderListView";
import { listViewGroupHeaderListViewDescription } from "./listView-groupHeaderListView/description";
import { listViewGroupHeaderListViewRecipe } from "./listView-groupHeaderListView/recipe";
import { ListViewJsonHierListView } from "./listView-jsonHierListView/listView-jsonHierListView";
import { listViewJsonHierListViewDescription } from "./listView-jsonHierListView/description";
import { listViewJsonHierListViewRecipe } from "./listView-jsonHierListView/recipe";
import { ListViewNoDataListView } from "./listView-noDataListView/listView-noDataListView";
import { listViewNoDataListViewDescription } from "./listView-noDataListView/description";
import { listViewNoDataListViewRecipe } from "./listView-noDataListView/recipe";
import { ListViewObservableArrayListView } from "./listView-observableArrayListView/listView-observableArrayListView";
import { listViewObservableArrayListViewDescription } from "./listView-observableArrayListView/description";
import { listViewObservableArrayListViewRecipe } from "./listView-observableArrayListView/recipe";
import { ListViewObservableNestedArrayListView } from "./listView-observableNestedArrayListView/listView-observableNestedArrayListView";
import { listViewObservableNestedArrayListViewDescription } from "./listView-observableNestedArrayListView/description";
import { listViewObservableNestedArrayListViewRecipe } from "./listView-observableNestedArrayListView/recipe";
import { ListViewOverviewListView } from "./listView-overviewListView/listView-overviewListView";
import { listViewOverviewListViewDescription } from "./listView-overviewListView/description";
import { listViewOverviewListViewRecipe } from "./listView-overviewListView/recipe";
import { ListViewPerformanceListView } from "./listView-performanceListView/listView-performanceListView";
import { listViewPerformanceListViewDescription } from "./listView-performanceListView/description";
import { listViewPerformanceListViewRecipe } from "./listView-performanceListView/recipe";
import { ListViewProgressiveLoadHierListView } from "./listView-progressiveLoadHierListView/listView-progressiveLoadHierListView";
import { listViewProgressiveLoadHierListViewDescription } from "./listView-progressiveLoadHierListView/description";
import { listViewProgressiveLoadHierListViewRecipe } from "./listView-progressiveLoadHierListView/recipe";
import { ListViewProgressiveLoadListView } from "./listView-progressiveLoadListView/listView-progressiveLoadListView";
import { listViewProgressiveLoadListViewDescription } from "./listView-progressiveLoadListView/description";
import { listViewProgressiveLoadListViewRecipe } from "./listView-progressiveLoadListView/recipe";
import { ListViewReorderListView } from "./listView-reorderListView/listView-reorderListView";
import { listViewReorderListViewDescription } from "./listView-reorderListView/description";
import { listViewReorderListViewRecipe } from "./listView-reorderListView/recipe";
import { ListViewScrollPosListView } from "./listView-scrollPosListView/listView-scrollPosListView";
import { listViewScrollPosListViewDescription } from "./listView-scrollPosListView/description";
import { listViewScrollPosListViewRecipe } from "./listView-scrollPosListView/recipe";
import { ListViewSelectionListView } from "./listView-selectionListView/listView-selectionListView";
import { listViewSelectionListViewDescription } from "./listView-selectionListView/description";
import { listViewSelectionListViewRecipe } from "./listView-selectionListView/recipe";
import { ListViewSmartSuggestionsListView } from "./listView-smartSuggestionsListView/listView-smartSuggestionsListView";
import { listViewSmartSuggestionsListViewDescription } from "./listView-smartSuggestionsListView/description";
import { listViewSmartSuggestionsListViewRecipe } from "./listView-smartSuggestionsListView/recipe";
import { ListViewStickyGroupHeaderListView } from "./listView-stickyGroupHeaderListView/listView-stickyGroupHeaderListView";
import { listViewStickyGroupHeaderListViewDescription } from "./listView-stickyGroupHeaderListView/description";
import { listViewStickyGroupHeaderListViewRecipe } from "./listView-stickyGroupHeaderListView/recipe";
import { ListViewWithTableDndListView } from "./listView-withTableDndListView/listView-withTableDndListView";
import { listViewWithTableDndListViewDescription } from "./listView-withTableDndListView/description";
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
    id: "selection",
    name: "Selection",
    description: listViewSelectionListViewDescription,
    recipe: listViewSelectionListViewRecipe,
    Component: ListViewSelectionListView,
  },
  {
    id: "group-header",
    name: "Group Header",
    description: listViewGroupHeaderListViewDescription,
    recipe: listViewGroupHeaderListViewRecipe,
    Component: ListViewGroupHeaderListView,
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
    id: "array",
    name: "Array",
    description: listViewArrayListViewDescription,
    recipe: listViewArrayListViewRecipe,
    Component: ListViewArrayListView,
  },
  {
    id: "collection",
    name: "Collection",
    description: listViewCollectionListViewDescription,
    recipe: listViewCollectionListViewRecipe,
    Component: ListViewCollectionListView,
  },
  {
    id: "json-hierarchical",
    name: "JSON Hierarchical",
    description: listViewJsonHierListViewDescription,
    recipe: listViewJsonHierListViewRecipe,
    Component: ListViewJsonHierListView,
  },
  {
    id: "card-layout-hierarchical",
    name: "Card Layout Hierarchical",
    description: listViewCardLayoutHierListViewDescription,
    recipe: listViewCardLayoutHierListViewRecipe,
    Component: ListViewCardLayoutHierListView,
  },
  {
    id: "drillable",
    name: "Drillable",
    description: listViewDrillableListViewDescription,
    recipe: listViewDrillableListViewRecipe,
    Component: ListViewDrillableListView,
  },
  {
    id: "filter-sort",
    name: "Filter Sort",
    description: listViewFilterSortListViewDescription,
    recipe: listViewFilterSortListViewRecipe,
    Component: ListViewFilterSortListView,
  },
  {
    id: "custom-context-menu",
    name: "Custom Context Menu",
    description: listViewCustomContextMenuListViewDescription,
    recipe: listViewCustomContextMenuListViewRecipe,
    Component: ListViewCustomContextMenuListView,
  },
 
  {
    id: "observable-array",
    name: "Observable Array",
    description: listViewObservableArrayListViewDescription,
    recipe: listViewObservableArrayListViewRecipe,
    Component: ListViewObservableArrayListView,
  },
  {
    id: "observable-nested-array",
    name: "Observable Nested Array",
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
    id: "progressive-load",
    name: "Progressive Load",
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
    id: "with-table-dnd",
    name: "Drag & Drop",
    description: listViewWithTableDndListViewDescription,
    recipe: listViewWithTableDndListViewRecipe,
    Component: ListViewWithTableDndListView,
  },
];

export default function ListViewHome() {
  return (
    <RecipePageTemplate
      ariaLabel="List View examples"
      componentType="oj-list-view"
      items={listViewItems}
      initialItemId="basic"
      navigationTitle="List View"
    />
  );
}
