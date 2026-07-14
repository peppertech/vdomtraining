import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ButtonsChromingcorepack } from "../button-corepack/buttons-chromingcorepack/buttons-chromingcorepack";
import { buttonsChromingcorepackDescription } from "../button-corepack/buttons-chromingcorepack/description";
import { buttonsChromingcorepackRecipe } from "../button-corepack/buttons-chromingcorepack/recipe";
import { ButtonsSizescorepack } from "../button-corepack/buttons-sizescorepack/buttons-sizescorepack";
import { buttonsSizescorepackDescription } from "../button-corepack/buttons-sizescorepack/description";
import { buttonsSizescorepackRecipe } from "../button-corepack/buttons-sizescorepack/recipe";
import { ButtonsetsingleBasiccorepack } from "./buttonsetsingle-basiccorepack/buttonsetsingle-basiccorepack";
import { buttonsetsingleBasiccorepackDescription } from "./buttonsetsingle-basiccorepack/description";
import { buttonsetsingleBasiccorepackRecipe } from "./buttonsetsingle-basiccorepack/recipe";
import { ButtonsetsingleButtonResponsivecorepack } from "./buttonsetsingle-buttonResponsivecorepack/buttonsetsingle-buttonResponsivecorepack";
import { buttonsetsingleButtonResponsivecorepackDescription } from "./buttonsetsingle-buttonResponsivecorepack/description";
import { buttonsetsingleButtonResponsivecorepackRecipe } from "./buttonsetsingle-buttonResponsivecorepack/recipe";
import { ButtonsetsingleButtonsetWidthcorepack } from "./buttonsetsingle-buttonsetWidthcorepack/buttonsetsingle-buttonsetWidthcorepack";
import { buttonsetsingleButtonsetWidthcorepackDescription } from "./buttonsetsingle-buttonsetWidthcorepack/description";
import { buttonsetsingleButtonsetWidthcorepackRecipe } from "./buttonsetsingle-buttonsetWidthcorepack/recipe";
import { ButtonsetsingleLabelledButtonsetcorepack } from "./buttonsetsingle-labelledButtonsetcorepack/buttonsetsingle-labelledButtonsetcorepack";
import { buttonsetsingleLabelledButtonsetcorepackDescription } from "./buttonsetsingle-labelledButtonsetcorepack/description";
import { buttonsetsingleLabelledButtonsetcorepackRecipe } from "./buttonsetsingle-labelledButtonsetcorepack/recipe";
import { ButtonsetsingleOverviewcorepack } from "./buttonsetsingle-overviewcorepack/buttonsetsingle-overviewcorepack";
import { buttonsetsingleOverviewcorepackDescription } from "./buttonsetsingle-overviewcorepack/description";
import { buttonsetsingleOverviewcorepackRecipe } from "./buttonsetsingle-overviewcorepack/recipe";

const buttonsetSingleItems = [
  {
    id: "overview",
    name: "Overview",
    description: buttonsetsingleOverviewcorepackDescription,
    recipe: buttonsetsingleOverviewcorepackRecipe,
    Component: ButtonsetsingleOverviewcorepack,
  },
  {
    id: "basic",
    name: "Basic",
    description: buttonsetsingleBasiccorepackDescription,
    recipe: buttonsetsingleBasiccorepackRecipe,
    Component: ButtonsetsingleBasiccorepack,
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
    description: buttonsetsingleButtonsetWidthcorepackDescription,
    recipe: buttonsetsingleButtonsetWidthcorepackRecipe,
    Component: ButtonsetsingleButtonsetWidthcorepack,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: buttonsetsingleButtonResponsivecorepackDescription,
    recipe: buttonsetsingleButtonResponsivecorepackRecipe,
    Component: ButtonsetsingleButtonResponsivecorepack,
  },
  {
    id: "labelled-buttonset",
    name: "Labelled",
    description: buttonsetsingleLabelledButtonsetcorepackDescription,
    recipe: buttonsetsingleLabelledButtonsetcorepackRecipe,
    Component: ButtonsetsingleLabelledButtonsetcorepack,
  },
];

export default function ButtonsetSingleRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Core Pack buttonset single examples"
      componentType="oj-c-buttonset-single"
      packLabel="Core Pack"
      items={buttonsetSingleItems}
      initialItemId="overview"
      navigationTitle="Buttonset Single"
    />
  );
}
