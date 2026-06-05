import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { PopupDefercorepack } from "./popup-defercorepack/popup-defercorepack";
import { popupDefercorepackDescription } from "./popup-defercorepack/description";
import { popupDefercorepackRecipe } from "./popup-defercorepack/recipe";
import { PopupModalcorepack } from "./popup-modalcorepack/popup-modalcorepack";
import { popupModalcorepackDescription } from "./popup-modalcorepack/description";
import { popupModalcorepackRecipe } from "./popup-modalcorepack/recipe";
import { PopupOffsetcorepack } from "./popup-offsetcorepack/popup-offsetcorepack";
import { popupOffsetcorepackDescription } from "./popup-offsetcorepack/description";
import { popupOffsetcorepackRecipe } from "./popup-offsetcorepack/recipe";
import { PopupPopupcorepack } from "./popup-popupcorepack/popup-popupcorepack";
import { popupPopupcorepackDescription } from "./popup-popupcorepack/description";
import { popupPopupcorepackRecipe } from "./popup-popupcorepack/recipe";
import { PopupTailCommonPositionscorepack } from "./popup-tailCommonPositionscorepack/popup-tailCommonPositionscorepack";
import { popupTailCommonPositionscorepackDescription } from "./popup-tailCommonPositionscorepack/description";
import { popupTailCommonPositionscorepackRecipe } from "./popup-tailCommonPositionscorepack/recipe";
import { PopupUnstyledcorepack } from "./popup-unstyledcorepack/popup-unstyledcorepack";
import { popupUnstyledcorepackDescription } from "./popup-unstyledcorepack/description";
import { popupUnstyledcorepackRecipe } from "./popup-unstyledcorepack/recipe";

const popupCorePackItems = [
  {
    id: "popup",
    name: "Basic",
    description: popupPopupcorepackDescription,
    recipe: popupPopupcorepackRecipe,
    Component: PopupPopupcorepack,
  },
   {
    id: "tail-common-positions",
    name: "Tail & Common Positions",
    description: popupTailCommonPositionscorepackDescription,
    recipe: popupTailCommonPositionscorepackRecipe,
    Component: PopupTailCommonPositionscorepack,
  },
   {
    id: "modal",
    name: "Modal",
    description: popupModalcorepackDescription,
    recipe: popupModalcorepackRecipe,
    Component: PopupModalcorepack,
  },
  {
    id: "offset",
    name: "Offset",
    description: popupOffsetcorepackDescription,
    recipe: popupOffsetcorepackRecipe,
    Component: PopupOffsetcorepack,
  },
   {
    id: "unstyled",
    name: "Unstyled",
    description: popupUnstyledcorepackDescription,
    recipe: popupUnstyledcorepackRecipe,
    Component: PopupUnstyledcorepack,
  },
  {
    id: "defer",
    name: "Deferred Rendering",
    description: popupDefercorepackDescription,
    recipe: popupDefercorepackRecipe,
    Component: PopupDefercorepack,
  }
];

export default function PopupCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Popup Core Pack examples"
      componentType="oj-c-popup"
      packLabel="Core Pack"
      items={popupCorePackItems}
      initialItemId="popup"
      navigationTitle="Popup Core Pack"
    />
  );
}
