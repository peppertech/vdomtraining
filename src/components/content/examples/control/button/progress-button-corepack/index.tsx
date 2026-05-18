import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ProgressbuttonOverviewcorepack } from "./progressbutton-overviewcorepack/progressbutton-overviewcorepack";
import { progressbuttonOverviewcorepackDescription } from "./progressbutton-overviewcorepack/description";
import { progressbuttonOverviewcorepackRecipe } from "./progressbutton-overviewcorepack/recipe";
import { ProgressbuttonBasiccorepack } from "./progressbutton-basiccorepack/progressbutton-basiccorepack";
import { progressbuttonBasiccorepackDescription } from "./progressbutton-basiccorepack/description";
import { progressbuttonBasiccorepackRecipe } from "./progressbutton-basiccorepack/recipe";
import { ProgressbuttonIconcorepack } from "./progressbutton-iconcorepack/progressbutton-iconcorepack";
import { progressbuttonIconcorepackDescription } from "./progressbutton-iconcorepack/description";
import { progressbuttonIconcorepackRecipe } from "./progressbutton-iconcorepack/recipe";

const progressButtonCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: progressbuttonOverviewcorepackDescription,
    recipe: progressbuttonOverviewcorepackRecipe,
    Component: ProgressbuttonOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: progressbuttonBasiccorepackDescription,
    recipe: progressbuttonBasiccorepackRecipe,
    Component: ProgressbuttonBasiccorepack,
  },
  {
    id: "icon",
    name: "Icon",
    description: progressbuttonIconcorepackDescription,
    recipe: progressbuttonIconcorepackRecipe,
    Component: ProgressbuttonIconcorepack,
  },
];

export default function ProgressButtonCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Progress Button Core Pack examples"
      componentType="oj-c-progress-button"
      packLabel="Core Pack"
      items={progressButtonCorePackItems}
      initialItemId="overview"
      navigationTitle="Progress Button"
    />
  );
}
