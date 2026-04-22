import { h } from "preact";
import { ColorSpectrum } from "./colorSpectrum";
import {
  colorSpectrumDescription,
  colorSpectrumRecipe,
} from "./colorSpectrum-docs";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";

export default function ColorSpectrumRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Color Spectrum examples"
      componentType="oj-color-spectrum"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: colorSpectrumDescription,
          recipe: colorSpectrumRecipe,
          Component: ColorSpectrum,
        },
      ]}
    />
  );
}
