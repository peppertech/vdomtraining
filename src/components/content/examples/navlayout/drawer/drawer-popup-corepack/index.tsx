import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { DrawerPopupAutoDismisscorepack } from "./drawerPopup-autoDismisscorepack/drawerPopup-autoDismisscorepack";
import { drawerPopupAutoDismisscorepackDescription } from "./drawerPopup-autoDismisscorepack/description";
import { drawerPopupAutoDismisscorepackRecipe } from "./drawerPopup-autoDismisscorepack/recipe";
import { DrawerPopupBasiccorepack } from "./drawerPopup-basiccorepack/drawerPopup-basiccorepack";
import { drawerPopupBasiccorepackDescription } from "./drawerPopup-basiccorepack/description";
import { drawerPopupBasiccorepackRecipe } from "./drawerPopup-basiccorepack/recipe";
import { DrawerPopupCancelableEventscorepack } from "./drawerPopup-cancelableEventscorepack/drawerPopup-cancelableEventscorepack";
import { drawerPopupCancelableEventscorepackDescription } from "./drawerPopup-cancelableEventscorepack/description";
import { drawerPopupCancelableEventscorepackRecipe } from "./drawerPopup-cancelableEventscorepack/recipe";
import { DrawerPopupEventscorepack } from "./drawerPopup-eventscorepack/drawerPopup-eventscorepack";
import { drawerPopupEventscorepackDescription } from "./drawerPopup-eventscorepack/description";
import { drawerPopupEventscorepackRecipe } from "./drawerPopup-eventscorepack/recipe";
import { DrawerPopupModalitycorepack } from "./drawerPopup-modalitycorepack/drawerPopup-modalitycorepack";
import { drawerPopupModalitycorepackDescription } from "./drawerPopup-modalitycorepack/description";
import { drawerPopupModalitycorepackRecipe } from "./drawerPopup-modalitycorepack/recipe";
import { DrawerPopupSizingcorepack } from "./drawerPopup-sizingcorepack/drawerPopup-sizingcorepack";
import { drawerPopupSizingcorepackDescription } from "./drawerPopup-sizingcorepack/description";
import { drawerPopupSizingcorepackRecipe } from "./drawerPopup-sizingcorepack/recipe";

const drawerPopupCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: drawerPopupBasiccorepackDescription,
    recipe: drawerPopupBasiccorepackRecipe,
    Component: DrawerPopupBasiccorepack,
  },
  {
    id: "modality",
    name: "Modality",
    description: drawerPopupModalitycorepackDescription,
    recipe: drawerPopupModalitycorepackRecipe,
    Component: DrawerPopupModalitycorepack,
  },
  {
    id: "auto-dismiss",
    name: "Auto Dismiss",
    description: drawerPopupAutoDismisscorepackDescription,
    recipe: drawerPopupAutoDismisscorepackRecipe,
    Component: DrawerPopupAutoDismisscorepack,
  },
   {
    id: "sizing",
    name: "Sizing",
    description: drawerPopupSizingcorepackDescription,
    recipe: drawerPopupSizingcorepackRecipe,
    Component: DrawerPopupSizingcorepack,
  },
  {
    id: "events",
    name: "Events",
    description: drawerPopupEventscorepackDescription,
    recipe: drawerPopupEventscorepackRecipe,
    Component: DrawerPopupEventscorepack,
  },
  {
    id: "cancelable-events",
    name: "Cancelable Events",
    description: drawerPopupCancelableEventscorepackDescription,
    recipe: drawerPopupCancelableEventscorepackRecipe,
    Component: DrawerPopupCancelableEventscorepack,
  }
];

export default function DrawerPopupCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Drawer Popup Core Pack examples"
      componentType="oj-c-drawer-popup"
      packLabel="Core Pack"
      items={drawerPopupCorePackItems}
      initialItemId="basic"
      navigationTitle="Drawer Popup Core Pack"
    />
  );
}
