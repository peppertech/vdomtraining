import * as preact from 'preact';
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import FormLayoutCorePackColumnSpanExample from "./formLayoutCorePack-columnSpan";
import formLayoutCorePackColumnSpanPlaygroundSource from "./formLayoutCorePack-columnSpan-source";
import FormLayoutCorePackConditionalInputsExample from "./formLayoutCorePack-conditionalInputs";
import formLayoutCorePackConditionalInputsPlaygroundSource from "./formLayoutCorePack-conditionalInputs-source";
import {
  formLayoutCorePackDocs,
  type FormLayoutCorePackDemoId,
} from "./formLayoutCorePack-docs";
import { FormLayoutCorePack } from "./formLayoutCorePack";
import FormLayoutCorePackFormInputsExample from "./formLayoutCorePack-formInputs";
import formLayoutCorePackFormInputsPlaygroundSource from "./formLayoutCorePack-formInputs-source";
import FormLayoutCorePackFormInputsMixedExample from "./formLayoutCorePack-formInputsMixed";
import formLayoutCorePackFormInputsMixedPlaygroundSource from "./formLayoutCorePack-formInputsMixed-source";
import FormLayoutCorePackJobApplicationExample from "./formLayoutCorePack-jobApplication";
import formLayoutCorePackJobApplicationPlaygroundSource from "./formLayoutCorePack-jobApplication-source";
import FormLayoutCorePackReadonlyVsMixedExample from "./formLayoutCorePack-readonlyVsMixed";
import formLayoutCorePackReadonlyVsMixedPlaygroundSource from "./formLayoutCorePack-readonlyVsMixed-source";
import FormLayoutCorePackSharedColumnExample from "./formLayoutCorePack-sharedColumn";
import formLayoutCorePackSharedColumnPlaygroundSource from "./formLayoutCorePack-sharedColumn-source";

const formLayoutCorePackItems: {
  id: FormLayoutCorePackDemoId;
  name: string;
  description: (typeof formLayoutCorePackDocs)[FormLayoutCorePackDemoId]["description"];
  recipe: (typeof formLayoutCorePackDocs)[FormLayoutCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "form-inputs",
    name: "Overview",
    description: formLayoutCorePackDocs["form-inputs"].description,
    recipe: formLayoutCorePackDocs["form-inputs"].recipe,
    Component: FormLayoutCorePackFormInputsExample,
    playground: {
      initialSource: formLayoutCorePackFormInputsPlaygroundSource,
      fileName: "formLayoutCorePack-formInputs.tsx",
      runtimeBindings: {
        FormLayoutCorePack,
      },
    },
  },
  {
    id: "readonly-vs-mixed",
    name: "Readonly vs Mixed",
    description: formLayoutCorePackDocs["readonly-vs-mixed"].description,
    recipe: formLayoutCorePackDocs["readonly-vs-mixed"].recipe,
    Component: FormLayoutCorePackReadonlyVsMixedExample,
    playground: {
      initialSource: formLayoutCorePackReadonlyVsMixedPlaygroundSource,
      fileName: "formLayoutCorePack-readonlyVsMixed.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
    },
  },
  {
    id: "mixed",
    name: "Mixed Readonly",
    description: formLayoutCorePackDocs.mixed.description,
    recipe: formLayoutCorePackDocs.mixed.recipe,
    Component: FormLayoutCorePackFormInputsMixedExample,
    playground: {
      initialSource: formLayoutCorePackFormInputsMixedPlaygroundSource,
      fileName: "formLayoutCorePack-formInputsMixed.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
    },
  },
  {
    id: "column-span",
    name: "Column Span",
    description: formLayoutCorePackDocs["column-span"].description,
    recipe: formLayoutCorePackDocs["column-span"].recipe,
    Component: FormLayoutCorePackColumnSpanExample,
    playground: {
      initialSource: formLayoutCorePackColumnSpanPlaygroundSource,
      fileName: "formLayoutCorePack-columnSpan.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
    },
  },
  {
    id: "shared-column",
    name: "Column Share",
    description: formLayoutCorePackDocs["shared-column"].description,
    recipe: formLayoutCorePackDocs["shared-column"].recipe,
    Component: FormLayoutCorePackSharedColumnExample,
    playground: {
      initialSource: formLayoutCorePackSharedColumnPlaygroundSource,
      fileName: "formLayoutCorePack-sharedColumn.tsx",
    },
  },
  {
    id: "job-application",
    name: "Job Application Example",
    description: formLayoutCorePackDocs["job-application"].description,
    recipe: formLayoutCorePackDocs["job-application"].recipe,
    Component: FormLayoutCorePackJobApplicationExample,
    playground: {
      initialSource: formLayoutCorePackJobApplicationPlaygroundSource,
      fileName: "formLayoutCorePack-jobApplication.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
    },
  },
   {
    id: "conditional-inputs",
    name: "Conditional Inputs",
    description: formLayoutCorePackDocs["conditional-inputs"].description,
    recipe: formLayoutCorePackDocs["conditional-inputs"].recipe,
    Component: FormLayoutCorePackConditionalInputsExample,
    playground: {
      initialSource: formLayoutCorePackConditionalInputsPlaygroundSource,
      fileName: "formLayoutCorePack-conditionalInputs.tsx",
      runtimeBindings: {
        MutableArrayDataProvider,
      },
    },
  }
];

export default function FormLayoutCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Form Layout core pack examples"
      componentType="oj-c-form-layout"
      packLabel="Core Pack"
      layoutId="formLayoutCorePackNavigationLayout"
      items={formLayoutCorePackItems}
      initialItemId="form-inputs"
      routeSegments={["form-layout", "form-layout-corepack"]}
    />
  );
}
