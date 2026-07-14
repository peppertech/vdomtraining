import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  inputDateTimeDocs,
  type InputDateTimeDemoId,
} from "./inputDateTime-docs";
import InputDateTimeMultipleWidgetsExample from "./inputDateTime-multipleWidgets";
import InputDateTimeSimpleExample from "./inputDateTime-simple";
import InputDateTimeStatesExample from "./inputDateTime-states";
import InputDateTimeStylingExample from "./inputDateTime-styling";
import InputDateTimeTextAlignExample from "./inputDateTime-textAlign";
import InputDateTimeTimeZoneExample from "./inputDateTime-timeZone";
import InputDateTimeWidthExample from "./inputDateTime-width";

const inputDateTimeItems: {
  id: InputDateTimeDemoId;
  name: string;
  description: (typeof inputDateTimeDocs)[InputDateTimeDemoId]["description"];
  recipe: (typeof inputDateTimeDocs)[InputDateTimeDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputDateTimeDocs.states.description,
    recipe: inputDateTimeDocs.states.recipe,
    Component: InputDateTimeStatesExample,
  },
  {
    id: "simple",
    name: "ISO String Value",
    description: inputDateTimeDocs.simple.description,
    recipe: inputDateTimeDocs.simple.recipe,
    Component: InputDateTimeSimpleExample,
  },
  {
    id: "time-zone",
    name: "Timezone",
    description: inputDateTimeDocs["time-zone"].description,
    recipe: inputDateTimeDocs["time-zone"].recipe,
    Component: InputDateTimeTimeZoneExample,
  },
  {
    id: "multiple-widgets",
    name: "Multiple Components",
    description: inputDateTimeDocs["multiple-widgets"].description,
    recipe: inputDateTimeDocs["multiple-widgets"].recipe,
    Component: InputDateTimeMultipleWidgetsExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputDateTimeDocs.width.description,
    recipe: inputDateTimeDocs.width.recipe,
    Component: InputDateTimeWidthExample,
  },
  {
    id: "text-align",
    name: "Text Align",
    description: inputDateTimeDocs["text-align"].description,
    recipe: inputDateTimeDocs["text-align"].recipe,
    Component: InputDateTimeTextAlignExample,
  },
  {
    id: "styling",
    name: "Styling",
    description: inputDateTimeDocs.styling.description,
    recipe: inputDateTimeDocs.styling.recipe,
    Component: InputDateTimeStylingExample,
  },
];

export default function InputDateTimeRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Time examples"
      componentType="oj-input-date-time"
      layoutId="inputDateTimeNavigationLayout"
      items={inputDateTimeItems}
      initialItemId="states"
    />
  );
}
