import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { menuSelectManyDataProviderOptionsDescription } from "./menuSelectMany-dataProviderOptions/description";
import { MenuSelectManyDataProviderOptions } from "./menuSelectMany-dataProviderOptions/menuSelectMany-dataProviderOptions";
import { menuSelectManyDataProviderOptionsRecipe } from "./menuSelectMany-dataProviderOptions/recipe";
import { menuSelectManyOverviewDescription } from "./menuSelectMany-overview/description";
import { MenuSelectManyOverview } from "./menuSelectMany-overview/menuSelectMany-overview";
import { menuSelectManyOverviewRecipe } from "./menuSelectMany-overview/recipe";

const menuSelectManyItems = [
  {
    id: "overview",
    name: "Overview",
    description: menuSelectManyOverviewDescription,
    recipe: menuSelectManyOverviewRecipe,
    Component: MenuSelectManyOverview,
  },
  {
    id: "data-provider-options",
    name: "Data Provider Options",
    description: menuSelectManyDataProviderOptionsDescription,
    recipe: menuSelectManyDataProviderOptionsRecipe,
    Component: MenuSelectManyDataProviderOptions,
  },
];

export default function MenuSelectManyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Menu Select Many examples"
      componentType="oj-menu-select-many"
      items={menuSelectManyItems}
      initialItemId="overview"
      navigationTitle="Menu Select Many"
    />
  );
}
