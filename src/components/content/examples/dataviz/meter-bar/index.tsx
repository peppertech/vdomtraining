import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { meterBarCustomizationcorepackDescription } from "./meterBar-customizationcorepack/description";
import { MeterBarCustomizationcorepack } from "./meterBar-customizationcorepack/meterBar-customizationcorepack";
import { meterBarCustomizationcorepackRecipe } from "./meterBar-customizationcorepack/recipe";
import { meterBarEventscorepackDescription } from "./meterBar-eventscorepack/description";
import { MeterBarEventscorepack } from "./meterBar-eventscorepack/meterBar-eventscorepack";
import { meterBarEventscorepackRecipe } from "./meterBar-eventscorepack/recipe";
import { meterBarOverviewcorepackDescription } from "./meterBar-overviewcorepack/description";
import { MeterBarOverviewcorepack } from "./meterBar-overviewcorepack/meterBar-overviewcorepack";
import { meterBarOverviewcorepackRecipe } from "./meterBar-overviewcorepack/recipe";
import { meterBarSizingcorepackDescription } from "./meterBar-sizingcorepack/description";
import { MeterBarSizingcorepack } from "./meterBar-sizingcorepack/meterBar-sizingcorepack";
import { meterBarSizingcorepackRecipe } from "./meterBar-sizingcorepack/recipe";

const meterBarItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: meterBarOverviewcorepackDescription,
    recipe: meterBarOverviewcorepackRecipe,
    Component: MeterBarOverviewcorepack,
  },
  {
    id: "customization",
    name: "Customization",
    description: meterBarCustomizationcorepackDescription,
    recipe: meterBarCustomizationcorepackRecipe,
    Component: MeterBarCustomizationcorepack,
  },
  {
    id: "sizing",
    name: "Sizing",
    description: meterBarSizingcorepackDescription,
    recipe: meterBarSizingcorepackRecipe,
    Component: MeterBarSizingcorepack,
  },
  {
    id: "events",
    name: "Events",
    description: meterBarEventscorepackDescription,
    recipe: meterBarEventscorepackRecipe,
    Component: MeterBarEventscorepack,
  },
];

export default function MeterBarRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Meter Bar examples"
      componentType="oj-c-meter-bar"
      packLabel="Core Pack"
      layoutId="meterBarNavigationLayout"
      items={meterBarItems}
      initialItemId="overview"
      navigationTitle="Meter Bar"
      routeSegments={["meters", "meter-bar"]}
    />
  );
}
