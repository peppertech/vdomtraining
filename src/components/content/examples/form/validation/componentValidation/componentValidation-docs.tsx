import type { ComponentChildren } from "preact";
import { validationUsecasesAsyncValidatorsDescription } from "./validationUsecases-asyncValidators/description";
import { validationUsecasesAsyncValidatorsRecipe } from "./validationUsecases-asyncValidators/recipe";
import { validationUsecasesComponentCreateDescription } from "./validationUsecases-componentCreate/description";
import { validationUsecasesComponentCreateRecipe } from "./validationUsecases-componentCreate/recipe";
import { validationUsecasesConverterOptionDescription } from "./validationUsecases-converterOption/description";
import { validationUsecasesConverterOptionRecipe } from "./validationUsecases-converterOption/recipe";
import { validationUsecasesMessagesCustomDescription } from "./validationUsecases-messagesCustom/description";
import { validationUsecasesMessagesCustomRecipe } from "./validationUsecases-messagesCustom/recipe";
import { validationUsecasesRefreshMethodDescription } from "./validationUsecases-refreshMethod/description";
import { validationUsecasesRefreshMethodRecipe } from "./validationUsecases-refreshMethod/recipe";
import { validationUsecasesRequiredOptionDescription } from "./validationUsecases-requiredOption/description";
import { validationUsecasesRequiredOptionRecipe } from "./validationUsecases-requiredOption/recipe";
import { validationUsecasesResetMethodDescription } from "./validationUsecases-resetMethod/description";
import { validationUsecasesResetMethodRecipe } from "./validationUsecases-resetMethod/recipe";
import { validationUsecasesShowMessagesMethodDescription } from "./validationUsecases-showMessagesMethod/description";
import { validationUsecasesShowMessagesMethodRecipe } from "./validationUsecases-showMessagesMethod/recipe";
import { validationUsecasesValidateMethodDescription } from "./validationUsecases-validateMethod/description";
import { validationUsecasesValidateMethodRecipe } from "./validationUsecases-validateMethod/recipe";
import { validationUsecasesValidatorsOptionDescription } from "./validationUsecases-validatorsOption/description";
import { validationUsecasesValidatorsOptionRecipe } from "./validationUsecases-validatorsOption/recipe";
import { validationUsecasesValidOptionDescription } from "./validationUsecases-validOption/description";
import { validationUsecasesValidOptionRecipe } from "./validationUsecases-validOption/recipe";
import { validationUsecasesValueOptionDescription } from "./validationUsecases-valueOption/description";
import { validationUsecasesValueOptionRecipe } from "./validationUsecases-valueOption/recipe";

export type ComponentValidationDemoId =
  | "component-create"
  | "async-validators"
  | "converter-option"
  | "messages-custom"
  | "refresh-method"
  | "required-option"
  | "reset-method"
  | "show-messages"
  | "valid-option"
  | "validate-method"
  | "validators-option"
  | "value-option";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const componentValidationDocs: Record<
  ComponentValidationDemoId,
  DocsEntry
> = {
  "component-create": {
    description: validationUsecasesComponentCreateDescription,
    recipe: validationUsecasesComponentCreateRecipe,
  },
  "async-validators": {
    description: validationUsecasesAsyncValidatorsDescription,
    recipe: validationUsecasesAsyncValidatorsRecipe,
  },
  "converter-option": {
    description: validationUsecasesConverterOptionDescription,
    recipe: validationUsecasesConverterOptionRecipe,
  },
  "messages-custom": {
    description: validationUsecasesMessagesCustomDescription,
    recipe: validationUsecasesMessagesCustomRecipe,
  },
  "refresh-method": {
    description: validationUsecasesRefreshMethodDescription,
    recipe: validationUsecasesRefreshMethodRecipe,
  },
  "required-option": {
    description: validationUsecasesRequiredOptionDescription,
    recipe: validationUsecasesRequiredOptionRecipe,
  },
  "reset-method": {
    description: validationUsecasesResetMethodDescription,
    recipe: validationUsecasesResetMethodRecipe,
  },
  "show-messages": {
    description: validationUsecasesShowMessagesMethodDescription,
    recipe: validationUsecasesShowMessagesMethodRecipe,
  },
  "valid-option": {
    description: validationUsecasesValidOptionDescription,
    recipe: validationUsecasesValidOptionRecipe,
  },
  "validate-method": {
    description: validationUsecasesValidateMethodDescription,
    recipe: validationUsecasesValidateMethodRecipe,
  },
  "validators-option": {
    description: validationUsecasesValidatorsOptionDescription,
    recipe: validationUsecasesValidatorsOptionRecipe,
  },
  "value-option": {
    description: validationUsecasesValueOptionDescription,
    recipe: validationUsecasesValueOptionRecipe,
  },
};
