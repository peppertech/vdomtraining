import { h } from "preact";
import InputTime from "./inputTime";
import { inputTimeDescription, inputTimeRecipe } from "./inputTime-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputTimeRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Time examples"
      componentType="oj-input-time"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputTimeDescription,
          recipe: inputTimeRecipe,
          Component: InputTime,
        },
      ]}
    />
  );
}
