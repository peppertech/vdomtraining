import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import { AllKeySetImpl, KeySetImpl } from "ojs/ojkeyset";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";

import TreeViewContextMenuSource from "./treeView-contextMenu/treeView-contextMenu-source";
import TreeViewCrudSource from "./treeView-crud/treeView-crud-source";
import TreeViewDndSource from "./treeView-dnd/treeView-dnd-source";
import TreeViewDndReorderSource from "./treeView-dndReorder/treeView-dndReorder-source";
import TreeViewExpansionSource from "./treeView-expansion/treeView-expansion-source";
import TreeViewGroupingSource from "./treeView-grouping/treeView-grouping-source";
import TreeViewIconsSource from "./treeView-icons/treeView-icons-source";
import TreeViewJsonSource from "./treeView-json/treeView-json-source";
import TreeViewPerformanceSource from "./treeView-performance/treeView-performance-source";
import TreeViewProgressiveLoadTreeViewSource from "./treeView-progressiveLoadTreeView/treeView-progressiveLoadTreeView-source";
import TreeViewRendererSource from "./treeView-renderer/treeView-renderer-source";
import TreeViewSelectableSource from "./treeView-selectable/treeView-selectable-source";
import TreeViewSelectionSource from "./treeView-selection/treeView-selection-source";
import TreeViewContextMenuTreeViewDataSource from "./treeView-contextMenu/treeViewData-source";
import TreeViewCrudDemoSource from "./treeView-crud/demo-source";
import TreeViewCrudTreeViewDataSource from "../data/cookbook/dataprovider/bufferingTreeDataProvider/mutation/treeViewData-source";
import TreeViewDndDemoSource from "./treeView-dnd/demo-source";
import TreeViewDndTreeViewDataDragSource from "./treeView-dnd/treeViewDataDrag-source";
import TreeViewDndTreeViewDataDropSource from "./treeView-dnd/treeViewDataDrop-source";
import TreeViewDndReorderDemoSource from "./treeView-dndReorder/demo-source";
import TreeViewDndReorderTreeViewDataSource from "./treeView-dndReorder/treeViewData-source";
import TreeViewExpansionTreeViewDataSource from "./treeView-expansion/treeViewData-source";
import TreeViewGroupingDemoSource from "./treeView-grouping/demo-source";
import TreeViewJsonTreeViewDataSource from "./treeView-json/treeViewData-source";
import TreeViewPerformanceDemoSource from "./treeView-performance/demo-source";
import TreeViewProgressiveLoadTreeViewTreeViewDataSource from "./treeView-progressiveLoadTreeView/treeViewData-source";
import TreeViewRendererProjectDataSource from "./treeView-renderer/projectData-source";
import TreeViewSelectableTreeViewDataSource from "./treeView-selectable/treeViewData-source";
import TreeViewSelectionTreeViewDataSource from "./treeView-selection/treeViewData-source";

const runtimeBindings = { AllKeySetImpl, ArrayDataProvider, ArrayTreeDataProvider, KeySetImpl };

export const treeViewPlaygrounds: Record<string, PlaygroundConfig> = {
  "treeView-contextMenu": { initialSource: TreeViewContextMenuSource, fileName: "treeView-contextMenu.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "treeViewData.json", initialSource: TreeViewContextMenuTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-crud": { initialSource: TreeViewCrudSource, fileName: "treeView-crud.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: TreeViewCrudDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "treeViewData.json", initialSource: TreeViewCrudTreeViewDataSource, language: "json", importSpecifier: "text!../../data/cookbook/dataprovider/bufferingTreeDataProvider/mutation/treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-dnd": { initialSource: TreeViewDndSource, fileName: "treeView-dnd.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: TreeViewDndDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "treeViewDataDrag.json", initialSource: TreeViewDndTreeViewDataDragSource, language: "json", importSpecifier: "text!./treeViewDataDrag.json", bindingName: "jsonDragText", },
      { fileName: "treeViewDataDrop.json", initialSource: TreeViewDndTreeViewDataDropSource, language: "json", importSpecifier: "text!./treeViewDataDrop.json", bindingName: "jsonDropText", },
    ],
  },
  "treeView-dndReorder": { initialSource: TreeViewDndReorderSource, fileName: "treeView-dndReorder.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: TreeViewDndReorderDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "treeViewData.json", initialSource: TreeViewDndReorderTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-expansion": { initialSource: TreeViewExpansionSource, fileName: "treeView-expansion.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "treeViewData.json", initialSource: TreeViewExpansionTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-grouping": { initialSource: TreeViewGroupingSource, fileName: "treeView-grouping.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: TreeViewGroupingDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "treeView-icons": { initialSource: TreeViewIconsSource, fileName: "treeView-icons.tsx", runtimeBindings,
  },
  "treeView-json": { initialSource: TreeViewJsonSource, fileName: "treeView-json.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "treeViewData.json", initialSource: TreeViewJsonTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-performance": { initialSource: TreeViewPerformanceSource, fileName: "treeView-performance.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: TreeViewPerformanceDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "treeView-progressiveLoadTreeView": { initialSource: TreeViewProgressiveLoadTreeViewSource, fileName: "treeView-progressiveLoadTreeView.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "treeViewData.json", initialSource: TreeViewProgressiveLoadTreeViewTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-renderer": { initialSource: TreeViewRendererSource, fileName: "treeView-renderer.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "projectData.json", initialSource: TreeViewRendererProjectDataSource, language: "json", importSpecifier: "text!./projectData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-selectable": { initialSource: TreeViewSelectableSource, fileName: "treeView-selectable.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "treeViewData.json", initialSource: TreeViewSelectableTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
  "treeView-selection": { initialSource: TreeViewSelectionSource, fileName: "treeView-selection.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "treeViewData.json", initialSource: TreeViewSelectionTreeViewDataSource, language: "json", importSpecifier: "text!./treeViewData.json", bindingName: "jsonDataText", },
    ],
  },
};

