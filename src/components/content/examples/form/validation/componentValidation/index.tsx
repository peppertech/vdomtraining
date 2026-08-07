import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import AsyncDateRestrictionValidator = require("ojs/ojasyncvalidator-daterestriction");
import AsyncNumberRangeValidator = require("ojs/ojasyncvalidator-numberrange");
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import Context = require("ojs/ojcontext");
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { NumberConverter } from "ojs/ojconverter-nativenumber";
import {
  componentValidationDocs,
  type ComponentValidationDemoId,
} from "./componentValidation-docs";
import ValidationUsecasesAsyncValidatorsExample from "./validationUsecases-asyncValidators/validationUsecases-asyncValidators";
import validationUsecasesAsyncValidatorsPlaygroundSource from "./validationUsecases-asyncValidators/validationUsecases-asyncValidators-source";
import ValidationUsecasesComponentCreateExample from "./validationUsecases-componentCreate/validationUsecases-componentCreate";
import validationUsecasesComponentCreatePlaygroundSource from "./validationUsecases-componentCreate/validationUsecases-componentCreate-source";
import ValidationUsecasesConverterOptionExample from "./validationUsecases-converterOption/validationUsecases-converterOption";
import validationUsecasesConverterOptionPlaygroundSource from "./validationUsecases-converterOption/validationUsecases-converterOption-source";
import ValidationUsecasesMessagesCustomExample from "./validationUsecases-messagesCustom/validationUsecases-messagesCustom";
import validationUsecasesMessagesCustomPlaygroundSource from "./validationUsecases-messagesCustom/validationUsecases-messagesCustom-source";
import ValidationUsecasesRefreshMethodExample from "./validationUsecases-refreshMethod/validationUsecases-refreshMethod";
import validationUsecasesRefreshMethodPlaygroundSource from "./validationUsecases-refreshMethod/validationUsecases-refreshMethod-source";
import ValidationUsecasesRequiredOptionExample from "./validationUsecases-requiredOption/validationUsecases-requiredOption";
import validationUsecasesRequiredOptionPlaygroundSource from "./validationUsecases-requiredOption/validationUsecases-requiredOption-source";
import ValidationUsecasesResetMethodExample from "./validationUsecases-resetMethod/validationUsecases-resetMethod";
import validationUsecasesResetMethodPlaygroundSource from "./validationUsecases-resetMethod/validationUsecases-resetMethod-source";
import ValidationUsecasesShowMessagesExample from "./validationUsecases-showMessagesMethod/validationUsecases-showMessagesMethod";
import validationUsecasesShowMessagesPlaygroundSource from "./validationUsecases-showMessagesMethod/validationUsecases-showMessagesMethod-source";
import ValidationUsecasesValidOptionExample from "./validationUsecases-validOption/validationUsecases-validOption";
import validationUsecasesValidOptionPlaygroundSource from "./validationUsecases-validOption/validationUsecases-validOption-source";
import ValidationUsecasesValidateMethodExample from "./validationUsecases-validateMethod/validationUsecases-validateMethod";
import validationUsecasesValidateMethodPlaygroundSource from "./validationUsecases-validateMethod/validationUsecases-validateMethod-source";
import ValidationUsecasesValidatorsOptionExample from "./validationUsecases-validatorsOption/validationUsecases-validatorsOption";
import validationUsecasesValidatorsOptionPlaygroundSource from "./validationUsecases-validatorsOption/validationUsecases-validatorsOption-source";
import ValidationUsecasesValueOptionExample from "./validationUsecases-valueOption/validationUsecases-valueOption";
import validationUsecasesValueOptionPlaygroundSource from "./validationUsecases-valueOption/validationUsecases-valueOption-source";

