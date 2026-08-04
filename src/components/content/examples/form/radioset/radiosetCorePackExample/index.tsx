import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import RadiosetCorePackBasicExample from "./radiosetCorePack-basic";
import RadiosetCorePackDataProviderExample from "./radiosetCorePack-dataProvider";
import RadiosetCorePackOverviewExample from "./radiosetCorePack-overview";
import RadiosetCorePackUserAssistanceExample from "./radiosetCorePack-userAssistance";
import RadiosetCorePackValidationExample from "./radiosetCorePack-validation";
import radiosetCorePackBasicPlaygroundSource from "./radiosetCorePack-basic-source";
import radiosetCorePackDataProviderPlaygroundSource from "./radiosetCorePack-dataProvider-source";
import radiosetCorePackOverviewPlaygroundSource from "./radiosetCorePack-overview-source";
import radiosetCorePackUserAssistancePlaygroundSource from "./radiosetCorePack-userAssistance-source";
import radiosetCorePackValidationPlaygroundSource from "./radiosetCorePack-validation-source";
import {
  radiosetCorePackDocs,
  type RadiosetCorePackDemoId,
} from "./radiosetCorePackExample-docs";
import {
  browserOptions,
  browserShortListOptions,
  colorOptions,
  colorOptionsWithAssistance,
  controlStateOptions,
  createOptionsDataProvider,
  radiosetMessages,
  technologyOptions,
  technologyOptionsWithHelp,
  wrappingOptions,
} from "./radiosetCorePack-shared";

const radiosetCorePackItems: {
  id: RadiosetCorePackDemoId;
  name: string;
  description: (typeof radiosetCorePackDocs)[RadiosetCorePackDemoId]["description"];
  recipe: (typeof radiosetCorePackDocs)[RadiosetCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: radiosetCorePackDocs.overview.description,
    recipe: radiosetCorePackDocs.overview.recipe,
    Component: RadiosetCorePackOverviewExample,
    playground: {
      initialSource: radiosetCorePackOverviewPlaygroundSource,
      fileName: "radiosetCorePack-overview.tsx",
      runtimeBindings: {
        radiosetMessages,
        technologyOptions,
        technologyOptionsWithHelp,
        wrappingOptions,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: radiosetCorePackDocs.basic.description,
    recipe: radiosetCorePackDocs.basic.recipe,
    Component: RadiosetCorePackBasicExample,
    playground: {
      initialSource: radiosetCorePackBasicPlaygroundSource,
      fileName: "radiosetCorePack-basic.tsx",
      runtimeBindings: {
        colorOptions,
      },
    },
  },
  {
    id: "user-assistance",
    name: "User Assistance",
    description: radiosetCorePackDocs["user-assistance"].description,
    recipe: radiosetCorePackDocs["user-assistance"].recipe,
    Component: RadiosetCorePackUserAssistanceExample,
    playground: {
      initialSource: radiosetCorePackUserAssistancePlaygroundSource,
      fileName: "radiosetCorePack-userAssistance.tsx",
      runtimeBindings: {
        colorOptionsWithAssistance,
        controlStateOptions,
      },
    },
  },
  {
    id: "validation",
    name: "Validation",
    description: radiosetCorePackDocs.validation.description,
    recipe: radiosetCorePackDocs.validation.recipe,
    Component: RadiosetCorePackValidationExample,
    playground: {
      initialSource: radiosetCorePackValidationPlaygroundSource,
      fileName: "radiosetCorePack-validation.tsx",
      runtimeBindings: {
        colorOptions,
      },
    },
  },
  {
    id: "data-provider",
    name: "Using Data Provider",
    description: radiosetCorePackDocs["data-provider"].description,
    recipe: radiosetCorePackDocs["data-provider"].recipe,
    Component: RadiosetCorePackDataProviderExample,
    playground: {
      initialSource: radiosetCorePackDataProviderPlaygroundSource,
      fileName: "radiosetCorePack-dataProvider.tsx",
      runtimeBindings: {
        browserOptions,
        browserShortListOptions,
        createOptionsDataProvider,
      },
    },
  },
];

export default function RadiosetCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Radioset core pack examples"
      componentType="oj-c-radioset"
      packLabel="Core Pack"
      layoutId="radiosetCorePackNavigationLayout"
      items={radiosetCorePackItems}
      initialItemId="overview"
    />
  );
}
