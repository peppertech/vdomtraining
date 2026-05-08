import type { ComponentChildren } from "preact";
import { validatorsCustomValidatorsDescription } from "./validators-customValidators/description";
import { validatorsCustomValidatorsRecipe } from "./validators-customValidators/recipe";
import { validatorsDateRestrictionValidatorDescription } from "./validators-dateRestrictionValidator/description";
import { validatorsDateRestrictionValidatorRecipe } from "./validators-dateRestrictionValidator/recipe";
import { validatorsDateTimeRangeValidatorDescription } from "./validators-dateTimeRangeValidator/description";
import { validatorsDateTimeRangeValidatorRecipe } from "./validators-dateTimeRangeValidator/recipe";
import { validatorsDefaultValidatorMessagesDescription } from "./validators-defaultValidatorMessages/description";
import { validatorsDefaultValidatorMessagesRecipe } from "./validators-defaultValidatorMessages/recipe";
import { validatorsLengthValidatorDescription } from "./validators-lengthValidator/description";
import { validatorsLengthValidatorRecipe } from "./validators-lengthValidator/recipe";
import { validatorsNumberRangeValidatorDescription } from "./validators-numberRangeValidator/description";
import { validatorsNumberRangeValidatorRecipe } from "./validators-numberRangeValidator/recipe";
import { validatorsRegExpValidatorDescription } from "./validators-regExpValidator/description";
import { validatorsRegExpValidatorRecipe } from "./validators-regExpValidator/recipe";
import { validatorsRequiredValidatorDescription } from "./validators-requiredValidator/description";
import { validatorsRequiredValidatorRecipe } from "./validators-requiredValidator/recipe";
import { validatorsValidateOnInputDescription } from "./validators-validateOnInput/description";
import { validatorsValidateOnInputRecipe } from "./validators-validateOnInput/recipe";

export type ValidatorsDemoId =
  | "required-validator"
  | "regexp-validator"
  | "length-validator"
  | "number-range-validator"
  | "date-time-range-validator"
  | "date-restriction-validator"
  | "custom-validators"
  | "validate-on-input"
  | "default-validator-messages";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const validatorsDocs: Record<ValidatorsDemoId, DocsEntry> = {
  "required-validator": {
    description: validatorsRequiredValidatorDescription,
    recipe: validatorsRequiredValidatorRecipe,
  },
  "regexp-validator": {
    description: validatorsRegExpValidatorDescription,
    recipe: validatorsRegExpValidatorRecipe,
  },
  "length-validator": {
    description: validatorsLengthValidatorDescription,
    recipe: validatorsLengthValidatorRecipe,
  },
  "number-range-validator": {
    description: validatorsNumberRangeValidatorDescription,
    recipe: validatorsNumberRangeValidatorRecipe,
  },
  "date-time-range-validator": {
    description: validatorsDateTimeRangeValidatorDescription,
    recipe: validatorsDateTimeRangeValidatorRecipe,
  },
  "date-restriction-validator": {
    description: validatorsDateRestrictionValidatorDescription,
    recipe: validatorsDateRestrictionValidatorRecipe,
  },
  "custom-validators": {
    description: validatorsCustomValidatorsDescription,
    recipe: validatorsCustomValidatorsRecipe,
  },
  "validate-on-input": {
    description: validatorsValidateOnInputDescription,
    recipe: validatorsValidateOnInputRecipe,
  },
  "default-validator-messages": {
    description: validatorsDefaultValidatorMessagesDescription,
    recipe: validatorsDefaultValidatorMessagesRecipe,
  },
};
