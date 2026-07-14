import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { ColorPalette } from "./colorPalette";
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
        },
      ]}
    />
  );
}
