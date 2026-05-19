import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ProgressBarOverviewcorepack } from "./progressBar-overviewcorepack/progressBar-overviewcorepack";
import { progressBarOverviewcorepackDescription } from "./progressBar-overviewcorepack/description";
import { progressBarOverviewcorepackRecipe } from "./progressBar-overviewcorepack/recipe";
import { ProgressBarBasiccorepack } from "./progressBar-basiccorepack/progressBar-basiccorepack";
import { progressBarBasiccorepackDescription } from "./progressBar-basiccorepack/description";
import { progressBarBasiccorepackRecipe } from "./progressBar-basiccorepack/recipe";
import { ProgressBarLoadingcorepack } from "./progressBar-loadingcorepack/progressBar-loadingcorepack";
import { progressBarLoadingcorepackDescription } from "./progressBar-loadingcorepack/description";
import { progressBarLoadingcorepackRecipe } from "./progressBar-loadingcorepack/recipe";

const progressBarCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: progressBarOverviewcorepackDescription,
    recipe: progressBarOverviewcorepackRecipe,
    Component: ProgressBarOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: progressBarBasiccorepackDescription,
    recipe: progressBarBasiccorepackRecipe,
    Component: ProgressBarBasiccorepack,
  },
  {
    id: "loading",
    name: "Loading",
    description: progressBarLoadingcorepackDescription,
    recipe: progressBarLoadingcorepackRecipe,
    Component: ProgressBarLoadingcorepack,
  },
];

export default function ProgressBarCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Progress Bar Core Pack examples"
      componentType="oj-c-progress-bar"
      packLabel="Core Pack"
      items={progressBarCorePackItems}
      initialItemId="overview"
      navigationTitle="Progress Bar"
    />
  );
}
