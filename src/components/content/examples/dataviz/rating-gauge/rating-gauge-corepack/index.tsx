import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { RatingGaugeOverviewcorepack } from "./ratingGauge-overviewcorepack/ratingGauge-overviewcorepack";
import { ratingGaugeOverviewcorepackDescription } from "./ratingGauge-overviewcorepack/description";
import { ratingGaugeOverviewcorepackRecipe } from "./ratingGauge-overviewcorepack/recipe";
import { RatingGaugeEventscorepack } from "./ratingGauge-eventscorepack/ratingGauge-eventscorepack";
import { ratingGaugeEventscorepackDescription } from "./ratingGauge-eventscorepack/description";
import { ratingGaugeEventscorepackRecipe } from "./ratingGauge-eventscorepack/recipe";

const ratingGaugeCorePackItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: ratingGaugeOverviewcorepackDescription,
    recipe: ratingGaugeOverviewcorepackRecipe,
    Component: RatingGaugeOverviewcorepack,
  },
  {
    id: "events",
    name: "Events",
    description: ratingGaugeEventscorepackDescription,
    recipe: ratingGaugeEventscorepackRecipe,
    Component: RatingGaugeEventscorepack,
  },
];

export default function RatingGaugeCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Rating Gauge Core Pack examples"
      componentType="oj-c-rating-gauge"
      packLabel="Core Pack"
      layoutId="ratingGaugeCorePackNavigationLayout"
      items={ratingGaugeCorePackItems}
      initialItemId="overview"
      navigationTitle="Rating Gauge"
    />
  );
}
