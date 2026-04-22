import { h } from "preact";
import RadiosetExample from "../radioset";
import { radiosetDescription, radiosetRecipe } from "./radioset-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function RadiosetRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Radioset examples"
      componentType="oj-radioset"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: radiosetDescription,
          recipe: radiosetRecipe,
          Component: RadiosetExample,
        },
      ]}
    />
  );
}
