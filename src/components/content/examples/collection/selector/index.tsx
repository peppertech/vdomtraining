import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { listViewSelectionListViewDescription } from "../list-view/list-view-legacy/listView-selectionListView/description";
import { ListViewSelectionListView } from "../list-view/list-view-legacy/listView-selectionListView/listView-selectionListView";
import { listViewSelectionListViewRecipe } from "../list-view/list-view-legacy/listView-selectionListView/recipe";
import { selectorCheckboxLeafOnlyTreeViewDescription } from "./selector-checkboxLeafOnlyTreeView/description";
import { selectorCheckboxLeafOnlyTreeViewRecipe } from "./selector-checkboxLeafOnlyTreeView/recipe";
import { SelectorCheckboxLeafOnlyTreeView } from "./selector-checkboxLeafOnlyTreeView/selector-checkboxLeafOnlyTreeView";
import { selectorListviewCheckboxCardDescription } from "./selector-listviewCheckboxCard/description";
import { selectorListviewCheckboxCardRecipe } from "./selector-listviewCheckboxCard/recipe";
import { SelectorListviewCheckboxCard } from "./selector-listviewCheckboxCard/selector-listviewCheckboxCard";
import { selectorPerformanceSelectorDescription } from "./selector-performanceSelector/description";
import { selectorPerformanceSelectorRecipe } from "./selector-performanceSelector/recipe";
import { SelectorPerformanceSelector } from "./selector-performanceSelector/selector-performanceSelector";
import { tableSelectionTableDescription } from "./table-selectionTable/description";
import { tableSelectionTableRecipe } from "./table-selectionTable/recipe";
import { TableSelectionTable } from "./table-selectionTable/table-selectionTable";
import { treeViewSelectionDescription } from "./treeView-selection/description";
import { treeViewSelectionRecipe } from "./treeView-selection/recipe";
import { TreeViewSelection } from "./treeView-selection/treeView-selection";

const selectorItems = [
  {
    id: "table-selection",
    name: "Table",
    description: tableSelectionTableDescription,
    recipe: tableSelectionTableRecipe,
    Component: TableSelectionTable,
  },
  {
    id: "checkbox-selectable-list-view",
    name: "List View",
    description: listViewSelectionListViewDescription,
    recipe: listViewSelectionListViewRecipe,
    Component: ListViewSelectionListView,
  },
  {
    id: "list-view-checkbox-card",
    name: "ListView: Card Layout",
    description: selectorListviewCheckboxCardDescription,
    recipe: selectorListviewCheckboxCardRecipe,
    Component: SelectorListviewCheckboxCard,
  },
  {
    id: "tree-view-selection",
    name: "Tree View",
    description: treeViewSelectionDescription,
    recipe: treeViewSelectionRecipe,
    Component: TreeViewSelection,
  },
  {
    id: "checkbox-leaf-only-tree-view",
    name: "Tree View: Leaf Only",
    description: selectorCheckboxLeafOnlyTreeViewDescription,
    recipe: selectorCheckboxLeafOnlyTreeViewRecipe,
    Component: SelectorCheckboxLeafOnlyTreeView,
  },
  
  {
    id: "performance-selector",
    name: "Performance: DataSet Size",
    description: selectorPerformanceSelectorDescription,
    recipe: selectorPerformanceSelectorRecipe,
    Component: SelectorPerformanceSelector,
  },
  
 
  
];

export default function SelectorRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Selector examples"
      componentType="oj-selector"
      items={selectorItems}
      initialItemId="table-selection"
      navigationTitle="Selector"
    />
  );
}
