import { h } from "preact";
import CheckBoxSet from "../checkBoxSet";
import {
  checkBoxSetDescription,
  checkBoxSetRecipe,
} from "./checkBoxSet-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function CheckBoxSetRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Checkbox Set examples"
      componentType="oj-checkboxset"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: checkBoxSetDescription,
          recipe: checkBoxSetRecipe,
          Component: CheckBoxSet,
        },
      ]}
    />
  );
}
