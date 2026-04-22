import { h } from "preact";
import InputDateText from "./inputDateText";
import {
  inputDateTextDescription,
  inputDateTextRecipe,
} from "./inputDateText-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputDateTextRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Text examples"
      componentType="oj-c-input-date-text"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputDateTextDescription,
          recipe: inputDateTextRecipe,
          Component: InputDateText,
        },
      ]}
    />
  );
}
