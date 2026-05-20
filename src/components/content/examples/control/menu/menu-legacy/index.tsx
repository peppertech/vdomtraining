import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { MenuOverview } from "./menu-overview/menu-overview";
import { menuOverviewDescription } from "./menu-overview/description";
import { menuOverviewRecipe } from "./menu-overview/recipe";
import { MenuMenuOpen } from "./menu-menuOpen/menu-menuOpen";
import { menuMenuOpenDescription } from "./menu-menuOpen/description";
import { menuMenuOpenRecipe } from "./menu-menuOpen/recipe";
import { MenuMenuForEachTemplate } from "./menu-menuForEachTemplate/menu-menuForEachTemplate";
import { menuMenuForEachTemplateDescription } from "./menu-menuForEachTemplate/description";
import { menuMenuForEachTemplateRecipe } from "./menu-menuForEachTemplate/recipe";
import { MenuMenuRecursiveTemplate } from "./menu-menuRecursiveTemplate/menu-menuRecursiveTemplate";
import { menuMenuRecursiveTemplateDescription } from "./menu-menuRecursiveTemplate/description";
import { menuMenuRecursiveTemplateRecipe } from "./menu-menuRecursiveTemplate/recipe";

const menuLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: menuOverviewDescription,
    recipe: menuOverviewRecipe,
    Component: MenuOverview,
  },
  {
    id: "menu-open",
    name: "Open Close API",
    description: menuMenuOpenDescription,
    recipe: menuMenuOpenRecipe,
    Component: MenuMenuOpen,
  },
  {
    id: "menu-for-each-template",
    name: "Menu For Each Template",
    description: menuMenuForEachTemplateDescription,
    recipe: menuMenuForEachTemplateRecipe,
    Component: MenuMenuForEachTemplate,
  },
  {
    id: "menu-recursive-template",
    name: "Menu Recursive Template",
    description: menuMenuRecursiveTemplateDescription,
    recipe: menuMenuRecursiveTemplateRecipe,
    Component: MenuMenuRecursiveTemplate,
  },
];

export default function MenuLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Menu examples"
      componentType="oj-menu"
      items={menuLegacyItems}
      initialItemId="overview"
      navigationTitle="Menu"
    />
  );
}
