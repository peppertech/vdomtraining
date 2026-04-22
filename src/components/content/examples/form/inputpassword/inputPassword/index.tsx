import { h } from "preact";
import { InputPassword } from "../inputPassword";
import {
  inputPasswordDescription,
  inputPasswordRecipe,
} from "./inputPassword-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputPasswordRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Password examples"
      componentType="oj-input-password"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputPasswordDescription,
          recipe: inputPasswordRecipe,
          Component: InputPassword,
        },
      ]}
    />
  );
}
