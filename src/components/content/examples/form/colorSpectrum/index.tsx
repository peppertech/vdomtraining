import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import Color = require("ojs/ojcolor");
import ColorSpectrum from "./colorSpectrum";
import colorSpectrumPlaygroundSource from "./colorSpectrum-source";
import {
  colorSpectrumDescription,
  colorSpectrumRecipe,
} from "./colorSpectrum-docs";

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
          playground: {
            initialSource: colorSpectrumPlaygroundSource,
            fileName: "colorSpectrum.tsx",
            runtimeBindings: {
              Color,
            },
          },
        },
      ]}
    />
  );
}
