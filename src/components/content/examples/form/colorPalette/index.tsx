import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import Color = require("ojs/ojcolor");
import ColorPalette from "./colorPalette";
import colorPalettePlaygroundSource from "./colorPalette-source";
import {
  colorPaletteDescription,
  colorPaletteRecipe,
} from "./colorPalette-docs";

export default function ColorPaletteRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Color Palette examples"
      componentType="oj-color-palette"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: colorPaletteDescription,
          recipe: colorPaletteRecipe,
          Component: ColorPalette,
          playground: {
            initialSource: colorPalettePlaygroundSource,
            fileName: "colorPalette.tsx",
            runtimeBindings: {
              Color,
            },
          },
        },
      ]}
    />
  );
}
