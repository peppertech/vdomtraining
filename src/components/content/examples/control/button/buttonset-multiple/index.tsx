import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ButtonsetmultipleOverviewcorepack } from "./buttonsetmultiple-overviewcorepack/buttonsetmultiple-overviewcorepack";
import { buttonsetmultipleOverviewcorepackDescription } from "./buttonsetmultiple-overviewcorepack/description";
import { buttonsetmultipleOverviewcorepackRecipe } from "./buttonsetmultiple-overviewcorepack/recipe";
import { ButtonsetmultipleBasiccorepack } from "./buttonsetmultiple-basiccorepack/buttonsetmultiple-basiccorepack";
import { buttonsetmultipleBasiccorepackDescription } from "./buttonsetmultiple-basiccorepack/description";
import { buttonsetmultipleBasiccorepackRecipe } from "./buttonsetmultiple-basiccorepack/recipe";
import { ButtonsChromingcorepack } from "../button-corepack/buttons-chromingcorepack/buttons-chromingcorepack";
import { buttonsChromingcorepackDescription } from "../button-corepack/buttons-chromingcorepack/description";
import { buttonsChromingcorepackRecipe } from "../button-corepack/buttons-chromingcorepack/recipe";
import { ButtonsSizescorepack } from "../button-corepack/buttons-sizescorepack/buttons-sizescorepack";
import { buttonsSizescorepackDescription } from "../button-corepack/buttons-sizescorepack/description";
import { buttonsSizescorepackRecipe } from "../button-corepack/buttons-sizescorepack/recipe";
import { ButtonsetmultipleButtonsetWidthcorepack } from "./buttonsetmultiple-buttonsetWidthcorepack/buttonsetmultiple-buttonsetWidthcorepack";
import { buttonsetmultipleButtonsetWidthcorepackDescription } from "./buttonsetmultiple-buttonsetWidthcorepack/description";
import { buttonsetmultipleButtonsetWidthcorepackRecipe } from "./buttonsetmultiple-buttonsetWidthcorepack/recipe";
import { ButtonsetmultipleButtonResponsivecorepack } from "./buttonsetmultiple-buttonResponsivecorepack/buttonsetmultiple-buttonResponsivecorepack";
import { buttonsetmultipleButtonResponsivecorepackDescription } from "./buttonsetmultiple-buttonResponsivecorepack/description";
import { buttonsetmultipleButtonResponsivecorepackRecipe } from "./buttonsetmultiple-buttonResponsivecorepack/recipe";
import { ButtonsetmultipleLabelledButtonsetcorepack } from "./buttonsetmultiple-labelledButtonsetcorepack/buttonsetmultiple-labelledButtonsetcorepack";
import { buttonsetmultipleLabelledButtonsetcorepackDescription } from "./buttonsetmultiple-labelledButtonsetcorepack/description";
import { buttonsetmultipleLabelledButtonsetcorepackRecipe } from "./buttonsetmultiple-labelledButtonsetcorepack/recipe";

const buttonsetMultipleItems = [
  {
    id: "overview",
    name: "Overview",
    description: buttonsetmultipleOverviewcorepackDescription,
    recipe: buttonsetmultipleOverviewcorepackRecipe,
    Component: ButtonsetmultipleOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: buttonsetmultipleBasiccorepackDescription,
    recipe: buttonsetmultipleBasiccorepackRecipe,
    Component: ButtonsetmultipleBasiccorepack,
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
  },
  {
    id: "buttonset-width",
    name: "Layout Width",
    description: buttonsetmultipleButtonsetWidthcorepackDescription,
    recipe: buttonsetmultipleButtonsetWidthcorepackRecipe,
    Component: ButtonsetmultipleButtonsetWidthcorepack,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: buttonsetmultipleButtonResponsivecorepackDescription,
    recipe: buttonsetmultipleButtonResponsivecorepackRecipe,
    Component: ButtonsetmultipleButtonResponsivecorepack,
  },
  {
    id: "labelled-buttonset",
    name: "Labelled",
    description: buttonsetmultipleLabelledButtonsetcorepackDescription,
    recipe: buttonsetmultipleLabelledButtonsetcorepackRecipe,
    Component: ButtonsetmultipleLabelledButtonsetcorepack,
  },
];

export default function ButtonsetMultipleRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Core Pack buttonset multiple examples"
      componentType="oj-c-buttonset-multiple"
      packLabel="Core Pack"
      items={buttonsetMultipleItems}
      initialItemId="overview"
      navigationTitle="Buttonset Multiple"
    />
  );
}
