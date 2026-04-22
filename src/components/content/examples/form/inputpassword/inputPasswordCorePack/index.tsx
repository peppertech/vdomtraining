import { h } from "preact";
import { InputPasswordCorePack } from "../inputPasswordCorePack";
import {
  inputPasswordCorePackDescription,
  inputPasswordCorePackRecipe,
} from "./inputPasswordCorePack-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputPasswordCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Password core pack examples"
      componentType="oj-c-input-password"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputPasswordCorePackDescription,
          recipe: inputPasswordCorePackRecipe,
          Component: InputPasswordCorePack,
        },
      ]}
    />
  );
}
