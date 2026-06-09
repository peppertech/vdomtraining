import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TrainLinear } from "./train-linear/train-linear";
import { trainLinearDescription } from "./train-linear/description";
import { trainLinearRecipe } from "./train-linear/recipe";
import { TrainNonlinear } from "./train-nonlinear/train-nonlinear";
import { trainNonlinearDescription } from "./train-nonlinear/description";
import { trainNonlinearRecipe } from "./train-nonlinear/recipe";
import { TrainValidation } from "./train-validation/train-validation";
import { trainValidationDescription } from "./train-validation/description";
import { trainValidationRecipe } from "./train-validation/recipe";
import { TrainMessageTypes } from "./train-messageTypes/train-messageTypes";
import { trainMessageTypesDescription } from "./train-messageTypes/description";
import { trainMessageTypesRecipe } from "./train-messageTypes/recipe";
import { TrainButtonNavigation } from "./train-buttonNavigation/train-buttonNavigation";
import { trainButtonNavigationDescription } from "./train-buttonNavigation/description";
import { trainButtonNavigationRecipe } from "./train-buttonNavigation/recipe";
import { TrainLayout } from "./train-layout/train-layout";
import { trainLayoutDescription } from "./train-layout/description";
import { trainLayoutRecipe } from "./train-layout/recipe";

const trainLegacyItems = [
  {
    id: "linear",
    name: "Linear",
    description: trainLinearDescription,
    recipe: trainLinearRecipe,
    Component: TrainLinear,
  },
  {
    id: "nonlinear",
    name: "Non linear",
    description: trainNonlinearDescription,
    recipe: trainNonlinearRecipe,
    Component: TrainNonlinear,
  },
  {
    id: "layout",
    name: "Layout",
    description: trainLayoutDescription,
    recipe: trainLayoutRecipe,
    Component: TrainLayout,
  },
  {
    id: "button-navigation",
    name: "Button Navigation",
    description: trainButtonNavigationDescription,
    recipe: trainButtonNavigationRecipe,
    Component: TrainButtonNavigation,
  },
  {
    id: "message-types",
    name: "Message Types",
    description: trainMessageTypesDescription,
    recipe: trainMessageTypesRecipe,
    Component: TrainMessageTypes,
  },
  {
    id: "validation",
    name: "Validation",
    description: trainValidationDescription,
    recipe: trainValidationRecipe,
    Component: TrainValidation,
  }
];

export default function TrainLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Train examples"
      componentType="oj-train"
      items={trainLegacyItems}
      initialItemId="linear"
      navigationTitle="Train"
    />
  );
}
