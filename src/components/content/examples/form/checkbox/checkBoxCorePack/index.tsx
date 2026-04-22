import { h } from "preact";
import { CheckBoxCorePack } from "../checkBoxCorePack";
import {
  checkBoxCorePackDescription,
  checkBoxCorePackRecipe,
} from "./checkBoxCorePack-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function CheckBoxCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Checkbox core pack examples"
      componentType="oj-c-checkbox"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: checkBoxCorePackDescription,
          recipe: checkBoxCorePackRecipe,
          Component: CheckBoxCorePack,
        },
      ]}
    />
  );
}
