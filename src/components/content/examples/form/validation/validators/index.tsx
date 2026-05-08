import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import ValidatorsCustomValidatorsExample from "./validators-customValidators/validators-customValidators";
import ValidatorsDateRestrictionValidatorExample from "./validators-dateRestrictionValidator/validators-dateRestrictionValidator";
import ValidatorsDateTimeRangeValidatorExample from "./validators-dateTimeRangeValidator/validators-dateTimeRangeValidator";
import ValidatorsDefaultValidatorMessagesExample from "./validators-defaultValidatorMessages/validators-defaultValidatorMessages";
import ValidatorsLengthValidatorExample from "./validators-lengthValidator/validators-lengthValidator";
import ValidatorsNumberRangeValidatorExample from "./validators-numberRangeValidator/validators-numberRangeValidator";
import ValidatorsRegExpValidatorExample from "./validators-regExpValidator/validators-regExpValidator";
import ValidatorsRequiredValidatorExample from "./validators-requiredValidator/validators-requiredValidator";
import ValidatorsValidateOnInputExample from "./validators-validateOnInput/validators-validateOnInput";
import { validatorsDocs, type ValidatorsDemoId } from "./validators-docs";

const validatorsItems: {
  id: ValidatorsDemoId;
  name: string;
  description: (typeof validatorsDocs)[ValidatorsDemoId]["description"];
  recipe: (typeof validatorsDocs)[ValidatorsDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "length-validator",
    name: "Length Validator",
    description: validatorsDocs["length-validator"].description,
    recipe: validatorsDocs["length-validator"].recipe,
    Component: ValidatorsLengthValidatorExample,
  },
  {
    id: "validate-on-input",
    name: "Validate Length on Input",
    description: validatorsDocs["validate-on-input"].description,
    recipe: validatorsDocs["validate-on-input"].recipe,
    Component: ValidatorsValidateOnInputExample,
  },
  {
    id: "number-range-validator",
    name: "Number Range Validator",
    description: validatorsDocs["number-range-validator"].description,
    recipe: validatorsDocs["number-range-validator"].recipe,
    Component: ValidatorsNumberRangeValidatorExample,
  },
  {
    id: "regexp-validator",
    name: "RegExp Validator",
    description: validatorsDocs["regexp-validator"].description,
    recipe: validatorsDocs["regexp-validator"].recipe,
    Component: ValidatorsRegExpValidatorExample,
  },
  {
    id: "required-validator",
    name: "Required Validator",
    description: validatorsDocs["required-validator"].description,
    recipe: validatorsDocs["required-validator"].recipe,
    Component: ValidatorsRequiredValidatorExample,
  },
  
  {
    id: "custom-validators",
    name: "Custom Validators",
    description: validatorsDocs["custom-validators"].description,
    recipe: validatorsDocs["custom-validators"].recipe,
    Component: ValidatorsCustomValidatorsExample,
  },
  
  {
    id: "default-validator-messages",
    name: "Default Validator Messages",
    description: validatorsDocs["default-validator-messages"].description,
    recipe: validatorsDocs["default-validator-messages"].recipe,
    Component: ValidatorsDefaultValidatorMessagesExample,
  },
];

export default function ValidatorsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Validators examples"
      componentType="Validators"
      layoutId="validatorsNavigationLayout"
      items={validatorsItems}
      initialItemId="required-validator"
    />
  );
}
