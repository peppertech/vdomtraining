import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  inputTimeMaskDocsVdom,
  type InputTimeMaskVdomDemoId,
} from "./inputTimeMask-docs";
import InputTimeMaskOverviewVdomExample from "./inputTimeMask-overview";
import InputTimeMaskRestrictRangeVdomExample from "./inputTimeMask-restrictRange";
import InputTimeMaskSimpleVdomExample from "./inputTimeMask-simple";
import InputTimeMaskWidthVdomExample from "./inputTimeMask-width";

const inputTimeMaskItemsVdom: {
  id: InputTimeMaskVdomDemoId;
  name: string;
  description: (typeof inputTimeMaskDocsVdom)[InputTimeMaskVdomDemoId]["description"];
  recipe: (typeof inputTimeMaskDocsVdom)[InputTimeMaskVdomDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputTimeMaskDocsVdom.overview.description,
    recipe: inputTimeMaskDocsVdom.overview.recipe,
    Component: InputTimeMaskOverviewVdomExample,
  },
  {
    id: "simple",
    name: "Simple",
    description: inputTimeMaskDocsVdom.simple.description,
    recipe: inputTimeMaskDocsVdom.simple.recipe,
    Component: InputTimeMaskSimpleVdomExample,
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputTimeMaskDocsVdom["restrict-range"].description,
    recipe: inputTimeMaskDocsVdom["restrict-range"].recipe,
    Component: InputTimeMaskRestrictRangeVdomExample,
  },
  {
    id: "width",
    name: "Width",
    description: inputTimeMaskDocsVdom.width.description,
    recipe: inputTimeMaskDocsVdom.width.recipe,
    Component: InputTimeMaskWidthVdomExample,
  },
];

export default function InputTimeMaskRecipePageVdom() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Time Mask examples"
      componentType="oj-c-input-time-mask"
      packLabel="Core Pack"
      layoutId="inputTimeMaskNavigationLayoutVdom"
      items={inputTimeMaskItemsVdom}
      initialItemId="overview"
    />
  );
}
