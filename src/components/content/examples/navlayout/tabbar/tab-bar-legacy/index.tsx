import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TabbarTbaddremovetabs } from "./tabbar-tbaddremovetabs/tabbar-tbaddremovetabs";
import { tabbarTbaddremovetabsDescription } from "./tabbar-tbaddremovetabs/description";
import { tabbarTbaddremovetabsRecipe } from "./tabbar-tbaddremovetabs/recipe";
import { TabbarTbbadge } from "./tabbar-tbbadge/tabbar-tbbadge";
import { tabbarTbbadgeDescription } from "./tabbar-tbbadge/description";
import { tabbarTbbadgeRecipe } from "./tabbar-tbbadge/recipe";
import { TabbarTbbasic } from "./tabbar-tbbasic/tabbar-tbbasic";
import { tabbarTbbasicDescription } from "./tabbar-tbbasic/description";
import { tabbarTbbasicRecipe } from "./tabbar-tbbasic/recipe";
import { TabbarTboverflow } from "./tabbar-tboverflow/tabbar-tboverflow";
import { tabbarTboverflowDescription } from "./tabbar-tboverflow/description";
import { tabbarTboverflowRecipe } from "./tabbar-tboverflow/recipe";
import { TabbarTbreorder } from "./tabbar-tbreorder/tabbar-tbreorder";
import { tabbarTbreorderDescription } from "./tabbar-tbreorder/description";
import { tabbarTbreorderRecipe } from "./tabbar-tbreorder/recipe";
import { TabbarTbresponsive } from "./tabbar-tbresponsive/tabbar-tbresponsive";
import { tabbarTbresponsiveDescription } from "./tabbar-tbresponsive/description";
import { tabbarTbresponsiveRecipe } from "./tabbar-tbresponsive/recipe";
import { TabbarTbselection } from "./tabbar-tbselection/tabbar-tbselection";
import { tabbarTbselectionDescription } from "./tabbar-tbselection/description";
import { tabbarTbselectionRecipe } from "./tabbar-tbselection/recipe";
import { TabbarTbswitcher } from "./tabbar-tbswitcher/tabbar-tbswitcher";
import { tabbarTbswitcherDescription } from "./tabbar-tbswitcher/description";
import { tabbarTbswitcherRecipe } from "./tabbar-tbswitcher/recipe";
import { TabbarTabrouting } from "./tabbar-tabrouting/tabbar-tabrouting";
import { tabbarTabroutingDescription } from "./tabbar-tabrouting/description";
import { tabbarTabroutingRecipe } from "./tabbar-tabrouting/recipe";

const tabBarLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: tabbarTbbasicDescription,
    recipe: tabbarTbbasicRecipe,
    Component: TabbarTbbasic,
  },
  {
    id: "overflow",
    name: "Overflow & Truncation",
    description: tabbarTboverflowDescription,
    recipe: tabbarTboverflowRecipe,
    Component: TabbarTboverflow,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: tabbarTbresponsiveDescription,
    recipe: tabbarTbresponsiveRecipe,
    Component: TabbarTbresponsive,
  },
  {
    id: "add-remove",
    name: "Add And Remove",
    description: tabbarTbaddremovetabsDescription,
    recipe: tabbarTbaddremovetabsRecipe,
    Component: TabbarTbaddremovetabs,
  },
  {
    id: "reorder",
    name: "Reorder",
    description: tabbarTbreorderDescription,
    recipe: tabbarTbreorderRecipe,
    Component: TabbarTbreorder,
  },
  {
    id: "selection",
    name: "Monitor Selection",
    description: tabbarTbselectionDescription,
    recipe: tabbarTbselectionRecipe,
    Component: TabbarTbselection,
  },
  {
    id: "switcher",
    name: "Using Switcher",
    description: tabbarTbswitcherDescription,
    recipe: tabbarTbswitcherRecipe,
    Component: TabbarTbswitcher,
  },
  {
    id: "routing",
    name: "Routing",
    description: tabbarTabroutingDescription,
    recipe: tabbarTabroutingRecipe,
    Component: TabbarTabrouting,
  },
  {
    id: "badge",
    name: "Badge",
    description: tabbarTbbadgeDescription,
    recipe: tabbarTbbadgeRecipe,
    Component: TabbarTbbadge,
  },
];

export default function TabBarLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Tab Bar examples"
      componentType="oj-tab-bar"
      items={tabBarLegacyItems}
      initialItemId="basic"
      navigationTitle="Tab Bar"
    />
  );
}
