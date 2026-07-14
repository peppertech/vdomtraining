import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { drawerPopupAutoDismissDescription } from "./drawerPopup-autoDismiss/description";
import { DrawerPopupAutoDismiss } from "./drawerPopup-autoDismiss/drawerPopup-autoDismiss";
import { drawerPopupAutoDismissRecipe } from "./drawerPopup-autoDismiss/recipe";
import { drawerPopupBasicDescription } from "./drawerPopup-basic/description";
import { DrawerPopupBasic } from "./drawerPopup-basic/drawerPopup-basic";
import { drawerPopupBasicRecipe } from "./drawerPopup-basic/recipe";
import { drawerPopupCancelableEventsDescription } from "./drawerPopup-cancelableEvents/description";
import { DrawerPopupCancelableEvents } from "./drawerPopup-cancelableEvents/drawerPopup-cancelableEvents";
import { drawerPopupCancelableEventsRecipe } from "./drawerPopup-cancelableEvents/recipe";
import { drawerPopupEventsDescription } from "./drawerPopup-events/description";
import { DrawerPopupEvents } from "./drawerPopup-events/drawerPopup-events";
import { drawerPopupEventsRecipe } from "./drawerPopup-events/recipe";
import { drawerPopupModalityDescription } from "./drawerPopup-modality/description";
import { DrawerPopupModality } from "./drawerPopup-modality/drawerPopup-modality";
import { drawerPopupModalityRecipe } from "./drawerPopup-modality/recipe";
import { drawerPopupSizingDescription } from "./drawerPopup-sizing/description";
import { DrawerPopupSizing } from "./drawerPopup-sizing/drawerPopup-sizing";
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
