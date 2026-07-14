import "css!./rating-gauge-legacy.css";
import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ratingGaugeRatingGaugeComponentDescription } from "./ratingGauge-ratingGaugeComponent/description";
import { RatingGaugeRatingGaugeComponent } from "./ratingGauge-ratingGaugeComponent/ratingGauge-ratingGaugeComponent";
import { ratingGaugeRatingGaugeComponentRecipe } from "./ratingGauge-ratingGaugeComponent/recipe";
import { ratingGaugeRatingGaugeEventsDescription } from "./ratingGauge-ratingGaugeEvents/description";
import { RatingGaugeRatingGaugeEvents } from "./ratingGauge-ratingGaugeEvents/ratingGauge-ratingGaugeEvents";
import { ratingGaugeRatingGaugeEventsRecipe } from "./ratingGauge-ratingGaugeEvents/recipe";

const ratingGaugeLegacyItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: ratingGaugeRatingGaugeComponentDescription,
    recipe: ratingGaugeRatingGaugeComponentRecipe,
    Component: RatingGaugeRatingGaugeComponent,
  },
  {
    id: "events",
    name: "Events",
    description: ratingGaugeRatingGaugeEventsDescription,
    recipe: ratingGaugeRatingGaugeEventsRecipe,
    Component: RatingGaugeRatingGaugeEvents,
  },
];

export default function RatingGaugeLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Rating Gauge examples"
      componentType="oj-rating-gauge"
      layoutId="ratingGaugeLegacyNavigationLayout"
      items={ratingGaugeLegacyItems}
      initialItemId="overview"
      navigationTitle="Rating Gauge"
    />
  );
}
