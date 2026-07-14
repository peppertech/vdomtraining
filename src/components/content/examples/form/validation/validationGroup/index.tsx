import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import ValidationGroupAsyncValidationExample from "./validationGroup-asyncValidation/validationGroup-asyncValidation";
import ValidationGroupCrossFieldExample from "./validationGroup-crossFieldValidation/validationGroup-crossFieldValidation";
import {
  validationGroupDocs,
  type ValidationGroupDemoId,
} from "./validationGroup-docs";
import ValidationGroupDynamicFormExample from "./validationGroup-dynamicFormValidation/validationGroup-dynamicFormValidation";
import ValidationGroupFormFieldsExample from "./validationGroup-formFieldsValidation/validationGroup-formFieldsValidation";
import ValidationGroupOneRequiredExample from "./validationGroup-oneRequiredValidation/validationGroup-oneRequiredValidation";
import ValidationGroupRequiredFieldsExample from "./validationGroup-requiredFieldValidation/validationGroup-requiredFieldValidation";

const validationGroupItems: {
  id: ValidationGroupDemoId;
  name: string;
  description: (typeof validationGroupDocs)[ValidationGroupDemoId]["description"];
  recipe: (typeof validationGroupDocs)[ValidationGroupDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "required-fields",
    name: "Basic",
    description: validationGroupDocs["required-fields"].description,
    recipe: validationGroupDocs["required-fields"].recipe,
    Component: ValidationGroupRequiredFieldsExample,
  },
   {
    id: "one-required",
    name: "One in Group Required",
    description: validationGroupDocs["one-required"].description,
    recipe: validationGroupDocs["one-required"].recipe,
    Component: ValidationGroupOneRequiredExample,
  },
  {
    id: "form-fields",
    name: "Form Fields, Two Must Match",
    description: validationGroupDocs["form-fields"].description,
    recipe: validationGroupDocs["form-fields"].recipe,
    Component: ValidationGroupFormFieldsExample,
  },
  {
    id: "dynamic-form",
    name: "Add/Remove fields",
    description: validationGroupDocs["dynamic-form"].description,
    recipe: validationGroupDocs["dynamic-form"].recipe,
    Component: ValidationGroupDynamicFormExample,
  },
   {
    id: "cross-field",
    name: "Cross Field - Required Validation",
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
