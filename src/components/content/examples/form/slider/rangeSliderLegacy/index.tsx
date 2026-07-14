import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import RangeSliderBasicExample from "./rangeSlider-basic";
import {
  rangeSliderDocs,
  type RangeSliderDemoId,
} from "./rangeSlider-docs";
import RangeSliderIconsExample from "./rangeSlider-icons";
import RangeSliderStatesExample from "./rangeSlider-states";
import RangeSliderValidationExample from "./rangeSlider-validation";
import RangeSliderVerticalExample from "./rangeSlider-vertical";
import RangeSliderWidthExample from "./rangeSlider-width";

const rangeSliderItems: {
  id: RangeSliderDemoId;
  name: string;
  description: (typeof rangeSliderDocs)[RangeSliderDemoId]["description"];
  recipe: (typeof rangeSliderDocs)[RangeSliderDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: rangeSliderDocs.states.description,
    recipe: rangeSliderDocs.states.recipe,
    Component: RangeSliderStatesExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: rangeSliderDocs.basic.description,
    recipe: rangeSliderDocs.basic.recipe,
    Component: RangeSliderBasicExample,
  },
  {
    id: "vertical",
    name: "Vertical",
    description: rangeSliderDocs.vertical.description,
    recipe: rangeSliderDocs.vertical.recipe,
    Component: RangeSliderVerticalExample,
  },
  {
    id: "validation",
    name: "Validation",
    description: rangeSliderDocs.validation.description,
    recipe: rangeSliderDocs.validation.recipe,
    Component: RangeSliderValidationExample,
  },
  {
    id: "icons",
    name: "Icons",
    description: rangeSliderDocs.icons.description,
    recipe: rangeSliderDocs.icons.recipe,
    Component: RangeSliderIconsExample,
  },
  {
    id: "width",
    name: "Width",
    description: rangeSliderDocs.width.description,
    recipe: rangeSliderDocs.width.recipe,
    Component: RangeSliderWidthExample,
  },
];

export default function RangeSliderRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Range Slider examples"
      componentType="oj-range-slider"
      layoutId="rangeSliderNavigationLayout"
      items={rangeSliderItems}
      initialItemId="states"
    />
  );
}
