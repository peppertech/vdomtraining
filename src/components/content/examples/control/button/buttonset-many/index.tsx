import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ToggleButtonsManyOverview } from "./toggleButtons-manyOverview/toggleButtons-manyOverview";
import { toggleButtonsManyOverviewDescription } from "./toggleButtons-manyOverview/description";
import { toggleButtonsManyOverviewRecipe } from "./toggleButtons-manyOverview/recipe";
import { ToggleButtonsButtonCheckbox } from "./toggleButtons-buttonCheckbox/toggleButtons-buttonCheckbox";
import { toggleButtonsButtonCheckboxDescription } from "./toggleButtons-buttonCheckbox/description";
import { toggleButtonsButtonCheckboxRecipe } from "./toggleButtons-buttonCheckbox/recipe";
import { ToggleButtonsCheckBoxes } from "./toggleButtons-checkBoxes/toggleButtons-checkBoxes";
import { toggleButtonsCheckBoxesDescription } from "./toggleButtons-checkBoxes/description";
import { toggleButtonsCheckBoxesRecipe } from "./toggleButtons-checkBoxes/recipe";
import { ToggleButtonsButtonIcons } from "./toggleButtons-buttonIcons/toggleButtons-buttonIcons";
import { toggleButtonsButtonIconsDescription } from "./toggleButtons-buttonIcons/description";
import { toggleButtonsButtonIconsRecipe } from "./toggleButtons-buttonIcons/recipe";
import { ToggleButtonsChroming } from "./toggleButtons-chroming/toggleButtons-chroming";
import { toggleButtonsChromingDescription } from "./toggleButtons-chroming/description";
import { toggleButtonsChromingRecipe } from "./toggleButtons-chroming/recipe";
import { ToggleButtonsSizes } from "./toggleButtons-sizes/toggleButtons-sizes";
import { toggleButtonsSizesDescription } from "./toggleButtons-sizes/description";
import { toggleButtonsSizesRecipe } from "./toggleButtons-sizes/recipe";
import { ToggleButtonsButtonsetWidth } from "./toggleButtons-buttonsetWidth/toggleButtons-buttonsetWidth";
import { toggleButtonsButtonsetWidthDescription } from "./toggleButtons-buttonsetWidth/description";
import { toggleButtonsButtonsetWidthRecipe } from "./toggleButtons-buttonsetWidth/recipe";
import { ToggleButtonsButtonResponsive } from "./toggleButtons-buttonResponsive/toggleButtons-buttonResponsive";
import { toggleButtonsButtonResponsiveDescription } from "./toggleButtons-buttonResponsive/description";
import { toggleButtonsButtonResponsiveRecipe } from "./toggleButtons-buttonResponsive/recipe";
import { ToggleButtonsLabelledButtonset } from "./toggleButtons-labelledButtonset/toggleButtons-labelledButtonset";
import { toggleButtonsLabelledButtonsetDescription } from "./toggleButtons-labelledButtonset/description";
import { toggleButtonsLabelledButtonsetRecipe } from "./toggleButtons-labelledButtonset/recipe";

const buttonsetManyItems = [
  {
    id: "overview",
    name: "Overview",
    description: toggleButtonsManyOverviewDescription,
    recipe: toggleButtonsManyOverviewRecipe,
    Component: ToggleButtonsManyOverview,
  },
  {
    id: "checkboxes",
    name: "Multiple Buttons",
    description: toggleButtonsCheckBoxesDescription,
    recipe: toggleButtonsCheckBoxesRecipe,
    Component: ToggleButtonsCheckBoxes,
  },
  {
    id: "toggle-button",
    name: "Toggle (Single Button)",
    description: toggleButtonsButtonCheckboxDescription,
    recipe: toggleButtonsButtonCheckboxRecipe,
    Component: ToggleButtonsButtonCheckbox,
  },
   {
    id: "chroming",
    name: "Chroming",
    description: toggleButtonsChromingDescription,
    recipe: toggleButtonsChromingRecipe,
    Component: ToggleButtonsChroming,
  },
  {
    id: "sizes",
    name: "Sizes",
    description: toggleButtonsSizesDescription,
    recipe: toggleButtonsSizesRecipe,
    Component: ToggleButtonsSizes,
  },
  {
    id: "button-icons",
    name: "Icons",
    description: toggleButtonsButtonIconsDescription,
    recipe: toggleButtonsButtonIconsRecipe,
    Component: ToggleButtonsButtonIcons,
  },
  {
    id: "buttonset-width",
    name: "Buttonset Width",
    description: toggleButtonsButtonsetWidthDescription,
    recipe: toggleButtonsButtonsetWidthRecipe,
    Component: ToggleButtonsButtonsetWidth,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: toggleButtonsButtonResponsiveDescription,
    recipe: toggleButtonsButtonResponsiveRecipe,
    Component: ToggleButtonsButtonResponsive,
  },
  {
    id: "labelled-buttonset",
    name: "Labelled Buttonset",
    description: toggleButtonsLabelledButtonsetDescription,
    recipe: toggleButtonsLabelledButtonsetRecipe,
    Component: ToggleButtonsLabelledButtonset,
  },
];

export default function ButtonsetManyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Buttonset many examples"
      componentType="oj-buttonset-many"
      items={buttonsetManyItems}
      initialItemId="overview"
      navigationTitle="Button Set Many"
    />
  );
}
