import 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { RowDataGridProvider } from "ojs/ojrowdatagridprovider";
import { render } from "preact";
import { RecipePageTemplate, type RecipePageItem } from "../../../../shared/demo-page-layout/recipe-page-template";
import DataGridAdvancedEditableGrid from "./dataGrid-advancedEditableGrid/dataGrid-advancedEditableGrid";
import { dataGridAdvancedEditableGridDescription } from "./dataGrid-advancedEditableGrid/description";
import { dataGridAdvancedEditableGridRecipe } from "./dataGrid-advancedEditableGrid/recipe";
import DataGridAlignment from "./dataGrid-alignment/dataGrid-alignment";
import { dataGridAlignmentDescription } from "./dataGrid-alignment/description";
import { dataGridAlignmentRecipe } from "./dataGrid-alignment/recipe";
import DataGridCrudGrid from "./dataGrid-crudGrid/dataGrid-crudGrid";
import { dataGridCrudGridDescription } from "./dataGrid-crudGrid/description";
import { dataGridCrudGridRecipe } from "./dataGrid-crudGrid/recipe";
import DataGridCustomContextMenuGrid from "./dataGrid-customContextMenuGrid/dataGrid-customContextMenuGrid";
import { dataGridCustomContextMenuGridDescription } from "./dataGrid-customContextMenuGrid/description";
import { dataGridCustomContextMenuGridRecipe } from "./dataGrid-customContextMenuGrid/recipe";
import DataGridDataRegionsGrid from "./dataGrid-dataRegionsGrid/dataGrid-dataRegionsGrid";
import { dataGridDataRegionsGridDescription } from "./dataGrid-dataRegionsGrid/description";
import { dataGridDataRegionsGridRecipe } from "./dataGrid-dataRegionsGrid/recipe";
import DataGridDataTransferGrid from "./dataGrid-dataTransferGrid/dataGrid-dataTransferGrid";
import { dataGridDataTransferGridDescription } from "./dataGrid-dataTransferGrid/description";
import { dataGridDataTransferGridRecipe } from "./dataGrid-dataTransferGrid/recipe";
import DataGridDragAndDropGrid from "./dataGrid-dragAndDropGrid/dataGrid-dragAndDropGrid";
import { dataGridDragAndDropGridDescription } from "./dataGrid-dragAndDropGrid/description";
import { dataGridDragAndDropGridRecipe } from "./dataGrid-dragAndDropGrid/recipe";
import DataGridExpandHeaders from "./dataGrid-expandHeaders/dataGrid-expandHeaders";
import { dataGridExpandHeadersDescription } from "./dataGrid-expandHeaders/description";
import { dataGridExpandHeadersRecipe } from "./dataGrid-expandHeaders/recipe";
import DataGridFilterGrid from "./dataGrid-filterGrid/dataGrid-filterGrid";
import { dataGridFilterGridDescription } from "./dataGrid-filterGrid/description";
import { dataGridFilterGridRecipe } from "./dataGrid-filterGrid/recipe";
import DataGridFreezeGrid from "./dataGrid-freezeGrid/dataGrid-freezeGrid";
import { dataGridFreezeGridDescription } from "./dataGrid-freezeGrid/description";
import { dataGridFreezeGridRecipe } from "./dataGrid-freezeGrid/recipe";
import DataGridHeaderTooltips from "./dataGrid-headerTooltips/dataGrid-headerTooltips";
import { dataGridHeaderTooltipsDescription } from "./dataGrid-headerTooltips/description";
import { dataGridHeaderTooltipsRecipe } from "./dataGrid-headerTooltips/recipe";
import DataGridHideAxisGrid from "./dataGrid-hideAxisGrid/dataGrid-hideAxisGrid";
import { dataGridHideAxisGridDescription } from "./dataGrid-hideAxisGrid/description";
import { dataGridHideAxisGridRecipe } from "./dataGrid-hideAxisGrid/recipe";
import DataGridMergeCellsGrid from "./dataGrid-mergeCellsGrid/dataGrid-mergeCellsGrid";
import { dataGridMergeCellsGridDescription } from "./dataGrid-mergeCellsGrid/description";
import { dataGridMergeCellsGridRecipe } from "./dataGrid-mergeCellsGrid/recipe";
import DataGridNoDataStateGrid from "./dataGrid-noDataStateGrid/dataGrid-noDataStateGrid";
import { dataGridNoDataStateGridDescription } from "./dataGrid-noDataStateGrid/description";
import { dataGridNoDataStateGridRecipe } from "./dataGrid-noDataStateGrid/recipe";
import DataGridOverView from "./dataGrid-overView/dataGrid-overView";
import { dataGridOverViewDescription } from "./dataGrid-overView/description";
import { dataGridOverViewRecipe } from "./dataGrid-overView/recipe";
import DataGridPerformanceGrid from "./dataGrid-performanceGrid/dataGrid-performanceGrid";
import { dataGridPerformanceGridDescription } from "./dataGrid-performanceGrid/description";
import { dataGridPerformanceGridRecipe } from "./dataGrid-performanceGrid/recipe";
import DataGridPivot from "./dataGrid-pivot/dataGrid-pivot";
import { dataGridPivotDescription } from "./dataGrid-pivot/description";
import { dataGridPivotRecipe } from "./dataGrid-pivot/recipe";
import DataGridProgressiveLoading from "./dataGrid-progressiveLoading/dataGrid-progressiveLoading";
import { dataGridProgressiveLoadingDescription } from "./dataGrid-progressiveLoading/description";
import { dataGridProgressiveLoadingRecipe } from "./dataGrid-progressiveLoading/recipe";
import DataGridResizing from "./dataGrid-resizing/dataGrid-resizing";
import { dataGridResizingDescription } from "./dataGrid-resizing/description";
import { dataGridResizingRecipe } from "./dataGrid-resizing/recipe";
import DataGridScrollPositionGrid from "./dataGrid-scrollPositionGrid/dataGrid-scrollPositionGrid";
import { dataGridScrollPositionGridDescription } from "./dataGrid-scrollPositionGrid/description";
import { dataGridScrollPositionGridRecipe } from "./dataGrid-scrollPositionGrid/recipe";
import DataGridSelectionBasedGrid from "./dataGrid-selectionBasedGrid/dataGrid-selectionBasedGrid";
import { dataGridSelectionBasedGridDescription } from "./dataGrid-selectionBasedGrid/description";
import { dataGridSelectionBasedGridRecipe } from "./dataGrid-selectionBasedGrid/recipe";
import DataGridSortingGrid from "./dataGrid-sortingGrid/dataGrid-sortingGrid";
import { dataGridSortingGridDescription } from "./dataGrid-sortingGrid/description";
import { dataGridSortingGridRecipe } from "./dataGrid-sortingGrid/recipe";
import DataGridStylingGrid from "./dataGrid-stylingGrid/dataGrid-stylingGrid";
import { dataGridStylingGridDescription } from "./dataGrid-stylingGrid/description";
import { dataGridStylingGridRecipe } from "./dataGrid-stylingGrid/recipe";
import DataGridTemplateGrid from "./dataGrid-templateGrid/dataGrid-templateGrid";
import { dataGridTemplateGridDescription } from "./dataGrid-templateGrid/description";
import { dataGridTemplateGridRecipe } from "./dataGrid-templateGrid/recipe";
import { rowExpanderDataGridDataGridRowExpanderDataProviderDescription } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/description";
import { rowExpanderDataGridDataGridRowExpanderDataProviderRecipe } from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/recipe";
import RowExpanderDataGridDataGridRowExpanderDataProvider from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/rowExpanderDataGrid-dataGridRowExpanderDataProvider";

