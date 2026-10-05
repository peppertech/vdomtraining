import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { treeViewPlaygrounds } from "./playgrounds";
import { treeViewContextMenuDescription } from "./treeView-contextMenu/description";
import { treeViewContextMenuRecipe } from "./treeView-contextMenu/recipe";
import { TreeViewContextMenu } from "./treeView-contextMenu/treeView-contextMenu";
import { treeViewCrudDescription } from "./treeView-crud/description";
import { treeViewCrudRecipe } from "./treeView-crud/recipe";
import { TreeViewCrud } from "./treeView-crud/treeView-crud";
import { treeViewDndDescription } from "./treeView-dnd/description";
import { treeViewDndRecipe } from "./treeView-dnd/recipe";
import { TreeViewDnd } from "./treeView-dnd/treeView-dnd";
import { treeViewDndReorderDescription } from "./treeView-dndReorder/description";
import { treeViewDndReorderRecipe } from "./treeView-dndReorder/recipe";
import { TreeViewDndReorder } from "./treeView-dndReorder/treeView-dndReorder";
import { treeViewExpansionDescription } from "./treeView-expansion/description";
import { treeViewExpansionRecipe } from "./treeView-expansion/recipe";
import { TreeViewExpansion } from "./treeView-expansion/treeView-expansion";
import { treeViewGroupingDescription } from "./treeView-grouping/description";
import { treeViewGroupingRecipe } from "./treeView-grouping/recipe";
import { TreeViewGrouping } from "./treeView-grouping/treeView-grouping";
import { treeViewIconsDescription } from "./treeView-icons/description";
import { treeViewIconsRecipe } from "./treeView-icons/recipe";
import { TreeViewIcons } from "./treeView-icons/treeView-icons";
import { treeViewJsonDescription } from "./treeView-json/description";
import { treeViewJsonRecipe } from "./treeView-json/recipe";
import { TreeViewJson } from "./treeView-json/treeView-json";
import { treeViewPerformanceDescription } from "./treeView-performance/description";
import { treeViewPerformanceRecipe } from "./treeView-performance/recipe";
import { TreeViewPerformance } from "./treeView-performance/treeView-performance";
import { treeViewProgressiveLoadTreeViewDescription } from "./treeView-progressiveLoadTreeView/description";
import { treeViewProgressiveLoadTreeViewRecipe } from "./treeView-progressiveLoadTreeView/recipe";
import { TreeViewProgressiveLoadTreeView } from "./treeView-progressiveLoadTreeView/treeView-progressiveLoadTreeView";
import { treeViewRendererDescription } from "./treeView-renderer/description";
import { treeViewRendererRecipe } from "./treeView-renderer/recipe";
import { TreeViewRenderer } from "./treeView-renderer/treeView-renderer";
import { treeViewSelectableDescription } from "./treeView-selectable/description";
import { treeViewSelectableRecipe } from "./treeView-selectable/recipe";
import { TreeViewSelectable } from "./treeView-selectable/treeView-selectable";
import { treeViewSelectionDescription } from "./treeView-selection/description";
import { treeViewSelectionRecipe } from "./treeView-selection/recipe";
import { TreeViewSelection } from "./treeView-selection/treeView-selection";

const treeViewItems = [
  {
    id: "json",
    name: "Basic",
    description: treeViewJsonDescription,
    recipe: treeViewJsonRecipe,
    Component: TreeViewJson,
    playground: treeViewPlaygrounds["treeView-json"],
  },
  {
    id: "selection",
    name: "Selection",
    description: treeViewSelectionDescription,
    recipe: treeViewSelectionRecipe,
    Component: TreeViewSelection,
    playground: treeViewPlaygrounds["treeView-selection"],
  },
   {
    id: "expansion",
    name: "Expansion",
    description: treeViewExpansionDescription,
    recipe: treeViewExpansionRecipe,
    Component: TreeViewExpansion,
    playground: treeViewPlaygrounds["treeView-expansion"],
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: treeViewContextMenuDescription,
    recipe: treeViewContextMenuRecipe,
    Component: TreeViewContextMenu,
    playground: treeViewPlaygrounds["treeView-contextMenu"],
  },
  {
    id: "crud",
    name: "CRUD",
    description: treeViewCrudDescription,
    recipe: treeViewCrudRecipe,
    Component: TreeViewCrud,
    playground: treeViewPlaygrounds["treeView-crud"],
  },
  {
    id: "icons",
    name: "Icons",
    description: treeViewIconsDescription,
    recipe: treeViewIconsRecipe,
    Component: TreeViewIcons,
    playground: treeViewPlaygrounds["treeView-icons"],
  },
  {
    id: "drag-and-drop",
    name: "Drag and Drop",
    description: treeViewDndDescription,
    recipe: treeViewDndRecipe,
    Component: TreeViewDnd,
    playground: treeViewPlaygrounds["treeView-dnd"],
  },
  {
    id: "drag-and-drop-reorder",
    name: "Drag and Drop Reorder",
    description: treeViewDndReorderDescription,
    recipe: treeViewDndReorderRecipe,
    Component: TreeViewDndReorder,
    playground: treeViewPlaygrounds["treeView-dndReorder"],
  },
  {
    id: "renderer",
    name: "Renderer",
    description: treeViewRendererDescription,
    recipe: treeViewRendererRecipe,
    Component: TreeViewRenderer,
    playground: treeViewPlaygrounds["treeView-renderer"],
  },
  {
    id: "selectable",
    name: "Selectable",
    description: treeViewSelectableDescription,
    recipe: treeViewSelectableRecipe,
    Component: TreeViewSelectable,
    playground: treeViewPlaygrounds["treeView-selectable"],
  },
  
  {
    id: "grouping",
    name: "Grouping Leaf Reorder",
    description: treeViewGroupingDescription,
    recipe: treeViewGroupingRecipe,
    Component: TreeViewGrouping,
    playground: treeViewPlaygrounds["treeView-grouping"],
  },
  {
    id: "progressive-load",
    name: "Progressive Loading",
    description: treeViewProgressiveLoadTreeViewDescription,
    recipe: treeViewProgressiveLoadTreeViewRecipe,
    Component: TreeViewProgressiveLoadTreeView,
    playground: treeViewPlaygrounds["treeView-progressiveLoadTreeView"],
  },
  {
    id: "performance",
    name: "Performance: DataSet Size",
    description: treeViewPerformanceDescription,
    recipe: treeViewPerformanceRecipe,
    Component: TreeViewPerformance,
    playground: treeViewPlaygrounds["treeView-performance"],
  }
];

export default function TreeViewRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Tree View examples"
      componentType="oj-tree-view"
      items={treeViewItems}
      initialItemId="json"
      navigationTitle="Tree View"
    />
  );
}
