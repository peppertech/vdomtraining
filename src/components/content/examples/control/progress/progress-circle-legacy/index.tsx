import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ProgressCircleOverview } from "./progressCircle-overview/progressCircle-overview";
import { progressCircleOverviewDescription } from "./progressCircle-overview/description";
import { progressCircleOverviewRecipe } from "./progressCircle-overview/recipe";
import { ProgressCircleDefault } from "./progressCircle-default/progressCircle-default";
import { progressCircleDefaultDescription } from "./progressCircle-default/description";
import { progressCircleDefaultRecipe } from "./progressCircle-default/recipe";
import { ProgressCircleLoading } from "./progressCircle-loading/progressCircle-loading";
import { progressCircleLoadingDescription } from "./progressCircle-loading/description";
import { progressCircleLoadingRecipe } from "./progressCircle-loading/recipe";

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
