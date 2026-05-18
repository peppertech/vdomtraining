import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { MenuButtonsOverviewcorepack } from "./menuButtons-overviewcorepack/menuButtons-overviewcorepack";
import { menuButtonsOverviewcorepackDescription } from "./menuButtons-overviewcorepack/description";
import { menuButtonsOverviewcorepackRecipe } from "./menuButtons-overviewcorepack/recipe";
import { MenuButtonsMenuButtoncorepack } from "./menuButtons-menuButtoncorepack/menuButtons-menuButtoncorepack";
import { menuButtonsMenuButtoncorepackDescription } from "./menuButtons-menuButtoncorepack/description";
import { menuButtonsMenuButtoncorepackRecipe } from "./menuButtons-menuButtoncorepack/recipe";
import { MenuButtonsMenuButtonDisplaycorepack } from "./menuButtons-menuButtonDisplaycorepack/menuButtons-menuButtonDisplaycorepack";
import { menuButtonsMenuButtonDisplaycorepackDescription } from "./menuButtons-menuButtonDisplaycorepack/description";
import { menuButtonsMenuButtonDisplaycorepackRecipe } from "./menuButtons-menuButtonDisplaycorepack/recipe";
import { MenuButtonsDisablecorepack } from "./menuButtons-disablecorepack/menuButtons-disablecorepack";
import { menuButtonsDisablecorepackDescription } from "./menuButtons-disablecorepack/description";
import { menuButtonsDisablecorepackRecipe } from "./menuButtons-disablecorepack/recipe";
import { MenuButtonsEventcorepack } from "./menuButtons-eventcorepack/menuButtons-eventcorepack";
import { menuButtonsEventcorepackDescription } from "./menuButtons-eventcorepack/description";
import { menuButtonsEventcorepackRecipe } from "./menuButtons-eventcorepack/recipe";
import { MenuButtonsMenuButtonEventscorepack } from "./menuButtons-menuButtonEventscorepack/menuButtons-menuButtonEventscorepack";
import { menuButtonsMenuButtonEventscorepackDescription } from "./menuButtons-menuButtonEventscorepack/description";
import { menuButtonsMenuButtonEventscorepackRecipe } from "./menuButtons-menuButtonEventscorepack/recipe";
import { MenuButtonsSelectcorepack } from "./menuButtons-selectcorepack/menuButtons-selectcorepack";
import { menuButtonsSelectcorepackDescription } from "./menuButtons-selectcorepack/description";
import { menuButtonsSelectcorepackRecipe } from "./menuButtons-selectcorepack/recipe";
import { MenuButtonsMenuButtonsetcorepack } from "./menuButtons-menuButtonsetcorepack/menuButtons-menuButtonsetcorepack";
import { menuButtonsMenuButtonsetcorepackDescription } from "./menuButtons-menuButtonsetcorepack/description";
import { menuButtonsMenuButtonsetcorepackRecipe } from "./menuButtons-menuButtonsetcorepack/recipe";

const menuButtonCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: menuButtonsOverviewcorepackDescription,
    recipe: menuButtonsOverviewcorepackRecipe,
    Component: MenuButtonsOverviewcorepack,
  },
  {
    id: "menu-button",
    name: "Menu Button",
    description: menuButtonsMenuButtoncorepackDescription,
    recipe: menuButtonsMenuButtoncorepackRecipe,
    Component: MenuButtonsMenuButtoncorepack,
  },
  {
    id: "display",
    name: "Display",
    description: menuButtonsMenuButtonDisplaycorepackDescription,
    recipe: menuButtonsMenuButtonDisplaycorepackRecipe,
    Component: MenuButtonsMenuButtonDisplaycorepack,
  },
  {
    id: "disable",
    name: "Disable",
    description: menuButtonsDisablecorepackDescription,
    recipe: menuButtonsDisablecorepackRecipe,
    Component: MenuButtonsDisablecorepack,
  },
  {
    id: "event",
    name: "Event",
    description: menuButtonsEventcorepackDescription,
    recipe: menuButtonsEventcorepackRecipe,
    Component: MenuButtonsEventcorepack,
  },
  {
    id: "menu-button-events",
    name: "Menu Button Events",
    description: menuButtonsMenuButtonEventscorepackDescription,
    recipe: menuButtonsMenuButtonEventscorepackRecipe,
    Component: MenuButtonsMenuButtonEventscorepack,
  },
  {
    id: "select",
    name: "Select",
    description: menuButtonsSelectcorepackDescription,
    recipe: menuButtonsSelectcorepackRecipe,
    Component: MenuButtonsSelectcorepack,
  },
  {
    id: "menu-button-set",
    name: "Menu Button Set",
    description: menuButtonsMenuButtonsetcorepackDescription,
    recipe: menuButtonsMenuButtonsetcorepackRecipe,
    Component: MenuButtonsMenuButtonsetcorepack,
  },
];

export default function MenuButtonCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Menu Button Core Pack examples"
      componentType="oj-c-menu-button"
      packLabel="Core Pack"
      items={menuButtonCorePackItems}
      initialItemId="overview"
      navigationTitle="Menu Button"
    />
  );
}
