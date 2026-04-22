import { h } from "preact";
import RichRadioset from "../richRadioSet";
import {
  richRadioSetDescription,
  richRadioSetRecipe,
} from "./richRadioSet-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function RichRadioSetRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Rich Radioset examples"
      componentType="oj-c-rich-radioset"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: richRadioSetDescription,
          recipe: richRadioSetRecipe,
          Component: RichRadioset,
        },
      ]}
    />
  );
}
