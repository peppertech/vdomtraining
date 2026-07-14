import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  inputDateMaskDocs,
  type InputDateMaskDemoId,
} from "./inputDateMask-docs";
import InputDateMaskOverviewExample from "./inputDateMask-overview";
import InputDateMaskRestrictRangeExample from "./inputDateMask-restrictRange";
import InputDateMaskSimpleExample from "./inputDateMask-simple";
import InputDateMaskWidthExample from "./inputDateMask-width";

const inputDateMaskItems: {
  id: InputDateMaskDemoId;
  name: string;
  description: (typeof inputDateMaskDocs)[InputDateMaskDemoId]["description"];
  recipe: (typeof inputDateMaskDocs)[InputDateMaskDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputDateMaskDocs.overview.description,
    recipe: inputDateMaskDocs.overview.recipe,
    Component: InputDateMaskOverviewExample,
  },
  {
    id: "simple",
    name: "Simple",
    description: inputDateMaskDocs.simple.description,
    recipe: inputDateMaskDocs.simple.recipe,
    Component: InputDateMaskSimpleExample,
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputDateMaskDocs["restrict-range"].description,
    recipe: inputDateMaskDocs["restrict-range"].recipe,
    Component: InputDateMaskRestrictRangeExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputDateMaskDocs.width.description,
    recipe: inputDateMaskDocs.width.recipe,
    Component: InputDateMaskWidthExample,
  },
];

export default function InputDateMaskRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Mask examples"
      componentType="oj-c-input-date-mask"
      packLabel="Core Pack"
      layoutId="inputDateMaskNavigationLayout"
      items={inputDateMaskItems}
      initialItemId="overview"
    />
  );
}
