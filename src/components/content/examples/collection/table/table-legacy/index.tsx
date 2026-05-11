import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TableActionTable } from "./table-actionTable/table-actionTable";
import { tableActionTableDescription } from "./table-actionTable/description";
import { tableActionTableRecipe } from "./table-actionTable/recipe";
import { TableAddRowTable } from "./table-addRowTable/table-addRowTable";
import { tableAddRowTableDescription } from "./table-addRowTable/description";
import { tableAddRowTableRecipe } from "./table-addRowTable/recipe";
import { TableBackgroundColor } from "./table-backgroundColor/table-backgroundColor";
import { tableBackgroundColorDescription } from "./table-backgroundColor/description";
import { tableBackgroundColorRecipe } from "./table-backgroundColor/recipe";
import { TableBasicTable } from "./table-basicTable/table-basicTable";
import { tableBasicTableDescription } from "./table-basicTable/description";
import { tableBasicTableRecipe } from "./table-basicTable/recipe";
import { TableColumnAdditionTable } from "./table-columnAdditionTable/table-columnAdditionTable";
import { tableColumnAdditionTableDescription } from "./table-columnAdditionTable/description";
import { tableColumnAdditionTableRecipe } from "./table-columnAdditionTable/recipe";
import { TableColumnContentWrapping } from "./table-columnContentWrapping/table-columnContentWrapping";
import { tableColumnContentWrappingDescription } from "./table-columnContentWrapping/description";
import { tableColumnContentWrappingRecipe } from "./table-columnContentWrapping/recipe";
import { TableColumnLayouts } from "./table-columnLayouts/table-columnLayouts";
import { tableColumnLayoutsDescription } from "./table-columnLayouts/description";
import { tableColumnLayoutsRecipe } from "./table-columnLayouts/recipe";
import { TableColumnRenderer } from "./table-columnRenderer/table-columnRenderer";
import { tableColumnRendererDescription } from "./table-columnRenderer/description";
import { tableColumnRendererRecipe } from "./table-columnRenderer/recipe";
import { TableColumnResizing } from "./table-columnResizing/table-columnResizing";
import { tableColumnResizingDescription } from "./table-columnResizing/description";
import { tableColumnResizingRecipe } from "./table-columnResizing/recipe";
import { TableComputedField } from "./table-computedField/table-computedField";
import { tableComputedFieldDescription } from "./table-computedField/description";
import { tableComputedFieldRecipe } from "./table-computedField/recipe";
import { TableCustomContextMenuTable } from "./table-customContextMenuTable/table-customContextMenuTable";
import { tableCustomContextMenuTableDescription } from "./table-customContextMenuTable/description";
import { tableCustomContextMenuTableRecipe } from "./table-customContextMenuTable/recipe";
import { TableCustomSortableTable } from "./table-customSortableTable/table-customSortableTable";
import { tableCustomSortableTableDescription } from "./table-customSortableTable/description";
import { tableCustomSortableTableRecipe } from "./table-customSortableTable/recipe";
import { TableCustomTable } from "./table-customTable/table-customTable";
import { tableCustomTableDescription } from "./table-customTable/description";
import { tableCustomTableRecipe } from "./table-customTable/recipe";
import { TableDetailTable } from "./table-detailTable/table-detailTable";
import { tableDetailTableDescription } from "./table-detailTable/description";
import { tableDetailTableRecipe } from "./table-detailTable/recipe";
import { TableDragDropTable } from "./table-dragDropTable/table-dragDropTable";
import { tableDragDropTableDescription } from "./table-dragDropTable/description";
import { tableDragDropTableRecipe } from "./table-dragDropTable/recipe";
import { TableDragTableDropChart } from "./table-dragTableDropChart/table-dragTableDropChart";
import { tableDragTableDropChartDescription } from "./table-dragTableDropChart/description";
import { tableDragTableDropChartRecipe } from "./table-dragTableDropChart/recipe";
import { TableEditableArrayTable } from "./table-editableArrayTable/table-editableArrayTable";
import { tableEditableArrayTableDescription } from "./table-editableArrayTable/description";
import { tableEditableArrayTableRecipe } from "./table-editableArrayTable/recipe";
import { TableEditableFormTable } from "./table-editableFormTable/table-editableFormTable";
import { tableEditableFormTableDescription } from "./table-editableFormTable/description";
import { tableEditableFormTableRecipe } from "./table-editableFormTable/recipe";
import { TableEventTable } from "./table-eventTable/table-eventTable";
import { tableEventTableDescription } from "./table-eventTable/description";
import { tableEventTableRecipe } from "./table-eventTable/recipe";
import { TableExternalScrollTable } from "./table-externalScrollTable/table-externalScrollTable";
import { tableExternalScrollTableDescription } from "./table-externalScrollTable/description";
import { tableExternalScrollTableRecipe } from "./table-externalScrollTable/recipe";
import { TableFilteringTable } from "./table-filteringTable/table-filteringTable";
import { tableFilteringTableDescription } from "./table-filteringTable/description";
import { tableFilteringTableRecipe } from "./table-filteringTable/recipe";
import { TableFrozenColumnTable } from "./table-frozenColumnTable/table-frozenColumnTable";
import { tableFrozenColumnTableDescription } from "./table-frozenColumnTable/description";
import { tableFrozenColumnTableRecipe } from "./table-frozenColumnTable/recipe";
import { TableGridStyling } from "./table-gridStyling/table-gridStyling";
import { tableGridStylingDescription } from "./table-gridStyling/description";
import { tableGridStylingRecipe } from "./table-gridStyling/recipe";
import { TableGroupTable } from "./table-groupTable/table-groupTable";
import { tableGroupTableDescription } from "./table-groupTable/description";
import { tableGroupTableRecipe } from "./table-groupTable/recipe";
import { TableInitialSortTable } from "./table-initialSortTable/table-initialSortTable";
import { tableInitialSortTableDescription } from "./table-initialSortTable/description";
import { tableInitialSortTableRecipe } from "./table-initialSortTable/recipe";
import { TableInsertRowTable } from "./table-insertRowTable/table-insertRowTable";
import { tableInsertRowTableDescription } from "./table-insertRowTable/description";
import { tableInsertRowTableRecipe } from "./table-insertRowTable/recipe";
import { TableNavigateTable } from "./table-navigateTable/table-navigateTable";
import { tableNavigateTableDescription } from "./table-navigateTable/description";
import { tableNavigateTableRecipe } from "./table-navigateTable/recipe";
import { TableNoDataTable } from "./table-noDataTable/table-noDataTable";
import { tableNoDataTableDescription } from "./table-noDataTable/description";
import { tableNoDataTableRecipe } from "./table-noDataTable/recipe";
import { TableObservableArrayTable } from "./table-observableArrayTable/table-observableArrayTable";
import { tableObservableArrayTableDescription } from "./table-observableArrayTable/description";
import { tableObservableArrayTableRecipe } from "./table-observableArrayTable/recipe";
import { TablePerformanceTable } from "./table-performanceTable/table-performanceTable";
import { tablePerformanceTableDescription } from "./table-performanceTable/description";
import { tablePerformanceTableRecipe } from "./table-performanceTable/recipe";
import { TableProgressiveLoadTable } from "./table-progressiveLoadTable/table-progressiveLoadTable";
import { tableProgressiveLoadTableDescription } from "./table-progressiveLoadTable/description";
import { tableProgressiveLoadTableRecipe } from "./table-progressiveLoadTable/recipe";
import { TableRowReorderTable } from "./table-rowReorderTable/table-rowReorderTable";
import { tableRowReorderTableDescription } from "./table-rowReorderTable/description";
import { tableRowReorderTableRecipe } from "./table-rowReorderTable/recipe";
import { TableRowTemplate } from "./table-rowTemplate/table-rowTemplate";
import { tableRowTemplateDescription } from "./table-rowTemplate/description";
import { tableRowTemplateRecipe } from "./table-rowTemplate/recipe";
import { TableScrollPosTable } from "./table-scrollPosTable/table-scrollPosTable";
import { tableScrollPosTableDescription } from "./table-scrollPosTable/description";
import { tableScrollPosTableRecipe } from "./table-scrollPosTable/recipe";
import { TableScrollToKeyTable } from "./table-scrollToKeyTable/table-scrollToKeyTable";
import { tableScrollToKeyTableDescription } from "./table-scrollToKeyTable/description";
import { tableScrollToKeyTableRecipe } from "./table-scrollToKeyTable/recipe";
import { TableSelectionTable } from "./table-selectionTable/table-selectionTable";
import { tableSelectionTableDescription } from "./table-selectionTable/description";
import { tableSelectionTableRecipe } from "./table-selectionTable/recipe";
import { TableTemplateSlotTable } from "./table-templateSlotTable/table-templateSlotTable";
import { tableTemplateSlotTableDescription } from "./table-templateSlotTable/description";
import { tableTemplateSlotTableRecipe } from "./table-templateSlotTable/recipe";

