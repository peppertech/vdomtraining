import * as preact from "preact";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import BufferingDataProvider = require("ojs/ojbufferingdataprovider");
import * as Context from "ojs/ojcontext";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import * as NumberConverter from "ojs/ojconverter-number";
import { FilterFactory } from "ojs/ojdataprovider";
import FlattenedTreeDataProviderView = require("ojs/ojflattenedtreedataproviderview");
import * as KeySet from "ojs/ojkeyset";
import { KeySetImpl } from "ojs/ojkeyset";
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { RESTDataProvider } from "ojs/ojrestdataprovider";
import NumberRangeValidator = require("ojs/ojvalidator-numberrange");
import { CollectionMockFetchServer } from "../../shared/CollectionMockFetchServer";
import DemoDelayingDataProvider from "./inputSearch-suggestions/DemoDelayingDataProvider";
import TableDragDropDataTransfer from "./table-dragDropTable/DemoDataTransfer";
import ChartDragDropDataTransfer from "./table-dragTableDropChart/DemoDataTransfer";
import TableBasicTableSource from "./table-basicTable/table-basicTable-source";
import TableBasicTableDemoCssSource from "./table-basicTable/demo-source";
import TableBasicTableDepartmentDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableSelectionTableSource from "./table-selectionTable/table-selectionTable-source";
import TableSelectionTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableObservableArrayTableSource from "./table-observableArrayTable/table-observableArrayTable-source";
import TableObservableArrayTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableFilteringTableSource from "./table-filteringTable/table-filteringTable-source";
import TableFilteringTableDeptDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableGroupTableSource from "./table-groupTable/table-groupTable-source";
import TableGroupTableDemoCssSource from "./table-groupTable/demo-source";
import TableGroupTableDataTextSource from "../../data/cookbook/dataCollections/table/shared/groupData-source";
import TableInitialSortTableSource from "./table-initialSortTable/table-initialSortTable-source";
import TableInitialSortTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableCustomSortableTableSource from "./table-customSortableTable/table-customSortableTable-source";
import TableCustomSortableTableDemoCssSource from "./table-customSortableTable/demo-source";
import TableCustomSortableTableDepartmentDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableColumnLayoutsSource from "./table-columnLayouts/table-columnLayouts-source";
import TableColumnLayoutsDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableColumnResizingSource from "./table-columnResizing/table-columnResizing-source";
import TableFrozenColumnTableSource from "./table-frozenColumnTable/table-frozenColumnTable-source";
import TableFrozenColumnTableDemoCssSource from "./table-frozenColumnTable/demo-source";
import TableFrozenColumnTableEmpDataSource from "../../data/cookbook/dataCollections/table/shared/employeeData-source";
import TableTemplateSlotTableSource from "./table-templateSlotTable/table-templateSlotTable-source";
import TableTemplateSlotTableDeptDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableRowTemplateSource from "./table-rowTemplate/table-rowTemplate-source";
import TableRowTemplateEmpDataTextSource from "../../data/cookbook/dataCollections/table/shared/employeeData-source";
import TableEditableArrayTableSource from "./table-editableArrayTable/table-editableArrayTable-source";
import TableEditableArrayTableDemoCssSource from "./table-editableArrayTable/demo-source";
import TableEditableArrayTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableEditableFormTableSource from "./table-editableFormTable/table-editableFormTable-source";
import TableEditableFormTableDemoCssSource from "./table-editableFormTable/demo-source";
import TableEditableFormTableDeptDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableAddRowTableSource from "./table-addRowTable/table-addRowTable-source";
import TableAddRowTableDemoCssSource from "./table-addRowTable/demo-source";
import TableAddRowTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableInsertRowTableSource from "./table-insertRowTable/table-insertRowTable-source";
import TableInsertRowTableDemoCssSource from "./table-insertRowTable/demo-source";
import TableInsertRowTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableComputedFieldSource from "./table-computedField/table-computedField-source";
import TableComputedFieldDemoCssSource from "./table-computedField/demo-source";
import TableComputedFieldEmpDataSource from "../../data/cookbook/dataCollections/table/shared/employeeData-source";
import TableActionTableSource from "./table-actionTable/table-actionTable-source";
import TableActionTableEmpDataSource from "../../data/cookbook/dataCollections/table/shared/employeeData-source";
import TableNoDataTableSource from "./table-noDataTable/table-noDataTable-source";
import TableColumnContentWrappingSource from "./table-columnContentWrapping/table-columnContentWrapping-source";
import TableCustomContextMenuTableSource from "./table-customContextMenuTable/table-customContextMenuTable-source";
import TableCustomContextMenuTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableGridStylingSource from "./table-gridStyling/table-gridStyling-source";
import TableGridStylingDeptDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableBackgroundColorSource from "./table-backgroundColor/table-backgroundColor-source";
import TableBackgroundColorDemoCssSource from "./table-backgroundColor/demo-source";
import TableColumnAdditionTableSource from "./table-columnAdditionTable/table-columnAdditionTable-source";
import TableColumnAdditionTableDeptDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableDragDropTableSource from "./table-dragDropTable/table-dragDropTable-source";
import TableDragDropTableDemoCssSource from "./table-dragDropTable/demo-source";
import TableDragDropTableResultDataTextSource from "../../data/cookbook/dataCollections/table/shared/resultData-source";
import TableDragTableDropChartSource from "./table-dragTableDropChart/table-dragTableDropChart-source";
import TableDragTableDropChartDemoCssSource from "./table-dragTableDropChart/demo-source";
import TableDragTableDropChartResultDataTextSource from "../../data/cookbook/dataCollections/table/shared/resultData-source";
import TableScrollToKeyTableSource from "./table-scrollToKeyTable/table-scrollToKeyTable-source";
import TableScrollPosTableSource from "./table-scrollPosTable/table-scrollPosTable-source";
import TableEventTableSource from "./table-eventTable/table-eventTable-source";
import TableEventTableDeptDataSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableDetailTableSource from "./table-detailTable/table-detailTable-source";
import TableDetailTableDemoCssSource from "./table-detailTable/demo-source";
import TableDetailTableJsonDataStrTextSource from "../../data/cookbook/dataCollections/table/detailTable/projectData-source";
import TableProgressiveLoadTableSource from "./table-progressiveLoadTable/table-progressiveLoadTable-source";
import TableProgressiveLoadTableJsonDataStrSource from "../../data/cookbook/dataCollections/sharedData/employeeData-source";
import TablePerformanceTableSource from "./table-performanceTable/table-performanceTable-source";
import TablePerformanceTableDemoCssSource from "./table-performanceTable/demo-source";
import TablePerformanceTableEmployeeDataTextSource from "../../data/cookbook/dataCollections/table/shared/employeeData-source";
import TableCustomTableSource from "./table-customTable/table-customTable-source";
import TableCustomTableDemoCssSource from "./table-customTable/demo-source";
import TableCustomTableEmpDataTextSource from "../../data/cookbook/dataCollections/table/customTable/employeeData-source";
import TableColumnRendererSource from "./table-columnRenderer/table-columnRenderer-source";
import TableColumnRendererDemoCssSource from "./table-columnRenderer/demo-source";
import TableColumnRendererDeptDataTextSource from "../../data/cookbook/dataCollections/table/shared/departmentData-source";
import TableColumnRendererEmpDataTextSource from "../../data/cookbook/dataCollections/table/shared/employeeData-source";
import { RecipePageTemplate, type RecipePageItem } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { tableActionTableDescription } from "./table-actionTable/description";
import { tableActionTableRecipe } from "./table-actionTable/recipe";
import { TableActionTable } from "./table-actionTable/table-actionTable";
import { tableAddRowTableDescription } from "./table-addRowTable/description";
import { tableAddRowTableRecipe } from "./table-addRowTable/recipe";
import { TableAddRowTable } from "./table-addRowTable/table-addRowTable";
import { tableBackgroundColorDescription } from "./table-backgroundColor/description";
import { tableBackgroundColorRecipe } from "./table-backgroundColor/recipe";
import { TableBackgroundColor } from "./table-backgroundColor/table-backgroundColor";
import { tableBasicTableDescription } from "./table-basicTable/description";
import { tableBasicTableRecipe } from "./table-basicTable/recipe";
import TableBasicTable from "./table-basicTable/table-basicTable";
import { tableColumnAdditionTableDescription } from "./table-columnAdditionTable/description";
import { tableColumnAdditionTableRecipe } from "./table-columnAdditionTable/recipe";
import { TableColumnAdditionTable } from "./table-columnAdditionTable/table-columnAdditionTable";
import { tableColumnContentWrappingDescription } from "./table-columnContentWrapping/description";
import { tableColumnContentWrappingRecipe } from "./table-columnContentWrapping/recipe";
import { TableColumnContentWrapping } from "./table-columnContentWrapping/table-columnContentWrapping";
import { tableColumnLayoutsDescription } from "./table-columnLayouts/description";
import { tableColumnLayoutsRecipe } from "./table-columnLayouts/recipe";
import { TableColumnLayouts } from "./table-columnLayouts/table-columnLayouts";
import { tableColumnRendererDescription } from "./table-columnRenderer/description";
import { tableColumnRendererRecipe } from "./table-columnRenderer/recipe";
import { TableColumnRenderer } from "./table-columnRenderer/table-columnRenderer";
import { tableColumnResizingDescription } from "./table-columnResizing/description";
import { tableColumnResizingRecipe } from "./table-columnResizing/recipe";
import { TableColumnResizing } from "./table-columnResizing/table-columnResizing";
import { tableComputedFieldDescription } from "./table-computedField/description";
import { tableComputedFieldRecipe } from "./table-computedField/recipe";
import { TableComputedField } from "./table-computedField/table-computedField";
import { tableCustomContextMenuTableDescription } from "./table-customContextMenuTable/description";
import { tableCustomContextMenuTableRecipe } from "./table-customContextMenuTable/recipe";
import { TableCustomContextMenuTable } from "./table-customContextMenuTable/table-customContextMenuTable";
import { tableCustomSortableTableDescription } from "./table-customSortableTable/description";
import { tableCustomSortableTableRecipe } from "./table-customSortableTable/recipe";
import { TableCustomSortableTable } from "./table-customSortableTable/table-customSortableTable";
import { tableCustomTableDescription } from "./table-customTable/description";
import { tableCustomTableRecipe } from "./table-customTable/recipe";
import { TableCustomTable } from "./table-customTable/table-customTable";
import { tableDetailTableDescription } from "./table-detailTable/description";
import { tableDetailTableRecipe } from "./table-detailTable/recipe";
import { TableDetailTable } from "./table-detailTable/table-detailTable";
import { tableDragDropTableDescription } from "./table-dragDropTable/description";
import { tableDragDropTableRecipe } from "./table-dragDropTable/recipe";
import { TableDragDropTable } from "./table-dragDropTable/table-dragDropTable";
import { tableDragTableDropChartDescription } from "./table-dragTableDropChart/description";
import { tableDragTableDropChartRecipe } from "./table-dragTableDropChart/recipe";
import { TableDragTableDropChart } from "./table-dragTableDropChart/table-dragTableDropChart";
import { tableEditableArrayTableDescription } from "./table-editableArrayTable/description";
import { tableEditableArrayTableRecipe } from "./table-editableArrayTable/recipe";
import { TableEditableArrayTable } from "./table-editableArrayTable/table-editableArrayTable";
import { tableEditableFormTableDescription } from "./table-editableFormTable/description";
import { tableEditableFormTableRecipe } from "./table-editableFormTable/recipe";
import { TableEditableFormTable } from "./table-editableFormTable/table-editableFormTable";
import { tableEventTableDescription } from "./table-eventTable/description";
import { tableEventTableRecipe } from "./table-eventTable/recipe";
import { TableEventTable } from "./table-eventTable/table-eventTable";
import { tableFilteringTableDescription } from "./table-filteringTable/description";
import { tableFilteringTableRecipe } from "./table-filteringTable/recipe";
import { TableFilteringTable } from "./table-filteringTable/table-filteringTable";
import { tableFrozenColumnTableDescription } from "./table-frozenColumnTable/description";
import { tableFrozenColumnTableRecipe } from "./table-frozenColumnTable/recipe";
import { TableFrozenColumnTable } from "./table-frozenColumnTable/table-frozenColumnTable";
import { tableGridStylingDescription } from "./table-gridStyling/description";
import { tableGridStylingRecipe } from "./table-gridStyling/recipe";
import { TableGridStyling } from "./table-gridStyling/table-gridStyling";
import { tableGroupTableDescription } from "./table-groupTable/description";
import { tableGroupTableRecipe } from "./table-groupTable/recipe";
import { TableGroupTable } from "./table-groupTable/table-groupTable";
import { tableInitialSortTableDescription } from "./table-initialSortTable/description";
import { tableInitialSortTableRecipe } from "./table-initialSortTable/recipe";
import { TableInitialSortTable } from "./table-initialSortTable/table-initialSortTable";
import { tableInsertRowTableDescription } from "./table-insertRowTable/description";
import { tableInsertRowTableRecipe } from "./table-insertRowTable/recipe";
import { TableInsertRowTable } from "./table-insertRowTable/table-insertRowTable";
import { tableNoDataTableDescription } from "./table-noDataTable/description";
import { tableNoDataTableRecipe } from "./table-noDataTable/recipe";
import { TableNoDataTable } from "./table-noDataTable/table-noDataTable";
import { tableObservableArrayTableDescription } from "./table-observableArrayTable/description";
import { tableObservableArrayTableRecipe } from "./table-observableArrayTable/recipe";
import { TableObservableArrayTable } from "./table-observableArrayTable/table-observableArrayTable";
import { tablePerformanceTableDescription } from "./table-performanceTable/description";
import { tablePerformanceTableRecipe } from "./table-performanceTable/recipe";
import { TablePerformanceTable } from "./table-performanceTable/table-performanceTable";
import { tableProgressiveLoadTableDescription } from "./table-progressiveLoadTable/description";
import { tableProgressiveLoadTableRecipe } from "./table-progressiveLoadTable/recipe";
import { TableProgressiveLoadTable } from "./table-progressiveLoadTable/table-progressiveLoadTable";
import { tableRowTemplateDescription } from "./table-rowTemplate/description";
import { tableRowTemplateRecipe } from "./table-rowTemplate/recipe";
import { TableRowTemplate } from "./table-rowTemplate/table-rowTemplate";
import { tableScrollPosTableDescription } from "./table-scrollPosTable/description";
import { tableScrollPosTableRecipe } from "./table-scrollPosTable/recipe";
import { TableScrollPosTable } from "./table-scrollPosTable/table-scrollPosTable";
import { tableScrollToKeyTableDescription } from "./table-scrollToKeyTable/description";
import { tableScrollToKeyTableRecipe } from "./table-scrollToKeyTable/recipe";
import { TableScrollToKeyTable } from "./table-scrollToKeyTable/table-scrollToKeyTable";
import { tableSelectionTableDescription } from "./table-selectionTable/description";
import { tableSelectionTableRecipe } from "./table-selectionTable/recipe";
import { TableSelectionTable } from "./table-selectionTable/table-selectionTable";
import { tableTemplateSlotTableDescription } from "./table-templateSlotTable/description";
import { tableTemplateSlotTableRecipe } from "./table-templateSlotTable/recipe";
import { TableTemplateSlotTable } from "./table-templateSlotTable/table-templateSlotTable";

