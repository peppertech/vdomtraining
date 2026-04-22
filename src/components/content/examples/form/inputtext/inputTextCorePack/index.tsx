import { h } from "preact";
import InputTextCorePack from "../inputTextCorePack";
import {
  inputTextCorePackDescription,
  inputTextCorePackRecipe,
} from "./inputTextCorePack-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputTextCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Text core pack examples"
      componentType="oj-c-input-text"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputTextCorePackDescription,
          recipe: inputTextCorePackRecipe,
          Component: InputTextCorePack,
        },
      ]}
    />
  );
}