const tableLegacyItems = [
  {
    id: "basic-table",
    name: "Overview",
    description: tableBasicTableDescription,
    recipe: tableBasicTableRecipe,
    Component: TableBasicTable,
  },
  {
    id: "selection",
    name: "Selection",
    description: tableSelectionTableDescription,
    recipe: tableSelectionTableRecipe,
    Component: TableSelectionTable,
  },
{
    id: "filtering",
    name: "Filtering",
    description: tableFilteringTableDescription,
    recipe: tableFilteringTableRecipe,
    Component: TableFilteringTable,
  },
  {
    id: "group-table",
    name: "Group By",
    description: tableGroupTableDescription,
    recipe: tableGroupTableRecipe,
    Component: TableGroupTable,
  },
  {
    id: "initial-sort",
    name: "Initial Sort",
    description: tableInitialSortTableDescription,
    recipe: tableInitialSortTableRecipe,
    Component: TableInitialSortTable,
  },

  {
    id: "column-layouts",
    name: "Column Layouts",
    description: tableColumnLayoutsDescription,
    recipe: tableColumnLayoutsRecipe,
    Component: TableColumnLayouts,
  },
{
    id: "column-resizing",
    name: "Column Resizing",
    description: tableColumnResizingDescription,
    recipe: tableColumnResizingRecipe,
    Component: TableColumnResizing,
  },
{
    id: "frozen-column",
    name: "Frozen Column",
    description: tableFrozenColumnTableDescription,
    recipe: tableFrozenColumnTableRecipe,
    Component: TableFrozenColumnTable,
  },
  {
    id: "row-template",
    name: "Row Template",
    description: tableRowTemplateDescription,
    recipe: tableRowTemplateRecipe,
    Component: TableRowTemplate,
  },
  {
    id: "add-row",
    name: "Add Row",
    description: tableAddRowTableDescription,
    recipe: tableAddRowTableRecipe,
    Component: TableAddRowTable,
  },
   {
    id: "insert-row",
    name: "Insert Row",
    description: tableInsertRowTableDescription,
    recipe: tableInsertRowTableRecipe,
    Component: TableInsertRowTable,
  },
  {
    id: "computed-field",
    name: "Computed Field",
    description: tableComputedFieldDescription,
    recipe: tableComputedFieldRecipe,
    Component: TableComputedField,
  },

  {
    id: "action-table",
    name: "Action Column",
    description: tableActionTableDescription,
    recipe: tableActionTableRecipe,
    Component: TableActionTable,
  },
   {
    id: "no-data",
    name: "No Data",
    description: tableNoDataTableDescription,
    recipe: tableNoDataTableRecipe,
    Component: TableNoDataTable,
  },
   {
    id: "column-content-wrapping",
    name: "Column Content Wrapping",
    description: tableColumnContentWrappingDescription,
    recipe: tableColumnContentWrappingRecipe,
    Component: TableColumnContentWrapping,
  },
   {
    id: "custom-context-menu",
    name: "Context Menu",
    description: tableCustomContextMenuTableDescription,
    recipe: tableCustomContextMenuTableRecipe,
    Component: TableCustomContextMenuTable,
  },
  {
    id: "grid-styling",
    name: "Grid Styling",
    description: tableGridStylingDescription,
    recipe: tableGridStylingRecipe,
    Component: TableGridStyling,
  },
  {
    id: "background-color",
    name: "Background Color",
    description: tableBackgroundColorDescription,
    recipe: tableBackgroundColorRecipe,
    Component: TableBackgroundColor,
  },
  {
    id: "column-addition",
    name: "Add Column",
    description: tableColumnAdditionTableDescription,
    recipe: tableColumnAdditionTableRecipe,
    Component: TableColumnAdditionTable,
  },
   {
    id: "drag-drop",
    name: "Drag and Drop",
    description: tableDragDropTableDescription,
    recipe: tableDragDropTableRecipe,
    Component: TableDragDropTable,
  },
  {
    id: "drag-table-drop-chart",
    name: "Drag Table Drop Chart",
    description: tableDragTableDropChartDescription,
    recipe: tableDragTableDropChartRecipe,
    Component: TableDragTableDropChart,
  },
  {
    id: "scroll-position",
    name: "Scroll Position",
    description: tableScrollPosTableDescription,
    recipe: tableScrollPosTableRecipe,
    Component: TableScrollPosTable,
  },
  {
    id: "scroll-to-key",
    name: "Scroll To Key",
    description: tableScrollToKeyTableDescription,
    recipe: tableScrollToKeyTableRecipe,
    Component: TableScrollToKeyTable,
  },
  
  
 
  {
    id: "column-renderer",
    name: "Column Renderer",
    description: tableColumnRendererDescription,
    recipe: tableColumnRendererRecipe,
    Component: TableColumnRenderer,
  },
  
  {
    id: "custom-sortable",
    name: "Custom Sortable",
    description: tableCustomSortableTableDescription,
    recipe: tableCustomSortableTableRecipe,
    Component: TableCustomSortableTable,
  },
  {
    id: "custom-table",
    name: "Custom Table",
    description: tableCustomTableDescription,
    recipe: tableCustomTableRecipe,
    Component: TableCustomTable,
  },
  {
    id: "detail-table",
    name: "Detail",
    description: tableDetailTableDescription,
    recipe: tableDetailTableRecipe,
    Component: TableDetailTable,
  },
 
  {
    id: "editable-array",
    name: "Editable Array",
    description: tableEditableArrayTableDescription,
    recipe: tableEditableArrayTableRecipe,
    Component: TableEditableArrayTable,
  },
  {
    id: "editable-form",
    name: "Editable Form",
    description: tableEditableFormTableDescription,
    recipe: tableEditableFormTableRecipe,
    Component: TableEditableFormTable,
  },
  {
    id: "events",
    name: "Events",
    description: tableEventTableDescription,
    recipe: tableEventTableRecipe,
    Component: TableEventTable,
  },
  {
    id: "external-scroll",
    name: "External Scroll",
    description: tableExternalScrollTableDescription,
    recipe: tableExternalScrollTableRecipe,
    Component: TableExternalScrollTable,
  },
 
  // {
  //   id: "navigate",
  //   name: "Navigate",
  //   description: tableNavigateTableDescription,
  //   recipe: tableNavigateTableRecipe,
  //   Component: TableNavigateTable,
  // },
 
  {
    id: "observable-array",
    name: "Observable Array",
    description: tableObservableArrayTableDescription,
    recipe: tableObservableArrayTableRecipe,
    Component: TableObservableArrayTable,
  },
  {
    id: "performance",
    name: "Performance",
    description: tablePerformanceTableDescription,
    recipe: tablePerformanceTableRecipe,
    Component: TablePerformanceTable,
  },
  {
    id: "progressive-load",
    name: "Progressive Loading",
    description: tableProgressiveLoadTableDescription,
    recipe: tableProgressiveLoadTableRecipe,
    Component: TableProgressiveLoadTable,
  },
  
  
  {
    id: "template-slot",
    name: "Template Slot",
    description: tableTemplateSlotTableDescription,
    recipe: tableTemplateSlotTableRecipe,
    Component: TableTemplateSlotTable,
  },
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
