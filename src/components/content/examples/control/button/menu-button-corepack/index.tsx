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
import { MenuButtonsChromingcorepack } from "./menuButtons-chromingcorepack/menuButtons-chromingcorepack";
import { menuButtonsChromingcorepackDescription } from "./menuButtons-chromingcorepack/description";
import { menuButtonsChromingcorepackRecipe } from "./menuButtons-chromingcorepack/recipe";

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
    name: "Menu and Submenu",
    description: menuButtonsMenuButtoncorepackDescription,
    recipe: menuButtonsMenuButtoncorepackRecipe,
    Component: MenuButtonsMenuButtoncorepack,
  },
  {
    id: "disable",
    name: "Disable Item",
    description: menuButtonsDisablecorepackDescription,
    recipe: menuButtonsDisablecorepackRecipe,
    Component: MenuButtonsDisablecorepack,
  },
  {
    id: "display",
    name: "Button Icons",
    description: menuButtonsMenuButtonDisplaycorepackDescription,
    recipe: menuButtonsMenuButtonDisplaycorepackRecipe,
    Component: MenuButtonsMenuButtonDisplaycorepack,
  },
  {
    id: "select",
    name: "Select",
    description: menuButtonsSelectcorepackDescription,
    recipe: menuButtonsSelectcorepackRecipe,
    Component: MenuButtonsSelectcorepack,
  },
  {
    id: "event",
    name: "Event",
    description: menuButtonsEventcorepackDescription,
    recipe: menuButtonsEventcorepackRecipe,
    Component: MenuButtonsEventcorepack,
  },
  
  {
    id: "menu-button-set",
    name: "Menu Bar",
    description: menuButtonsMenuButtonsetcorepackDescription,
    recipe: menuButtonsMenuButtonsetcorepackRecipe,
    Component: MenuButtonsMenuButtonsetcorepack,
  },
  {
    id: "chroming",
    name: "Chroming",
    description: menuButtonsChromingcorepackDescription,
    recipe: menuButtonsChromingcorepackRecipe,
    Component: MenuButtonsChromingcorepack,
  },
  {
    id: "menu-button-events",
    name: "Menu Events",
    description: menuButtonsMenuButtonEventscorepackDescription,
    recipe: menuButtonsMenuButtonEventscorepackRecipe,
    Component: MenuButtonsMenuButtonEventscorepack,
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
