import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import { AllKeySetImpl, KeySetImpl } from "ojs/ojkeyset";
import { getContext } from "ojs/ojcontext";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";

import SelectorCheckboxLeafOnlyTreeViewSource from "./selector-checkboxLeafOnlyTreeView/selector-checkboxLeafOnlyTreeView-source";
import SelectorListviewCheckboxCardSource from "./selector-listviewCheckboxCard/selector-listviewCheckboxCard-source";
import SelectorPerformanceSelectorSource from "./selector-performanceSelector/selector-performanceSelector-source";
import TableSelectionTableSource from "./table-selectionTable/table-selectionTable-source";
import TreeViewSelectionSource from "./treeView-selection/treeView-selection-source";
import SelectorListviewCheckboxCardDemoSource from "./selector-listviewCheckboxCard/demo-source";
import SelectorPerformanceSelectorDemoSource from "./selector-performanceSelector/demo-source";
import TableSelectionTableDepartmentDataSource from "../data/cookbook/dataCollections/table/shared/departmentData-source";
import TreeViewSelectionTreeViewDataSource from "./treeView-selection/treeViewData-source";

const runtimeBindings = { AllKeySetImpl, ArrayDataProvider, ArrayTreeDataProvider, getContext, KeySetImpl };

export const selectorPlaygrounds: Record<string, PlaygroundConfig> = {
  "selector-checkboxLeafOnlyTreeView": { initialSource: SelectorCheckboxLeafOnlyTreeViewSource, fileName: "selector-checkboxLeafOnlyTreeView.tsx", runtimeBindings,
  },
  "selector-listviewCheckboxCard": { initialSource: SelectorListviewCheckboxCardSource, fileName: "selector-listviewCheckboxCard.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: SelectorListviewCheckboxCardDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "selector-performanceSelector": { initialSource: SelectorPerformanceSelectorSource, fileName: "selector-performanceSelector.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: SelectorPerformanceSelectorDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "table-selectionTable": { initialSource: TableSelectionTableSource, fileName: "table-selectionTable.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "departmentData.json", initialSource: TableSelectionTableDepartmentDataSource, language: "json", importSpecifier: "text!../../data/cookbook/dataCollections/table/shared/departmentData.json", bindingName: "deptData", },
    ],
  },
  "treeView-selection": { initialSource: TreeViewSelectionSource, fileName: "treeView-selection.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "treeViewData.json", initialSource: TreeViewSelectionTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
};

