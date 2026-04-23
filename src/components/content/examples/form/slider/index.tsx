import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import SliderBasicExample from "./slider-basic";
import {
  sliderDocs,
  type SliderDemoId,
} from "./slider-docs";
import SliderStatesExample from "./slider-states";
import SliderValidationExample from "./slider-validation";
import SliderVerticalExample from "./slider-vertical";
import SliderWidthExample from "./slider-width";

export default function SliderRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Slider examples"
      componentType="oj-slider"
      layoutId="sliderNavigationLayout"
      items={[
        {
          id: "states" as SliderDemoId,
          name: "Overview",
          description: sliderDocs.states.description,
          recipe: sliderDocs.states.recipe,
          Component: SliderStatesExample,
        },
        {
          id: "basic" as SliderDemoId,
          name: "Basic",
          description: sliderDocs.basic.description,
          recipe: sliderDocs.basic.recipe,
          Component: SliderBasicExample,
        },
        {
          id: "vertical" as SliderDemoId,
          name: "Vertical",
          description: sliderDocs.vertical.description,
          recipe: sliderDocs.vertical.recipe,
          Component: SliderVerticalExample,
        },
        {
          id: "validation" as SliderDemoId,
          name: "Validation",
          description: sliderDocs.validation.description,
          recipe: sliderDocs.validation.recipe,
          Component: SliderValidationExample,
        },
        {
          id: "width" as SliderDemoId,
          name: "Width",
          description: sliderDocs.width.description,
          recipe: sliderDocs.width.recipe,
          Component: SliderWidthExample,
        },
      ]}
      initialItemId="states"
    />
  );
}
