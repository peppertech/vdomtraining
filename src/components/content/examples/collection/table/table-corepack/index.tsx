import * as preact from "preact";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { FilterFactory } from "ojs/ojdataprovider";
import { KeySetImpl } from "ojs/ojkeyset";
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { RESTDataProvider } from "ojs/ojrestdataprovider";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import { CollectionMockFetchServer } from "../../shared/CollectionMockFetchServer";
import DemoDelayingDataProvider from "../../shared/DemoDelayingDataProvider";
import DepartmentDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import EmployeeDataSource from "../../data/cookbook/dataCollections/table/shared/employeeData-source";
import SharedEmployeeDataSource from "../../data/cookbook/dataCollections/sharedData/employeeData-source";
import TableActionTablecorepackSource from "./table-actionTablecorepack/table-actionTablecorepack-source";
import TableBackgroundColorcorepackSource from "./table-backgroundColorcorepack/table-backgroundColorcorepack-source";
import TableBackgroundColorcorepackDemoCssSource from "./table-backgroundColorcorepack/demo-source";
import TableBasicTablecorepackSource from "./table-basicTablecorepack/table-basicTablecorepack-source";
import TableBasicTablecorepackDemoCssSource from "./table-basicTablecorepack/demo-source";
import TableColumnLayoutscorepackSource from "./table-columnLayoutscorepack/table-columnLayoutscorepack-source";
import TableColumnLayoutscorepackDemoCssSource from "./table-columnLayoutscorepack/demo-source";
import TableColumnResizingcorepackSource from "./table-columnResizingcorepack/table-columnResizingcorepack-source";
import TableColumnSortingcorepackSource from "./table-columnSortingcorepack/table-columnSortingcorepack-source";
import TableColumnSortingcorepackDemoCssSource from "./table-columnSortingcorepack/demo-source";
import TableColumnSortingcorepackDepartmentDataSource from "./table-columnSortingcorepack/departmentData-source";
import TableCustomContextMenuTablecorepackSource from "./table-customContextMenuTablecorepack/table-customContextMenuTablecorepack-source";
import TableCustomContextMenuTablecorepackDemoCssSource from "./table-customContextMenuTablecorepack/demo-source";
import TableEventTablecorepackSource from "./table-eventTablecorepack/table-eventTablecorepack-source";
import TableFilteringTablecorepackSource from "./table-filteringTablecorepack/table-filteringTablecorepack-source";
import TableGridStylingcorepackSource from "./table-gridStylingcorepack/table-gridStylingcorepack-source";
import TableManageTabStopscorepackSource from "./table-manageTabStopscorepack/table-manageTabStopscorepack-source";
import TableManageTabStopscorepackDemoCssSource from "./table-manageTabStopscorepack/demo-source";
import TableManageTabStopscorepackEmployeeDataSource from "./table-manageTabStopscorepack/employeeData-source";
import TableNoDataTablecorepackSource from "./table-noDataTablecorepack/table-noDataTablecorepack-source";
import TableNoDataTablecorepackDemoCssSource from "./table-noDataTablecorepack/demo-source";
import TableOverviewcorepackSource from "./table-overviewcorepack/table-overviewcorepack-source";
import TableOverviewcorepackDemoCssSource from "./table-overviewcorepack/demo-source";
import TableOverviewcorepackDepartmentDataSource from "./table-overviewcorepack/departmentData-source";
import TablePerformanceTablecorepackSource from "./table-performanceTablecorepack/table-performanceTablecorepack-source";
import TablePerformanceTablecorepackDemoCssSource from "./table-performanceTablecorepack/demo-source";
import TableProgressiveLoadTablecorepackSource from "./table-progressiveLoadTablecorepack/table-progressiveLoadTablecorepack-source";
import TableResponsiveTablecorepackSource from "./table-responsiveTablecorepack/table-responsiveTablecorepack-source";
import TableResponsiveTablecorepackDemoCssSource from "./table-responsiveTablecorepack/demo-source";
import TableResponsiveTablecorepackDepartmentDataSource from "./table-responsiveTablecorepack/departmentData-source";
import TableSelectionTablecorepackSource from "./table-selectionTablecorepack/table-selectionTablecorepack-source";
import TableStickyColumnTablecorepackSource from "./table-stickyColumnTablecorepack/table-stickyColumnTablecorepack-source";
import TableStickyColumnTablecorepackDemoCssSource from "./table-stickyColumnTablecorepack/demo-source";
import TableStickyColumnTablecorepackEmployeeStatusDataSource from "./table-stickyColumnTablecorepack/employeeStatusData-source";
import TableTemplateSlotTablecorepackSource from "./table-templateSlotTablecorepack/table-templateSlotTablecorepack-source";
import TableTemplateSlotTablecorepackDemoCssSource from "./table-templateSlotTablecorepack/demo-source";
import { RecipePageTemplate, type RecipePageItem } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { tableActionTablecorepackDescription } from "./table-actionTablecorepack/description";
import { tableActionTablecorepackRecipe } from "./table-actionTablecorepack/recipe";
import { TableActionTablecorepack } from "./table-actionTablecorepack/table-actionTablecorepack";
import { tableBackgroundColorcorepackDescription } from "./table-backgroundColorcorepack/description";
import { tableBackgroundColorcorepackRecipe } from "./table-backgroundColorcorepack/recipe";
import { TableBackgroundColorcorepack } from "./table-backgroundColorcorepack/table-backgroundColorcorepack";
import { tableBasicTablecorepackDescription } from "./table-basicTablecorepack/description";
import { tableBasicTablecorepackRecipe } from "./table-basicTablecorepack/recipe";
import { TableBasicTablecorepack } from "./table-basicTablecorepack/table-basicTablecorepack";
import { tableColumnLayoutscorepackDescription } from "./table-columnLayoutscorepack/description";
import { tableColumnLayoutscorepackRecipe } from "./table-columnLayoutscorepack/recipe";
import { TableColumnLayoutscorepack } from "./table-columnLayoutscorepack/table-columnLayoutscorepack";
import { tableColumnResizingcorepackDescription } from "./table-columnResizingcorepack/description";
import { tableColumnResizingcorepackRecipe } from "./table-columnResizingcorepack/recipe";
import { TableColumnResizingcorepack } from "./table-columnResizingcorepack/table-columnResizingcorepack";
import { tableColumnSortingcorepackDescription } from "./table-columnSortingcorepack/description";
import { tableColumnSortingcorepackRecipe } from "./table-columnSortingcorepack/recipe";
import { TableColumnSortingcorepack } from "./table-columnSortingcorepack/table-columnSortingcorepack";
import { tableCustomContextMenuTablecorepackDescription } from "./table-customContextMenuTablecorepack/description";
import { tableCustomContextMenuTablecorepackRecipe } from "./table-customContextMenuTablecorepack/recipe";
import { TableCustomContextMenuTablecorepack } from "./table-customContextMenuTablecorepack/table-customContextMenuTablecorepack";
import { tableEventTablecorepackDescription } from "./table-eventTablecorepack/description";
import { tableEventTablecorepackRecipe } from "./table-eventTablecorepack/recipe";
import { TableEventTablecorepack } from "./table-eventTablecorepack/table-eventTablecorepack";
import { tableFilteringTablecorepackDescription } from "./table-filteringTablecorepack/description";
import { tableFilteringTablecorepackRecipe } from "./table-filteringTablecorepack/recipe";
import { TableFilteringTablecorepack } from "./table-filteringTablecorepack/table-filteringTablecorepack";
import { tableGridStylingcorepackDescription } from "./table-gridStylingcorepack/description";
import { tableGridStylingcorepackRecipe } from "./table-gridStylingcorepack/recipe";
import { TableGridStylingcorepack } from "./table-gridStylingcorepack/table-gridStylingcorepack";
import { tableManageTabStopscorepackDescription } from "./table-manageTabStopscorepack/description";
import { tableManageTabStopscorepackRecipe } from "./table-manageTabStopscorepack/recipe";
import { TableManageTabStopscorepack } from "./table-manageTabStopscorepack/table-manageTabStopscorepack";
import { tableNoDataTablecorepackDescription } from "./table-noDataTablecorepack/description";
import { tableNoDataTablecorepackRecipe } from "./table-noDataTablecorepack/recipe";
import { TableNoDataTablecorepack } from "./table-noDataTablecorepack/table-noDataTablecorepack";
import { tableOverviewcorepackDescription } from "./table-overviewcorepack/description";
import { tableOverviewcorepackRecipe } from "./table-overviewcorepack/recipe";
import { TableOverviewcorepack } from "./table-overviewcorepack/table-overviewcorepack";
import { tablePerformanceTablecorepackDescription } from "./table-performanceTablecorepack/description";
import { tablePerformanceTablecorepackRecipe } from "./table-performanceTablecorepack/recipe";
import { TablePerformanceTablecorepack } from "./table-performanceTablecorepack/table-performanceTablecorepack";
import { tableProgressiveLoadTablecorepackDescription } from "./table-progressiveLoadTablecorepack/description";
import { tableProgressiveLoadTablecorepackRecipe } from "./table-progressiveLoadTablecorepack/recipe";
import { TableProgressiveLoadTablecorepack } from "./table-progressiveLoadTablecorepack/table-progressiveLoadTablecorepack";
import { tableResponsiveTablecorepackDescription } from "./table-responsiveTablecorepack/description";
import { tableResponsiveTablecorepackRecipe } from "./table-responsiveTablecorepack/recipe";
import { TableResponsiveTablecorepack } from "./table-responsiveTablecorepack/table-responsiveTablecorepack";
import { tableSelectionTablecorepackDescription } from "./table-selectionTablecorepack/description";
import { tableSelectionTablecorepackRecipe } from "./table-selectionTablecorepack/recipe";
import { TableSelectionTablecorepack } from "./table-selectionTablecorepack/table-selectionTablecorepack";
import { tableStickyColumnTablecorepackDescription } from "./table-stickyColumnTablecorepack/description";
import { tableStickyColumnTablecorepackRecipe } from "./table-stickyColumnTablecorepack/recipe";
import { TableStickyColumnTablecorepack } from "./table-stickyColumnTablecorepack/table-stickyColumnTablecorepack";
import { tableTemplateSlotTablecorepackDescription } from "./table-templateSlotTablecorepack/description";
import { tableTemplateSlotTablecorepackRecipe } from "./table-templateSlotTablecorepack/recipe";
import { TableTemplateSlotTablecorepack } from "./table-templateSlotTablecorepack/table-templateSlotTablecorepack";

const tableCorePackItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: tableOverviewcorepackDescription,
    recipe: tableOverviewcorepackRecipe,
    Component: TableOverviewcorepack,
    playground: {
      initialSource: TableOverviewcorepackSource,
      fileName: "table-overviewcorepack.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableOverviewcorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableOverviewcorepackDepartmentDataSource,
          language: "json",
          importSpecifier: "text!./departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: tableBasicTablecorepackDescription,
    recipe: tableBasicTablecorepackRecipe,
    Component: TableBasicTablecorepack,
    playground: {
      initialSource: TableBasicTablecorepackSource,
      fileName: "table-basicTablecorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableBasicTablecorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "departmentDataText",
        },
      ],
    },
  },
   {
    id: "selection",
    name: "Selection",
    description: tableSelectionTablecorepackDescription,
    recipe: tableSelectionTablecorepackRecipe,
    Component: TableSelectionTablecorepack,
    playground: {
      initialSource: TableSelectionTablecorepackSource,
      fileName: "table-selectionTablecorepack.tsx",
      runtimeBindings: {
        KeySetImpl,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "column-layouts",
    name: "Column Layouts",
    description: tableColumnLayoutscorepackDescription,
    recipe: tableColumnLayoutscorepackRecipe,
    Component: TableColumnLayoutscorepack,
    playground: {
      initialSource: TableColumnLayoutscorepackSource,
      fileName: "table-columnLayoutscorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableColumnLayoutscorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "column-sorting",
    name: "Column Sorting",
    description: tableColumnSortingcorepackDescription,
    recipe: tableColumnSortingcorepackRecipe,
    Component: TableColumnSortingcorepack,
    playground: {
      initialSource: TableColumnSortingcorepackSource,
      fileName: "table-columnSortingcorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableColumnSortingcorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableColumnSortingcorepackDepartmentDataSource,
          language: "json",
          importSpecifier: "text!./departmentData.json",
          bindingName: "departmentDataText",
        },
      ],
    },
  },
  {
    id: "responsive",
    name: "Responsive Columns",
    description: tableResponsiveTablecorepackDescription,
    recipe: tableResponsiveTablecorepackRecipe,
    Component: TableResponsiveTablecorepack,
    playground: {
      initialSource: TableResponsiveTablecorepackSource,
      fileName: "table-responsiveTablecorepack.tsx",
      runtimeBindings: {
        ResponsiveUtils,
        MutableArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableResponsiveTablecorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableResponsiveTablecorepackDepartmentDataSource,
          language: "json",
          importSpecifier: "text!./departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
   
  {
    id: "sticky-columns",
    name: "Sticky Columns",
    description: tableStickyColumnTablecorepackDescription,
    recipe: tableStickyColumnTablecorepackRecipe,
    Component: TableStickyColumnTablecorepack,
    playground: {
      initialSource: TableStickyColumnTablecorepackSource,
      fileName: "table-stickyColumnTablecorepack.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableStickyColumnTablecorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "employeeStatusData.json",
          initialSource: TableStickyColumnTablecorepackEmployeeStatusDataSource,
          language: "json",
          importSpecifier: "text!./employeeStatusData.json",
          bindingName: "empData",
        },
      ],
    },
  },
 {
    id: "template-slots",
    name: "Cell Templates",
    description: tableTemplateSlotTablecorepackDescription,
    recipe: tableTemplateSlotTablecorepackRecipe,
    Component: TableTemplateSlotTablecorepack,
    playground: {
      initialSource: TableTemplateSlotTablecorepackSource,
      fileName: "table-templateSlotTablecorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableTemplateSlotTablecorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
      ],
    },
  },
   {
    id: "manage-tab-stops",
    name: "Manage Tab Stops",
    description: tableManageTabStopscorepackDescription,
    recipe: tableManageTabStopscorepackRecipe,
    Component: TableManageTabStopscorepack,
    playground: {
      initialSource: TableManageTabStopscorepackSource,
      fileName: "table-manageTabStopscorepack.tsx",
      runtimeBindings: {
        preact,
        MutableArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableManageTabStopscorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "employeeData.json",
          initialSource: TableManageTabStopscorepackEmployeeDataSource,
          language: "json",
          importSpecifier: "text!./employeeData.json",
          bindingName: "empData",
        },
      ],
    },
  },
   {
    id: "no-data",
    name: "No Data",
    description: tableNoDataTablecorepackDescription,
    recipe: tableNoDataTablecorepackRecipe,
    Component: TableNoDataTablecorepack,
    playground: {
      initialSource: TableNoDataTablecorepackSource,
      fileName: "table-noDataTablecorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableNoDataTablecorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "grid-styling",
    name: "GridLines",
    description: tableGridStylingcorepackDescription,
    recipe: tableGridStylingcorepackRecipe,
    Component: TableGridStylingcorepack,
    playground: {
      initialSource: TableGridStylingcorepackSource,
      fileName: "table-gridStylingcorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
      ],
    },
  },
  {
    id: "background-color",
    name: "Background Color",
    description: tableBackgroundColorcorepackDescription,
    recipe: tableBackgroundColorcorepackRecipe,
    Component: TableBackgroundColorcorepack,
    playground: {
      initialSource: TableBackgroundColorcorepackSource,
      fileName: "table-backgroundColorcorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableBackgroundColorcorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "filtering",
    name: "Filtering",
    description: tableFilteringTablecorepackDescription,
    recipe: tableFilteringTablecorepackRecipe,
    Component: TableFilteringTablecorepack,
    playground: {
      initialSource: TableFilteringTablecorepackSource,
      fileName: "table-filteringTablecorepack.tsx",
      runtimeBindings: {
        FilterFactory,
        ArrayDataProvider,
        ListDataProviderView,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
      ],
    },
  },
  {
    id: "events",
    name: "Events",
    description: tableEventTablecorepackDescription,
    recipe: tableEventTablecorepackRecipe,
    Component: TableEventTablecorepack,
    playground: {
      initialSource: TableEventTablecorepackSource,
      fileName: "table-eventTablecorepack.tsx",
      runtimeBindings: {
        KeySetImpl,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "action-table",
    name: "Action Column",
    description: tableActionTablecorepackDescription,
    recipe: tableActionTablecorepackRecipe,
    Component: TableActionTablecorepack,
    playground: {
      initialSource: TableActionTablecorepackSource,
      fileName: "table-actionTablecorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "employeeData.json",
          initialSource: EmployeeDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "empData",
        },
      ],
    },
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: tableProgressiveLoadTablecorepackDescription,
    recipe: tableProgressiveLoadTablecorepackRecipe,
    Component: TableProgressiveLoadTablecorepack,
    playground: {
      initialSource: TableProgressiveLoadTablecorepackSource,
      fileName: "table-progressiveLoadTablecorepack.tsx",
      runtimeBindings: {
        RESTDataProvider,
        CollectionMockFetchServer,
        DemoDelayingDataProvider,
      },
      supportingFiles: [
        {
          fileName: "employeeData.json",
          initialSource: SharedEmployeeDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/sharedData/employeeData.json",
          bindingName: "jsonDataStr",
        },
      ],
    },
  },
  {
    id: "performance",
    name: "Performance",
    description: tablePerformanceTablecorepackDescription,
    recipe: tablePerformanceTablecorepackRecipe,
    Component: TablePerformanceTablecorepack,
    playground: {
      initialSource: TablePerformanceTablecorepackSource,
      fileName: "table-performanceTablecorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TablePerformanceTablecorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "employeeData.json",
          initialSource: EmployeeDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "employeeDataText",
        },
      ],
    },
  },
   {
    id: "column-resizing",
    name: "Column Resizing",
    description: tableColumnResizingcorepackDescription,
    recipe: tableColumnResizingcorepackRecipe,
    Component: TableColumnResizingcorepack,
    playground: {
      initialSource: TableColumnResizingcorepackSource,
      fileName: "table-columnResizingcorepack.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
      supportingFiles: [
      ],
    },
  },
  {
    id: "custom-context-menu",
    name: "Custom Context Menu",
    description: tableCustomContextMenuTablecorepackDescription,
    recipe: tableCustomContextMenuTablecorepackRecipe,
    Component: TableCustomContextMenuTablecorepack,
    playground: {
      initialSource: TableCustomContextMenuTablecorepackSource,
      fileName: "table-customContextMenuTablecorepack.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableCustomContextMenuTablecorepackDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: DepartmentDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
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
