import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { progressCircleDefaultDescription } from "./progressCircle-default/description";
import { ProgressCircleDefault } from "./progressCircle-default/progressCircle-default";
import { progressCircleDefaultRecipe } from "./progressCircle-default/recipe";
import { progressCircleLoadingDescription } from "./progressCircle-loading/description";
import { ProgressCircleLoading } from "./progressCircle-loading/progressCircle-loading";
import { progressCircleLoadingRecipe } from "./progressCircle-loading/recipe";
import { progressCircleOverviewDescription } from "./progressCircle-overview/description";
import { ProgressCircleOverview } from "./progressCircle-overview/progressCircle-overview";
import { progressCircleOverviewRecipe } from "./progressCircle-overview/recipe";

const progressCircleLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: progressCircleOverviewDescription,
    recipe: progressCircleOverviewRecipe,
    Component: ProgressCircleOverview,
  },
  {
    id: "default",
    name: "Basic",
    description: progressCircleDefaultDescription,
    recipe: progressCircleDefaultRecipe,
    Component: ProgressCircleDefault,
  },
  {
    id: "loading",
    name: "Loading",
    description: progressCircleLoadingDescription,
    recipe: progressCircleLoadingRecipe,
    Component: ProgressCircleLoading,
  },
];

export default function ProgressCircleLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Progress Circle examples"
      componentType="oj-progress-circle"
      items={progressCircleLegacyItems}
      initialItemId="overview"
      navigationTitle="Progress Circle"
    />
  );
}
