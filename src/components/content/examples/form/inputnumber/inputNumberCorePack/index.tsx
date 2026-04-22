import { h } from "preact";
import InputNumberCorePack from "../inputNumberCorePack";
import {
  inputNumberCorePackDescription,
  inputNumberCorePackRecipe,
} from "./inputNumberCorePack-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputNumberCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Number core pack examples"
      componentType="oj-c-input-number"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputNumberCorePackDescription,
          recipe: inputNumberCorePackRecipe,
          Component: InputNumberCorePack,
        },
      ]}
    />
  );
}
