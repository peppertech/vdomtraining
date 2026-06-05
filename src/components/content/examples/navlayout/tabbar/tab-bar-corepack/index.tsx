import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TabBarAddAndRemovecorepack } from "./tabBar-addAndRemovecorepack/tabBar-addAndRemovecorepack";
import { tabBarAddAndRemovecorepackDescription } from "./tabBar-addAndRemovecorepack/description";
import { tabBarAddAndRemovecorepackRecipe } from "./tabBar-addAndRemovecorepack/recipe";
import { TabBarBadgecorepack } from "./tabBar-badgecorepack/tabBar-badgecorepack";
import { tabBarBadgecorepackDescription } from "./tabBar-badgecorepack/description";
import { tabBarBadgecorepackRecipe } from "./tabBar-badgecorepack/recipe";
import { TabBarBasiccorepack } from "./tabBar-basiccorepack/tabBar-basiccorepack";
import { tabBarBasiccorepackDescription } from "./tabBar-basiccorepack/description";
import { tabBarBasiccorepackRecipe } from "./tabBar-basiccorepack/recipe";
import { TabBarContextMenucorepack } from "./tabBar-contextMenucorepack/tabBar-contextMenucorepack";
import { tabBarContextMenucorepackDescription } from "./tabBar-contextMenucorepack/description";
import { tabBarContextMenucorepackRecipe } from "./tabBar-contextMenucorepack/recipe";
import { TabBarDataProvidercorepack } from "./tabBar-dataProvidercorepack/tabBar-dataProvidercorepack";
import { tabBarDataProvidercorepackDescription } from "./tabBar-dataProvidercorepack/description";
import { tabBarDataProvidercorepackRecipe } from "./tabBar-dataProvidercorepack/recipe";
import { TabBarLinkcorepack } from "./tabBar-linkcorepack/tabBar-linkcorepack";
import { tabBarLinkcorepackDescription } from "./tabBar-linkcorepack/description";
import { tabBarLinkcorepackRecipe } from "./tabBar-linkcorepack/recipe";
import { TabBarOverflowcorepack } from "./tabBar-overflowcorepack/tabBar-overflowcorepack";
import { tabBarOverflowcorepackDescription } from "./tabBar-overflowcorepack/description";
import { tabBarOverflowcorepackRecipe } from "./tabBar-overflowcorepack/recipe";
import { TabBarReordercorepack } from "./tabBar-reordercorepack/tabBar-reordercorepack";
import { tabBarReordercorepackDescription } from "./tabBar-reordercorepack/description";
import { tabBarReordercorepackRecipe } from "./tabBar-reordercorepack/recipe";
import { TabBarResponsivecorepack } from "./tabBar-responsivecorepack/tabBar-responsivecorepack";
import { tabBarResponsivecorepackDescription } from "./tabBar-responsivecorepack/description";
import { tabBarResponsivecorepackRecipe } from "./tabBar-responsivecorepack/recipe";
import { TabBarRoutingcorepack } from "./tabBar-routingcorepack/tabBar-routingcorepack";
import { tabBarRoutingcorepackDescription } from "./tabBar-routingcorepack/description";
import { tabBarRoutingcorepackRecipe } from "./tabBar-routingcorepack/recipe";
import { TabBarSelectioncorepack } from "./tabBar-selectioncorepack/tabBar-selectioncorepack";
import { tabBarSelectioncorepackDescription } from "./tabBar-selectioncorepack/description";
import { tabBarSelectioncorepackRecipe } from "./tabBar-selectioncorepack/recipe";
import { TabBarUsingSwitchercorepack } from "./tabBar-usingSwitchercorepack/tabBar-usingSwitchercorepack";
import { tabBarUsingSwitchercorepackDescription } from "./tabBar-usingSwitchercorepack/description";
import { tabBarUsingSwitchercorepackRecipe } from "./tabBar-usingSwitchercorepack/recipe";

const tabBarCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: tabBarBasiccorepackDescription,
    recipe: tabBarBasiccorepackRecipe,
    Component: TabBarBasiccorepack,
  },
  {
    id: "data-provider",
    name: "Data Provider",
    description: tabBarDataProvidercorepackDescription,
    recipe: tabBarDataProvidercorepackRecipe,
    Component: TabBarDataProvidercorepack,
  },
  {
    id: "selection",
    name: "Monitor Selection",
    description: tabBarSelectioncorepackDescription,
    recipe: tabBarSelectioncorepackRecipe,
    Component: TabBarSelectioncorepack,
  },
  {
    id: "overflow",
    name: "Overflow & Truncation",
    description: tabBarOverflowcorepackDescription,
    recipe: tabBarOverflowcorepackRecipe,
    Component: TabBarOverflowcorepack,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: tabBarResponsivecorepackDescription,
    recipe: tabBarResponsivecorepackRecipe,
    Component: TabBarResponsivecorepack,
  },
  {
    id: "badge",
    name: "Badge",
    description: tabBarBadgecorepackDescription,
    recipe: tabBarBadgecorepackRecipe,
    Component: TabBarBadgecorepack,
  },
  {
    id: "add-remove",
    name: "Add And Remove",
    description: tabBarAddAndRemovecorepackDescription,
    recipe: tabBarAddAndRemovecorepackRecipe,
    Component: TabBarAddAndRemovecorepack,
  },
  {
    id: "reorder",
    name: "Reorder",
    description: tabBarReordercorepackDescription,
    recipe: tabBarReordercorepackRecipe,
    Component: TabBarReordercorepack,
  },
  {
    id: "switcher",
    name: "Using Switcher",
    description: tabBarUsingSwitchercorepackDescription,
    recipe: tabBarUsingSwitchercorepackRecipe,
    Component: TabBarUsingSwitchercorepack,
  },
  {
    id: "routing",
    name: "Routing",
    description: tabBarRoutingcorepackDescription,
    recipe: tabBarRoutingcorepackRecipe,
    Component: TabBarRoutingcorepack,
  },
  {
    id: "link",
    name: "Link",
    description: tabBarLinkcorepackDescription,
    recipe: tabBarLinkcorepackRecipe,
    Component: TabBarLinkcorepack,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: tabBarContextMenucorepackDescription,
    recipe: tabBarContextMenucorepackRecipe,
    Component: TabBarContextMenucorepack,
  }
];

export default function TabBarCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Tab Bar Core Pack examples"
      componentType="oj-c-tab-bar"
      packLabel="Core Pack"
      items={tabBarCorePackItems}
      initialItemId="basic"
      navigationTitle="Tab Bar Core Pack"
    />
  );
}
