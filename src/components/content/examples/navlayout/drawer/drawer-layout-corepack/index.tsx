import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { drawerLayoutBasiccorepackDescription } from "./drawerLayout-basiccorepack/description";
import { DrawerLayoutBasiccorepack } from "./drawerLayout-basiccorepack/drawerLayout-basiccorepack";
import { drawerLayoutBasiccorepackRecipe } from "./drawerLayout-basiccorepack/recipe";
import { drawerLayoutCancelableEventscorepackDescription } from "./drawerLayout-cancelableEventscorepack/description";
import { DrawerLayoutCancelableEventscorepack } from "./drawerLayout-cancelableEventscorepack/drawerLayout-cancelableEventscorepack";
import { drawerLayoutCancelableEventscorepackRecipe } from "./drawerLayout-cancelableEventscorepack/recipe";
import { drawerLayoutDisplayModecorepackDescription } from "./drawerLayout-displayModecorepack/description";
import { DrawerLayoutDisplayModecorepack } from "./drawerLayout-displayModecorepack/drawerLayout-displayModecorepack";
import { drawerLayoutDisplayModecorepackRecipe } from "./drawerLayout-displayModecorepack/recipe";
import { drawerLayoutEventscorepackDescription } from "./drawerLayout-eventscorepack/description";
import { DrawerLayoutEventscorepack } from "./drawerLayout-eventscorepack/drawerLayout-eventscorepack";
import { drawerLayoutEventscorepackRecipe } from "./drawerLayout-eventscorepack/recipe";
import { drawerLayoutInsetLayoutcorepackDescription } from "./drawerLayout-insetLayoutcorepack/description";
import { DrawerLayoutInsetLayoutcorepack } from "./drawerLayout-insetLayoutcorepack/drawerLayout-insetLayoutcorepack";
import { drawerLayoutInsetLayoutcorepackRecipe } from "./drawerLayout-insetLayoutcorepack/recipe";
import { drawerLayoutMultipleDrawerscorepackDescription } from "./drawerLayout-multipleDrawerscorepack/description";
import { DrawerLayoutMultipleDrawerscorepack } from "./drawerLayout-multipleDrawerscorepack/drawerLayout-multipleDrawerscorepack";
import { drawerLayoutMultipleDrawerscorepackRecipe } from "./drawerLayout-multipleDrawerscorepack/recipe";
import { drawerLayoutSizingcorepackDescription } from "./drawerLayout-sizingcorepack/description";
import { DrawerLayoutSizingcorepack } from "./drawerLayout-sizingcorepack/drawerLayout-sizingcorepack";
import { drawerLayoutSizingcorepackRecipe } from "./drawerLayout-sizingcorepack/recipe";

const drawerLayoutCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: drawerLayoutBasiccorepackDescription,
    recipe: drawerLayoutBasiccorepackRecipe,
    Component: DrawerLayoutBasiccorepack,
  },
  {
    id: "display-mode",
    name: "Display Mode",
    description: drawerLayoutDisplayModecorepackDescription,
    recipe: drawerLayoutDisplayModecorepackRecipe,
    Component: DrawerLayoutDisplayModecorepack,
  },
  {
    id: "multiple-drawers",
    name: "Multiple Drawers",
    description: drawerLayoutMultipleDrawerscorepackDescription,
    recipe: drawerLayoutMultipleDrawerscorepackRecipe,
    Component: DrawerLayoutMultipleDrawerscorepack,
  },
  {
    id: "sizing",
    name: "Sizing",
    description: drawerLayoutSizingcorepackDescription,
    recipe: drawerLayoutSizingcorepackRecipe,
    Component: DrawerLayoutSizingcorepack,
  },
  {
    id: "inset-layout",
    name: "Inset Layout",
    description: drawerLayoutInsetLayoutcorepackDescription,
    recipe: drawerLayoutInsetLayoutcorepackRecipe,
    Component: DrawerLayoutInsetLayoutcorepack,
  },
  {
    id: "events",
    name: "Events",
    description: drawerLayoutEventscorepackDescription,
    recipe: drawerLayoutEventscorepackRecipe,
    Component: DrawerLayoutEventscorepack,
  },
  {
    id: "cancelable-events",
    name: "Cancelable Events",
    description: drawerLayoutCancelableEventscorepackDescription,
    recipe: drawerLayoutCancelableEventscorepackRecipe,
    Component: DrawerLayoutCancelableEventscorepack,
  },
];

export default function DrawerLayoutCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Drawer Layout Core Pack examples"
      componentType="oj-c-drawer-layout"
      packLabel="Core Pack"
      items={drawerLayoutCorePackItems}
      initialItemId="basic"
      navigationTitle="Drawer Layout Core Pack"
    />
  );
}
