import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { statusMeterGaugeStatusMeterGaugeCenterCallbackDescription } from "./statusMeterGauge-statusMeterGaugeCenterCallback/description";
import { statusMeterGaugeStatusMeterGaugeCenterCallbackRecipe } from "./statusMeterGauge-statusMeterGaugeCenterCallback/recipe";
import { StatusMeterGaugeStatusMeterGaugeCenterCallback } from "./statusMeterGauge-statusMeterGaugeCenterCallback/statusMeterGauge-statusMeterGaugeCenterCallback";
import { statusMeterGaugeStatusMeterGaugeCustomizationDescription } from "./statusMeterGauge-statusMeterGaugeCustomization/description";
import { statusMeterGaugeStatusMeterGaugeCustomizationRecipe } from "./statusMeterGauge-statusMeterGaugeCustomization/recipe";
import { StatusMeterGaugeStatusMeterGaugeCustomization } from "./statusMeterGauge-statusMeterGaugeCustomization/statusMeterGauge-statusMeterGaugeCustomization";
import { statusMeterGaugeStatusMeterGaugeDefaultDescription } from "./statusMeterGauge-statusMeterGaugeDefault/description";
import { statusMeterGaugeStatusMeterGaugeDefaultRecipe } from "./statusMeterGauge-statusMeterGaugeDefault/recipe";
import { StatusMeterGaugeStatusMeterGaugeDefault } from "./statusMeterGauge-statusMeterGaugeDefault/statusMeterGauge-statusMeterGaugeDefault";
import { statusMeterGaugeStatusMeterGaugeEventsDescription } from "./statusMeterGauge-statusMeterGaugeEvents/description";
import { statusMeterGaugeStatusMeterGaugeEventsRecipe } from "./statusMeterGauge-statusMeterGaugeEvents/recipe";
import { StatusMeterGaugeStatusMeterGaugeEvents } from "./statusMeterGauge-statusMeterGaugeEvents/statusMeterGauge-statusMeterGaugeEvents";
import { statusMeterGaugeStatusMeterGaugeSizingDescription } from "./statusMeterGauge-statusMeterGaugeSizing/description";
import { statusMeterGaugeStatusMeterGaugeSizingRecipe } from "./statusMeterGauge-statusMeterGaugeSizing/recipe";
import { StatusMeterGaugeStatusMeterGaugeSizing } from "./statusMeterGauge-statusMeterGaugeSizing/statusMeterGauge-statusMeterGaugeSizing";

const statusMeterGaugeItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Default",
    description: statusMeterGaugeStatusMeterGaugeDefaultDescription,
    recipe: statusMeterGaugeStatusMeterGaugeDefaultRecipe,
    Component: StatusMeterGaugeStatusMeterGaugeDefault,
  },
  {
    id: "customization",
    name: "Customization",
    description: statusMeterGaugeStatusMeterGaugeCustomizationDescription,
    recipe: statusMeterGaugeStatusMeterGaugeCustomizationRecipe,
    Component: StatusMeterGaugeStatusMeterGaugeCustomization,
  },
  {
    id: "sizing",
    name: "Sizing",
    description: statusMeterGaugeStatusMeterGaugeSizingDescription,
    recipe: statusMeterGaugeStatusMeterGaugeSizingRecipe,
    Component: StatusMeterGaugeStatusMeterGaugeSizing,
  },
  {
    id: "events",
    name: "Events",
    description: statusMeterGaugeStatusMeterGaugeEventsDescription,
    recipe: statusMeterGaugeStatusMeterGaugeEventsRecipe,
    Component: StatusMeterGaugeStatusMeterGaugeEvents,
  },
  {
    id: "center-callback",
    name: "Center Callback",
    description: statusMeterGaugeStatusMeterGaugeCenterCallbackDescription,
    recipe: statusMeterGaugeStatusMeterGaugeCenterCallbackRecipe,
    Component: StatusMeterGaugeStatusMeterGaugeCenterCallback,
  },
];

export default function StatusMeterGaugeRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Status Meter Gauge examples"
      componentType="oj-status-meter-gauge"
      layoutId="statusMeterGaugeNavigationLayout"
      items={statusMeterGaugeItems}
      initialItemId="default"
      navigationTitle="Status Meter Gauge"
      routeSegments={["meters", "status-meter-gauge"]}
    />
  );
}
