import "css!./demo.css";
import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { pushButtonsButtonformcontrolsDescription } from "./pushButtons-buttonformcontrols/description";
import { PushButtonsButtonformcontrols } from "./pushButtons-buttonformcontrols/pushButtons-buttonformcontrols";
import { pushButtonsButtonformcontrolsRecipe } from "./pushButtons-buttonformcontrols/recipe";
import { pushButtonsButtonIconsDescription } from "./pushButtons-buttonIcons/description";
import { PushButtonsButtonIcons } from "./pushButtons-buttonIcons/pushButtons-buttonIcons";
import { pushButtonsButtonIconsRecipe } from "./pushButtons-buttonIcons/recipe";
import { pushButtonsChromingDescription } from "./pushButtons-chroming/description";
import { PushButtonsChroming } from "./pushButtons-chroming/pushButtons-chroming";
import { pushButtonsChromingRecipe } from "./pushButtons-chroming/recipe";
import { pushButtonsCustomcolorsDescription } from "./pushButtons-customcolors/description";
import { PushButtonsCustomcolors } from "./pushButtons-customcolors/pushButtons-customcolors";
import { pushButtonsCustomcolorsRecipe } from "./pushButtons-customcolors/recipe";
import { pushButtonsEventsDescription } from "./pushButtons-events/description";
import { PushButtonsEvents } from "./pushButtons-events/pushButtons-events";
import { pushButtonsEventsRecipe } from "./pushButtons-events/recipe";
import { pushButtonsPushButtonDescription } from "./pushButtons-pushButton/description";
import { PushButtonsPushButton } from "./pushButtons-pushButton/pushButtons-pushButton";
import { pushButtonsPushButtonRecipe } from "./pushButtons-pushButton/recipe";
import { pushButtonsSizesDescription } from "./pushButtons-sizes/description";
import { PushButtonsSizes } from "./pushButtons-sizes/pushButtons-sizes";
import { pushButtonsSizesRecipe } from "./pushButtons-sizes/recipe";

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
