import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import FormLayoutLegacyColumnSpanExample from "./formLayoutLegacy-columnSpan";
import {
  formLayoutLegacyDocs,
  type FormLayoutLegacyDemoId,
} from "./formLayoutLegacy-docs";
import FormLayoutLegacyFormInputsExample from "./formLayoutLegacy-formInputs";
import FormLayoutLegacyFormInputsMixedExample from "./formLayoutLegacy-formInputsMixed";
import FormLayoutLegacyJobApplicationExample from "./formLayoutLegacy-jobApplication";
import FormLayoutLegacyNestedExample from "./formLayoutLegacy-nested";
import FormLayoutLegacySharedColumnExample from "./formLayoutLegacy-sharedColumn";

const formLayoutLegacyItems: {
  id: FormLayoutLegacyDemoId;
  name: string;
  description: (typeof formLayoutLegacyDocs)[FormLayoutLegacyDemoId]["description"];
  recipe: (typeof formLayoutLegacyDocs)[FormLayoutLegacyDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "form-inputs",
    name: "Overview",
    description: formLayoutLegacyDocs["form-inputs"].description,
    recipe: formLayoutLegacyDocs["form-inputs"].recipe,
    Component: FormLayoutLegacyFormInputsExample,
  },
  {
    id: "mixed",
    name: "Mixed Inputs",
    description: formLayoutLegacyDocs.mixed.description,
    recipe: formLayoutLegacyDocs.mixed.recipe,
    Component: FormLayoutLegacyFormInputsMixedExample,
  },
  {
    id: "column-span",
    name: "Column Span",
    description: formLayoutLegacyDocs["column-span"].description,
    recipe: formLayoutLegacyDocs["column-span"].recipe,
    Component: FormLayoutLegacyColumnSpanExample,
  },
  {
    id: "nested",
    name: "Nested Form Layout",
    description: formLayoutLegacyDocs.nested.description,
    recipe: formLayoutLegacyDocs.nested.recipe,
    Component: FormLayoutLegacyNestedExample,
  },
  {
    id: "shared-column",
    name: "Shared Column",
    description: formLayoutLegacyDocs["shared-column"].description,
    recipe: formLayoutLegacyDocs["shared-column"].recipe,
    Component: FormLayoutLegacySharedColumnExample,
  },
  {
    id: "job-application",
    name: "Job Application",
    description: formLayoutLegacyDocs["job-application"].description,
    recipe: formLayoutLegacyDocs["job-application"].recipe,
    Component: FormLayoutLegacyJobApplicationExample,
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
