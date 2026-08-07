import * as preact from 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import Context = require("ojs/ojcontext");
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import ValidationGroupAsyncValidationExample from "./validationGroup-asyncValidation/validationGroup-asyncValidation";
import DemoNumberRangeAsyncValidator from "./validationGroup-asyncValidation/DemoNumberRangeAsyncValidator";
import validationGroupAsyncValidationPlaygroundSource from "./validationGroup-asyncValidation/validationGroup-asyncValidation-source";
import ValidationGroupCrossFieldExample from "./validationGroup-crossFieldValidation/validationGroup-crossFieldValidation";
import validationGroupCrossFieldValidationPlaygroundSource from "./validationGroup-crossFieldValidation/validationGroup-crossFieldValidation-source";
import {
  validationGroupDocs,
  type ValidationGroupDemoId,
} from "./validationGroup-docs";
import ValidationGroupDynamicFormExample from "./validationGroup-dynamicFormValidation/validationGroup-dynamicFormValidation";
import validationGroupDynamicFormValidationPlaygroundSource from "./validationGroup-dynamicFormValidation/validationGroup-dynamicFormValidation-source";
import ValidationGroupFormFieldsExample from "./validationGroup-formFieldsValidation/validationGroup-formFieldsValidation";
import validationGroupFormFieldsValidationPlaygroundSource from "./validationGroup-formFieldsValidation/validationGroup-formFieldsValidation-source";
import ValidationGroupOneRequiredExample from "./validationGroup-oneRequiredValidation/validationGroup-oneRequiredValidation";
import validationGroupOneRequiredValidationPlaygroundSource from "./validationGroup-oneRequiredValidation/validationGroup-oneRequiredValidation-source";
import validationGroupOneRequiredValidationCssSource from "./validationGroup-oneRequiredValidation/demo-source";
import ValidationGroupRequiredFieldsExample from "./validationGroup-requiredFieldValidation/validationGroup-requiredFieldValidation";
import validationGroupRequiredFieldValidationPlaygroundSource from "./validationGroup-requiredFieldValidation/validationGroup-requiredFieldValidation-source";

const validationGroupItems: {
  id: ValidationGroupDemoId;
  name: string;
  description: (typeof validationGroupDocs)[ValidationGroupDemoId]["description"];
  recipe: (typeof validationGroupDocs)[ValidationGroupDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "required-fields",
    name: "Basic",
    description: validationGroupDocs["required-fields"].description,
    recipe: validationGroupDocs["required-fields"].recipe,
    Component: ValidationGroupRequiredFieldsExample,
    playground: {
      initialSource: validationGroupRequiredFieldValidationPlaygroundSource,
      fileName: "validationGroup-requiredFieldValidation.tsx",
    },
  },
   {
    id: "one-required",
    name: "One in Group Required",
    description: validationGroupDocs["one-required"].description,
    recipe: validationGroupDocs["one-required"].recipe,
    Component: ValidationGroupOneRequiredExample,
    playground: {
      initialSource: validationGroupOneRequiredValidationPlaygroundSource,
      fileName: "validationGroup-oneRequiredValidation.tsx",
      runtimeBindings: { AsyncRegExpValidator },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: validationGroupOneRequiredValidationCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "form-fields",
    name: "Form Fields, Two Must Match",
    description: validationGroupDocs["form-fields"].description,
    recipe: validationGroupDocs["form-fields"].recipe,
    Component: ValidationGroupFormFieldsExample,
    playground: {
      initialSource: validationGroupFormFieldsValidationPlaygroundSource,
      fileName: "validationGroup-formFieldsValidation.tsx",
    },
  },
  {
    id: "dynamic-form",
    name: "Add/Remove fields",
    description: validationGroupDocs["dynamic-form"].description,
    recipe: validationGroupDocs["dynamic-form"].recipe,
    Component: ValidationGroupDynamicFormExample,
    playground: {
      initialSource: validationGroupDynamicFormValidationPlaygroundSource,
      fileName: "validationGroup-dynamicFormValidation.tsx",
      runtimeBindings: { ArrayDataProvider, AsyncRegExpValidator },
    },
  },
   {
    id: "cross-field",
    name: "Cross Field - Required Validation",
    description: validationGroupDocs["cross-field"].description,
    recipe: validationGroupDocs["cross-field"].recipe,
    Component: ValidationGroupCrossFieldExample,
    playground: {
      initialSource: validationGroupCrossFieldValidationPlaygroundSource,
      fileName: "validationGroup-crossFieldValidation.tsx",
      runtimeBindings: { AsyncRegExpValidator, Context },
    },
  },
  {
    id: "async-validation",
    name: "Async Validation",
    description: validationGroupDocs["async-validation"].description,
    recipe: validationGroupDocs["async-validation"].recipe,
    Component: ValidationGroupAsyncValidationExample,
    playground: {
      initialSource: validationGroupAsyncValidationPlaygroundSource,
      fileName: "validationGroup-asyncValidation.tsx",
      runtimeBindings: { DemoNumberRangeAsyncValidator },
    },
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