const componentValidationItems: {
  id: ComponentValidationDemoId;
  name: string;
  description: (typeof componentValidationDocs)[ComponentValidationDemoId]["description"];
  recipe: (typeof componentValidationDocs)[ComponentValidationDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "async-validators",
    name: "Async Validators",
    description: componentValidationDocs["async-validators"].description,
    recipe: componentValidationDocs["async-validators"].recipe,
    Component: ValidationUsecasesAsyncValidatorsExample,
    playground: {
      initialSource: validationUsecasesAsyncValidatorsPlaygroundSource,
      fileName: "validationUsecases-asyncValidators.tsx",
      runtimeBindings: {
        IntlDateTimeConverter,
        IntlNumberConverter,
        Context,
        AsyncNumberRangeValidator,
        AsyncDateRestrictionValidator,
      },
    },
  },
  {
    id: "show-messages",
    name: "Show Deferred Messages",
    description: componentValidationDocs["show-messages"].description,
    recipe: componentValidationDocs["show-messages"].recipe,
    Component: ValidationUsecasesShowMessagesExample,
    playground: {
      initialSource: validationUsecasesShowMessagesPlaygroundSource,
      fileName: "validationUsecases-showMessagesMethod.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
   {
    id: "valid-option",
    name: "Valid Property Change",
    description: componentValidationDocs["valid-option"].description,
    recipe: componentValidationDocs["valid-option"].recipe,
    Component: ValidationUsecasesValidOptionExample,
    playground: {
      initialSource: validationUsecasesValidOptionPlaygroundSource,
      fileName: "validationUsecases-validOption.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
  {
    id: "value-option",
    name: "Value Property Change",
    description: componentValidationDocs["value-option"].description,
    recipe: componentValidationDocs["value-option"].recipe,
    Component: ValidationUsecasesValueOptionExample,
    playground: {
      initialSource: validationUsecasesValueOptionPlaygroundSource,
      fileName: "validationUsecases-valueOption.tsx",
    },
  },
  {
    id: "component-create",
    name: "Validate Component",
    description: componentValidationDocs["component-create"].description,
    recipe: componentValidationDocs["component-create"].recipe,
    Component: ValidationUsecasesComponentCreateExample,
    playground: {
      initialSource: validationUsecasesComponentCreatePlaygroundSource,
      fileName: "validationUsecases-componentCreate.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
  {
    id: "messages-custom",
    name: "Messages Custom",
    description: componentValidationDocs["messages-custom"].description,
    recipe: componentValidationDocs["messages-custom"].recipe,
    Component: ValidationUsecasesMessagesCustomExample,
    playground: {
      initialSource: validationUsecasesMessagesCustomPlaygroundSource,
      fileName: "validationUsecases-messagesCustom.tsx",
    },
  },
  {
    id: "reset-method",
    name: "Reset Component",
    description: componentValidationDocs["reset-method"].description,
    recipe: componentValidationDocs["reset-method"].recipe,
    Component: ValidationUsecasesResetMethodExample,
    playground: {
      initialSource: validationUsecasesResetMethodPlaygroundSource,
      fileName: "validationUsecases-resetMethod.tsx",
      runtimeBindings: { AsyncNumberRangeValidator },
    },
  },
  {
    id: "validate-method",
    name: "Validate Component",
    description: componentValidationDocs["validate-method"].description,
    recipe: componentValidationDocs["validate-method"].recipe,
    Component: ValidationUsecasesValidateMethodExample,
    playground: {
      initialSource: validationUsecasesValidateMethodPlaygroundSource,
      fileName: "validationUsecases-validateMethod.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
  {
    id: "required-option",
    name: "Required Property Change",
    description: componentValidationDocs["required-option"].description,
    recipe: componentValidationDocs["required-option"].recipe,
    Component: ValidationUsecasesRequiredOptionExample,
    playground: {
      initialSource: validationUsecasesRequiredOptionPlaygroundSource,
      fileName: "validationUsecases-requiredOption.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
  {
    id: "validators-option",
    name: "Validators Option",
    description: componentValidationDocs["validators-option"].description,
    recipe: componentValidationDocs["validators-option"].recipe,
    Component: ValidationUsecasesValidatorsOptionExample,
    playground: {
      initialSource: validationUsecasesValidatorsOptionPlaygroundSource,
      fileName: "validationUsecases-validatorsOption.tsx",
      runtimeBindings: { AsyncRegExpValidator, AsyncNumberRangeValidator },
    },
  },
   {
    id: "converter-option",
    name: "Converter Property Change",
    description: componentValidationDocs["converter-option"].description,
    recipe: componentValidationDocs["converter-option"].recipe,
    Component: ValidationUsecasesConverterOptionExample,
    playground: {
      initialSource: validationUsecasesConverterOptionPlaygroundSource,
      fileName: "validationUsecases-converterOption.tsx",
      runtimeBindings: { IntlDateTimeConverter, NumberConverter },
    },
  },
  {
    id: "refresh-method",
    name: "Refresh Method",
    description: componentValidationDocs["refresh-method"].description,
    recipe: componentValidationDocs["refresh-method"].recipe,
    Component: ValidationUsecasesRefreshMethodExample,
    playground: {
      initialSource: validationUsecasesRefreshMethodPlaygroundSource,
      fileName: "validationUsecases-refreshMethod.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
];

export default function ComponentValidationIndex() {
  return (
    <RecipePageTemplate
      ariaLabel="Component Validation examples"
      componentType="Component Validation"
      layoutId="componentValidationNavigationLayout"
      items={componentValidationItems}
      initialItemId="async-validators"
    />
  );
}
