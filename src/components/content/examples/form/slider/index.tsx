import { h } from "preact";
import { Slider } from "./slider";
import { sliderDescription, sliderRecipe } from "./slider-docs";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";

export default function SliderRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Slider examples"
      componentType="oj-slider"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: sliderDescription,
          recipe: sliderRecipe,
          Component: Slider,
        },
      ]}
    />
  );
}
