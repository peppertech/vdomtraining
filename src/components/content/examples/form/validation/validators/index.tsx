import * as preact from 'preact';
import AsyncLengthValidator = require("ojs/ojasyncvalidator-length");
import AsyncNumberRangeValidator = require("ojs/ojasyncvalidator-numberrange");
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import { IntlNumberConverter } from "ojs/ojconverter-number";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import ValidatorsCustomValidatorsExample from "./validators-customValidators/validators-customValidators";
import validatorsCustomValidatorsPlaygroundSource from "./validators-customValidators/validators-customValidators-source";
import ValidatorsDefaultValidatorMessagesExample from "./validators-defaultValidatorMessages/validators-defaultValidatorMessages";
import validatorsDefaultValidatorMessagesPlaygroundSource from "./validators-defaultValidatorMessages/validators-defaultValidatorMessages-source";
import { validatorsDocs,type ValidatorsDemoId } from "./validators-docs";
import ValidatorsLengthValidatorExample from "./validators-lengthValidator/validators-lengthValidator";
import validatorsLengthValidatorPlaygroundSource from "./validators-lengthValidator/validators-lengthValidator-source";
import ValidatorsNumberRangeValidatorExample from "./validators-numberRangeValidator/validators-numberRangeValidator";
import validatorsNumberRangeValidatorPlaygroundSource from "./validators-numberRangeValidator/validators-numberRangeValidator-source";
import ValidatorsRegExpValidatorExample from "./validators-regExpValidator/validators-regExpValidator";
import validatorsRegExpValidatorPlaygroundSource from "./validators-regExpValidator/validators-regExpValidator-source";
import ValidatorsRequiredValidatorExample from "./validators-requiredValidator/validators-requiredValidator";
import validatorsRequiredValidatorPlaygroundSource from "./validators-requiredValidator/validators-requiredValidator-source";
import ValidatorsValidateOnInputExample from "./validators-validateOnInput/validators-validateOnInput";
import validatorsValidateOnInputPlaygroundSource from "./validators-validateOnInput/validators-validateOnInput-source";

const validatorsItems: {
  id: ValidatorsDemoId;
  name: string;
  description: (typeof validatorsDocs)[ValidatorsDemoId]["description"];
  recipe: (typeof validatorsDocs)[ValidatorsDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "length-validator",
    name: "Length Validator",
    description: validatorsDocs["length-validator"].description,
    recipe: validatorsDocs["length-validator"].recipe,
    Component: ValidatorsLengthValidatorExample,
    playground: {
      initialSource: validatorsLengthValidatorPlaygroundSource,
      fileName: "validators-lengthValidator.tsx",
      runtimeBindings: { AsyncLengthValidator },
    },
  },
  {
    id: "validate-on-input",
    name: "Validate Length on Input",
    description: validatorsDocs["validate-on-input"].description,
    recipe: validatorsDocs["validate-on-input"].recipe,
    Component: ValidatorsValidateOnInputExample,
    playground: {
      initialSource: validatorsValidateOnInputPlaygroundSource,
      fileName: "validators-validateOnInput.tsx",
      runtimeBindings: { AsyncLengthValidator },
    },
  },
  {
    id: "number-range-validator",
    name: "Number Range Validator",
    description: validatorsDocs["number-range-validator"].description,
    recipe: validatorsDocs["number-range-validator"].recipe,
    Component: ValidatorsNumberRangeValidatorExample,
    playground: {
      initialSource: validatorsNumberRangeValidatorPlaygroundSource,
      fileName: "validators-numberRangeValidator.tsx",
      runtimeBindings: { IntlNumberConverter, AsyncNumberRangeValidator },
    },
  },
  {
    id: "regexp-validator",
    name: "RegExp Validator",
    description: validatorsDocs["regexp-validator"].description,
    recipe: validatorsDocs["regexp-validator"].recipe,
    Component: ValidatorsRegExpValidatorExample,
    playground: {
      initialSource: validatorsRegExpValidatorPlaygroundSource,
      fileName: "validators-regExpValidator.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
  {
    id: "required-validator",
    name: "Required Validator",
    description: validatorsDocs["required-validator"].description,
    recipe: validatorsDocs["required-validator"].recipe,
    Component: ValidatorsRequiredValidatorExample,
    playground: {
      initialSource: validatorsRequiredValidatorPlaygroundSource,
      fileName: "validators-requiredValidator.tsx",
    },
  },
  
  {
    id: "custom-validators",
    name: "Custom Validators",
    description: validatorsDocs["custom-validators"].description,
    recipe: validatorsDocs["custom-validators"].recipe,
    Component: ValidatorsCustomValidatorsExample,
    playground: {
      initialSource: validatorsCustomValidatorsPlaygroundSource,
      fileName: "validators-customValidators.tsx",
      runtimeBindings: { AsyncRegExpValidator },
    },
  },
  
  {
    id: "default-validator-messages",
    name: "Default Validator Messages",
    description: validatorsDocs["default-validator-messages"].description,
    recipe: validatorsDocs["default-validator-messages"].recipe,
    Component: ValidatorsDefaultValidatorMessagesExample,
    playground: {
      initialSource: validatorsDefaultValidatorMessagesPlaygroundSource,
      fileName: "validators-defaultValidatorMessages.tsx",
      runtimeBindings: { AsyncLengthValidator, AsyncRegExpValidator },
    },
  },
];

export default function ValidatorsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Validators examples"
      componentType="Validators"
      layoutId="validatorsNavigationLayout"
      items={validatorsItems}
      initialItemId="length-validator"
    />
  );
}
