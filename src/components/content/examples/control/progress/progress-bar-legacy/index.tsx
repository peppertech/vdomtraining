import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ProgressBarOverview } from "./progressBar-overview/progressBar-overview";
import { progressBarOverviewDescription } from "./progressBar-overview/description";
import { progressBarOverviewRecipe } from "./progressBar-overview/recipe";
import { ProgressBarDefault } from "./progressBar-default/progressBar-default";
import { progressBarDefaultDescription } from "./progressBar-default/description";
import { progressBarDefaultRecipe } from "./progressBar-default/recipe";
import { ProgressBarLoading } from "./progressBar-loading/progressBar-loading";
import { progressBarLoadingDescription } from "./progressBar-loading/description";
import { progressBarLoadingRecipe } from "./progressBar-loading/recipe";

const progressBarLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: progressBarOverviewDescription,
    recipe: progressBarOverviewRecipe,
    Component: ProgressBarOverview,
  },
  {
    id: "default",
    name: "Basic",
    description: progressBarDefaultDescription,
    recipe: progressBarDefaultRecipe,
    Component: ProgressBarDefault,
  },
  {
    id: "loading",
    name: "Loading",
    description: progressBarLoadingDescription,
    recipe: progressBarLoadingRecipe,
    Component: ProgressBarLoading,
  },
];

export default function ProgressBarLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Progress Bar examples"
      componentType="oj-progress-bar"
      items={progressBarLegacyItems}
      initialItemId="overview"
      navigationTitle="Progress Bar"
    />
  );
}
