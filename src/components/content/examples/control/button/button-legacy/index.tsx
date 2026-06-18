import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import "css!./demo.css";
import { PushButtonsPushButton } from "./pushButtons-pushButton/pushButtons-pushButton";
import { pushButtonsPushButtonDescription } from "./pushButtons-pushButton/description";
import { pushButtonsPushButtonRecipe } from "./pushButtons-pushButton/recipe";
import { PushButtonsChroming } from "./pushButtons-chroming/pushButtons-chroming";
import { pushButtonsChromingDescription } from "./pushButtons-chroming/description";
import { pushButtonsChromingRecipe } from "./pushButtons-chroming/recipe";
import { PushButtonsSizes } from "./pushButtons-sizes/pushButtons-sizes";
import { pushButtonsSizesDescription } from "./pushButtons-sizes/description";
import { pushButtonsSizesRecipe } from "./pushButtons-sizes/recipe";
import { PushButtonsButtonIcons } from "./pushButtons-buttonIcons/pushButtons-buttonIcons";
import { pushButtonsButtonIconsDescription } from "./pushButtons-buttonIcons/description";
import { pushButtonsButtonIconsRecipe } from "./pushButtons-buttonIcons/recipe";
import { PushButtonsEvents } from "./pushButtons-events/pushButtons-events";
import { pushButtonsEventsDescription } from "./pushButtons-events/description";
import { pushButtonsEventsRecipe } from "./pushButtons-events/recipe";
import { PushButtonsCustomcolors } from "./pushButtons-customcolors/pushButtons-customcolors";
import { pushButtonsCustomcolorsDescription } from "./pushButtons-customcolors/description";
import { pushButtonsCustomcolorsRecipe } from "./pushButtons-customcolors/recipe";
import { PushButtonsButtonformcontrols } from "./pushButtons-buttonformcontrols/pushButtons-buttonformcontrols";
import { pushButtonsButtonformcontrolsDescription } from "./pushButtons-buttonformcontrols/description";
import { pushButtonsButtonformcontrolsRecipe } from "./pushButtons-buttonformcontrols/recipe";

const buttonLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: pushButtonsPushButtonDescription,
    recipe: pushButtonsPushButtonRecipe,
    Component: PushButtonsPushButton,
  },
  {
    id: "events",
    name: "Events",
    description: pushButtonsEventsDescription,
    recipe: pushButtonsEventsRecipe,
    Component: PushButtonsEvents,
  },
  {
    id: "chroming",
    name: "Chroming",
    description: pushButtonsChromingDescription,
    recipe: pushButtonsChromingRecipe,
    Component: PushButtonsChroming,
  },
  {
    id: "button-icons",
    name: "Icons",
    description: pushButtonsButtonIconsDescription,
    recipe: pushButtonsButtonIconsRecipe,
    Component: PushButtonsButtonIcons,
  },
  {
    id: "sizes",
    name: "Sizes",
    description: pushButtonsSizesDescription,
    recipe: pushButtonsSizesRecipe,
    Component: PushButtonsSizes,
  },
  {
    id: "custom-colors",
    name: "Custom Styling",
    description: pushButtonsCustomcolorsDescription,
    recipe: pushButtonsCustomcolorsRecipe,
    Component: PushButtonsCustomcolors,
  },
  {
    id: "form-controls",
    name: "With Form Controls",
    description: pushButtonsButtonformcontrolsDescription,
    recipe: pushButtonsButtonformcontrolsRecipe,
    Component: PushButtonsButtonformcontrols,
  },
];

export default function ButtonLegacyRecipePage() {
  return (
    <div class="button-legacy-page">
      <RecipePageTemplate
        ariaLabel="Button examples"
        componentType="oj-button"
        items={buttonLegacyItems}
        initialItemId="overview"
        navigationTitle="Button"
      />
    </div>
  );
}
