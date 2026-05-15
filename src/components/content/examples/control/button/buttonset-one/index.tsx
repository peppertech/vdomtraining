import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import "css!./demo.css";
import { ButtonsetoneBasic } from "./buttonsetone-basic/buttonsetone-basic";
import { buttonsetoneBasicDescription } from "./buttonsetone-basic/description";
import { buttonsetoneBasicRecipe } from "./buttonsetone-basic/recipe";
import { ButtonsetoneButtonRadios } from "./buttonsetone-buttonRadios/buttonsetone-buttonRadios";
import { buttonsetoneButtonRadiosDescription } from "./buttonsetone-buttonRadios/description";
import { buttonsetoneButtonRadiosRecipe } from "./buttonsetone-buttonRadios/recipe";
import { ButtonsetoneChroming } from "./buttonsetone-chroming/buttonsetone-chroming";
import { buttonsetoneChromingDescription } from "./buttonsetone-chroming/description";
import { buttonsetoneChromingRecipe } from "./buttonsetone-chroming/recipe";
import { ButtonsetoneSizes } from "./buttonsetone-sizes/buttonsetone-sizes";
import { buttonsetoneSizesDescription } from "./buttonsetone-sizes/description";
import { buttonsetoneSizesRecipe } from "./buttonsetone-sizes/recipe";
import { ButtonsetoneButtonsetWidth } from "./buttonsetone-buttonsetWidth/buttonsetone-buttonsetWidth";
import { buttonsetoneButtonsetWidthDescription } from "./buttonsetone-buttonsetWidth/description";
import { buttonsetoneButtonsetWidthRecipe } from "./buttonsetone-buttonsetWidth/recipe";
import { ButtonsetoneButtonResponsive } from "./buttonsetone-buttonResponsive/buttonsetone-buttonResponsive";
import { buttonsetoneButtonResponsiveDescription } from "./buttonsetone-buttonResponsive/description";
import { buttonsetoneButtonResponsiveRecipe } from "./buttonsetone-buttonResponsive/recipe";
import { ButtonsetoneLabelledButtonset } from "./buttonsetone-labelledButtonset/buttonsetone-labelledButtonset";
import { buttonsetoneLabelledButtonsetDescription } from "./buttonsetone-labelledButtonset/description";
import { buttonsetoneLabelledButtonsetRecipe } from "./buttonsetone-labelledButtonset/recipe";

const buttonsetOneItems = [
  {
    id: "basic",
    name: "Basic",
    description: buttonsetoneBasicDescription,
    recipe: buttonsetoneBasicRecipe,
    Component: ButtonsetoneBasic,
  },
  {
    id: "button-radios",
    name: "Button Radios",
    description: buttonsetoneButtonRadiosDescription,
    recipe: buttonsetoneButtonRadiosRecipe,
    Component: ButtonsetoneButtonRadios,
  },
  {
    id: "chroming",
    name: "Chroming",
    description: buttonsetoneChromingDescription,
    recipe: buttonsetoneChromingRecipe,
    Component: ButtonsetoneChroming,
  },
  {
    id: "sizes",
    name: "Sizes",
    description: buttonsetoneSizesDescription,
    recipe: buttonsetoneSizesRecipe,
    Component: ButtonsetoneSizes,
  },
  {
    id: "buttonset-width",
    name: "Buttonset Width",
    description: buttonsetoneButtonsetWidthDescription,
    recipe: buttonsetoneButtonsetWidthRecipe,
    Component: ButtonsetoneButtonsetWidth,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: buttonsetoneButtonResponsiveDescription,
    recipe: buttonsetoneButtonResponsiveRecipe,
    Component: ButtonsetoneButtonResponsive,
  },
  {
    id: "labelled-buttonset",
    name: "Labelled Buttonset",
    description: buttonsetoneLabelledButtonsetDescription,
    recipe: buttonsetoneLabelledButtonsetRecipe,
    Component: ButtonsetoneLabelledButtonset,
  },
];

export default function ButtonsetOneRecipePage() {
  return (
    <div class="buttonset-one-page">
      <RecipePageTemplate
        ariaLabel="Buttonset one examples"
        componentType="oj-buttonset-one"
        items={buttonsetOneItems}
        initialItemId="basic"
        navigationTitle="Button Set One"
      />
    </div>
  );
}
