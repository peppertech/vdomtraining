import { h } from "preact";
import { RadiosetCorePackExample } from "../radiosetCorePackExample";
import {
  radiosetCorePackDescription,
  radiosetCorePackRecipe,
} from "./radiosetCorePackExample-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function RadiosetCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Radioset core pack examples"
      componentType="oj-c-radioset"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: radiosetCorePackDescription,
          recipe: radiosetCorePackRecipe,
          Component: RadiosetCorePackExample,
        },
      ]}
    />
  );
}
