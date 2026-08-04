import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import RadiosetBasicExample from "./radioset-basic";
import RadiosetDataProviderExample from "./radioset-dataProvider";
import {
  radiosetDocs,
  type RadiosetDemoId,
} from "./radioset-docs";
import RadiosetOverviewExample from "./radioset-overview";
import RadiosetReadonlyExample from "./radioset-readonly";
import RadiosetValidationExample from "./radioset-validation";
import radiosetBasicPlaygroundSource from "./radioset-basic-source";
import radiosetDataProviderPlaygroundSource from "./radioset-dataProvider-source";
import radiosetOverviewPlaygroundSource from "./radioset-overview-source";
import radiosetReadonlyPlaygroundSource from "./radioset-readonly-source";
import radiosetValidationPlaygroundSource from "./radioset-validation-source";
import {
  browserOptions,
  browserShortListOptions,
  colorOptions,
  confirmationMessages,
  createRadiosetOptionsDataProvider,
  errorMessages,
  infoMessages,
  renderRadioOptions,
  technologyOptions,
  warningMessages,
  wrappingOptions,
} from "./radioset-shared";

const radiosetItems: {
  id: RadiosetDemoId;
  name: string;
  description: (typeof radiosetDocs)[RadiosetDemoId]["description"];
  recipe: (typeof radiosetDocs)[RadiosetDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: radiosetDocs.overview.description,
    recipe: radiosetDocs.overview.recipe,
    Component: RadiosetOverviewExample,
    playground: {
      initialSource: radiosetOverviewPlaygroundSource,
      fileName: "radioset-overview.tsx",
      runtimeBindings: {
        confirmationMessages,
        errorMessages,
        infoMessages,
        renderRadioOptions,
        technologyOptions,
        warningMessages,
        wrappingOptions,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: radiosetDocs.basic.description,
    recipe: radiosetDocs.basic.recipe,
    Component: RadiosetBasicExample,
    playground: {
      initialSource: radiosetBasicPlaygroundSource,
      fileName: "radioset-basic.tsx",
      runtimeBindings: {
        colorOptions,
        renderRadioOptions,
      },
    },
  },
  {
    id: "readonly",
    name: "Readonly",
    description: radiosetDocs.readonly.description,
    recipe: radiosetDocs.readonly.recipe,
    Component: RadiosetReadonlyExample,
    playground: {
      initialSource: radiosetReadonlyPlaygroundSource,
      fileName: "radioset-readonly.tsx",
      runtimeBindings: {
        colorOptions,
        renderRadioOptions,
      },
    },
  },
  {
    id: "validation",
    name: "Validation",
    description: radiosetDocs.validation.description,
    recipe: radiosetDocs.validation.recipe,
    Component: RadiosetValidationExample,
    playground: {
      initialSource: radiosetValidationPlaygroundSource,
      fileName: "radioset-validation.tsx",
      runtimeBindings: {
        colorOptions,
        renderRadioOptions,
      },
    },
  },
  {
    id: "data-provider",
    name: "Data Provider Options",
    description: radiosetDocs["data-provider"].description,
    recipe: radiosetDocs["data-provider"].recipe,
    Component: RadiosetDataProviderExample,
    playground: {
      initialSource: radiosetDataProviderPlaygroundSource,
      fileName: "radioset-dataProvider.tsx",
      runtimeBindings: {
        browserOptions,
        browserShortListOptions,
        createRadiosetOptionsDataProvider,
      },
    },
  },
];

export default function RadiosetRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Radioset examples"
      componentType="oj-radioset"
      layoutId="radiosetLegacyNavigationLayout"
      items={radiosetItems}
      initialItemId="overview"
    />
  );
}
