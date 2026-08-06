import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import RangeSliderBasicExample from "./rangeSlider-basic";
import rangeSliderBasicPlaygroundSource from "./rangeSlider-basic-source";
import {
  rangeSliderDocs,
  type RangeSliderDemoId,
} from "./rangeSlider-docs";
import RangeSliderIconsExample from "./rangeSlider-icons";
import rangeSliderIconsPlaygroundSource from "./rangeSlider-icons-source";
import RangeSliderStatesExample from "./rangeSlider-states";
import rangeSliderStatesPlaygroundSource from "./rangeSlider-states-source";
import RangeSliderValidationExample from "./rangeSlider-validation";
import rangeSliderValidationPlaygroundSource from "./rangeSlider-validation-source";
import RangeSliderVerticalExample from "./rangeSlider-vertical";
import rangeSliderVerticalPlaygroundSource from "./rangeSlider-vertical-source";
import RangeSliderWidthExample from "./rangeSlider-width";
import rangeSliderWidthPlaygroundSource from "./rangeSlider-width-source";
import {
  formatRangeValue,
  rangeSliderConfirmationMessages,
  rangeSliderDefinitionHints,
  rangeSliderErrorMessages,
  rangeSliderInfoMessages,
  rangeSliderInstructionHelp,
  rangeSliderSourceHints,
  rangeSliderWarningMessages,
} from "./rangeSlider-shared";

const rangeSliderItems: {
  id: RangeSliderDemoId;
  name: string;
  description: (typeof rangeSliderDocs)[RangeSliderDemoId]["description"];
  recipe: (typeof rangeSliderDocs)[RangeSliderDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: rangeSliderDocs.states.description,
    recipe: rangeSliderDocs.states.recipe,
    Component: RangeSliderStatesExample,
    playground: {
      initialSource: rangeSliderStatesPlaygroundSource,
      fileName: "rangeSlider-states.tsx",
      runtimeBindings: {
        rangeSliderConfirmationMessages,
        rangeSliderDefinitionHints,
        rangeSliderErrorMessages,
        rangeSliderInfoMessages,
        rangeSliderInstructionHelp,
        rangeSliderSourceHints,
        rangeSliderWarningMessages,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: rangeSliderDocs.basic.description,
    recipe: rangeSliderDocs.basic.recipe,
    Component: RangeSliderBasicExample,
    playground: {
      initialSource: rangeSliderBasicPlaygroundSource,
      fileName: "rangeSlider-basic.tsx",
      runtimeBindings: { formatRangeValue },
    },
  },
  {
    id: "vertical",
    name: "Vertical",
    description: rangeSliderDocs.vertical.description,
    recipe: rangeSliderDocs.vertical.recipe,
    Component: RangeSliderVerticalExample,
    playground: {
      initialSource: rangeSliderVerticalPlaygroundSource,
      fileName: "rangeSlider-vertical.tsx",
      runtimeBindings: { formatRangeValue },
    },
  },
  {
    id: "validation",
    name: "Validation",
    description: rangeSliderDocs.validation.description,
    recipe: rangeSliderDocs.validation.recipe,
    Component: RangeSliderValidationExample,
    playground: {
      initialSource: rangeSliderValidationPlaygroundSource,
      fileName: "rangeSlider-validation.tsx",
      runtimeBindings: { formatRangeValue },
    },
  },
  {
    id: "icons",
    name: "Icons",
    description: rangeSliderDocs.icons.description,
    recipe: rangeSliderDocs.icons.recipe,
    Component: RangeSliderIconsExample,
    playground: {
      initialSource: rangeSliderIconsPlaygroundSource,
      fileName: "rangeSlider-icons.tsx",
      runtimeBindings: { formatRangeValue },
    },
  },
  {
    id: "width",
    name: "Width",
    description: rangeSliderDocs.width.description,
    recipe: rangeSliderDocs.width.recipe,
    Component: RangeSliderWidthExample,
    playground: {
      initialSource: rangeSliderWidthPlaygroundSource,
      fileName: "rangeSlider-width.tsx",
    },
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
