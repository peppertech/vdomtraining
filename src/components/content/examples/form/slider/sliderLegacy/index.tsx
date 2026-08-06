import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import SliderBasicExample from "./slider-basic";
import sliderBasicPlaygroundSource from "./slider-basic-source";
import {
  sliderDocs,
  type SliderDemoId,
} from "./slider-docs";
import SliderStatesExample from "./slider-states";
import sliderStatesPlaygroundSource from "./slider-states-source";
import SliderValidationExample from "./slider-validation";
import sliderValidationPlaygroundSource from "./slider-validation-source";
import SliderVerticalExample from "./slider-vertical";
import sliderVerticalPlaygroundSource from "./slider-vertical-source";
import SliderWidthExample from "./slider-width";
import sliderWidthPlaygroundSource from "./slider-width-source";
import {
  sliderConfirmationMessages,
  sliderDefinitionHints,
  sliderErrorMessages,
  sliderInfoMessages,
  sliderInstructionHelp,
  sliderSourceHints,
  sliderWarningMessages,
} from "./slider-shared";

export default function SliderRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Slider examples"
      componentType="oj-slider"
      layoutId="sliderNavigationLayout"
      items={[
        {
          id: "states" as SliderDemoId,
          name: "Overview",
          description: sliderDocs.states.description,
          recipe: sliderDocs.states.recipe,
          Component: SliderStatesExample,
          playground: {
            initialSource: sliderStatesPlaygroundSource,
            fileName: "slider-states.tsx",
            runtimeBindings: {
              sliderConfirmationMessages,
              sliderDefinitionHints,
              sliderErrorMessages,
              sliderInfoMessages,
              sliderInstructionHelp,
              sliderSourceHints,
              sliderWarningMessages,
            },
          },
        },
        {
          id: "basic" as SliderDemoId,
          name: "Basic",
          description: sliderDocs.basic.description,
          recipe: sliderDocs.basic.recipe,
          Component: SliderBasicExample,
          playground: {
            initialSource: sliderBasicPlaygroundSource,
            fileName: "slider-basic.tsx",
          },
        },
        {
          id: "vertical" as SliderDemoId,
          name: "Vertical",
          description: sliderDocs.vertical.description,
          recipe: sliderDocs.vertical.recipe,
          Component: SliderVerticalExample,
          playground: {
            initialSource: sliderVerticalPlaygroundSource,
            fileName: "slider-vertical.tsx",
          },
        },
        {
          id: "validation" as SliderDemoId,
          name: "Validation",
          description: sliderDocs.validation.description,
          recipe: sliderDocs.validation.recipe,
          Component: SliderValidationExample,
          playground: {
            initialSource: sliderValidationPlaygroundSource,
            fileName: "slider-validation.tsx",
          },
        },
        {
          id: "width" as SliderDemoId,
          name: "Width",
          description: sliderDocs.width.description,
          recipe: sliderDocs.width.recipe,
          Component: SliderWidthExample,
          playground: {
            initialSource: sliderWidthPlaygroundSource,
            fileName: "slider-width.tsx",
          },
        },
      ]}
      initialItemId="states"
    />
  );
}
