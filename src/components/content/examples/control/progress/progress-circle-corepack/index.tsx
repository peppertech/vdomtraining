import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ProgressCircleOverviewcorepack } from "./progressCircle-overviewcorepack/progressCircle-overviewcorepack";
import { progressCircleOverviewcorepackDescription } from "./progressCircle-overviewcorepack/description";
import { progressCircleOverviewcorepackRecipe } from "./progressCircle-overviewcorepack/recipe";
import { ProgressCircleBasiccorepack } from "./progressCircle-basiccorepack/progressCircle-basiccorepack";
import { progressCircleBasiccorepackDescription } from "./progressCircle-basiccorepack/description";
import { progressCircleBasiccorepackRecipe } from "./progressCircle-basiccorepack/recipe";
import { ProgressCircleLoadingcorepack } from "./progressCircle-loadingcorepack/progressCircle-loadingcorepack";
import { progressCircleLoadingcorepackDescription } from "./progressCircle-loadingcorepack/description";
import { progressCircleLoadingcorepackRecipe } from "./progressCircle-loadingcorepack/recipe";

const progressCircleCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: progressCircleOverviewcorepackDescription,
    recipe: progressCircleOverviewcorepackRecipe,
    Component: ProgressCircleOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: progressCircleBasiccorepackDescription,
    recipe: progressCircleBasiccorepackRecipe,
    Component: ProgressCircleBasiccorepack,
  },
  {
    id: "loading",
    name: "Loading",
    description: progressCircleLoadingcorepackDescription,
    recipe: progressCircleLoadingcorepackRecipe,
    Component: ProgressCircleLoadingcorepack,
  },
];

export default function ProgressCircleCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Progress Circle Core Pack examples"
      componentType="oj-c-progress-circle"
      packLabel="Core Pack"
      items={progressCircleCorePackItems}
      initialItemId="overview"
      navigationTitle="Progress Circle"
    />
  );
}
