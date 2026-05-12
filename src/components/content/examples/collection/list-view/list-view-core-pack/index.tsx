import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ListViewBasiccorepack } from "./listView-basiccorepack/listView-basiccorepack";
import { listViewBasiccorepackDescription } from "./listView-basiccorepack/description";
import { listViewBasiccorepackRecipe } from "./listView-basiccorepack/recipe";
import { ListViewContextMenucorepack } from "./listView-contextMenucorepack/listView-contextMenucorepack";
import { listViewContextMenucorepackDescription } from "./listView-contextMenucorepack/description";
import { listViewContextMenucorepackRecipe } from "./listView-contextMenucorepack/recipe";
import { ListViewCrudcorepack } from "./listView-crudcorepack/listView-crudcorepack";
import { listViewCrudcorepackDescription } from "./listView-crudcorepack/description";
import { listViewCrudcorepackRecipe } from "./listView-crudcorepack/recipe";
import { ListViewCustomSkeletoncorepack } from "./listView-customSkeletoncorepack/listView-customSkeletoncorepack";
import { listViewCustomSkeletoncorepackDescription } from "./listView-customSkeletoncorepack/description";
import { listViewCustomSkeletoncorepackRecipe } from "./listView-customSkeletoncorepack/recipe";
import { ListViewDrillDowncorepack } from "./listView-drillDowncorepack/listView-drillDowncorepack";
import { listViewDrillDowncorepackDescription } from "./listView-drillDowncorepack/description";
import { listViewDrillDowncorepackRecipe } from "./listView-drillDowncorepack/recipe";
import { ListViewGridlinescorepack } from "./listView-gridlinescorepack/listView-gridlinescorepack";
import { listViewGridlinescorepackDescription } from "./listView-gridlinescorepack/description";
import { listViewGridlinescorepackRecipe } from "./listView-gridlinescorepack/recipe";
import { ListViewHighWaterMarkScrollingcorepack } from "./listView-highWaterMarkScrollingcorepack/listView-highWaterMarkScrollingcorepack";
import { listViewHighWaterMarkScrollingcorepackDescription } from "./listView-highWaterMarkScrollingcorepack/description";
import { listViewHighWaterMarkScrollingcorepackRecipe } from "./listView-highWaterMarkScrollingcorepack/recipe";
import { ListViewItemPaddingcorepack } from "./listView-itemPaddingcorepack/listView-itemPaddingcorepack";
import { listViewItemPaddingcorepackDescription } from "./listView-itemPaddingcorepack/description";
import { listViewItemPaddingcorepackRecipe } from "./listView-itemPaddingcorepack/recipe";
import { ListViewManageTabStopcorepack } from "./listView-manageTabStopcorepack/listView-manageTabStopcorepack";
import { listViewManageTabStopcorepackDescription } from "./listView-manageTabStopcorepack/description";
import { listViewManageTabStopcorepackRecipe } from "./listView-manageTabStopcorepack/recipe";
import { ListViewMultipleSelectioncorepack } from "./listView-multipleSelectioncorepack/listView-multipleSelectioncorepack";
import { listViewMultipleSelectioncorepackDescription } from "./listView-multipleSelectioncorepack/description";
import { listViewMultipleSelectioncorepackRecipe } from "./listView-multipleSelectioncorepack/recipe";
import { ListViewNoDatacorepack } from "./listView-noDatacorepack/listView-noDatacorepack";
import { listViewNoDatacorepackDescription } from "./listView-noDatacorepack/description";
import { listViewNoDatacorepackRecipe } from "./listView-noDatacorepack/recipe";
import { ListViewOverviewcorepack } from "./listView-overviewcorepack/listView-overviewcorepack";
import { listViewOverviewcorepackDescription } from "./listView-overviewcorepack/description";
import { listViewOverviewcorepackRecipe } from "./listView-overviewcorepack/recipe";
import { ListViewProgressiveLoadingcorepack } from "./listView-progressiveLoadingcorepack/listView-progressiveLoadingcorepack";
import { listViewProgressiveLoadingcorepackDescription } from "./listView-progressiveLoadingcorepack/description";
import { listViewProgressiveLoadingcorepackRecipe } from "./listView-progressiveLoadingcorepack/recipe";
import { ListViewReordercorepack } from "./listView-reordercorepack/listView-reordercorepack";
import { listViewReordercorepackDescription } from "./listView-reordercorepack/description";
import { listViewReordercorepackRecipe } from "./listView-reordercorepack/recipe";
import { ListViewSingleSelectioncorepack } from "./listView-singleSelectioncorepack/listView-singleSelectioncorepack";
import { listViewSingleSelectioncorepackDescription } from "./listView-singleSelectioncorepack/description";
import { listViewSingleSelectioncorepackRecipe } from "./listView-singleSelectioncorepack/recipe";
import { ListViewSmartSuggestionscorepack } from "./listView-smartSuggestionscorepack/listView-smartSuggestionscorepack";
import { listViewSmartSuggestionscorepackDescription } from "./listView-smartSuggestionscorepack/description";
import { listViewSmartSuggestionscorepackRecipe } from "./listView-smartSuggestionscorepack/recipe";

const listViewCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: listViewOverviewcorepackDescription,
    recipe: listViewOverviewcorepackRecipe,
    Component: ListViewOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: listViewBasiccorepackDescription,
    recipe: listViewBasiccorepackRecipe,
    Component: ListViewBasiccorepack,
  },
  {
    id: "gridlines",
    name: "Gridlines",
    description: listViewGridlinescorepackDescription,
    recipe: listViewGridlinescorepackRecipe,
    Component: ListViewGridlinescorepack,
  },
  {
    id: "single-selection",
    name: "Single Selection",
    description: listViewSingleSelectioncorepackDescription,
    recipe: listViewSingleSelectioncorepackRecipe,
    Component: ListViewSingleSelectioncorepack,
  },
  {
    id: "multiple-selection",
    name: "Multiple Selection",
    description: listViewMultipleSelectioncorepackDescription,
    recipe: listViewMultipleSelectioncorepackRecipe,
    Component: ListViewMultipleSelectioncorepack,
  },
  {
    id: "high-water-mark-scrolling",
    name: "High-Water Mark Scrolling",
    description: listViewHighWaterMarkScrollingcorepackDescription,
    recipe: listViewHighWaterMarkScrollingcorepackRecipe,
    Component: ListViewHighWaterMarkScrollingcorepack,
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: listViewProgressiveLoadingcorepackDescription,
    recipe: listViewProgressiveLoadingcorepackRecipe,
    Component: ListViewProgressiveLoadingcorepack,
  },
{
    id: "custom-skeleton",
    name: "Custom Skeleton",
    description: listViewCustomSkeletoncorepackDescription,
    recipe: listViewCustomSkeletoncorepackRecipe,
    Component: ListViewCustomSkeletoncorepack,
  },
{
    id: "crud",
    name: "CRUD",
    description: listViewCrudcorepackDescription,
    recipe: listViewCrudcorepackRecipe,
    Component: ListViewCrudcorepack,
  },
   {
    id: "drill-down",
    name: "Drill Down",
    description: listViewDrillDowncorepackDescription,
    recipe: listViewDrillDowncorepackRecipe,
    Component: ListViewDrillDowncorepack,
  },
  {
    id: "no-data",
    name: "No Data",
    description: listViewNoDatacorepackDescription,
    recipe: listViewNoDatacorepackRecipe,
    Component: ListViewNoDatacorepack,
  },
 {
    id: "manage-tab-stops",
    name: "Managing Tab Stops",
    description: listViewManageTabStopcorepackDescription,
    recipe: listViewManageTabStopcorepackRecipe,
    Component: ListViewManageTabStopcorepack,
  },
  {
    id: "smart-suggestions",
    name: "Suggestions (Oracle Internal)",
    description: listViewSmartSuggestionscorepackDescription,
    recipe: listViewSmartSuggestionscorepackRecipe,
    Component: ListViewSmartSuggestionscorepack,
  },
   {
    id: "context-menu",
    name: "Context Menu",
    description: listViewContextMenucorepackDescription,
    recipe: listViewContextMenucorepackRecipe,
    Component: ListViewContextMenucorepack,
  },
  {
    id: "reorder",
    name: "Reorder",
    description: listViewReordercorepackDescription,
    recipe: listViewReordercorepackRecipe,
    Component: ListViewReordercorepack,
  },
   {
    id: "item-padding",
    name: "Item Padding",
    description: listViewItemPaddingcorepackDescription,
    recipe: listViewItemPaddingcorepackRecipe,
    Component: ListViewItemPaddingcorepack,
  },
];

export default function ListViewCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Core Pack List View examples"
      componentType="oj-c-list-view"
      items={listViewCorePackItems}
      initialItemId="overview"
      navigationTitle="List View"
      packLabel="Core Pack"
    />
  );
}
