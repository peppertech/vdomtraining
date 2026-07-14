import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { menuButtonsChromingcorepackDescription } from "./menuButtons-chromingcorepack/description";
import { MenuButtonsChromingcorepack } from "./menuButtons-chromingcorepack/menuButtons-chromingcorepack";
import { menuButtonsChromingcorepackRecipe } from "./menuButtons-chromingcorepack/recipe";
import { menuButtonsDisablecorepackDescription } from "./menuButtons-disablecorepack/description";
import { MenuButtonsDisablecorepack } from "./menuButtons-disablecorepack/menuButtons-disablecorepack";
import { menuButtonsDisablecorepackRecipe } from "./menuButtons-disablecorepack/recipe";
import { menuButtonsEventcorepackDescription } from "./menuButtons-eventcorepack/description";
import { MenuButtonsEventcorepack } from "./menuButtons-eventcorepack/menuButtons-eventcorepack";
import { menuButtonsEventcorepackRecipe } from "./menuButtons-eventcorepack/recipe";
import { menuButtonsMenuButtoncorepackDescription } from "./menuButtons-menuButtoncorepack/description";
import { MenuButtonsMenuButtoncorepack } from "./menuButtons-menuButtoncorepack/menuButtons-menuButtoncorepack";
import { menuButtonsMenuButtoncorepackRecipe } from "./menuButtons-menuButtoncorepack/recipe";
import { menuButtonsMenuButtonDisplaycorepackDescription } from "./menuButtons-menuButtonDisplaycorepack/description";
import { MenuButtonsMenuButtonDisplaycorepack } from "./menuButtons-menuButtonDisplaycorepack/menuButtons-menuButtonDisplaycorepack";
import { menuButtonsMenuButtonDisplaycorepackRecipe } from "./menuButtons-menuButtonDisplaycorepack/recipe";
import { menuButtonsMenuButtonEventscorepackDescription } from "./menuButtons-menuButtonEventscorepack/description";
import { MenuButtonsMenuButtonEventscorepack } from "./menuButtons-menuButtonEventscorepack/menuButtons-menuButtonEventscorepack";
import { menuButtonsMenuButtonEventscorepackRecipe } from "./menuButtons-menuButtonEventscorepack/recipe";
import { menuButtonsMenuButtonsetcorepackDescription } from "./menuButtons-menuButtonsetcorepack/description";
import { MenuButtonsMenuButtonsetcorepack } from "./menuButtons-menuButtonsetcorepack/menuButtons-menuButtonsetcorepack";
import { menuButtonsMenuButtonsetcorepackRecipe } from "./menuButtons-menuButtonsetcorepack/recipe";
import { menuButtonsOverviewcorepackDescription } from "./menuButtons-overviewcorepack/description";
import { MenuButtonsOverviewcorepack } from "./menuButtons-overviewcorepack/menuButtons-overviewcorepack";
import { menuButtonsOverviewcorepackRecipe } from "./menuButtons-overviewcorepack/recipe";
import { menuButtonsSelectcorepackDescription } from "./menuButtons-selectcorepack/description";
import { MenuButtonsSelectcorepack } from "./menuButtons-selectcorepack/menuButtons-selectcorepack";
import { menuButtonsSelectcorepackRecipe } from "./menuButtons-selectcorepack/recipe";

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
