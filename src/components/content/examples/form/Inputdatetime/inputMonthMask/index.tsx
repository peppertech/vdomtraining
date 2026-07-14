import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  inputMonthMaskDocs,
  type InputMonthMaskDemoId,
} from "./inputMonthMask-docs";
import InputMonthMaskOverviewExample from "./inputMonthMask-overview";
import InputMonthMaskRestrictRangeExample from "./inputMonthMask-restrictRange";
import InputMonthMaskSimpleExample from "./inputMonthMask-simple";
import InputMonthMaskWidthExample from "./inputMonthMask-width";

const inputMonthMaskItems: {
  id: InputMonthMaskDemoId;
  name: string;
  description: (typeof inputMonthMaskDocs)[InputMonthMaskDemoId]["description"];
  recipe: (typeof inputMonthMaskDocs)[InputMonthMaskDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputMonthMaskDocs.overview.description,
    recipe: inputMonthMaskDocs.overview.recipe,
    Component: InputMonthMaskOverviewExample,
  },
  {
    id: "simple",
    name: "Simple",
    description: inputMonthMaskDocs.simple.description,
    recipe: inputMonthMaskDocs.simple.recipe,
    Component: InputMonthMaskSimpleExample,
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputMonthMaskDocs["restrict-range"].description,
    recipe: inputMonthMaskDocs["restrict-range"].recipe,
    Component: InputMonthMaskRestrictRangeExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputMonthMaskDocs.width.description,
    recipe: inputMonthMaskDocs.width.recipe,
    Component: InputMonthMaskWidthExample,
  },
];

export default function InputMonthMaskRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Month Mask examples"
      componentType="oj-c-input-month-mask"
      packLabel="Core Pack"
      layoutId="inputMonthMaskNavigationLayout"
      items={inputMonthMaskItems}
      initialItemId="overview"
    />
  );
}
