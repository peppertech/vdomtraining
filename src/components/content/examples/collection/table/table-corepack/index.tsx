import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TableActionTablecorepack } from "./table-actionTablecorepack/table-actionTablecorepack";
import { tableActionTablecorepackDescription } from "./table-actionTablecorepack/description";
import { tableActionTablecorepackRecipe } from "./table-actionTablecorepack/recipe";
import { TableBackgroundColorcorepack } from "./table-backgroundColorcorepack/table-backgroundColorcorepack";
import { tableBackgroundColorcorepackDescription } from "./table-backgroundColorcorepack/description";
import { tableBackgroundColorcorepackRecipe } from "./table-backgroundColorcorepack/recipe";
import { TableBasicTablecorepack } from "./table-basicTablecorepack/table-basicTablecorepack";
import { tableBasicTablecorepackDescription } from "./table-basicTablecorepack/description";
import { tableBasicTablecorepackRecipe } from "./table-basicTablecorepack/recipe";
import { TableColumnLayoutscorepack } from "./table-columnLayoutscorepack/table-columnLayoutscorepack";
import { tableColumnLayoutscorepackDescription } from "./table-columnLayoutscorepack/description";
import { tableColumnLayoutscorepackRecipe } from "./table-columnLayoutscorepack/recipe";
import { TableColumnSortingcorepack } from "./table-columnSortingcorepack/table-columnSortingcorepack";
import { tableColumnSortingcorepackDescription } from "./table-columnSortingcorepack/description";
import { tableColumnSortingcorepackRecipe } from "./table-columnSortingcorepack/recipe";
import { TableColumnResizingcorepack } from "./table-columnResizingcorepack/table-columnResizingcorepack";
import { tableColumnResizingcorepackDescription } from "./table-columnResizingcorepack/description";
import { tableColumnResizingcorepackRecipe } from "./table-columnResizingcorepack/recipe";
import { TableCustomContextMenuTablecorepack } from "./table-customContextMenuTablecorepack/table-customContextMenuTablecorepack";
import { tableCustomContextMenuTablecorepackDescription } from "./table-customContextMenuTablecorepack/description";
import { tableCustomContextMenuTablecorepackRecipe } from "./table-customContextMenuTablecorepack/recipe";
import { TableEventTablecorepack } from "./table-eventTablecorepack/table-eventTablecorepack";
import { tableEventTablecorepackDescription } from "./table-eventTablecorepack/description";
import { tableEventTablecorepackRecipe } from "./table-eventTablecorepack/recipe";
import { TableFilteringTablecorepack } from "./table-filteringTablecorepack/table-filteringTablecorepack";
import { tableFilteringTablecorepackDescription } from "./table-filteringTablecorepack/description";
import { tableFilteringTablecorepackRecipe } from "./table-filteringTablecorepack/recipe";
import { TableGridStylingcorepack } from "./table-gridStylingcorepack/table-gridStylingcorepack";
import { tableGridStylingcorepackDescription } from "./table-gridStylingcorepack/description";
import { tableGridStylingcorepackRecipe } from "./table-gridStylingcorepack/recipe";
import { TableManageTabStopscorepack } from "./table-manageTabStopscorepack/table-manageTabStopscorepack";
import { tableManageTabStopscorepackDescription } from "./table-manageTabStopscorepack/description";
import { tableManageTabStopscorepackRecipe } from "./table-manageTabStopscorepack/recipe";
import { TableNoDataTablecorepack } from "./table-noDataTablecorepack/table-noDataTablecorepack";
import { tableNoDataTablecorepackDescription } from "./table-noDataTablecorepack/description";
import { tableNoDataTablecorepackRecipe } from "./table-noDataTablecorepack/recipe";
import { TableOverviewcorepack } from "./table-overviewcorepack/table-overviewcorepack";
import { tableOverviewcorepackDescription } from "./table-overviewcorepack/description";
import { tableOverviewcorepackRecipe } from "./table-overviewcorepack/recipe";
import { TablePerformanceTablecorepack } from "./table-performanceTablecorepack/table-performanceTablecorepack";
import { tablePerformanceTablecorepackDescription } from "./table-performanceTablecorepack/description";
import { tablePerformanceTablecorepackRecipe } from "./table-performanceTablecorepack/recipe";
import { TableProgressiveLoadTablecorepack } from "./table-progressiveLoadTablecorepack/table-progressiveLoadTablecorepack";
import { tableProgressiveLoadTablecorepackDescription } from "./table-progressiveLoadTablecorepack/description";
import { tableProgressiveLoadTablecorepackRecipe } from "./table-progressiveLoadTablecorepack/recipe";
import { TableResponsiveTablecorepack } from "./table-responsiveTablecorepack/table-responsiveTablecorepack";
import { tableResponsiveTablecorepackDescription } from "./table-responsiveTablecorepack/description";
import { tableResponsiveTablecorepackRecipe } from "./table-responsiveTablecorepack/recipe";
import { TableSelectionTablecorepack } from "./table-selectionTablecorepack/table-selectionTablecorepack";
import { tableSelectionTablecorepackDescription } from "./table-selectionTablecorepack/description";
import { tableSelectionTablecorepackRecipe } from "./table-selectionTablecorepack/recipe";
import { TableStickyColumnTablecorepack } from "./table-stickyColumnTablecorepack/table-stickyColumnTablecorepack";
import { tableStickyColumnTablecorepackDescription } from "./table-stickyColumnTablecorepack/description";
import { tableStickyColumnTablecorepackRecipe } from "./table-stickyColumnTablecorepack/recipe";
import { TableTemplateSlotTablecorepack } from "./table-templateSlotTablecorepack/table-templateSlotTablecorepack";
import { tableTemplateSlotTablecorepackDescription } from "./table-templateSlotTablecorepack/description";
import { tableTemplateSlotTablecorepackRecipe } from "./table-templateSlotTablecorepack/recipe";

const tableCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: tableOverviewcorepackDescription,
    recipe: tableOverviewcorepackRecipe,
    Component: TableOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: tableBasicTablecorepackDescription,
    recipe: tableBasicTablecorepackRecipe,
    Component: TableBasicTablecorepack,
  },
   {
    id: "selection",
    name: "Selection",
    description: tableSelectionTablecorepackDescription,
    recipe: tableSelectionTablecorepackRecipe,
    Component: TableSelectionTablecorepack,
  },
  {
    id: "column-layouts",
    name: "Column Layouts",
    description: tableColumnLayoutscorepackDescription,
    recipe: tableColumnLayoutscorepackRecipe,
    Component: TableColumnLayoutscorepack,
  },
  {
    id: "column-sorting",
    name: "Column Sorting",
    description: tableColumnSortingcorepackDescription,
    recipe: tableColumnSortingcorepackRecipe,
    Component: TableColumnSortingcorepack,
  },
  {
    id: "responsive",
    name: "Responsive Columns",
    description: tableResponsiveTablecorepackDescription,
    recipe: tableResponsiveTablecorepackRecipe,
    Component: TableResponsiveTablecorepack,
  },
   
  {
    id: "sticky-columns",
    name: "Sticky Columns",
    description: tableStickyColumnTablecorepackDescription,
    recipe: tableStickyColumnTablecorepackRecipe,
    Component: TableStickyColumnTablecorepack,
  },
 {
    id: "template-slots",
    name: "Cell Templates",
    description: tableTemplateSlotTablecorepackDescription,
    recipe: tableTemplateSlotTablecorepackRecipe,
    Component: TableTemplateSlotTablecorepack,
  },
   {
    id: "manage-tab-stops",
    name: "Manage Tab Stops",
    description: tableManageTabStopscorepackDescription,
    recipe: tableManageTabStopscorepackRecipe,
    Component: TableManageTabStopscorepack,
  },
   {
    id: "no-data",
    name: "No Data",
    description: tableNoDataTablecorepackDescription,
    recipe: tableNoDataTablecorepackRecipe,
    Component: TableNoDataTablecorepack,
  },
  {
    id: "grid-styling",
    name: "GridLines",
    description: tableGridStylingcorepackDescription,
    recipe: tableGridStylingcorepackRecipe,
    Component: TableGridStylingcorepack,
  },
  {
    id: "background-color",
    name: "Background Color",
    description: tableBackgroundColorcorepackDescription,
    recipe: tableBackgroundColorcorepackRecipe,
    Component: TableBackgroundColorcorepack,
  },
  {
    id: "filtering",
    name: "Filtering",
    description: tableFilteringTablecorepackDescription,
    recipe: tableFilteringTablecorepackRecipe,
    Component: TableFilteringTablecorepack,
  },
  {
    id: "events",
    name: "Events",
    description: tableEventTablecorepackDescription,
    recipe: tableEventTablecorepackRecipe,
    Component: TableEventTablecorepack,
  },
  {
    id: "action-table",
    name: "Action Column",
    description: tableActionTablecorepackDescription,
    recipe: tableActionTablecorepackRecipe,
    Component: TableActionTablecorepack,
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: tableProgressiveLoadTablecorepackDescription,
    recipe: tableProgressiveLoadTablecorepackRecipe,
    Component: TableProgressiveLoadTablecorepack,
  },
  {
    id: "performance",
    name: "Performance",
    description: tablePerformanceTablecorepackDescription,
    recipe: tablePerformanceTablecorepackRecipe,
    Component: TablePerformanceTablecorepack,
  },
   {
    id: "column-resizing",
    name: "Column Resizing",
    description: tableColumnResizingcorepackDescription,
    recipe: tableColumnResizingcorepackRecipe,
    Component: TableColumnResizingcorepack,
  },
  {
    id: "custom-context-menu",
    name: "Custom Context Menu",
    description: tableCustomContextMenuTablecorepackDescription,
    recipe: tableCustomContextMenuTablecorepackRecipe,
    Component: TableCustomContextMenuTablecorepack,
  },
];

export default function TableCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Core Pack Table examples"
      componentType="oj-c-table"
      items={tableCorePackItems}
      initialItemId="overview"
      navigationTitle="Table"
      packLabel="Core Pack"
    />
  );
}
