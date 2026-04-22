import { h } from "preact";
import InputSensitiveText from "./inputSensitiveText";
import {
  inputSensitiveTextDescription,
  inputSensitiveTextRecipe,
} from "./inputSensitiveText-docs";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";

export default function InputSensitiveTextRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Sensitive Text examples"
      componentType="oj-c-input-sensitive-text"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputSensitiveTextDescription,
          recipe: inputSensitiveTextRecipe,
          Component: InputSensitiveText,
        },
      ]}
    />
  );
}
