import { h } from "preact";
import InputTextLegacy from "../inputTextLegacy";
import {
  inputTextLegacyDescription,
  inputTextLegacyRecipe,
} from "./inputTextLegacy-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputTextLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Text legacy examples"
      componentType="oj-input-text"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputTextLegacyDescription,
          recipe: inputTextLegacyRecipe,
          Component: InputTextLegacy,
        },
      ]}
    />
  );
}
