import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import InputDateTextConverterExample from "./inputDateText-converter";
import {
  inputDateTextDocs,
  type InputDateTextDemoId,
} from "./inputDateText-docs";
import InputDateTextOverviewExample from "./inputDateText-overview";
import InputDateTextRestrictRangeExample from "./inputDateText-restrictRange";
import InputDateTextSimpleExample from "./inputDateText-simple";
import InputDateTextWidthExample from "./inputDateText-width";

const inputDateTextItems: {
  id: InputDateTextDemoId;
  name: string;
  description: (typeof inputDateTextDocs)[InputDateTextDemoId]["description"];
  recipe: (typeof inputDateTextDocs)[InputDateTextDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputDateTextDocs.overview.description,
    recipe: inputDateTextDocs.overview.recipe,
    Component: InputDateTextOverviewExample,
  },
  {
    id: "simple",
    name: "Date ISO String Value",
    description: inputDateTextDocs.simple.description,
    recipe: inputDateTextDocs.simple.recipe,
    Component: InputDateTextSimpleExample,
  },
  {
    id: "converter",
    name: "Converter",
    description: inputDateTextDocs.converter.description,
    recipe: inputDateTextDocs.converter.recipe,
    Component: InputDateTextConverterExample,
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputDateTextDocs["restrict-range"].description,
    recipe: inputDateTextDocs["restrict-range"].recipe,
    Component: InputDateTextRestrictRangeExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputDateTextDocs.width.description,
    recipe: inputDateTextDocs.width.recipe,
    Component: InputDateTextWidthExample,
  },
];

export default function InputDateTextRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Text examples"
      componentType="oj-c-input-date-text"
      packLabel="Core Pack"
      layoutId="inputDateTextNavigationLayout"
      items={inputDateTextItems}
      initialItemId="overview"
    />
  );
}
