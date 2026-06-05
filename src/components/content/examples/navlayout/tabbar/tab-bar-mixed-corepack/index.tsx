import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TabBarMixedBasiccorepack } from "./tabBarMixed-basiccorepack/tabBarMixed-basiccorepack";
import { tabBarMixedBasiccorepackDescription } from "./tabBarMixed-basiccorepack/description";
import { tabBarMixedBasiccorepackRecipe } from "./tabBarMixed-basiccorepack/recipe";
import { TabBarMixedOverflowIconcorepack } from "./tabBarMixed-overflowIconcorepack/tabBarMixed-overflowIconcorepack";
import { tabBarMixedOverflowIconcorepackDescription } from "./tabBarMixed-overflowIconcorepack/description";
import { tabBarMixedOverflowIconcorepackRecipe } from "./tabBarMixed-overflowIconcorepack/recipe";
import { TabBarMixedResponsivecorepack } from "./tabBarMixed-responsivecorepack/tabBarMixed-responsivecorepack";
import { tabBarMixedResponsivecorepackDescription } from "./tabBarMixed-responsivecorepack/description";
import { tabBarMixedResponsivecorepackRecipe } from "./tabBarMixed-responsivecorepack/recipe";
import { TabBarMixedSelectioncorepack } from "./tabBarMixed-selectioncorepack/tabBarMixed-selectioncorepack";
import { tabBarMixedSelectioncorepackDescription } from "./tabBarMixed-selectioncorepack/description";
import { tabBarMixedSelectioncorepackRecipe } from "./tabBarMixed-selectioncorepack/recipe";

const tabBarMixedCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: tabBarMixedBasiccorepackDescription,
    recipe: tabBarMixedBasiccorepackRecipe,
    Component: TabBarMixedBasiccorepack,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: tabBarMixedResponsivecorepackDescription,
    recipe: tabBarMixedResponsivecorepackRecipe,
    Component: TabBarMixedResponsivecorepack,
  },
  {
    id: "selection",
    name: "Monitor Selection",
    description: tabBarMixedSelectioncorepackDescription,
    recipe: tabBarMixedSelectioncorepackRecipe,
    Component: TabBarMixedSelectioncorepack,
  },
  {
    id: "overflow-icon",
    name: "Custom Overflow Icon",
    description: tabBarMixedOverflowIconcorepackDescription,
    recipe: tabBarMixedOverflowIconcorepackRecipe,
    Component: TabBarMixedOverflowIconcorepack,
  }
];

export default function TabBarMixedCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Tab Bar Mixed Core Pack examples"
      componentType="oj-c-tab-bar-mixed"
      packLabel="Core Pack"
      items={tabBarMixedCorePackItems}
      initialItemId="basic"
      navigationTitle="Tab Bar Mixed Core Pack"
    />
  );
}
