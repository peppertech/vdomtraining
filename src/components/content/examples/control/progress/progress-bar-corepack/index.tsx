import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { progressBarBasiccorepackDescription } from "./progressBar-basiccorepack/description";
import { ProgressBarBasiccorepack } from "./progressBar-basiccorepack/progressBar-basiccorepack";
import { progressBarBasiccorepackRecipe } from "./progressBar-basiccorepack/recipe";
import { progressBarLoadingcorepackDescription } from "./progressBar-loadingcorepack/description";
import { ProgressBarLoadingcorepack } from "./progressBar-loadingcorepack/progressBar-loadingcorepack";
import { progressBarLoadingcorepackRecipe } from "./progressBar-loadingcorepack/recipe";
import { progressBarOverviewcorepackDescription } from "./progressBar-overviewcorepack/description";
import { ProgressBarOverviewcorepack } from "./progressBar-overviewcorepack/progressBar-overviewcorepack";
import { progressBarOverviewcorepackRecipe } from "./progressBar-overviewcorepack/recipe";

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
