import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import ValidationGroupAsyncValidationExample from "./validationGroup-asyncValidation";
import ValidationGroupCrossFieldExample from "./validationGroup-crossField";
import {
  validationGroupDocs,
  type ValidationGroupDemoId,
} from "./validationGroup-docs";
import ValidationGroupDynamicFormExample from "./validationGroup-dynamicForm";
import ValidationGroupFormFieldsExample from "./validationGroup-formFields";
import ValidationGroupOneRequiredExample from "./validationGroup-oneRequired";
import ValidationGroupRequiredFieldsExample from "./validationGroup-requiredFields";

const validationGroupItems: {
  id: ValidationGroupDemoId;
  name: string;
  description: (typeof validationGroupDocs)[ValidationGroupDemoId]["description"];
  recipe: (typeof validationGroupDocs)[ValidationGroupDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "required-fields",
    name: "Required Fields",
    description: validationGroupDocs["required-fields"].description,
    recipe: validationGroupDocs["required-fields"].recipe,
    Component: ValidationGroupRequiredFieldsExample,
  },
  {
    id: "form-fields",
    name: "Form Fields",
    description: validationGroupDocs["form-fields"].description,
    recipe: validationGroupDocs["form-fields"].recipe,
    Component: ValidationGroupFormFieldsExample,
  },
  {
    id: "one-required",
    name: "One Required",
    description: validationGroupDocs["one-required"].description,
    recipe: validationGroupDocs["one-required"].recipe,
    Component: ValidationGroupOneRequiredExample,
  },
  {
    id: "cross-field",
    name: "Cross Field",
    description: validationGroupDocs["cross-field"].description,
    recipe: validationGroupDocs["cross-field"].recipe,
    Component: ValidationGroupCrossFieldExample,
  },
  {
    id: "async-validation",
    name: "Async Validation",
    description: validationGroupDocs["async-validation"].description,
    recipe: validationGroupDocs["async-validation"].recipe,
    Component: ValidationGroupAsyncValidationExample,
  },
  {
    id: "dynamic-form",
    name: "Dynamic Form",
    description: validationGroupDocs["dynamic-form"].description,
    recipe: validationGroupDocs["dynamic-form"].recipe,
    Component: ValidationGroupDynamicFormExample,
  },
];

export default function ValidationGroupRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Validation Group examples"
      componentType="oj-validation-group"
      layoutId="validationGroupNavigationLayout"
      items={validationGroupItems}
      initialItemId="required-fields"
    />
  );
}
