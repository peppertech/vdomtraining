import type { ComponentChildren } from "preact";
import { validationGroupAsyncValidationDescription } from "./validationGroup-asyncValidation/description";
import { validationGroupAsyncValidationRecipe } from "./validationGroup-asyncValidation/recipe";
import { validationGroupCrossFieldValidationDescription } from "./validationGroup-crossFieldValidation/description";
import { validationGroupCrossFieldValidationRecipe } from "./validationGroup-crossFieldValidation/recipe";
import { validationGroupDynamicFormValidationDescription } from "./validationGroup-dynamicFormValidation/description";
import { validationGroupDynamicFormValidationRecipe } from "./validationGroup-dynamicFormValidation/recipe";
import { validationGroupFormFieldsValidationDescription } from "./validationGroup-formFieldsValidation/description";
import { validationGroupFormFieldsValidationRecipe } from "./validationGroup-formFieldsValidation/recipe";
import { validationGroupOneRequiredValidationDescription } from "./validationGroup-oneRequiredValidation/description";
import { validationGroupOneRequiredValidationRecipe } from "./validationGroup-oneRequiredValidation/recipe";
import { validationGroupRequiredFieldValidationDescription } from "./validationGroup-requiredFieldValidation/description";
import { validationGroupRequiredFieldValidationRecipe } from "./validationGroup-requiredFieldValidation/recipe";

export type ValidationGroupDemoId =
  | "required-fields"
  | "form-fields"
  | "one-required"
  | "cross-field"
  | "async-validation"
  | "dynamic-form";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const validationGroupDocs: Record<ValidationGroupDemoId, DocsEntry> = {
  "required-fields": {
    description: validationGroupRequiredFieldValidationDescription,
    recipe: validationGroupRequiredFieldValidationRecipe,
  },
  "form-fields": {
    description: validationGroupFormFieldsValidationDescription,
    recipe: validationGroupFormFieldsValidationRecipe,
  },
  "one-required": {
    description: validationGroupOneRequiredValidationDescription,
    recipe: validationGroupOneRequiredValidationRecipe,
  },
  "cross-field": {
    description: validationGroupCrossFieldValidationDescription,
    recipe: validationGroupCrossFieldValidationRecipe,
  },
  "async-validation": {
    description: validationGroupAsyncValidationDescription,
    recipe: validationGroupAsyncValidationRecipe,
  },
  "dynamic-form": {
    description: validationGroupDynamicFormValidationDescription,
    recipe: validationGroupDynamicFormValidationRecipe,
  },
};
