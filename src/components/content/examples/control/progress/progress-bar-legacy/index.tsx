import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { progressBarDefaultDescription } from "./progressBar-default/description";
import { ProgressBarDefault } from "./progressBar-default/progressBar-default";
import { progressBarDefaultRecipe } from "./progressBar-default/recipe";
import { progressBarLoadingDescription } from "./progressBar-loading/description";
import { ProgressBarLoading } from "./progressBar-loading/progressBar-loading";
import { progressBarLoadingRecipe } from "./progressBar-loading/recipe";
import { progressBarOverviewDescription } from "./progressBar-overview/description";
import { ProgressBarOverview } from "./progressBar-overview/progressBar-overview";
import { progressBarOverviewRecipe } from "./progressBar-overview/recipe";

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
