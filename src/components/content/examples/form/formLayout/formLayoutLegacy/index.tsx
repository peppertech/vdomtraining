import * as preact from 'preact';
import Color = require("ojs/ojcolor");
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import FormLayoutLegacyColumnSpanExample from "./formLayoutLegacy-columnSpan";
import formLayoutLegacyColumnSpanPlaygroundSource from "./formLayoutLegacy-columnSpan-source";
import {
  formLayoutLegacyDocs,
  type FormLayoutLegacyDemoId,
} from "./formLayoutLegacy-docs";
import FormLayoutLegacyFormInputsExample from "./formLayoutLegacy-formInputs";
import formLayoutLegacyFormInputsPlaygroundSource from "./formLayoutLegacy-formInputs-source";
import FormLayoutLegacyFormInputsMixedExample from "./formLayoutLegacy-formInputsMixed";
import formLayoutLegacyFormInputsMixedPlaygroundSource from "./formLayoutLegacy-formInputsMixed-source";
import FormLayoutLegacyJobApplicationExample from "./formLayoutLegacy-jobApplication";
import formLayoutLegacyJobApplicationPlaygroundSource from "./formLayoutLegacy-jobApplication-source";
import FormLayoutLegacyNestedExample from "./formLayoutLegacy-nested";
import formLayoutLegacyNestedPlaygroundSource from "./formLayoutLegacy-nested-source";
import {
  browserOptions,
  colorOptions,
  columnOptions,
  controlStateOptions,
  createDataProvider,
  directionOptions,
  experienceOptions,
  formStateOptions,
  getLegacySelectManyValue,
  getLegacyTextValue,
  labelEdgeOptions,
  maxColumnOptions,
  sponsorshipTypeOptions,
  stateOptions,
  todayIsoDate,
  todayIsoDateTime,
  valueLengthOptions,
} from "./formLayoutLegacy-shared";
import FormLayoutLegacySharedColumnExample from "./formLayoutLegacy-sharedColumn";
import formLayoutLegacySharedColumnPlaygroundSource from "./formLayoutLegacy-sharedColumn-source";

const formLayoutLegacyItems: {
  id: FormLayoutLegacyDemoId;
  name: string;
  description: (typeof formLayoutLegacyDocs)[FormLayoutLegacyDemoId]["description"];
  recipe: (typeof formLayoutLegacyDocs)[FormLayoutLegacyDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "form-inputs",
    name: "Overview",
    description: formLayoutLegacyDocs["form-inputs"].description,
    recipe: formLayoutLegacyDocs["form-inputs"].recipe,
    Component: FormLayoutLegacyFormInputsExample,
    playground: {
      initialSource: formLayoutLegacyFormInputsPlaygroundSource,
      fileName: "formLayoutLegacy-formInputs.tsx",
      runtimeBindings: {
        Color,
        browserOptions,
        colorOptions,
        columnOptions,
        controlStateOptions,
        createDataProvider,
        directionOptions,
        formStateOptions,
        getLegacySelectManyValue,
        getLegacyTextValue,
        labelEdgeOptions,
        maxColumnOptions,
        todayIsoDate,
        todayIsoDateTime,
        valueLengthOptions,
      },
    },
  },
  {
    id: "mixed",
    name: "Mixed Readonly",
    description: formLayoutLegacyDocs.mixed.description,
    recipe: formLayoutLegacyDocs.mixed.recipe,
    Component: FormLayoutLegacyFormInputsMixedExample,
    playground: {
      initialSource: formLayoutLegacyFormInputsMixedPlaygroundSource,
      fileName: "formLayoutLegacy-formInputsMixed.tsx",
      runtimeBindings: {
        browserOptions,
        colorOptions,
        createDataProvider,
        getLegacySelectManyValue,
        getLegacyTextValue,
        labelEdgeOptions,
        todayIsoDate,
        todayIsoDateTime,
        valueLengthOptions,
      },
    },
  },
   {
    id: "nested",
    name: "Nested",
    description: formLayoutLegacyDocs.nested.description,
    recipe: formLayoutLegacyDocs.nested.recipe,
    Component: FormLayoutLegacyNestedExample,
    playground: {
      initialSource: formLayoutLegacyNestedPlaygroundSource,
      fileName: "formLayoutLegacy-nested.tsx",
    },
  },
  {
    id: "column-span",
    name: "Column Span",
    description: formLayoutLegacyDocs["column-span"].description,
    recipe: formLayoutLegacyDocs["column-span"].recipe,
    Component: FormLayoutLegacyColumnSpanExample,
    playground: {
      initialSource: formLayoutLegacyColumnSpanPlaygroundSource,
      fileName: "formLayoutLegacy-columnSpan.tsx",
      runtimeBindings: {
        createDataProvider,
      },
    },
  },
  {
    id: "shared-column",
    name: "Column Share",
    description: formLayoutLegacyDocs["shared-column"].description,
    recipe: formLayoutLegacyDocs["shared-column"].recipe,
    Component: FormLayoutLegacySharedColumnExample,
    playground: {
      initialSource: formLayoutLegacySharedColumnPlaygroundSource,
      fileName: "formLayoutLegacy-sharedColumn.tsx",
    },
  },
  {
    id: "job-application",
    name: "Job Application Example",
    description: formLayoutLegacyDocs["job-application"].description,
    recipe: formLayoutLegacyDocs["job-application"].recipe,
    Component: FormLayoutLegacyJobApplicationExample,
    playground: {
      initialSource: formLayoutLegacyJobApplicationPlaygroundSource,
      fileName: "formLayoutLegacy-jobApplication.tsx",
      runtimeBindings: {
        createDataProvider,
        experienceOptions,
        sponsorshipTypeOptions,
        stateOptions,
        todayIsoDate,
      },
    },
  },
];

export default function FormLayoutLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Form Layout legacy examples"
      componentType="oj-form-layout"
      layoutId="formLayoutLegacyNavigationLayout"
      items={formLayoutLegacyItems}
      initialItemId="form-inputs"
      routeSegments={["form-layout", "form-layout-legacy"]}
    />
  );
}
