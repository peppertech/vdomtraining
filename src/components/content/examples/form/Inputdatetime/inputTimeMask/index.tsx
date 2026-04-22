import { h } from "preact";
import InputTimeMask from "./inputTimeMask";
import {
  inputTimeMaskDescription,
  inputTimeMaskRecipe,
} from "./inputTimeMask-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputTimeMaskRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Time Mask examples"
      componentType="oj-c-input-time-mask"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputTimeMaskDescription,
          recipe: inputTimeMaskRecipe,
          Component: InputTimeMask,
        },
      ]}
    />
  );
}
