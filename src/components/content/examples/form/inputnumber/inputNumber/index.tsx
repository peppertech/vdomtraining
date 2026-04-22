import { h } from "preact";
import InputNumber from "../inputNumber";
import {
  inputNumberDescription,
  inputNumberRecipe,
} from "./inputNumber-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputNumberRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Number examples"
      componentType="oj-input-number"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputNumberDescription,
          recipe: inputNumberRecipe,
          Component: InputNumber,
        },
      ]}
    />
  );
}
