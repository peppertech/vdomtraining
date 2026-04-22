import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import FormLayoutCorePackColumnSpanExample from "./formLayoutCorePack-columnSpan";
import FormLayoutCorePackConditionalInputsExample from "./formLayoutCorePack-conditionalInputs";
import {
  formLayoutCorePackDocs,
  type FormLayoutCorePackDemoId,
} from "./formLayoutCorePack-docs";
import FormLayoutCorePackFormInputsExample from "./formLayoutCorePack-formInputs";
import FormLayoutCorePackFormInputsMixedExample from "./formLayoutCorePack-formInputsMixed";
import FormLayoutCorePackJobApplicationExample from "./formLayoutCorePack-jobApplication";
import FormLayoutCorePackReadonlyVsMixedExample from "./formLayoutCorePack-readonlyVsMixed";
import FormLayoutCorePackSharedColumnExample from "./formLayoutCorePack-sharedColumn";

const formLayoutCorePackItems: {
  id: FormLayoutCorePackDemoId;
  name: string;
  description: (typeof formLayoutCorePackDocs)[FormLayoutCorePackDemoId]["description"];
  recipe: (typeof formLayoutCorePackDocs)[FormLayoutCorePackDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "form-inputs",
    name: "Overview",
    description: formLayoutCorePackDocs["form-inputs"].description,
    recipe: formLayoutCorePackDocs["form-inputs"].recipe,
    Component: FormLayoutCorePackFormInputsExample,
  },
  {
    id: "mixed",
    name: "Mixed Inputs",
    description: formLayoutCorePackDocs.mixed.description,
    recipe: formLayoutCorePackDocs.mixed.recipe,
    Component: FormLayoutCorePackFormInputsMixedExample,
  },
  {
    id: "column-span",
    name: "Column Span",
    description: formLayoutCorePackDocs["column-span"].description,
    recipe: formLayoutCorePackDocs["column-span"].recipe,
    Component: FormLayoutCorePackColumnSpanExample,
  },
  {
    id: "conditional-inputs",
    name: "Conditional Inputs",
    description: formLayoutCorePackDocs["conditional-inputs"].description,
    recipe: formLayoutCorePackDocs["conditional-inputs"].recipe,
    Component: FormLayoutCorePackConditionalInputsExample,
  },
  {
    id: "job-application",
    name: "Job Application",
    description: formLayoutCorePackDocs["job-application"].description,
    recipe: formLayoutCorePackDocs["job-application"].recipe,
    Component: FormLayoutCorePackJobApplicationExample,
  },
  {
    id: "readonly-vs-mixed",
    name: "Readonly vs Mixed",
    description: formLayoutCorePackDocs["readonly-vs-mixed"].description,
    recipe: formLayoutCorePackDocs["readonly-vs-mixed"].recipe,
    Component: FormLayoutCorePackReadonlyVsMixedExample,
  },
  {
    id: "shared-column",
    name: "Shared Column",
    description: formLayoutCorePackDocs["shared-column"].description,
    recipe: formLayoutCorePackDocs["shared-column"].recipe,
    Component: FormLayoutCorePackSharedColumnExample,
  },
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
    />
  );
}
