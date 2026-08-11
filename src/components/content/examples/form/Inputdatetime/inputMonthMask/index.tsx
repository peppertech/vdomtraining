import * as preact from 'preact';
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  inputMonthMaskDocs,
  type InputMonthMaskDemoId,
} from "./inputMonthMask-docs";
import InputMonthMaskOverviewExample from "./inputMonthMask-overview";
import inputMonthMaskOverviewPlaygroundSource from "./inputMonthMask-overview-source";
import InputMonthMaskRestrictRangeExample from "./inputMonthMask-restrictRange";
import inputMonthMaskRestrictRangePlaygroundSource from "./inputMonthMask-restrictRange-source";
import { labelEdgeOptions, messageSets, todayMonthValue } from "./inputMonthMask-shared";
import InputMonthMaskSimpleExample from "./inputMonthMask-simple";
import inputMonthMaskSimplePlaygroundSource from "./inputMonthMask-simple-source";
import InputMonthMaskWidthExample from "./inputMonthMask-width";
import inputMonthMaskWidthPlaygroundSource from "./inputMonthMask-width-source";

const inputMonthMaskItems: {
  id: InputMonthMaskDemoId;
  name: string;
  description: (typeof inputMonthMaskDocs)[InputMonthMaskDemoId]["description"];
  recipe: (typeof inputMonthMaskDocs)[InputMonthMaskDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputMonthMaskDocs.overview.description,
    recipe: inputMonthMaskDocs.overview.recipe,
    Component: InputMonthMaskOverviewExample,
    playground: {
      initialSource: inputMonthMaskOverviewPlaygroundSource,
      fileName: "inputMonthMask-overview.tsx",
      runtimeBindings: {
        messageSets,
        todayMonthValue,
      },
    },
  },
  {
    id: "simple",
    name: "Simple",
    description: inputMonthMaskDocs.simple.description,
    recipe: inputMonthMaskDocs.simple.recipe,
    Component: InputMonthMaskSimpleExample,
    playground: {
      initialSource: inputMonthMaskSimplePlaygroundSource,
      fileName: "inputMonthMask-simple.tsx",
      runtimeBindings: {
        todayMonthValue,
      },
    },
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputMonthMaskDocs["restrict-range"].description,
    recipe: inputMonthMaskDocs["restrict-range"].recipe,
    Component: InputMonthMaskRestrictRangeExample,
    playground: {
      initialSource: inputMonthMaskRestrictRangePlaygroundSource,
      fileName: "inputMonthMask-restrictRange.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputMonthMaskDocs.width.description,
    recipe: inputMonthMaskDocs.width.recipe,
    Component: InputMonthMaskWidthExample,
    playground: {
      initialSource: inputMonthMaskWidthPlaygroundSource,
      fileName: "inputMonthMask-width.tsx",
      runtimeBindings: {
        labelEdgeOptions,
        todayMonthValue,
      },
    },
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
