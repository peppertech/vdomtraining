import { h } from "preact";
import InputMonthMask from "./inputMonthMask";
import {
  inputMonthMaskDescription,
  inputMonthMaskRecipe,
} from "./inputMonthMask-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputMonthMaskRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Month Mask examples"
      componentType="oj-c-input-month-mask"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputMonthMaskDescription,
          recipe: inputMonthMaskRecipe,
          Component: InputMonthMask,
        },
      ]}
    />
  );
}
