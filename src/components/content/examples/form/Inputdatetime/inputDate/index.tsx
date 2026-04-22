import { h } from "preact";
import InputDate from "./inputDate";
import { inputDateDescription, inputDateRecipe } from "./inputDate-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputDateRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date examples"
      componentType="oj-input-date"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputDateDescription,
          recipe: inputDateRecipe,
          Component: InputDate,
        },
      ]}
    />
  );
}
