import { h } from "preact";
import InputDateTime from "./inputDateTime";
import {
  inputDateTimeDescription,
  inputDateTimeRecipe,
} from "./inputDateTime-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputDateTimeRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Time examples"
      componentType="oj-input-date-time"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputDateTimeDescription,
          recipe: inputDateTimeRecipe,
          Component: InputDateTime,
        },
      ]}
    />
  );
}
