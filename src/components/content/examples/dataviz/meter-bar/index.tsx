import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { MeterBarOverviewcorepack } from "./meterBar-overviewcorepack/meterBar-overviewcorepack";
import { meterBarOverviewcorepackDescription } from "./meterBar-overviewcorepack/description";
import { meterBarOverviewcorepackRecipe } from "./meterBar-overviewcorepack/recipe";
import { MeterBarCustomizationcorepack } from "./meterBar-customizationcorepack/meterBar-customizationcorepack";
import { meterBarCustomizationcorepackDescription } from "./meterBar-customizationcorepack/description";
import { meterBarCustomizationcorepackRecipe } from "./meterBar-customizationcorepack/recipe";
import { MeterBarSizingcorepack } from "./meterBar-sizingcorepack/meterBar-sizingcorepack";
import { meterBarSizingcorepackDescription } from "./meterBar-sizingcorepack/description";
import { meterBarSizingcorepackRecipe } from "./meterBar-sizingcorepack/recipe";
import { MeterBarEventscorepack } from "./meterBar-eventscorepack/meterBar-eventscorepack";
import { meterBarEventscorepackDescription } from "./meterBar-eventscorepack/description";
import { meterBarEventscorepackRecipe } from "./meterBar-eventscorepack/recipe";

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
    />
  );
}
