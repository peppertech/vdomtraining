import { h } from "preact";
import SelectSingle from "../selectSingle";
import {
  selectSingleDescription,
  selectSingleRecipe,
} from "./selectSingle-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function SelectSingleRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Select Single examples"
      componentType="oj-select-single"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: selectSingleDescription,
          recipe: selectSingleRecipe,
          Component: SelectSingle,
        },
      ]}
    />
  );
}
