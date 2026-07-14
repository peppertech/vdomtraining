import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ConveyorBeltActionCardsConveyorBeltcorepack } from "./conveyorBelt-actionCardsConveyorBeltcorepack/conveyorBelt-actionCardsConveyorBeltcorepack";
import { conveyorBeltActionCardsConveyorBeltcorepackDescription } from "./conveyorBelt-actionCardsConveyorBeltcorepack/description";
import { conveyorBeltActionCardsConveyorBeltcorepackRecipe } from "./conveyorBelt-actionCardsConveyorBeltcorepack/recipe";
import { ConveyorBeltConveyorArrowsVisibilitycorepack } from "./conveyorBelt-conveyorArrowsVisibilitycorepack/conveyorBelt-conveyorArrowsVisibilitycorepack";
import { conveyorBeltConveyorArrowsVisibilitycorepackDescription } from "./conveyorBelt-conveyorArrowsVisibilitycorepack/description";
import { conveyorBeltConveyorArrowsVisibilitycorepackRecipe } from "./conveyorBelt-conveyorArrowsVisibilitycorepack/recipe";
import { ConveyorBeltConveyorElementStretchcorepack } from "./conveyorBelt-conveyorElementStretchcorepack/conveyorBelt-conveyorElementStretchcorepack";
import { conveyorBeltConveyorElementStretchcorepackDescription } from "./conveyorBelt-conveyorElementStretchcorepack/description";
import { conveyorBeltConveyorElementStretchcorepackRecipe } from "./conveyorBelt-conveyorElementStretchcorepack/recipe";
import { ConveyorBeltHorizontalConveyorBeltcorepack } from "./conveyorBelt-horizontalConveyorBeltcorepack/conveyorBelt-horizontalConveyorBeltcorepack";
import { conveyorBeltHorizontalConveyorBeltcorepackDescription } from "./conveyorBelt-horizontalConveyorBeltcorepack/description";
import { conveyorBeltHorizontalConveyorBeltcorepackRecipe } from "./conveyorBelt-horizontalConveyorBeltcorepack/recipe";
import { ConveyorBeltKeyboardScrollingcorepack } from "./conveyorBelt-keyboardScrollingcorepack/conveyorBelt-keyboardScrollingcorepack";
import { conveyorBeltKeyboardScrollingcorepackDescription } from "./conveyorBelt-keyboardScrollingcorepack/description";
import { conveyorBeltKeyboardScrollingcorepackRecipe } from "./conveyorBelt-keyboardScrollingcorepack/recipe";
import { ConveyorBeltProgrammaticScrollingcorepack } from "./conveyorBelt-programmaticScrollingcorepack/conveyorBelt-programmaticScrollingcorepack";
import { conveyorBeltProgrammaticScrollingcorepackDescription } from "./conveyorBelt-programmaticScrollingcorepack/description";
import { conveyorBeltProgrammaticScrollingcorepackRecipe } from "./conveyorBelt-programmaticScrollingcorepack/recipe";
import { ConveyorBeltTabKeyNavigationcorepack } from "./conveyorBelt-tabKeyNavigationcorepack/conveyorBelt-tabKeyNavigationcorepack";
import { conveyorBeltTabKeyNavigationcorepackDescription } from "./conveyorBelt-tabKeyNavigationcorepack/description";
import { conveyorBeltTabKeyNavigationcorepackRecipe } from "./conveyorBelt-tabKeyNavigationcorepack/recipe";
import { ConveyorBeltVerticalConveyorBeltcorepack } from "./conveyorBelt-verticalConveyorBeltcorepack/conveyorBelt-verticalConveyorBeltcorepack";
import { conveyorBeltVerticalConveyorBeltcorepackDescription } from "./conveyorBelt-verticalConveyorBeltcorepack/description";
import { conveyorBeltVerticalConveyorBeltcorepackRecipe } from "./conveyorBelt-verticalConveyorBeltcorepack/recipe";

const conveyorBeltCorePackItems = [
  {
    id: "horizontal",
    name: "Horizontal",
    description: conveyorBeltHorizontalConveyorBeltcorepackDescription,
    recipe: conveyorBeltHorizontalConveyorBeltcorepackRecipe,
    Component: ConveyorBeltHorizontalConveyorBeltcorepack,
  },
  {
    id: "vertical",
    name: "Vertical",
    description: conveyorBeltVerticalConveyorBeltcorepackDescription,
    recipe: conveyorBeltVerticalConveyorBeltcorepackRecipe,
    Component: ConveyorBeltVerticalConveyorBeltcorepack,
  },
  {
    id: "element-stretch",
    name: "Stretch Element Height",
    description: conveyorBeltConveyorElementStretchcorepackDescription,
    recipe: conveyorBeltConveyorElementStretchcorepackRecipe,
    Component: ConveyorBeltConveyorElementStretchcorepack,
  },
 {
    id: "arrows-visibility",
    name: "Overflow Arrows Visibility",
    description: conveyorBeltConveyorArrowsVisibilitycorepackDescription,
    recipe: conveyorBeltConveyorArrowsVisibilitycorepackRecipe,
    Component: ConveyorBeltConveyorArrowsVisibilitycorepack,
  },
  {
    id: "tab-key-navigation",
    name: "Tab Key Navigation",
    description: conveyorBeltTabKeyNavigationcorepackDescription,
    recipe: conveyorBeltTabKeyNavigationcorepackRecipe,
    Component: ConveyorBeltTabKeyNavigationcorepack,
  },
  {
    id: "programmatic-scrolling",
    name: "Programmatic Scrolling",
    description: conveyorBeltProgrammaticScrollingcorepackDescription,
    recipe: conveyorBeltProgrammaticScrollingcorepackRecipe,
    Component: ConveyorBeltProgrammaticScrollingcorepack,
  },
   {
    id: "keyboard-scrolling",
    name: "Keyboard Scrolling",
    description: conveyorBeltKeyboardScrollingcorepackDescription,
    recipe: conveyorBeltKeyboardScrollingcorepackRecipe,
    Component: ConveyorBeltKeyboardScrollingcorepack,
  },
   {
    id: "action-cards",
    name: "Action Cards",
    description: conveyorBeltActionCardsConveyorBeltcorepackDescription,
    recipe: conveyorBeltActionCardsConveyorBeltcorepackRecipe,
    Component: ConveyorBeltActionCardsConveyorBeltcorepack,
  },
];

export default function ConveyorBeltCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Conveyor Belt Core Pack examples"
      componentType="oj-c-conveyor-belt"
      packLabel="Core Pack"
      items={conveyorBeltCorePackItems}
      initialItemId="horizontal"
      navigationTitle="Conveyor Belt Core Pack"
    />
  );
}
