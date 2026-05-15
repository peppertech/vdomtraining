import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import "css!./demo.css";
import { ButtonsPushButtoncorepack } from "./buttons-pushButtoncorepack/buttons-pushButtoncorepack";
import { buttonsPushButtoncorepackDescription } from "./buttons-pushButtoncorepack/description";
import { buttonsPushButtoncorepackRecipe } from "./buttons-pushButtoncorepack/recipe";
import { ButtonsChromingcorepack } from "./buttons-chromingcorepack/buttons-chromingcorepack";
import { buttonsChromingcorepackDescription } from "./buttons-chromingcorepack/description";
import { buttonsChromingcorepackRecipe } from "./buttons-chromingcorepack/recipe";
import { ButtonsSizescorepack } from "./buttons-sizescorepack/buttons-sizescorepack";
import { buttonsSizescorepackDescription } from "./buttons-sizescorepack/description";
import { buttonsSizescorepackRecipe } from "./buttons-sizescorepack/recipe";
import { ButtonsEventscorepack } from "./buttons-eventscorepack/buttons-eventscorepack";
import { buttonsEventscorepackDescription } from "./buttons-eventscorepack/description";
import { buttonsEventscorepackRecipe } from "./buttons-eventscorepack/recipe";

const buttonCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: buttonsPushButtoncorepackDescription,
    recipe: buttonsPushButtoncorepackRecipe,
    Component: ButtonsPushButtoncorepack,
  },
  {
    id: "events",
    name: "Events",
    description: buttonsEventscorepackDescription,
    recipe: buttonsEventscorepackRecipe,
    Component: ButtonsEventscorepack,
  },
  {
    id: "chroming",
    name: "Chroming",
    description: buttonsChromingcorepackDescription,
    recipe: buttonsChromingcorepackRecipe,
    Component: ButtonsChromingcorepack,
  },
  {
    id: "sizes",
    name: "Sizes",
    description: buttonsSizescorepackDescription,
    recipe: buttonsSizescorepackRecipe,
    Component: ButtonsSizescorepack,
  }
];

export default function ButtonCorePackRecipePage() {
  return (
    <div class="button-corepack-page">
      <RecipePageTemplate
        ariaLabel="Core Pack button examples"
        componentType="oj-c-button"
        packLabel="Core Pack"
        items={buttonCorePackItems}
        initialItemId="overview"
        navigationTitle="Button"
      />
    </div>
  );
}
