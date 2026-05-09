import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { DataGridAdvancedEditableGrid } from "./dataGrid-advancedEditableGrid/dataGrid-advancedEditableGrid";
import { dataGridAdvancedEditableGridDescription } from "./dataGrid-advancedEditableGrid/description";
import { dataGridAdvancedEditableGridRecipe } from "./dataGrid-advancedEditableGrid/recipe";
import { DataGridAlignment } from "./dataGrid-alignment/dataGrid-alignment";
import { dataGridAlignmentDescription } from "./dataGrid-alignment/description";
import { dataGridAlignmentRecipe } from "./dataGrid-alignment/recipe";
import { DataGridCrudGrid } from "./dataGrid-crudGrid/dataGrid-crudGrid";
import { dataGridCrudGridDescription } from "./dataGrid-crudGrid/description";
import { dataGridCrudGridRecipe } from "./dataGrid-crudGrid/recipe";
import { DataGridCustomContextMenuGrid } from "./dataGrid-customContextMenuGrid/dataGrid-customContextMenuGrid";
import { dataGridCustomContextMenuGridDescription } from "./dataGrid-customContextMenuGrid/description";
import { dataGridCustomContextMenuGridRecipe } from "./dataGrid-customContextMenuGrid/recipe";
import { DataGridDataRegionsGrid } from "./dataGrid-dataRegionsGrid/dataGrid-dataRegionsGrid";
import { dataGridDataRegionsGridDescription } from "./dataGrid-dataRegionsGrid/description";
import { dataGridDataRegionsGridRecipe } from "./dataGrid-dataRegionsGrid/recipe";
import { DataGridDataTransferGrid } from "./dataGrid-dataTransferGrid/dataGrid-dataTransferGrid";
import { dataGridDataTransferGridDescription } from "./dataGrid-dataTransferGrid/description";
import { dataGridDataTransferGridRecipe } from "./dataGrid-dataTransferGrid/recipe";
import { DataGridDragAndDropGrid } from "./dataGrid-dragAndDropGrid/dataGrid-dragAndDropGrid";
import { dataGridDragAndDropGridDescription } from "./dataGrid-dragAndDropGrid/description";
import { dataGridDragAndDropGridRecipe } from "./dataGrid-dragAndDropGrid/recipe";
import { DataGridExpandHeaders } from "./dataGrid-expandHeaders/dataGrid-expandHeaders";
import { dataGridExpandHeadersDescription } from "./dataGrid-expandHeaders/description";
import { dataGridExpandHeadersRecipe } from "./dataGrid-expandHeaders/recipe";
import { DataGridFilterGrid } from "./dataGrid-filterGrid/dataGrid-filterGrid";
import { dataGridFilterGridDescription } from "./dataGrid-filterGrid/description";
import { dataGridFilterGridRecipe } from "./dataGrid-filterGrid/recipe";
import { DataGridFreezeGrid } from "./dataGrid-freezeGrid/dataGrid-freezeGrid";
import { dataGridFreezeGridDescription } from "./dataGrid-freezeGrid/description";
import { dataGridFreezeGridRecipe } from "./dataGrid-freezeGrid/recipe";
import { DataGridHeaderTooltips } from "./dataGrid-headerTooltips/dataGrid-headerTooltips";
import { dataGridHeaderTooltipsDescription } from "./dataGrid-headerTooltips/description";
import { dataGridHeaderTooltipsRecipe } from "./dataGrid-headerTooltips/recipe";
import { DataGridHideAxisGrid } from "./dataGrid-hideAxisGrid/dataGrid-hideAxisGrid";
import { dataGridHideAxisGridDescription } from "./dataGrid-hideAxisGrid/description";
import { dataGridHideAxisGridRecipe } from "./dataGrid-hideAxisGrid/recipe";
import { DataGridMergeCellsGrid } from "./dataGrid-mergeCellsGrid/dataGrid-mergeCellsGrid";
import { dataGridMergeCellsGridDescription } from "./dataGrid-mergeCellsGrid/description";
import { dataGridMergeCellsGridRecipe } from "./dataGrid-mergeCellsGrid/recipe";
import { DataGridNoDataStateGrid } from "./dataGrid-noDataStateGrid/dataGrid-noDataStateGrid";
import { dataGridNoDataStateGridDescription } from "./dataGrid-noDataStateGrid/description";
import { dataGridNoDataStateGridRecipe } from "./dataGrid-noDataStateGrid/recipe";
import { DataGridOverView } from "./dataGrid-overView/dataGrid-overView";
import { dataGridOverViewDescription } from "./dataGrid-overView/description";
import { dataGridOverViewRecipe } from "./dataGrid-overView/recipe";
import { DataGridPerformanceGrid } from "./dataGrid-performanceGrid/dataGrid-performanceGrid";
import { dataGridPerformanceGridDescription } from "./dataGrid-performanceGrid/description";
import { dataGridPerformanceGridRecipe } from "./dataGrid-performanceGrid/recipe";
import { DataGridPivot } from "./dataGrid-pivot/dataGrid-pivot";
import { dataGridPivotDescription } from "./dataGrid-pivot/description";
import { dataGridPivotRecipe } from "./dataGrid-pivot/recipe";
import { DataGridProgressiveLoading } from "./dataGrid-progressiveLoading/dataGrid-progressiveLoading";
import { dataGridProgressiveLoadingDescription } from "./dataGrid-progressiveLoading/description";
import { dataGridProgressiveLoadingRecipe } from "./dataGrid-progressiveLoading/recipe";
import { DataGridResizing } from "./dataGrid-resizing/dataGrid-resizing";
import { dataGridResizingDescription } from "./dataGrid-resizing/description";
import { dataGridResizingRecipe } from "./dataGrid-resizing/recipe";
import { DataGridScrollPositionGrid } from "./dataGrid-scrollPositionGrid/dataGrid-scrollPositionGrid";
import { dataGridScrollPositionGridDescription } from "./dataGrid-scrollPositionGrid/description";
import { dataGridScrollPositionGridRecipe } from "./dataGrid-scrollPositionGrid/recipe";
import { DataGridSelectionBasedGrid } from "./dataGrid-selectionBasedGrid/dataGrid-selectionBasedGrid";
import { dataGridSelectionBasedGridDescription } from "./dataGrid-selectionBasedGrid/description";
import { dataGridSelectionBasedGridRecipe } from "./dataGrid-selectionBasedGrid/recipe";
import { DataGridSortingGrid } from "./dataGrid-sortingGrid/dataGrid-sortingGrid";
import { dataGridSortingGridDescription } from "./dataGrid-sortingGrid/description";
import { dataGridSortingGridRecipe } from "./dataGrid-sortingGrid/recipe";
import { DataGridStylingGrid } from "./dataGrid-stylingGrid/dataGrid-stylingGrid";
import { dataGridStylingGridDescription } from "./dataGrid-stylingGrid/description";
import { dataGridStylingGridRecipe } from "./dataGrid-stylingGrid/recipe";
import { DataGridTemplateGrid } from "./dataGrid-templateGrid/dataGrid-templateGrid";
import { dataGridTemplateGridDescription } from "./dataGrid-templateGrid/description";
import { dataGridTemplateGridRecipe } from "./dataGrid-templateGrid/recipe";
import { RowExpanderDataGridCollectionRowExpander } from "./rowExpanderDataGrid-collectionRowExpander/rowExpanderDataGrid-collectionRowExpander";
import { rowExpanderDataGridCollectionRowExpanderDescription } from "./rowExpanderDataGrid-collectionRowExpander/description";
import { rowExpanderDataGridCollectionRowExpanderRecipe } from "./rowExpanderDataGrid-collectionRowExpander/recipe";
import { RowExpanderDataGridDataGridRowExpander } from "./rowExpanderDataGrid-dataGridRowExpander/rowExpanderDataGrid-dataGridRowExpander";
import { rowExpanderDataGridDataGridRowExpanderDescription } from "./rowExpanderDataGrid-dataGridRowExpander/description";
import { rowExpanderDataGridDataGridRowExpanderRecipe } from "./rowExpanderDataGrid-dataGridRowExpander/recipe";
import { RowExpanderDataGridDataGridRowExpanderDataProvider } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/rowExpanderDataGrid-dataGridRowExpanderDataProvider";
import { rowExpanderDataGridDataGridRowExpanderDataProviderDescription } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/description";
import { rowExpanderDataGridDataGridRowExpanderDataProviderRecipe } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/recipe";
import { RowExpanderDataGridDataGridRowExpanderExpand } from "./rowExpanderDataGrid-dataGridRowExpanderExpand/rowExpanderDataGrid-dataGridRowExpanderExpand";
import { rowExpanderDataGridDataGridRowExpanderExpandDescription } from "./rowExpanderDataGrid-dataGridRowExpanderExpand/description";
import { rowExpanderDataGridDataGridRowExpanderExpandRecipe } from "./rowExpanderDataGrid-dataGridRowExpanderExpand/recipe";
import { RowExpanderDataGridDataGridRowExpanderExpandAll } from "./rowExpanderDataGrid-dataGridRowExpanderExpandAll/rowExpanderDataGrid-dataGridRowExpanderExpandAll";
import { rowExpanderDataGridDataGridRowExpanderExpandAllDescription } from "./rowExpanderDataGrid-dataGridRowExpanderExpandAll/description";
import { rowExpanderDataGridDataGridRowExpanderExpandAllRecipe } from "./rowExpanderDataGrid-dataGridRowExpanderExpandAll/recipe";
import { RowExpanderDataGridEditableDataGridRowExpander } from "./rowExpanderDataGrid-editableDataGridRowExpander/rowExpanderDataGrid-editableDataGridRowExpander";
import { rowExpanderDataGridEditableDataGridRowExpanderDescription } from "./rowExpanderDataGrid-editableDataGridRowExpander/description";
import { rowExpanderDataGridEditableDataGridRowExpanderRecipe } from "./rowExpanderDataGrid-editableDataGridRowExpander/recipe";
import { RowExpanderDataGridVirtualRowExpander } from "./rowExpanderDataGrid-virtualRowExpander/rowExpanderDataGrid-virtualRowExpander";
import { rowExpanderDataGridVirtualRowExpanderDescription } from "./rowExpanderDataGrid-virtualRowExpander/description";
import { rowExpanderDataGridVirtualRowExpanderRecipe } from "./rowExpanderDataGrid-virtualRowExpander/recipe";

