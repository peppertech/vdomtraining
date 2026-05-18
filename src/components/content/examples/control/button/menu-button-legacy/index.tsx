import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { MenuButtonsOverview } from "./menuButtons-overview/menuButtons-overview";
import { menuButtonsOverviewDescription } from "./menuButtons-overview/description";
import { menuButtonsOverviewRecipe } from "./menuButtons-overview/recipe";
import { MenuButtonsMenuButton } from "./menuButtons-menuButton/menuButtons-menuButton";
import { menuButtonsMenuButtonDescription } from "./menuButtons-menuButton/description";
import { menuButtonsMenuButtonRecipe } from "./menuButtons-menuButton/recipe";
import { MenuButtonsMenuButtonDisplay } from "./menuButtons-menuButtonDisplay/menuButtons-menuButtonDisplay";
import { menuButtonsMenuButtonDisplayDescription } from "./menuButtons-menuButtonDisplay/description";
import { menuButtonsMenuButtonDisplayRecipe } from "./menuButtons-menuButtonDisplay/recipe";
import { MenuButtonsMenuButtonset } from "./menuButtons-menuButtonset/menuButtons-menuButtonset";
import { menuButtonsMenuButtonsetDescription } from "./menuButtons-menuButtonset/description";
import { menuButtonsMenuButtonsetRecipe } from "./menuButtons-menuButtonset/recipe";
import { MenuButtonsChroming } from "./menuButtons-chroming/menuButtons-chroming";
import { menuButtonsChromingDescription } from "./menuButtons-chroming/description";
import { menuButtonsChromingRecipe } from "./menuButtons-chroming/recipe";
import { MenuButtonsSizes } from "./menuButtons-sizes/menuButtons-sizes";
import { menuButtonsSizesDescription } from "./menuButtons-sizes/description";
import { menuButtonsSizesRecipe } from "./menuButtons-sizes/recipe";

const menuButtonLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: menuButtonsOverviewDescription,
    recipe: menuButtonsOverviewRecipe,
    Component: MenuButtonsOverview,
  },
  {
    id: "menu-button",
    name: "Menu Button",
    description: menuButtonsMenuButtonDescription,
    recipe: menuButtonsMenuButtonRecipe,
    Component: MenuButtonsMenuButton,
  },
  {
    id: "display",
    name: "Display",
    description: menuButtonsMenuButtonDisplayDescription,
    recipe: menuButtonsMenuButtonDisplayRecipe,
    Component: MenuButtonsMenuButtonDisplay,
  },
  {
    id: "menu-button-set",
    name: "Menu Button Set",
    description: menuButtonsMenuButtonsetDescription,
    recipe: menuButtonsMenuButtonsetRecipe,
    Component: MenuButtonsMenuButtonset,
  },
  {
    id: "chroming",
    name: "Chroming",
    description: menuButtonsChromingDescription,
    recipe: menuButtonsChromingRecipe,
    Component: MenuButtonsChroming,
  },
  {
    id: "sizes",
    name: "Sizes",
    description: menuButtonsSizesDescription,
    recipe: menuButtonsSizesRecipe,
    Component: MenuButtonsSizes,
  },
];

export default function MenuButtonLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Menu Button examples"
      componentType="oj-menu-button"
      items={menuButtonLegacyItems}
      initialItemId="overview"
      navigationTitle="Menu Button"
    />
  );
}
