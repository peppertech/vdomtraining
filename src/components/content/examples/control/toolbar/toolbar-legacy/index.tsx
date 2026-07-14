import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { toolbarsStackedToolbarsDescription } from "./toolbars-stackedToolbars/description";
import { toolbarsStackedToolbarsRecipe } from "./toolbars-stackedToolbars/recipe";
import { ToolbarsStackedToolbars } from "./toolbars-stackedToolbars/toolbars-stackedToolbars";
import { toolbarsToolbarDescription } from "./toolbars-toolbar/description";
import { toolbarsToolbarRecipe } from "./toolbars-toolbar/recipe";
import { ToolbarsToolbar } from "./toolbars-toolbar/toolbars-toolbar";

const toolbarLegacyItems = [
  {
    id: "toolbar",
    name: "Single",
    description: toolbarsToolbarDescription,
    recipe: toolbarsToolbarRecipe,
    Component: ToolbarsToolbar,
  },
  {
    id: "stacked-toolbars",
    name: "Multiple",
    description: toolbarsStackedToolbarsDescription,
    recipe: toolbarsStackedToolbarsRecipe,
    Component: ToolbarsStackedToolbars,
  },
];

export default function ToolbarLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Toolbar examples"
      componentType="oj-toolbar"
      items={toolbarLegacyItems}
      initialItemId="toolbar"
      navigationTitle="Toolbar"
    />
  );
}