const dataGridItems = [
  {
    id: "overview",
    name: "Overview",
    description: dataGridOverViewDescription,
    recipe: dataGridOverViewRecipe,
    Component: DataGridOverView,
  },
  {
    id: "templates",
    name: "Cell Templates",
    description: dataGridTemplateGridDescription,
    recipe: dataGridTemplateGridRecipe,
    Component: DataGridTemplateGrid,
  },
  {
    id: "styling",
    name: "Styling",
    description: dataGridStylingGridDescription,
    recipe: dataGridStylingGridRecipe,
    Component: DataGridStylingGrid,
  },
  {
    id: "sorting",
    name: "Sorting",
    description: dataGridSortingGridDescription,
    recipe: dataGridSortingGridRecipe,
    Component: DataGridSortingGrid,
  },
  {
    id: "selection",
    name: "Selection",
    description: dataGridSelectionBasedGridDescription,
    recipe: dataGridSelectionBasedGridRecipe,
    Component: DataGridSelectionBasedGrid,
  },
  {
    id: "header-tooltips",
    name: "Header Tooltips",
    description: dataGridHeaderTooltipsDescription,
    recipe: dataGridHeaderTooltipsRecipe,
    Component: DataGridHeaderTooltips,
  },
  {
    id: "hide-axis",
    name: "Hide Axis",
    description: dataGridHideAxisGridDescription,
    recipe: dataGridHideAxisGridRecipe,
    Component: DataGridHideAxisGrid,
  },
  {
    id: "no-data-state",
    name: "No Data State",
    description: dataGridNoDataStateGridDescription,
    recipe: dataGridNoDataStateGridRecipe,
    Component: DataGridNoDataStateGrid,
  },
  {
    id: "data-regions",
    name: "Data Regions",
    description: dataGridDataRegionsGridDescription,
    recipe: dataGridDataRegionsGridRecipe,
    Component: DataGridDataRegionsGrid,
  },
  {
    id: "scroll-position",
    name: "Scroll Position",
    description: dataGridScrollPositionGridDescription,
    recipe: dataGridScrollPositionGridRecipe,
    Component: DataGridScrollPositionGrid,
  },
  {
    id: "resizing",
    name: "Resizing",
    description: dataGridResizingDescription,
    recipe: dataGridResizingRecipe,
    Component: DataGridResizing,
  },
  {
    id: "freeze",
    name: "Freeze",
    description: dataGridFreezeGridDescription,
    recipe: dataGridFreezeGridRecipe,
    Component: DataGridFreezeGrid,
  },
  {
    id: "merge-cells",
    name: "Merge Cells",
    description: dataGridMergeCellsGridDescription,
    recipe: dataGridMergeCellsGridRecipe,
    Component: DataGridMergeCellsGrid,
  },
  {
    id: "expand-headers",
    name: "Expand Headers",
    description: dataGridExpandHeadersDescription,
    recipe: dataGridExpandHeadersRecipe,
    Component: DataGridExpandHeaders,
  },
  {
    id: "filter",
    name: "Filtering",
    description: dataGridFilterGridDescription,
    recipe: dataGridFilterGridRecipe,
    Component: DataGridFilterGrid,
  },
  {
    id: "drag-and-drop",
    name: "Drag and Drop",
    description: dataGridDragAndDropGridDescription,
    recipe: dataGridDragAndDropGridRecipe,
    Component: DataGridDragAndDropGrid,
  },
  {
    id: "data-transfer",
    name: "Data Transfer",
    description: dataGridDataTransferGridDescription,
    recipe: dataGridDataTransferGridRecipe,
    Component: DataGridDataTransferGrid,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: dataGridCustomContextMenuGridDescription,
    recipe: dataGridCustomContextMenuGridRecipe,
    Component: DataGridCustomContextMenuGrid,
  },
  {
    id: "editable",
    name: "Editable Grid",
    description: dataGridAdvancedEditableGridDescription,
    recipe: dataGridAdvancedEditableGridRecipe,
    Component: DataGridAdvancedEditableGrid,
  },
  {
    id: "crud",
    name: "CRUD",
    description: dataGridCrudGridDescription,
    recipe: dataGridCrudGridRecipe,
    Component: DataGridCrudGrid,
  },
  {
    id: "performance",
    name: "Performance",
    description: dataGridPerformanceGridDescription,
    recipe: dataGridPerformanceGridRecipe,
    Component: DataGridPerformanceGrid,
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: dataGridProgressiveLoadingDescription,
    recipe: dataGridProgressiveLoadingRecipe,
    Component: DataGridProgressiveLoading,
  },
  {
    id: "pivot",
    name: "Pivot",
    description: dataGridPivotDescription,
    recipe: dataGridPivotRecipe,
    Component: DataGridPivot,
  },
  {
    id: "alignment",
    name: "Alignment",
    description: dataGridAlignmentDescription,
    recipe: dataGridAlignmentRecipe,
    Component: DataGridAlignment,
  },
  {
    id: "row-expander",
    name: "Row Expander",
    description: rowExpanderDataGridDataGridRowExpanderDescription,
    recipe: rowExpanderDataGridDataGridRowExpanderRecipe,
    Component: RowExpanderDataGridDataGridRowExpander,
  },
  {
    id: "row-expander-data-provider",
    name: "Row Expander Data Provider",
    description: rowExpanderDataGridDataGridRowExpanderDataProviderDescription,
    recipe: rowExpanderDataGridDataGridRowExpanderDataProviderRecipe,
    Component: RowExpanderDataGridDataGridRowExpanderDataProvider,
  },
  {
    id: "row-expander-expand",
    name: "Row Expander Expanded",
    description: rowExpanderDataGridDataGridRowExpanderExpandDescription,
    recipe: rowExpanderDataGridDataGridRowExpanderExpandRecipe,
    Component: RowExpanderDataGridDataGridRowExpanderExpand,
  },
  {
    id: "row-expander-expand-all",
    name: "Row Expander Expand All",
    description: rowExpanderDataGridDataGridRowExpanderExpandAllDescription,
    recipe: rowExpanderDataGridDataGridRowExpanderExpandAllRecipe,
    Component: RowExpanderDataGridDataGridRowExpanderExpandAll,
  },
  {
    id: "collection-row-expander",
    name: "Collection Row Expander",
    description: rowExpanderDataGridCollectionRowExpanderDescription,
    recipe: rowExpanderDataGridCollectionRowExpanderRecipe,
    Component: RowExpanderDataGridCollectionRowExpander,
  },
  {
    id: "editable-row-expander",
    name: "Editable Row Expander",
    description: rowExpanderDataGridEditableDataGridRowExpanderDescription,
    recipe: rowExpanderDataGridEditableDataGridRowExpanderRecipe,
    Component: RowExpanderDataGridEditableDataGridRowExpander,
  },
  {
    id: "virtual-row-expander",
    name: "Virtual Row Expander",
    description: rowExpanderDataGridVirtualRowExpanderDescription,
    recipe: rowExpanderDataGridVirtualRowExpanderRecipe,
    Component: RowExpanderDataGridVirtualRowExpander,
  },
];

export default function DataGridRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Data grid examples"
      componentType="oj-data-grid"
      layoutId="dataGridNavigationLayout"
      items={dataGridItems}
      initialItemId="overview"
      navigationTitle="Data Grid"
    />
  );
}