import DataGridAdvancedEditableGridSource from "./dataGrid-advancedEditableGrid/dataGrid-advancedEditableGrid-source";
import DataGridAdvancedEditableGridDemoSource from "./dataGrid-advancedEditableGrid/demo-source";
import DataGridAdvancedEditableGridCustomersSource from "./dataGrid-advancedEditableGrid/customers-source";
import DataGridAlignmentSource from "./dataGrid-alignment/dataGrid-alignment-source";
import DataGridAlignmentDemoSource from "./dataGrid-alignment/demo-source";
import DataGridCrudGridSource from "./dataGrid-crudGrid/dataGrid-crudGrid-source";
import DataGridCrudGridDemoSource from "./dataGrid-crudGrid/demo-source";
import DataGridCrudGridPopulationSource from "./dataGrid-crudGrid/population-source";
import DataGridCustomContextMenuGridSource from "./dataGrid-customContextMenuGrid/dataGrid-customContextMenuGrid-source";
import DataGridCustomContextMenuGridDemoSource from "./dataGrid-customContextMenuGrid/demo-source";
import DataGridCustomContextMenuGridCustomersSource from "./dataGrid-customContextMenuGrid/customers-source";
import DataGridDataRegionsGridSource from "./dataGrid-dataRegionsGrid/dataGrid-dataRegionsGrid-source";
import DataGridDataRegionsGridDemoSource from "./dataGrid-dataRegionsGrid/demo-source";
import DataGridDataTransferGridSource from "./dataGrid-dataTransferGrid/dataGrid-dataTransferGrid-source";
import DataGridDataTransferGridDemoSource from "./dataGrid-dataTransferGrid/demo-source";
import DataGridDataTransferGridPopulationSource from "./dataGrid-dataTransferGrid/population-source";
import DataGridDragAndDropGridSource from "./dataGrid-dragAndDropGrid/dataGrid-dragAndDropGrid-source";
import DataGridDragAndDropGridDemoSource from "./dataGrid-dragAndDropGrid/demo-source";
import DataGridDragAndDropGridPopulationSource from "./dataGrid-dragAndDropGrid/population-source";
import DataGridExpandHeadersSource from "./dataGrid-expandHeaders/dataGrid-expandHeaders-source";
import DataGridExpandHeadersDemoSource from "./dataGrid-expandHeaders/demo-source";
import DataGridExpandHeadersPopulationSource from "./dataGrid-expandHeaders/population-source";
import DataGridFilterGridSource from "./dataGrid-filterGrid/dataGrid-filterGrid-source";
import DataGridFilterGridDemoSource from "./dataGrid-filterGrid/demo-source";
import DataGridFilterGridPopulationSource from "./dataGrid-filterGrid/population-source";
import DataGridFreezeGridSource from "./dataGrid-freezeGrid/dataGrid-freezeGrid-source";
import DataGridFreezeGridDemoSource from "./dataGrid-freezeGrid/demo-source";
import DataGridFreezeGridPopulationSource from "./dataGrid-freezeGrid/population-source";
import DataGridHeaderTooltipsSource from "./dataGrid-headerTooltips/dataGrid-headerTooltips-source";
import DataGridHeaderTooltipsDemoSource from "./dataGrid-headerTooltips/demo-source";
import DataGridHeaderTooltipsEmployeePerformanceSource from "./dataGrid-headerTooltips/employeePerformance-source";
import DataGridHideAxisGridSource from "./dataGrid-hideAxisGrid/dataGrid-hideAxisGrid-source";
import DataGridHideAxisGridDemoSource from "./dataGrid-hideAxisGrid/demo-source";
import DataGridHideAxisGridCustomersSource from "./dataGrid-hideAxisGrid/customers-source";
import DataGridMergeCellsGridSource from "./dataGrid-mergeCellsGrid/dataGrid-mergeCellsGrid-source";
import DataGridMergeCellsGridDemoSource from "./dataGrid-mergeCellsGrid/demo-source";
import DataGridNoDataStateGridSource from "./dataGrid-noDataStateGrid/dataGrid-noDataStateGrid-source";
import DataGridNoDataStateGridDemoSource from "./dataGrid-noDataStateGrid/demo-source";
import DataGridOverViewSource from "./dataGrid-overView/dataGrid-overView-source";
import DataGridOverViewDemoSource from "./dataGrid-overView/demo-source";
import DataGridOverViewPopulationSource from "./dataGrid-overView/population-source";
import DataGridPerformanceGridSource from "./dataGrid-performanceGrid/dataGrid-performanceGrid-source";
import DataGridPerformanceGridDemoSource from "./dataGrid-performanceGrid/demo-source";
import DataGridPivotSource from "./dataGrid-pivot/dataGrid-pivot-source";
import DataGridPivotDemoSource from "./dataGrid-pivot/demo-source";
import DataGridPivotStateRegionsSource from "./dataGrid-pivot/stateRegions-source";
import DataGridProgressiveLoadingSource from "./dataGrid-progressiveLoading/dataGrid-progressiveLoading-source";
import DataGridProgressiveLoadingDemoSource from "./dataGrid-progressiveLoading/demo-source";
import DataGridResizingSource from "./dataGrid-resizing/dataGrid-resizing-source";
import DataGridResizingDemoSource from "./dataGrid-resizing/demo-source";
import DataGridResizingCustomersSource from "./dataGrid-resizing/customers-source";
import DataGridScrollPositionGridSource from "./dataGrid-scrollPositionGrid/dataGrid-scrollPositionGrid-source";
import DataGridScrollPositionGridDemoSource from "./dataGrid-scrollPositionGrid/demo-source";
import DataGridSelectionBasedGridSource from "./dataGrid-selectionBasedGrid/dataGrid-selectionBasedGrid-source";
import DataGridSelectionBasedGridDemoSource from "./dataGrid-selectionBasedGrid/demo-source";
import DataGridSelectionBasedGridCustomersSource from "./dataGrid-selectionBasedGrid/customers-source";
import DataGridSortingGridSource from "./dataGrid-sortingGrid/dataGrid-sortingGrid-source";
import DataGridSortingGridDemoSource from "./dataGrid-sortingGrid/demo-source";
import DataGridSortingGridPopulationSource from "./dataGrid-sortingGrid/population-source";
import DataGridStylingGridSource from "./dataGrid-stylingGrid/dataGrid-stylingGrid-source";
import DataGridStylingGridDemoSource from "./dataGrid-stylingGrid/demo-source";
import DataGridStylingGridCustomersSource from "./dataGrid-stylingGrid/customers-source";
import DataGridTemplateGridSource from "./dataGrid-templateGrid/dataGrid-templateGrid-source";
import DataGridTemplateGridDemoSource from "./dataGrid-templateGrid/demo-source";
import DataGridTemplateGridCustomersSource from "./dataGrid-templateGrid/customers-source";
import RowExpanderDataGridDataGridRowExpanderDataProviderSource from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/rowExpanderDataGrid-dataGridRowExpanderDataProvider-source";
import RowExpanderDataGridDataGridRowExpanderDataProviderDemoSource from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/demo-source";
import RowExpanderDataGridDataGridRowExpanderDataProviderHierarchicalPopulationSource from "./rowExpanderDataGrid-dataGridRowExpanderDataProvider/hierarchicalPopulation-source";

const dataGridItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: dataGridOverViewDescription,
    recipe: dataGridOverViewRecipe,
    Component: DataGridOverView,
    playground: {
      initialSource: DataGridOverViewSource,
      fileName: "dataGrid-overView.tsx",
      runtimeBindings: { ArrayDataProvider, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridOverViewDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridOverViewPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "expand-headers",
    name: "Nested Headers",
    description: dataGridExpandHeadersDescription,
    recipe: dataGridExpandHeadersRecipe,
    Component: DataGridExpandHeaders,
    playground: {
      initialSource: DataGridExpandHeadersSource,
      fileName: "dataGrid-expandHeaders.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridExpandHeadersDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridExpandHeadersPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "data-regions",
    name: "Data Regions",
    description: dataGridDataRegionsGridDescription,
    recipe: dataGridDataRegionsGridRecipe,
    Component: DataGridDataRegionsGrid,
    playground: {
      initialSource: DataGridDataRegionsGridSource,
      fileName: "dataGrid-dataRegionsGrid.tsx",
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridDataRegionsGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      }
      ],
    },
  },
  {
    id: "freeze",
    name: "Freeze",
    description: dataGridFreezeGridDescription,
    recipe: dataGridFreezeGridRecipe,
    Component: DataGridFreezeGrid,
    playground: {
      initialSource: DataGridFreezeGridSource,
      fileName: "dataGrid-freezeGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridFreezeGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridFreezeGridPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },

  {
    id: "templates",
    name: "Templates",
    description: dataGridTemplateGridDescription,
    recipe: dataGridTemplateGridRecipe,
    Component: DataGridTemplateGrid,
    playground: {
      initialSource: DataGridTemplateGridSource,
      fileName: "dataGrid-templateGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlDateTimeConverter, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridTemplateGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "customers.json",
        initialSource: DataGridTemplateGridCustomersSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "alignment",
    name: "Alignment",
    description: dataGridAlignmentDescription,
    recipe: dataGridAlignmentRecipe,
    Component: DataGridAlignment,
    playground: {
      initialSource: DataGridAlignmentSource,
      fileName: "dataGrid-alignment.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridAlignmentDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      }
      ],
    },
  },
  {
    id: "styling",
    name: "Styling",
    description: dataGridStylingGridDescription,
    recipe: dataGridStylingGridRecipe,
    Component: DataGridStylingGrid,
    playground: {
      initialSource: DataGridStylingGridSource,
      fileName: "dataGrid-stylingGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlDateTimeConverter, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridStylingGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "customers.json",
        initialSource: DataGridStylingGridCustomersSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "selection",
    name: "Selection",
    description: dataGridSelectionBasedGridDescription,
    recipe: dataGridSelectionBasedGridRecipe,
    Component: DataGridSelectionBasedGrid,
    playground: {
      initialSource: DataGridSelectionBasedGridSource,
      fileName: "dataGrid-selectionBasedGrid.tsx",
      runtimeBindings: { ArrayDataProvider, ArrayTreeDataProvider, IntlDateTimeConverter, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridSelectionBasedGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "customers.json",
        initialSource: DataGridSelectionBasedGridCustomersSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "sorting",
    name: "Sorting",
    description: dataGridSortingGridDescription,
    recipe: dataGridSortingGridRecipe,
    Component: DataGridSortingGrid,
    playground: {
      initialSource: DataGridSortingGridSource,
      fileName: "dataGrid-sortingGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridSortingGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridSortingGridPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "filter",
    name: "Filtering",
    description: dataGridFilterGridDescription,
    recipe: dataGridFilterGridRecipe,
    Component: DataGridFilterGrid,
    playground: {
      initialSource: DataGridFilterGridSource,
      fileName: "dataGrid-filterGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridFilterGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridFilterGridPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "editable",
    name: "Editable Grid",
    description: dataGridAdvancedEditableGridDescription,
    recipe: dataGridAdvancedEditableGridRecipe,
    Component: DataGridAdvancedEditableGrid,
    playground: {
      initialSource: DataGridAdvancedEditableGridSource,
      fileName: "dataGrid-advancedEditableGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlDateTimeConverter, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridAdvancedEditableGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "customers.json",
        initialSource: DataGridAdvancedEditableGridCustomersSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "hide-axis",
    name: "Hide/Show",
    description: dataGridHideAxisGridDescription,
    recipe: dataGridHideAxisGridRecipe,
    Component: DataGridHideAxisGrid,
    playground: {
      initialSource: DataGridHideAxisGridSource,
      fileName: "dataGrid-hideAxisGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlDateTimeConverter, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridHideAxisGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "customers.json",
        initialSource: DataGridHideAxisGridCustomersSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "crud",
    name: "CRUD",
    description: dataGridCrudGridDescription,
    recipe: dataGridCrudGridRecipe,
    Component: DataGridCrudGrid,
    playground: {
      initialSource: DataGridCrudGridSource,
      fileName: "dataGrid-crudGrid.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridCrudGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridCrudGridPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: dataGridCustomContextMenuGridDescription,
    recipe: dataGridCustomContextMenuGridRecipe,
    Component: DataGridCustomContextMenuGrid,
    playground: {
      initialSource: DataGridCustomContextMenuGridSource,
      fileName: "dataGrid-customContextMenuGrid.tsx",
      runtimeBindings: { ArrayDataProvider, IntlDateTimeConverter, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridCustomContextMenuGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "customers.json",
        initialSource: DataGridCustomContextMenuGridCustomersSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "resizing",
    name: "Resizing",
    description: dataGridResizingDescription,
    recipe: dataGridResizingRecipe,
    Component: DataGridResizing,
    playground: {
      initialSource: DataGridResizingSource,
      fileName: "dataGrid-resizing.tsx",
      runtimeBindings: { ArrayDataProvider, IntlDateTimeConverter, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridResizingDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "customers.json",
        initialSource: DataGridResizingCustomersSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "merge-cells",
    name: "Merge Cells",
    description: dataGridMergeCellsGridDescription,
    recipe: dataGridMergeCellsGridRecipe,
    Component: DataGridMergeCellsGrid,
    playground: {
      initialSource: DataGridMergeCellsGridSource,
      fileName: "dataGrid-mergeCellsGrid.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridMergeCellsGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      }
      ],
    },
  },
  {
    id: "scroll-position",
    name: "Scroll Position",
    description: dataGridScrollPositionGridDescription,
    recipe: dataGridScrollPositionGridRecipe,
    Component: DataGridScrollPositionGrid,
    playground: {
      initialSource: DataGridScrollPositionGridSource,
      fileName: "dataGrid-scrollPositionGrid.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridScrollPositionGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      }
      ],
    },
  },

  {
    id: "performance",
    name: "Performance",
    description: dataGridPerformanceGridDescription,
    recipe: dataGridPerformanceGridRecipe,
    Component: DataGridPerformanceGrid,
    playground: {
      initialSource: DataGridPerformanceGridSource,
      fileName: "dataGrid-performanceGrid.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridPerformanceGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      }
      ],
    },
  },
  {
    id: "row-expander",
    name: "Expand/Collapse",
    description: rowExpanderDataGridDataGridRowExpanderDataProviderDescription,
    recipe: rowExpanderDataGridDataGridRowExpanderDataProviderRecipe,
    Component: RowExpanderDataGridDataGridRowExpanderDataProvider,
    playground: {
      initialSource: RowExpanderDataGridDataGridRowExpanderDataProviderSource,
      fileName: "rowExpanderDataGrid-dataGridRowExpanderDataProvider.tsx",
      runtimeBindings: { render },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: RowExpanderDataGridDataGridRowExpanderDataProviderDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "hierarchicalPopulation.json",
        initialSource: RowExpanderDataGridDataGridRowExpanderDataProviderHierarchicalPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/hierarchicalPopulation.json",
        bindingName: "jsonDataStr",
      }
      ],
    },
  },
  {
    id: "data-transfer",
    name: "Data Transfer",
    description: dataGridDataTransferGridDescription,
    recipe: dataGridDataTransferGridRecipe,
    Component: DataGridDataTransferGrid,
    playground: {
      initialSource: DataGridDataTransferGridSource,
      fileName: "dataGrid-dataTransferGrid.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridDataTransferGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridDataTransferGridPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "drag-and-drop",
    name: "Drag & Drop Reorder",
    description: dataGridDragAndDropGridDescription,
    recipe: dataGridDragAndDropGridRecipe,
    Component: DataGridDragAndDropGrid,
    playground: {
      initialSource: DataGridDragAndDropGridSource,
      fileName: "dataGrid-dragAndDropGrid.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridDragAndDropGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "population.json",
        initialSource: DataGridDragAndDropGridPopulationSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/population.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "no-data-state",
    name: "No Data",
    description: dataGridNoDataStateGridDescription,
    recipe: dataGridNoDataStateGridRecipe,
    Component: DataGridNoDataStateGrid,
    playground: {
      initialSource: DataGridNoDataStateGridSource,
      fileName: "dataGrid-noDataStateGrid.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridNoDataStateGridDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      }
      ],
    },
  },
  {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: dataGridProgressiveLoadingDescription,
    recipe: dataGridProgressiveLoadingRecipe,
    Component: DataGridProgressiveLoading,
    playground: {
      initialSource: DataGridProgressiveLoadingSource,
      fileName: "dataGrid-progressiveLoading.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridProgressiveLoadingDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      }
      ],
    },
  },
  {
    id: "header-tooltips",
    name: "Header Tooltips",
    description: dataGridHeaderTooltipsDescription,
    recipe: dataGridHeaderTooltipsRecipe,
    Component: DataGridHeaderTooltips,
    playground: {
      initialSource: DataGridHeaderTooltipsSource,
      fileName: "dataGrid-headerTooltips.tsx",
      runtimeBindings: { ArrayDataProvider, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridHeaderTooltipsDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "employeePerformance.json",
        initialSource: DataGridHeaderTooltipsEmployeePerformanceSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/employeePerformance.json",
        bindingName: "jsonDataText",
      }
      ],
    },
  },
  {
    id: "pivot",
    name: "Pivot Grid",
    description: dataGridPivotDescription,
    recipe: dataGridPivotRecipe,
    Component: DataGridPivot,
    playground: {
      initialSource: DataGridPivotSource,
      fileName: "dataGrid-pivot.tsx",
      runtimeBindings: { ArrayDataProvider, IntlNumberConverter, RowDataGridProvider },
      supportingFiles: [
      {
        fileName: "demo.css",
        initialSource: DataGridPivotDemoSource,
        language: "css",
        importSpecifier: "css!./demo.css",
      },
      {
        fileName: "stateRegions.json",
        initialSource: DataGridPivotStateRegionsSource,
        language: "json",
        importSpecifier: "text!../../data/cookbook/dataCollections/dataGrid/shared/stateRegions.json",
        bindingName: "jsonDataText",
      }
      ],
    },
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
