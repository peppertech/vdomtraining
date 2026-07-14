import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ConveyorBeltActionCardsConveyorBelt } from "./conveyorBelt-actionCardsConveyorBelt/conveyorBelt-actionCardsConveyorBelt";
import { conveyorBeltActionCardsConveyorBeltDescription } from "./conveyorBelt-actionCardsConveyorBelt/description";
import { conveyorBeltActionCardsConveyorBeltRecipe } from "./conveyorBelt-actionCardsConveyorBelt/recipe";
import { ConveyorBeltConveyorArrowsVisibility } from "./conveyorBelt-conveyorArrowsVisibility/conveyorBelt-conveyorArrowsVisibility";
import { conveyorBeltConveyorArrowsVisibilityDescription } from "./conveyorBelt-conveyorArrowsVisibility/description";
import { conveyorBeltConveyorArrowsVisibilityRecipe } from "./conveyorBelt-conveyorArrowsVisibility/recipe";
import { ConveyorBeltConveyorElementStretch } from "./conveyorBelt-conveyorElementStretch/conveyorBelt-conveyorElementStretch";
import { conveyorBeltConveyorElementStretchDescription } from "./conveyorBelt-conveyorElementStretch/description";
import { conveyorBeltConveyorElementStretchRecipe } from "./conveyorBelt-conveyorElementStretch/recipe";
import { ConveyorBeltCustomKeyNavigation } from "./conveyorBelt-customKeyNavigation/conveyorBelt-customKeyNavigation";
import { conveyorBeltCustomKeyNavigationDescription } from "./conveyorBelt-customKeyNavigation/description";
import { conveyorBeltCustomKeyNavigationRecipe } from "./conveyorBelt-customKeyNavigation/recipe";
import { ConveyorBeltDescendantContent } from "./conveyorBelt-descendantContent/conveyorBelt-descendantContent";
import { conveyorBeltDescendantContentDescription } from "./conveyorBelt-descendantContent/description";
import { conveyorBeltDescendantContentRecipe } from "./conveyorBelt-descendantContent/recipe";
import { ConveyorBeltHorizontalConveyorBelt } from "./conveyorBelt-horizontalConveyorBelt/conveyorBelt-horizontalConveyorBelt";
import { conveyorBeltHorizontalConveyorBeltDescription } from "./conveyorBelt-horizontalConveyorBelt/description";
import { conveyorBeltHorizontalConveyorBeltRecipe } from "./conveyorBelt-horizontalConveyorBelt/recipe";
import { ConveyorBeltKeyboardScrolling } from "./conveyorBelt-keyboardScrolling/conveyorBelt-keyboardScrolling";
import { conveyorBeltKeyboardScrollingDescription } from "./conveyorBelt-keyboardScrolling/description";
import { conveyorBeltKeyboardScrollingRecipe } from "./conveyorBelt-keyboardScrolling/recipe";
import { ConveyorBeltProgrammaticScrolling } from "./conveyorBelt-programmaticScrolling/conveyorBelt-programmaticScrolling";
import { conveyorBeltProgrammaticScrollingDescription } from "./conveyorBelt-programmaticScrolling/description";
import { conveyorBeltProgrammaticScrollingRecipe } from "./conveyorBelt-programmaticScrolling/recipe";
import { ConveyorBeltTabKeyNavigation } from "./conveyorBelt-tabKeyNavigation/conveyorBelt-tabKeyNavigation";
import { conveyorBeltTabKeyNavigationDescription } from "./conveyorBelt-tabKeyNavigation/description";
import { conveyorBeltTabKeyNavigationRecipe } from "./conveyorBelt-tabKeyNavigation/recipe";
import { ConveyorBeltVerticalConveyorBelt } from "./conveyorBelt-verticalConveyorBelt/conveyorBelt-verticalConveyorBelt";
import { conveyorBeltVerticalConveyorBeltDescription } from "./conveyorBelt-verticalConveyorBelt/description";
import { conveyorBeltVerticalConveyorBeltRecipe } from "./conveyorBelt-verticalConveyorBelt/recipe";

const conveyorBeltLegacyItems = [
  {
    id: "horizontal",
    name: "Horizontal",
    description: conveyorBeltHorizontalConveyorBeltDescription,
    recipe: conveyorBeltHorizontalConveyorBeltRecipe,
    Component: ConveyorBeltHorizontalConveyorBelt,
  },
  {
    id: "vertical",
    name: "Vertical",
    description: conveyorBeltVerticalConveyorBeltDescription,
    recipe: conveyorBeltVerticalConveyorBeltRecipe,
    Component: ConveyorBeltVerticalConveyorBelt,
  },
  {
    id: "element-stretch",
    name: "Stretch Element Height ",
    description: conveyorBeltConveyorElementStretchDescription,
    recipe: conveyorBeltConveyorElementStretchRecipe,
    Component: ConveyorBeltConveyorElementStretch,
  },
  {
    id: "arrows-visibility",
    name: "Overflow Arrows Visibility",
    description: conveyorBeltConveyorArrowsVisibilityDescription,
    recipe: conveyorBeltConveyorArrowsVisibilityRecipe,
    Component: ConveyorBeltConveyorArrowsVisibility,
  },
  {
    id: "descendant-content",
    name: "Descendant Content",
    description: conveyorBeltDescendantContentDescription,
    recipe: conveyorBeltDescendantContentRecipe,
    Component: ConveyorBeltDescendantContent,
  },
  {
    id: "tab-key-navigation",
    name: "Tab Key Navigation",
    description: conveyorBeltTabKeyNavigationDescription,
    recipe: conveyorBeltTabKeyNavigationRecipe,
    Component: ConveyorBeltTabKeyNavigation,
  },
   {
    id: "programmatic-scrolling",
    name: "Programmatic Scrolling",
    description: conveyorBeltProgrammaticScrollingDescription,
    recipe: conveyorBeltProgrammaticScrollingRecipe,
    Component: ConveyorBeltProgrammaticScrolling,
  },
  {
    id: "custom-key-navigation",
    name: "Custom Key Navigation",
    description: conveyorBeltCustomKeyNavigationDescription,
    recipe: conveyorBeltCustomKeyNavigationRecipe,
    Component: ConveyorBeltCustomKeyNavigation,
  },
  {
    id: "keyboard-scrolling",
    name: "Keyboard Scrolling",
    description: conveyorBeltKeyboardScrollingDescription,
    recipe: conveyorBeltKeyboardScrollingRecipe,
    Component: ConveyorBeltKeyboardScrolling,
  },
  {
    id: "action-cards",
    name: "Action Cards",
    description: conveyorBeltActionCardsConveyorBeltDescription,
    recipe: conveyorBeltActionCardsConveyorBeltRecipe,
    Component: ConveyorBeltActionCardsConveyorBelt,
  },
  
 
];

export default function ConveyorBeltLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Conveyor Belt examples"
      componentType="oj-conveyor-belt"
      items={conveyorBeltLegacyItems}
      initialItemId="horizontal"
      navigationTitle="Conveyor Belt"
    />
  );
}
