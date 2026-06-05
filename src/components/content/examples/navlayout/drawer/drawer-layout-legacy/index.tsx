import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { DrawerLayoutBasic } from "./drawerLayout-basic/drawerLayout-basic";
import { drawerLayoutBasicDescription } from "./drawerLayout-basic/description";
import { drawerLayoutBasicRecipe } from "./drawerLayout-basic/recipe";
import { DrawerLayoutCancelableEvents } from "./drawerLayout-cancelableEvents/drawerLayout-cancelableEvents";
import { drawerLayoutCancelableEventsDescription } from "./drawerLayout-cancelableEvents/description";
import { drawerLayoutCancelableEventsRecipe } from "./drawerLayout-cancelableEvents/recipe";
import { DrawerLayoutDisplayMode } from "./drawerLayout-displayMode/drawerLayout-displayMode";
import { drawerLayoutDisplayModeDescription } from "./drawerLayout-displayMode/description";
import { drawerLayoutDisplayModeRecipe } from "./drawerLayout-displayMode/recipe";
import { DrawerLayoutEvents } from "./drawerLayout-events/drawerLayout-events";
import { drawerLayoutEventsDescription } from "./drawerLayout-events/description";
import { drawerLayoutEventsRecipe } from "./drawerLayout-events/recipe";
import { DrawerLayoutInsetLayout } from "./drawerLayout-insetLayout/drawerLayout-insetLayout";
import { drawerLayoutInsetLayoutDescription } from "./drawerLayout-insetLayout/description";
import { drawerLayoutInsetLayoutRecipe } from "./drawerLayout-insetLayout/recipe";
import { DrawerLayoutMultipleDrawers } from "./drawerLayout-multipleDrawers/drawerLayout-multipleDrawers";
import { drawerLayoutMultipleDrawersDescription } from "./drawerLayout-multipleDrawers/description";
import { drawerLayoutMultipleDrawersRecipe } from "./drawerLayout-multipleDrawers/recipe";
import { DrawerLayoutSizing } from "./drawerLayout-sizing/drawerLayout-sizing";
import { drawerLayoutSizingDescription } from "./drawerLayout-sizing/description";
import { drawerLayoutSizingRecipe } from "./drawerLayout-sizing/recipe";

const drawerLayoutLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: drawerLayoutBasicDescription,
    recipe: drawerLayoutBasicRecipe,
    Component: DrawerLayoutBasic,
  },
  {
    id: "display-mode",
    name: "Display Mode",
    description: drawerLayoutDisplayModeDescription,
    recipe: drawerLayoutDisplayModeRecipe,
    Component: DrawerLayoutDisplayMode,
  },
  {
    id: "multiple-drawers",
    name: "Multiple Drawers",
    description: drawerLayoutMultipleDrawersDescription,
    recipe: drawerLayoutMultipleDrawersRecipe,
    Component: DrawerLayoutMultipleDrawers,
  },
  {
    id: "sizing",
    name: "Sizing",
    description: drawerLayoutSizingDescription,
    recipe: drawerLayoutSizingRecipe,
    Component: DrawerLayoutSizing,
  },
   {
    id: "inset-layout",
    name: "Inset Layout",
    description: drawerLayoutInsetLayoutDescription,
    recipe: drawerLayoutInsetLayoutRecipe,
    Component: DrawerLayoutInsetLayout,
  },
  {
    id: "events",
    name: "Events",
    description: drawerLayoutEventsDescription,
    recipe: drawerLayoutEventsRecipe,
    Component: DrawerLayoutEvents,
  },
  {
    id: "cancelable-events",
    name: "Cancelable Events",
    description: drawerLayoutCancelableEventsDescription,
    recipe: drawerLayoutCancelableEventsRecipe,
    Component: DrawerLayoutCancelableEvents,
  },
];

export default function DrawerLayoutLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Drawer Layout examples"
      componentType="oj-drawer-layout"
      items={drawerLayoutLegacyItems}
      initialItemId="basic"
      navigationTitle="Drawer Layout"
    />
  );
}
