import "css!./rating-gauge-corepack.css";
import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ratingGaugeEventscorepackDescription } from "./ratingGauge-eventscorepack/description";
import { RatingGaugeEventscorepack } from "./ratingGauge-eventscorepack/ratingGauge-eventscorepack";
import { ratingGaugeEventscorepackRecipe } from "./ratingGauge-eventscorepack/recipe";
import { ratingGaugeOverviewcorepackDescription } from "./ratingGauge-overviewcorepack/description";
import { RatingGaugeOverviewcorepack } from "./ratingGauge-overviewcorepack/ratingGauge-overviewcorepack";
import { ratingGaugeOverviewcorepackRecipe } from "./ratingGauge-overviewcorepack/recipe";

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
