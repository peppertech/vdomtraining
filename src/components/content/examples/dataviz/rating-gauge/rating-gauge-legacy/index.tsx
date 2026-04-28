import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { RatingGaugeRatingGaugeComponent } from "./ratingGauge-ratingGaugeComponent/ratingGauge-ratingGaugeComponent";
import { ratingGaugeRatingGaugeComponentDescription } from "./ratingGauge-ratingGaugeComponent/description";
import { ratingGaugeRatingGaugeComponentRecipe } from "./ratingGauge-ratingGaugeComponent/recipe";
import { RatingGaugeRatingGaugeEvents } from "./ratingGauge-ratingGaugeEvents/ratingGauge-ratingGaugeEvents";
import { ratingGaugeRatingGaugeEventsDescription } from "./ratingGauge-ratingGaugeEvents/description";
import { ratingGaugeRatingGaugeEventsRecipe } from "./ratingGauge-ratingGaugeEvents/recipe";

const ratingGaugeLegacyItems: RecipePageItem[] = [
  {
    id: "component",
    name: "Component",
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
      initialItemId="component"
      navigationTitle="Rating Gauge"
    />
  );
}
