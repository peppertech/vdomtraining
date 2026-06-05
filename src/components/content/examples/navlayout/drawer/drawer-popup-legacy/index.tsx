import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { DrawerPopupAutoDismiss } from "./drawerPopup-autoDismiss/drawerPopup-autoDismiss";
import { drawerPopupAutoDismissDescription } from "./drawerPopup-autoDismiss/description";
import { drawerPopupAutoDismissRecipe } from "./drawerPopup-autoDismiss/recipe";
import { DrawerPopupBasic } from "./drawerPopup-basic/drawerPopup-basic";
import { drawerPopupBasicDescription } from "./drawerPopup-basic/description";
import { drawerPopupBasicRecipe } from "./drawerPopup-basic/recipe";
import { DrawerPopupCancelableEvents } from "./drawerPopup-cancelableEvents/drawerPopup-cancelableEvents";
import { drawerPopupCancelableEventsDescription } from "./drawerPopup-cancelableEvents/description";
import { drawerPopupCancelableEventsRecipe } from "./drawerPopup-cancelableEvents/recipe";
import { DrawerPopupEvents } from "./drawerPopup-events/drawerPopup-events";
import { drawerPopupEventsDescription } from "./drawerPopup-events/description";
import { drawerPopupEventsRecipe } from "./drawerPopup-events/recipe";
import { DrawerPopupModality } from "./drawerPopup-modality/drawerPopup-modality";
import { drawerPopupModalityDescription } from "./drawerPopup-modality/description";
import { drawerPopupModalityRecipe } from "./drawerPopup-modality/recipe";
import { DrawerPopupSizing } from "./drawerPopup-sizing/drawerPopup-sizing";
import { drawerPopupSizingDescription } from "./drawerPopup-sizing/description";
import { drawerPopupSizingRecipe } from "./drawerPopup-sizing/recipe";

const drawerPopupLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: drawerPopupBasicDescription,
    recipe: drawerPopupBasicRecipe,
    Component: DrawerPopupBasic,
  },
  {
    id: "modality",
    name: "Modality",
    description: drawerPopupModalityDescription,
    recipe: drawerPopupModalityRecipe,
    Component: DrawerPopupModality,
  },
  
  {
    id: "auto-dismiss",
    name: "Auto Dismiss",
    description: drawerPopupAutoDismissDescription,
    recipe: drawerPopupAutoDismissRecipe,
    Component: DrawerPopupAutoDismiss,
  },
  {
    id: "sizing",
    name: "Sizing",
    description: drawerPopupSizingDescription,
    recipe: drawerPopupSizingRecipe,
    Component: DrawerPopupSizing,
  },
  {
    id: "events",
    name: "Events",
    description: drawerPopupEventsDescription,
    recipe: drawerPopupEventsRecipe,
    Component: DrawerPopupEvents,
  },
  {
    id: "cancelable-events",
    name: "Cancelable Events",
    description: drawerPopupCancelableEventsDescription,
    recipe: drawerPopupCancelableEventsRecipe,
    Component: DrawerPopupCancelableEvents,
  }
];

export default function DrawerPopupLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Drawer Popup examples"
      componentType="oj-drawer-popup"
      items={drawerPopupLegacyItems}
      initialItemId="basic"
      navigationTitle="Drawer Popup"
    />
  );
}
