import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { toolbarItemActionscorepackDescription } from "./toolbar-itemActionscorepack/description";
import { toolbarItemActionscorepackRecipe } from "./toolbar-itemActionscorepack/recipe";
import { ToolbarItemActionscorepack } from "./toolbar-itemActionscorepack/toolbar-itemActionscorepack";
import { toolbarModifyContentcorepackDescription } from "./toolbar-modifyContentcorepack/description";
import { toolbarModifyContentcorepackRecipe } from "./toolbar-modifyContentcorepack/recipe";
import { ToolbarModifyContentcorepack } from "./toolbar-modifyContentcorepack/toolbar-modifyContentcorepack";
import { toolbarOverviewcorepackDescription } from "./toolbar-overviewcorepack/description";
import { toolbarOverviewcorepackRecipe } from "./toolbar-overviewcorepack/recipe";
import { ToolbarOverviewcorepack } from "./toolbar-overviewcorepack/toolbar-overviewcorepack";
import { toolbarSelectioncorepackDescription } from "./toolbar-selectioncorepack/description";
import { toolbarSelectioncorepackRecipe } from "./toolbar-selectioncorepack/recipe";
import { ToolbarSelectioncorepack } from "./toolbar-selectioncorepack/toolbar-selectioncorepack";
import { toolbarToolbarActionscorepackDescription } from "./toolbar-toolbarActionscorepack/description";
import { toolbarToolbarActionscorepackRecipe } from "./toolbar-toolbarActionscorepack/recipe";
import { ToolbarToolbarActionscorepack } from "./toolbar-toolbarActionscorepack/toolbar-toolbarActionscorepack";

const toolbarCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: toolbarOverviewcorepackDescription,
    recipe: toolbarOverviewcorepackRecipe,
    Component: ToolbarOverviewcorepack,
  },
  {
    id: "modify-content",
    name: "Modify Content",
    description: toolbarModifyContentcorepackDescription,
    recipe: toolbarModifyContentcorepackRecipe,
    Component: ToolbarModifyContentcorepack,
  },
  {
    id: "toolbar-actions",
    name: "Toolbar Actions",
    description: toolbarToolbarActionscorepackDescription,
    recipe: toolbarToolbarActionscorepackRecipe,
    Component: ToolbarToolbarActionscorepack,
  },
  {
    id: "item-actions",
    name: "Item Actions",
    description: toolbarItemActionscorepackDescription,
    recipe: toolbarItemActionscorepackRecipe,
    Component: ToolbarItemActionscorepack,
  },
  
  {
    id: "selection",
    name: "Selection",
    description: toolbarSelectioncorepackDescription,
    recipe: toolbarSelectioncorepackRecipe,
    Component: ToolbarSelectioncorepack,
  },
  
];

export default function ToolbarCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Toolbar Core Pack examples"
      componentType="oj-c-toolbar"
      packLabel="Core Pack"
      items={toolbarCorePackItems}
      initialItemId="overview"
      navigationTitle="Toolbar"
    />
  );
}
