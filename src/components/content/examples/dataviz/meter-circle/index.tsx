import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { MeterCircleOverviewcorepack } from "./meterCircle-overviewcorepack/meterCircle-overviewcorepack";
import { meterCircleOverviewcorepackDescription } from "./meterCircle-overviewcorepack/description";
import { meterCircleOverviewcorepackRecipe } from "./meterCircle-overviewcorepack/recipe";
import { MeterCircleCustomizationcorepack } from "./meterCircle-customizationcorepack/meterCircle-customizationcorepack";
import { meterCircleCustomizationcorepackDescription } from "./meterCircle-customizationcorepack/description";
import { meterCircleCustomizationcorepackRecipe } from "./meterCircle-customizationcorepack/recipe";
import { MeterCircleCenterContentcorepack } from "./meterCircle-centerContentcorepack/meterCircle-centerContentcorepack";
import { meterCircleCenterContentcorepackDescription } from "./meterCircle-centerContentcorepack/description";
import { meterCircleCenterContentcorepackRecipe } from "./meterCircle-centerContentcorepack/recipe";
import { MeterCircleSizingcorepack } from "./meterCircle-sizingcorepack/meterCircle-sizingcorepack";
import { meterCircleSizingcorepackDescription } from "./meterCircle-sizingcorepack/description";
import { meterCircleSizingcorepackRecipe } from "./meterCircle-sizingcorepack/recipe";
import { MeterCircleEventscorepack } from "./meterCircle-eventscorepack/meterCircle-eventscorepack";
import { meterCircleEventscorepackDescription } from "./meterCircle-eventscorepack/description";
import { meterCircleEventscorepackRecipe } from "./meterCircle-eventscorepack/recipe";

const meterCircleItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: meterCircleOverviewcorepackDescription,
    recipe: meterCircleOverviewcorepackRecipe,
    Component: MeterCircleOverviewcorepack,
  },
  {
    id: "customization",
    name: "Customization",
    description: meterCircleCustomizationcorepackDescription,
    recipe: meterCircleCustomizationcorepackRecipe,
    Component: MeterCircleCustomizationcorepack,
  },
  {
    id: "center-content",
    name: "Center Content",
    description: meterCircleCenterContentcorepackDescription,
    recipe: meterCircleCenterContentcorepackRecipe,
    Component: MeterCircleCenterContentcorepack,
  },
  {
    id: "sizing",
    name: "Sizing",
    description: meterCircleSizingcorepackDescription,
    recipe: meterCircleSizingcorepackRecipe,
    Component: MeterCircleSizingcorepack,
  },
  {
    id: "events",
    name: "Events",
    description: meterCircleEventscorepackDescription,
    recipe: meterCircleEventscorepackRecipe,
    Component: MeterCircleEventscorepack,
  },
];

export default function MeterCircleRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Meter Circle examples"
      componentType="oj-c-meter-circle"
      packLabel="Core Pack"
      layoutId="meterCircleNavigationLayout"
      items={meterCircleItems}
      initialItemId="overview"
      navigationTitle="Meter Circle"
    />
  );
}
