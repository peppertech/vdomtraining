import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputTimeCustomValidatorExample from "./inputTime-customValidator";
import {
  inputTimeDocs,
  type InputTimeDemoId,
} from "./inputTime-docs";
import InputTimeMinMaxExample from "./inputTime-minmax";
import InputTimeSimpleExample from "./inputTime-simple";
import InputTimeStatesExample from "./inputTime-states";
import InputTimeTimeZoneExample from "./inputTime-timeZone";

const inputTimeItems: {
  id: InputTimeDemoId;
  name: string;
  description: (typeof inputTimeDocs)[InputTimeDemoId]["description"];
  recipe: (typeof inputTimeDocs)[InputTimeDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "states",
    name: "Overview",
    description: inputTimeDocs.states.description,
    recipe: inputTimeDocs.states.recipe,
    Component: InputTimeStatesExample,
  },
  {
    id: "simple",
    name: "Simple",
    description: inputTimeDocs.simple.description,
    recipe: inputTimeDocs.simple.recipe,
    Component: InputTimeSimpleExample,
  },
  {
    id: "minmax",
    name: "Min Max",
    description: inputTimeDocs.minmax.description,
    recipe: inputTimeDocs.minmax.recipe,
    Component: InputTimeMinMaxExample,
  },
  {
    id: "time-zone",
    name: "Time Zone",
    description: inputTimeDocs["time-zone"].description,
    recipe: inputTimeDocs["time-zone"].recipe,
    Component: InputTimeTimeZoneExample,
  },
  {
    id: "custom-validator",
    name: "Custom Validator",
    description: inputTimeDocs["custom-validator"].description,
    recipe: inputTimeDocs["custom-validator"].recipe,
    Component: InputTimeCustomValidatorExample,
  },
];

export default function InputTimeRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Time examples"
      componentType="oj-input-time"
      layoutId="inputTimeNavigationLayout"
      items={inputTimeItems}
      initialItemId="states"
    />
  );
}
