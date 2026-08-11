import * as preact from 'preact';
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  inputTimeMaskDocsVdom,
  type InputTimeMaskVdomDemoId,
} from "./inputTimeMask-docs";
import InputTimeMaskOverviewVdomExample from "./inputTimeMask-overview";
import inputTimeMaskOverviewPlaygroundSource from "./inputTimeMask-overview-source";
import InputTimeMaskRestrictRangeVdomExample from "./inputTimeMask-restrictRange";
import inputTimeMaskRestrictRangePlaygroundSource from "./inputTimeMask-restrictRange-source";
import { labelEdgeOptions, messageSets } from "./inputTimeMask-shared";
import InputTimeMaskSimpleVdomExample from "./inputTimeMask-simple";
import inputTimeMaskSimplePlaygroundSource from "./inputTimeMask-simple-source";
import InputTimeMaskWidthVdomExample from "./inputTimeMask-width";
import inputTimeMaskWidthPlaygroundSource from "./inputTimeMask-width-source";

const inputTimeMaskItemsVdom: {
  id: InputTimeMaskVdomDemoId;
  name: string;
  description: (typeof inputTimeMaskDocsVdom)[InputTimeMaskVdomDemoId]["description"];
  recipe: (typeof inputTimeMaskDocsVdom)[InputTimeMaskVdomDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputTimeMaskDocsVdom.overview.description,
    recipe: inputTimeMaskDocsVdom.overview.recipe,
    Component: InputTimeMaskOverviewVdomExample,
    playground: {
      initialSource: inputTimeMaskOverviewPlaygroundSource,
      fileName: "inputTimeMask-overview.tsx",
      runtimeBindings: {
        messageSets,
      },
    },
  },
  {
    id: "simple",
    name: "Simple",
    description: inputTimeMaskDocsVdom.simple.description,
    recipe: inputTimeMaskDocsVdom.simple.recipe,
    Component: InputTimeMaskSimpleVdomExample,
    playground: {
      initialSource: inputTimeMaskSimplePlaygroundSource,
      fileName: "inputTimeMask-simple.tsx",
    },
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputTimeMaskDocsVdom["restrict-range"].description,
    recipe: inputTimeMaskDocsVdom["restrict-range"].recipe,
    Component: InputTimeMaskRestrictRangeVdomExample,
    playground: {
      initialSource: inputTimeMaskRestrictRangePlaygroundSource,
      fileName: "inputTimeMask-restrictRange.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputTimeMaskDocsVdom.width.description,
    recipe: inputTimeMaskDocsVdom.width.recipe,
    Component: InputTimeMaskWidthVdomExample,
    playground: {
      initialSource: inputTimeMaskWidthPlaygroundSource,
      fileName: "inputTimeMask-width.tsx",
      runtimeBindings: {
        labelEdgeOptions,
      },
    },
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
