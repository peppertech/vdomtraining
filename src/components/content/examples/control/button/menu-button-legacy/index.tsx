import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { menuButtonsChromingDescription } from "./menuButtons-chroming/description";
import { MenuButtonsChroming } from "./menuButtons-chroming/menuButtons-chroming";
import { menuButtonsChromingRecipe } from "./menuButtons-chroming/recipe";
import { menuButtonsMenuButtonDescription } from "./menuButtons-menuButton/description";
import { MenuButtonsMenuButton } from "./menuButtons-menuButton/menuButtons-menuButton";
import { menuButtonsMenuButtonRecipe } from "./menuButtons-menuButton/recipe";
import { menuButtonsMenuButtonDisplayDescription } from "./menuButtons-menuButtonDisplay/description";
import { MenuButtonsMenuButtonDisplay } from "./menuButtons-menuButtonDisplay/menuButtons-menuButtonDisplay";
import { menuButtonsMenuButtonDisplayRecipe } from "./menuButtons-menuButtonDisplay/recipe";
import { menuButtonsMenuButtonsetDescription } from "./menuButtons-menuButtonset/description";
import { MenuButtonsMenuButtonset } from "./menuButtons-menuButtonset/menuButtons-menuButtonset";
import { menuButtonsMenuButtonsetRecipe } from "./menuButtons-menuButtonset/recipe";
import { menuButtonsOverviewDescription } from "./menuButtons-overview/description";
import { MenuButtonsOverview } from "./menuButtons-overview/menuButtons-overview";
import { menuButtonsOverviewRecipe } from "./menuButtons-overview/recipe";
import { menuButtonsSizesDescription } from "./menuButtons-sizes/description";
import { MenuButtonsSizes } from "./menuButtons-sizes/menuButtons-sizes";
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
