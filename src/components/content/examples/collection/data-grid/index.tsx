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
import { RowExpanderDataGridDataGridRowExpanderDataProvider } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/rowExpanderDataGrid-dataGridRowExpanderDataProvider";
import { rowExpanderDataGridDataGridRowExpanderDataProviderDescription } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/description";
import { rowExpanderDataGridDataGridRowExpanderDataProviderRecipe } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/recipe";

const dataGridItems = [
  {
    id: "overview",
    name: "Overview",
    description: dataGridOverViewDescription,
    recipe: dataGridOverViewRecipe,
    Component: DataGridOverView,
  },
  {
    id: "expand-headers",
    name: "Nested Headers",
    description: dataGridExpandHeadersDescription,
    recipe: dataGridExpandHeadersRecipe,
    Component: DataGridExpandHeaders,
  },
  {
    id: "data-regions",
    name: "Data Regions",
    description: dataGridDataRegionsGridDescription,
    recipe: dataGridDataRegionsGridRecipe,
    Component: DataGridDataRegionsGrid,
  },
  {
    id: "freeze",
    name: "Freeze",
    description: dataGridFreezeGridDescription,
    recipe: dataGridFreezeGridRecipe,
    Component: DataGridFreezeGrid,
  },

  {
    id: "templates",
    name: "Templates",
    description: dataGridTemplateGridDescription,
    recipe: dataGridTemplateGridRecipe,
    Component: DataGridTemplateGrid,
  },
  {
    id: "alignment",
    name: "Alignment",
    description: dataGridAlignmentDescription,
    recipe: dataGridAlignmentRecipe,
    Component: DataGridAlignment,
  },
  {
    id: "styling",
    name: "Styling",
    description: dataGridStylingGridDescription,
    recipe: dataGridStylingGridRecipe,
    Component: DataGridStylingGrid,
  },
  {
    id: "selection",
    name: "Selection",
    description: dataGridSelectionBasedGridDescription,
    recipe: dataGridSelectionBasedGridRecipe,
    Component: DataGridSelectionBasedGrid,
  },
  {
    id: "sorting",
    name: "Sorting",
    description: dataGridSortingGridDescription,
    recipe: dataGridSortingGridRecipe,
    Component: DataGridSortingGrid,
  },
  {
    id: "filter",
    name: "Filtering",
    description: dataGridFilterGridDescription,
    recipe: dataGridFilterGridRecipe,
    Component: DataGridFilterGrid,
  },
  {
    id: "editable",
    name: "Editable Grid",
    description: dataGridAdvancedEditableGridDescription,
    recipe: dataGridAdvancedEditableGridRecipe,
    Component: DataGridAdvancedEditableGrid,
  },
  {
    id: "hide-axis",
    name: "Hide/Show",
    description: dataGridHideAxisGridDescription,
    recipe: dataGridHideAxisGridRecipe,
    Component: DataGridHideAxisGrid,
  },
  {
    id: "crud",
    name: "CRUD",
    description: dataGridCrudGridDescription,
    recipe: dataGridCrudGridRecipe,
    Component: DataGridCrudGrid,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: dataGridCustomContextMenuGridDescription,
    recipe: dataGridCustomContextMenuGridRecipe,
    Component: DataGridCustomContextMenuGrid,
  },
  {
    id: "resizing",
    name: "Resizing",
    description: dataGridResizingDescription,
    recipe: dataGridResizingRecipe,
    Component: DataGridResizing,
  },
  {
    id: "merge-cells",
    name: "Merge Cells",
    description: dataGridMergeCellsGridDescription,
    recipe: dataGridMergeCellsGridRecipe,
    Component: DataGridMergeCellsGrid,
  },
  {
    id: "scroll-position",
    name: "Scroll Position",
    description: dataGridScrollPositionGridDescription,
    recipe: dataGridScrollPositionGridRecipe,
    Component: DataGridScrollPositionGrid,
  },

  {
    id: "performance",
    name: "Performance",
    description: dataGridPerformanceGridDescription,
    recipe: dataGridPerformanceGridRecipe,
    Component: DataGridPerformanceGrid,
  },
  {
    id: "row-expander",
    name: "Expand/Collapse",
    description: rowExpanderDataGridDataGridRowExpanderDataProviderDescription,
    recipe: rowExpanderDataGridDataGridRowExpanderDataProviderRecipe,
    Component: RowExpanderDataGridDataGridRowExpanderDataProvider,
  },
  {
    id: "data-transfer",
    name: "Data Transfer",
    description: dataGridDataTransferGridDescription,
    recipe: dataGridDataTransferGridRecipe,
    Component: DataGridDataTransferGrid,
  },
  {
    id: "drag-and-drop",
    name: "Drag & Drop Reorder",
    description: dataGridDragAndDropGridDescription,
    recipe: dataGridDragAndDropGridRecipe,
    Component: DataGridDragAndDropGrid,
  },
  {
    id: "no-data-state",
    name: "No Data",
    description: dataGridNoDataStateGridDescription,
    recipe: dataGridNoDataStateGridRecipe,
    Component: DataGridNoDataStateGrid,
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: dataGridProgressiveLoadingDescription,
    recipe: dataGridProgressiveLoadingRecipe,
    Component: DataGridProgressiveLoading,
  },
  {
    id: "header-tooltips",
    name: "Header Tooltips",
    description: dataGridHeaderTooltipsDescription,
    recipe: dataGridHeaderTooltipsRecipe,
    Component: DataGridHeaderTooltips,
  },
  {
    id: "pivot",
    name: "Pivot Grid",
    description: dataGridPivotDescription,
    recipe: dataGridPivotRecipe,
    Component: DataGridPivot,
  }
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
