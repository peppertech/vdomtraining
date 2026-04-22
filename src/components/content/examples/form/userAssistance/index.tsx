import { h } from "preact";
import { UserAssistance } from "./userAssistance";
import {
  userAssistanceDescription,
  userAssistanceRecipe,
} from "./userAssistance-docs";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";

export default function UserAssistanceRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="User Assistance examples"
      componentType="Form User Assistance"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: userAssistanceDescription,
          recipe: userAssistanceRecipe,
          Component: UserAssistance,
        },
      ]}
    />
  );
}
