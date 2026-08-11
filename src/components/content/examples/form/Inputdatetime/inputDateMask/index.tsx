import * as preact from 'preact';
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  inputDateMaskDocs,
  type InputDateMaskDemoId,
} from "./inputDateMask-docs";
import InputDateMaskOverviewExample from "./inputDateMask-overview";
import inputDateMaskOverviewPlaygroundSource from "./inputDateMask-overview-source";
import InputDateMaskRestrictRangeExample from "./inputDateMask-restrictRange";
import inputDateMaskRestrictRangePlaygroundSource from "./inputDateMask-restrictRange-source";
import InputDateMaskSimpleExample from "./inputDateMask-simple";
import inputDateMaskSimplePlaygroundSource from "./inputDateMask-simple-source";
import InputDateMaskWidthExample from "./inputDateMask-width";
import inputDateMaskWidthPlaygroundSource from "./inputDateMask-width-source";
import {
  labelEdgeOptions,
  messageSets,
  todayIsoDate,
} from "./inputDateMask-shared";

const inputDateMaskItems: {
  id: InputDateMaskDemoId;
  name: string;
  description: (typeof inputDateMaskDocs)[InputDateMaskDemoId]["description"];
  recipe: (typeof inputDateMaskDocs)[InputDateMaskDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: inputDateMaskDocs.overview.description,
    recipe: inputDateMaskDocs.overview.recipe,
    Component: InputDateMaskOverviewExample,
    playground: {
      initialSource: inputDateMaskOverviewPlaygroundSource,
      fileName: "inputDateMask-overview.tsx",
      runtimeBindings: {
        messageSets,
      },
    },
  },
  {
    id: "simple",
    name: "Simple",
    description: inputDateMaskDocs.simple.description,
    recipe: inputDateMaskDocs.simple.recipe,
    Component: InputDateMaskSimpleExample,
    playground: {
      initialSource: inputDateMaskSimplePlaygroundSource,
      fileName: "inputDateMask-simple.tsx",
      runtimeBindings: {
        todayIsoDate,
      },
    },
  },
  {
    id: "restrict-range",
    name: "Restrict Range",
    description: inputDateMaskDocs["restrict-range"].description,
    recipe: inputDateMaskDocs["restrict-range"].recipe,
    Component: InputDateMaskRestrictRangeExample,
    playground: {
      initialSource: inputDateMaskRestrictRangePlaygroundSource,
      fileName: "inputDateMask-restrictRange.tsx",
    },
  },
  {
    id: "width",
    name: "Width",
    description: inputDateMaskDocs.width.description,
    recipe: inputDateMaskDocs.width.recipe,
    Component: InputDateMaskWidthExample,
    playground: {
      initialSource: inputDateMaskWidthPlaygroundSource,
      fileName: "inputDateMask-width.tsx",
      runtimeBindings: {
        labelEdgeOptions,
      },
    },
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
