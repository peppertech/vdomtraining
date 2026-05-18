import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { SplitmenubuttonOverviewcorepack } from "./splitmenubutton-overviewcorepack/splitmenubutton-overviewcorepack";
import { splitmenubuttonOverviewcorepackDescription } from "./splitmenubutton-overviewcorepack/description";
import { splitmenubuttonOverviewcorepackRecipe } from "./splitmenubutton-overviewcorepack/recipe";
import { SplitmenubuttonBindingcorepack } from "./splitmenubutton-bindingcorepack/splitmenubutton-bindingcorepack";
import { splitmenubuttonBindingcorepackDescription } from "./splitmenubutton-bindingcorepack/description";
import { splitmenubuttonBindingcorepackRecipe } from "./splitmenubutton-bindingcorepack/recipe";
import { SplitmenubuttonEventcorepack } from "./splitmenubutton-eventcorepack/splitmenubutton-eventcorepack";
import { splitmenubuttonEventcorepackDescription } from "./splitmenubutton-eventcorepack/description";
import { splitmenubuttonEventcorepackRecipe } from "./splitmenubutton-eventcorepack/recipe";
import { SplitmenubuttonPersistentcorepack } from "./splitmenubutton-persistentcorepack/splitmenubutton-persistentcorepack";
import { splitmenubuttonPersistentcorepackDescription } from "./splitmenubutton-persistentcorepack/description";
import { splitmenubuttonPersistentcorepackRecipe } from "./splitmenubutton-persistentcorepack/recipe";

const splitMenuButtonCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: splitmenubuttonOverviewcorepackDescription,
    recipe: splitmenubuttonOverviewcorepackRecipe,
    Component: SplitmenubuttonOverviewcorepack,
  },
  {
    id: "binding",
    name: "Binding",
    description: splitmenubuttonBindingcorepackDescription,
    recipe: splitmenubuttonBindingcorepackRecipe,
    Component: SplitmenubuttonBindingcorepack,
  },
  {
    id: "event",
    name: "Event",
    description: splitmenubuttonEventcorepackDescription,
    recipe: splitmenubuttonEventcorepackRecipe,
    Component: SplitmenubuttonEventcorepack,
  },
  {
    id: "persistent",
    name: "Persistent",
    description: splitmenubuttonPersistentcorepackDescription,
    recipe: splitmenubuttonPersistentcorepackRecipe,
    Component: SplitmenubuttonPersistentcorepack,
  },
];

export default function SplitMenuButtonCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Split Menu Button Core Pack examples"
      componentType="oj-c-split-menu-button"
      packLabel="Core Pack"
      items={splitMenuButtonCorePackItems}
      initialItemId="overview"
      navigationTitle="Split Menu Button"
    />
  );
}
