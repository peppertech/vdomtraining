import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TogglebuttonOverviewcorepack } from "./togglebutton-overviewcorepack/togglebutton-overviewcorepack";
import { togglebuttonOverviewcorepackDescription } from "./togglebutton-overviewcorepack/description";
import { togglebuttonOverviewcorepackRecipe } from "./togglebutton-overviewcorepack/recipe";
import { TogglebuttonBasiccorepack } from "./togglebutton-basiccorepack/togglebutton-basiccorepack";
import { togglebuttonBasiccorepackDescription } from "./togglebutton-basiccorepack/description";
import { togglebuttonBasiccorepackRecipe } from "./togglebutton-basiccorepack/recipe";

const toggleButtonCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: togglebuttonOverviewcorepackDescription,
    recipe: togglebuttonOverviewcorepackRecipe,
    Component: TogglebuttonOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: togglebuttonBasiccorepackDescription,
    recipe: togglebuttonBasiccorepackRecipe,
    Component: TogglebuttonBasiccorepack,
  },
];

export default function ToggleButtonCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Toggle Button Core Pack examples"
      componentType="oj-c-toggle-button"
      packLabel="Core Pack"
      items={toggleButtonCorePackItems}
      initialItemId="overview"
      navigationTitle="Toggle Button"
    />
  );
}
