import { h } from "preact";
import InputDateMask from "./inputDateMask";
import {
  inputDateMaskDescription,
  inputDateMaskRecipe,
} from "./inputDateMask-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputDateMaskRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Mask examples"
      componentType="oj-c-input-date-mask"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputDateMaskDescription,
          recipe: inputDateMaskRecipe,
          Component: InputDateMask,
        },
      ]}
    />
  );
}
