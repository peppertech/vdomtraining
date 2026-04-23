import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { UserAssistance } from "./userAssistance";
import UserAssistanceConverterHintExample from "./userAssistance-converterHint";
import UserAssistanceValidatorHintsExample from "./userAssistance-validatorHints";
import {
  userAssistanceDocs,
  type UserAssistanceDemoId,
} from "./userAssistance-docs";

const userAssistanceItems: {
  id: UserAssistanceDemoId;
  name: string;
  description: (typeof userAssistanceDocs)[UserAssistanceDemoId]["description"];
  recipe: (typeof userAssistanceDocs)[UserAssistanceDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: userAssistanceDocs.overview.description,
    recipe: userAssistanceDocs.overview.recipe,
    Component: UserAssistance,
  },
  {
    id: "converter-hint",
    name: "Converter Hint",
    description: userAssistanceDocs["converter-hint"].description,
    recipe: userAssistanceDocs["converter-hint"].recipe,
    Component: UserAssistanceConverterHintExample,
  },
  {
    id: "validator-hints",
    name: "Validator Hints",
    description: userAssistanceDocs["validator-hints"].description,
    recipe: userAssistanceDocs["validator-hints"].recipe,
    Component: UserAssistanceValidatorHintsExample,
  },
];

export default function UserAssistanceRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="User Assistance examples"
      componentType="Form User Assistance"
      packLabel="Core Pack"
      layoutId="userAssistanceNavigationLayout"
      items={userAssistanceItems}
      initialItemId="overview"
    />
  );
}