const tableLegacyItems: RecipePageItem[] = [
  {
    id: "basic-table",
    name: "Overview",
    description: tableBasicTableDescription,
    recipe: tableBasicTableRecipe,
    Component: TableBasicTable,
    playground: {
      initialSource: TableBasicTableSource,
      fileName: "table-basicTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableBasicTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableBasicTableDepartmentDataTextSource,
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
    description: tableSelectionTableDescription,
    recipe: tableSelectionTableRecipe,
    Component: TableSelectionTable,
    playground: {
      initialSource: TableSelectionTableSource,
      fileName: "table-selectionTable.tsx",
      runtimeBindings: {
        KeySetImpl,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableSelectionTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "observable-array",
    name: "CRUD",
    description: tableObservableArrayTableDescription,
    recipe: tableObservableArrayTableRecipe,
    Component: TableObservableArrayTable,
    playground: {
      initialSource: TableObservableArrayTableSource,
      fileName: "table-observableArrayTable.tsx",
      runtimeBindings: {
        NumberConverter,
        KeySetImpl,
        ArrayDataProvider,
        BufferingDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableObservableArrayTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "filtering",
    name: "Filtering",
    description: tableFilteringTableDescription,
    recipe: tableFilteringTableRecipe,
    Component: TableFilteringTable,
    playground: {
      initialSource: TableFilteringTableSource,
      fileName: "table-filteringTable.tsx",
      runtimeBindings: {
        FilterFactory,
        ArrayDataProvider,
        ListDataProviderView,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableFilteringTableDeptDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
      ],
    },
  },
  {
    id: "group-table",
    name: "Group By",
    description: tableGroupTableDescription,
    recipe: tableGroupTableRecipe,
    Component: TableGroupTable,
    playground: {
      initialSource: TableGroupTableSource,
      fileName: "table-groupTable.tsx",
      runtimeBindings: {
        KeySet,
        ArrayTreeDataProvider,
        FlattenedTreeDataProviderView,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableGroupTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "groupData.json",
          initialSource: TableGroupTableDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/groupData.json",
          bindingName: "dataText",
        },
      ],
    },
  },
  {
    id: "initial-sort",
    name: "Initial Sort",
    description: tableInitialSortTableDescription,
    recipe: tableInitialSortTableRecipe,
    Component: TableInitialSortTable,
    playground: {
      initialSource: TableInitialSortTableSource,
      fileName: "table-initialSortTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
        ListDataProviderView,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableInitialSortTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "custom-sortable",
    name: "Sort Comparator",
    description: tableCustomSortableTableDescription,
    recipe: tableCustomSortableTableRecipe,
    Component: TableCustomSortableTable,
    playground: {
      initialSource: TableCustomSortableTableSource,
      fileName: "table-customSortableTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableCustomSortableTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableCustomSortableTableDepartmentDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "departmentDataText",
        },
      ],
    },
  },
  {
    id: "column-layouts",
    name: "Column Layouts",
    description: tableColumnLayoutsDescription,
    recipe: tableColumnLayoutsRecipe,
    Component: TableColumnLayouts,
    playground: {
      initialSource: TableColumnLayoutsSource,
      fileName: "table-columnLayouts.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableColumnLayoutsDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "column-resizing",
    name: "Column Resizing",
    description: tableColumnResizingDescription,
    recipe: tableColumnResizingRecipe,
    Component: TableColumnResizing,
    playground: {
      initialSource: TableColumnResizingSource,
      fileName: "table-columnResizing.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
    },
  },
  {
    id: "frozen-column",
    name: "Frozen Column",
    description: tableFrozenColumnTableDescription,
    recipe: tableFrozenColumnTableRecipe,
    Component: TableFrozenColumnTable,
    playground: {
      initialSource: TableFrozenColumnTableSource,
      fileName: "table-frozenColumnTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableFrozenColumnTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "employeeData.json",
          initialSource: TableFrozenColumnTableEmpDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "empData",
        },
      ],
    },
  },
  {
    id: "template-slot",
    name: "Cell Template",
    description: tableTemplateSlotTableDescription,
    recipe: tableTemplateSlotTableRecipe,
    Component: TableTemplateSlotTable,
    playground: {
      initialSource: TableTemplateSlotTableSource,
      fileName: "table-templateSlotTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableTemplateSlotTableDeptDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
      ],
    },
  },
  {
    id: "row-template",
    name: "Row Template",
    description: tableRowTemplateDescription,
    recipe: tableRowTemplateRecipe,
    Component: TableRowTemplate,
    playground: {
      initialSource: TableRowTemplateSource,
      fileName: "table-rowTemplate.tsx",
      runtimeBindings: {
        IntlNumberConverter,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "employeeData.json",
          initialSource: TableRowTemplateEmpDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "empDataText",
        },
      ],
    },
  },
  {
    id: "editable-array",
    name: "Editable",
    description: tableEditableArrayTableDescription,
    recipe: tableEditableArrayTableRecipe,
    Component: TableEditableArrayTable,
    playground: {
      initialSource: TableEditableArrayTableSource,
      fileName: "table-editableArrayTable.tsx",
      runtimeBindings: {
        Context,
        IntlDateTimeConverter,
        IntlNumberConverter,
        ArrayDataProvider,
        BufferingDataProvider,
        NumberRangeValidator,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableEditableArrayTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableEditableArrayTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "editable-form",
    name: "Editable Form Table",
    description: tableEditableFormTableDescription,
    recipe: tableEditableFormTableRecipe,
    Component: TableEditableFormTable,
    playground: {
      initialSource: TableEditableFormTableSource,
      fileName: "table-editableFormTable.tsx",
      runtimeBindings: {
        Context,
        IntlDateTimeConverter,
        IntlNumberConverter,
        KeySetImpl,
        ArrayDataProvider,
        BufferingDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableEditableFormTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableEditableFormTableDeptDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
      ],
    },
  },
  {
    id: "add-row",
    name: "Add Row",
    description: tableAddRowTableDescription,
    recipe: tableAddRowTableRecipe,
    Component: TableAddRowTable,
    playground: {
      initialSource: TableAddRowTableSource,
      fileName: "table-addRowTable.tsx",
      runtimeBindings: {
        Context,
        IntlDateTimeConverter,
        IntlNumberConverter,
        ArrayDataProvider,
        BufferingDataProvider,
        NumberRangeValidator,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableAddRowTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableAddRowTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "insert-row",
    name: "Insert Row",
    description: tableInsertRowTableDescription,
    recipe: tableInsertRowTableRecipe,
    Component: TableInsertRowTable,
    playground: {
      initialSource: TableInsertRowTableSource,
      fileName: "table-insertRowTable.tsx",
      runtimeBindings: {
        Context,
        IntlDateTimeConverter,
        IntlNumberConverter,
        preact,
        ArrayDataProvider,
        BufferingDataProvider,
        NumberRangeValidator,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableInsertRowTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableInsertRowTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "computed-field",
    name: "Computed Field",
    description: tableComputedFieldDescription,
    recipe: tableComputedFieldRecipe,
    Component: TableComputedField,
    playground: {
      initialSource: TableComputedFieldSource,
      fileName: "table-computedField.tsx",
      runtimeBindings: {
        Context,
        IntlNumberConverter,
        ArrayDataProvider,
        BufferingDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableComputedFieldDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "employeeData.json",
          initialSource: TableComputedFieldEmpDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "empData",
        },
      ],
    },
  },

  {
    id: "action-table",
    name: "Action Column",
    description: tableActionTableDescription,
    recipe: tableActionTableRecipe,
    Component: TableActionTable,
    playground: {
      initialSource: TableActionTableSource,
      fileName: "table-actionTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "employeeData.json",
          initialSource: TableActionTableEmpDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "empData",
        },
      ],
    },
  },
  {
    id: "no-data",
    name: "No Data",
    description: tableNoDataTableDescription,
    recipe: tableNoDataTableRecipe,
    Component: TableNoDataTable,
    playground: {
      initialSource: TableNoDataTableSource,
      fileName: "table-noDataTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
    },
  },
  {
    id: "column-content-wrapping",
    name: "Column Content Wrapping",
    description: tableColumnContentWrappingDescription,
    recipe: tableColumnContentWrappingRecipe,
    Component: TableColumnContentWrapping,
    playground: {
      initialSource: TableColumnContentWrappingSource,
      fileName: "table-columnContentWrapping.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
    },
  },
  {
    id: "custom-context-menu",
    name: "Context Menu",
    description: tableCustomContextMenuTableDescription,
    recipe: tableCustomContextMenuTableRecipe,
    Component: TableCustomContextMenuTable,
    playground: {
      initialSource: TableCustomContextMenuTableSource,
      fileName: "table-customContextMenuTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableCustomContextMenuTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "grid-styling",
    name: "Grid Styling",
    description: tableGridStylingDescription,
    recipe: tableGridStylingRecipe,
    Component: TableGridStyling,
    playground: {
      initialSource: TableGridStylingSource,
      fileName: "table-gridStyling.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableGridStylingDeptDataTextSource,
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
    description: tableBackgroundColorDescription,
    recipe: tableBackgroundColorRecipe,
    Component: TableBackgroundColor,
    playground: {
      initialSource: TableBackgroundColorSource,
      fileName: "table-backgroundColor.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableBackgroundColorDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "column-addition",
    name: "Add Column",
    description: tableColumnAdditionTableDescription,
    recipe: tableColumnAdditionTableRecipe,
    Component: TableColumnAdditionTable,
    playground: {
      initialSource: TableColumnAdditionTableSource,
      fileName: "table-columnAdditionTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableColumnAdditionTableDeptDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
      ],
    },
  },
  {
    id: "drag-drop",
    name: "Drag and Drop",
    description: tableDragDropTableDescription,
    recipe: tableDragDropTableRecipe,
    Component: TableDragDropTable,
    playground: {
      initialSource: TableDragDropTableSource,
      fileName: "table-dragDropTable.tsx",
      runtimeBindings: {
        DemoDataTransfer: TableDragDropDataTransfer,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableDragDropTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "resultData.json",
          initialSource: TableDragDropTableResultDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/resultData.json",
          bindingName: "resultDataText",
        },
      ],
    },
  },
  {
    id: "drag-table-drop-chart",
    name: "Drag Table Drop Chart",
    description: tableDragTableDropChartDescription,
    recipe: tableDragTableDropChartRecipe,
    Component: TableDragTableDropChart,
    playground: {
      initialSource: TableDragTableDropChartSource,
      fileName: "table-dragTableDropChart.tsx",
      runtimeBindings: {
        DemoDataTransfer: ChartDragDropDataTransfer,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableDragTableDropChartDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "resultData.json",
          initialSource: TableDragTableDropChartResultDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/resultData.json",
          bindingName: "resultDataText",
        },
      ],
    },
  },
  
  {
    id: "scroll-to-key",
    name: "Scroll To Key",
    description: tableScrollToKeyTableDescription,
    recipe: tableScrollToKeyTableRecipe,
    Component: TableScrollToKeyTable,
    playground: {
      initialSource: TableScrollToKeyTableSource,
      fileName: "table-scrollToKeyTable.tsx",
      runtimeBindings: {
        KeySetImpl,
        ArrayDataProvider,
      },
    },
  },
  {
    id: "scroll-position",
    name: "Scroll Position",
    description: tableScrollPosTableDescription,
    recipe: tableScrollPosTableRecipe,
    Component: TableScrollPosTable,
    playground: {
      initialSource: TableScrollPosTableSource,
      fileName: "table-scrollPosTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
    },
  },
  {
    id: "events",
    name: "Events",
    description: tableEventTableDescription,
    recipe: tableEventTableRecipe,
    Component: TableEventTable,
    playground: {
      initialSource: TableEventTableSource,
      fileName: "table-eventTable.tsx",
      runtimeBindings: {
        KeySetImpl,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "departmentData.json",
          initialSource: TableEventTableDeptDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptData",
        },
      ],
    },
  },
  {
    id: "detail-table",
    name: "Detail Row with Tree Data",
    description: tableDetailTableDescription,
    recipe: tableDetailTableRecipe,
    Component: TableDetailTable,
    playground: {
      initialSource: TableDetailTableSource,
      fileName: "table-detailTable.tsx",
      runtimeBindings: {
        ArrayTreeDataProvider,
        FlattenedTreeDataProviderView,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableDetailTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "projectData.json",
          initialSource: TableDetailTableJsonDataStrTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/detailTable/projectData.json",
          bindingName: "jsonDataStrText",
        },
      ],
    },
  },
  {
    id: "progressive-load",
    name: "Progressive Loading",
    description: tableProgressiveLoadTableDescription,
    recipe: tableProgressiveLoadTableRecipe,
    Component: TableProgressiveLoadTable,
    playground: {
      initialSource: TableProgressiveLoadTableSource,
      fileName: "table-progressiveLoadTable.tsx",
      runtimeBindings: {
        RESTDataProvider,
        CollectionMockFetchServer,
        DemoDelayingDataProvider,
      },
      supportingFiles: [
        {
          fileName: "employeeData.json",
          initialSource: TableProgressiveLoadTableJsonDataStrSource,
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
    description: tablePerformanceTableDescription,
    recipe: tablePerformanceTableRecipe,
    Component: TablePerformanceTable,
    playground: {
      initialSource: TablePerformanceTableSource,
      fileName: "table-performanceTable.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TablePerformanceTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "employeeData.json",
          initialSource: TablePerformanceTableEmployeeDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "employeeDataText",
        },
      ],
    },
  },
  {
    id: "custom-table",
    name: "Cell Renderer",
    description: tableCustomTableDescription,
    recipe: tableCustomTableRecipe,
    Component: TableCustomTable,
    playground: {
      initialSource: TableCustomTableSource,
      fileName: "table-customTable.tsx",
      runtimeBindings: {
        IntlNumberConverter,
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableCustomTableDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "employeeData.json",
          initialSource: TableCustomTableEmpDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/customTable/employeeData.json",
          bindingName: "empDataText",
        },
      ],
    },
  },
  {
    id: "column-renderer",
    name: "Shared Cell Renderer",
    description: tableColumnRendererDescription,
    recipe: tableColumnRendererRecipe,
    Component: TableColumnRenderer,
    playground: {
      initialSource: TableColumnRendererSource,
      fileName: "table-columnRenderer.tsx",
      runtimeBindings: {
        ArrayDataProvider,
      },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: TableColumnRendererDemoCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
        {
          fileName: "departmentData.json",
          initialSource: TableColumnRendererDeptDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json",
          bindingName: "deptDataText",
        },
        {
          fileName: "employeeData.json",
          initialSource: TableColumnRendererEmpDataTextSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataCollections/table/shared/employeeData.json",
          bindingName: "empDataText",
        },
      ],
    },
  }
];

export default function TableLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Table examples"
      componentType="oj-table"
      items={tableLegacyItems}
      initialItemId="basic-table"
      navigationTitle="Table"
    />
  );
}
