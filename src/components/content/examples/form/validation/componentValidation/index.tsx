import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import {
  componentValidationDocs,
  type ComponentValidationDemoId,
} from "./componentValidation-docs";
import ValidationUsecasesAsyncValidatorsExample from "./validationUsecases-asyncValidators/validationUsecases-asyncValidators";
import ValidationUsecasesComponentCreateExample from "./validationUsecases-componentCreate/validationUsecases-componentCreate";
import ValidationUsecasesConverterOptionExample from "./validationUsecases-converterOption/validationUsecases-converterOption";
import ValidationUsecasesMessagesCustomExample from "./validationUsecases-messagesCustom/validationUsecases-messagesCustom";
import ValidationUsecasesRefreshMethodExample from "./validationUsecases-refreshMethod/validationUsecases-refreshMethod";
import ValidationUsecasesRequiredOptionExample from "./validationUsecases-requiredOption/validationUsecases-requiredOption";
import ValidationUsecasesResetMethodExample from "./validationUsecases-resetMethod/validationUsecases-resetMethod";
import ValidationUsecasesShowMessagesExample from "./validationUsecases-showMessagesMethod/validationUsecases-showMessagesMethod";
import ValidationUsecasesValidOptionExample from "./validationUsecases-validOption/validationUsecases-validOption";
import ValidationUsecasesValidateMethodExample from "./validationUsecases-validateMethod/validationUsecases-validateMethod";
import ValidationUsecasesValidatorsOptionExample from "./validationUsecases-validatorsOption/validationUsecases-validatorsOption";
import ValidationUsecasesValueOptionExample from "./validationUsecases-valueOption/validationUsecases-valueOption";

const componentValidationItems: {
  id: ComponentValidationDemoId;
  name: string;
  description: (typeof componentValidationDocs)[ComponentValidationDemoId]["description"];
  recipe: (typeof componentValidationDocs)[ComponentValidationDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "async-validators",
    name: "Async Validators",
    description: componentValidationDocs["async-validators"].description,
    recipe: componentValidationDocs["async-validators"].recipe,
    Component: ValidationUsecasesAsyncValidatorsExample,
  },
  {
    id: "show-messages",
    name: "Show Deferred Messages",
    description: componentValidationDocs["show-messages"].description,
    recipe: componentValidationDocs["show-messages"].recipe,
    Component: ValidationUsecasesShowMessagesExample,
  },
   {
    id: "valid-option",
    name: "Valid Property Change",
    description: componentValidationDocs["valid-option"].description,
    recipe: componentValidationDocs["valid-option"].recipe,
    Component: ValidationUsecasesValidOptionExample,
  },
  {
    id: "value-option",
    name: "Value Property Change",
    description: componentValidationDocs["value-option"].description,
    recipe: componentValidationDocs["value-option"].recipe,
    Component: ValidationUsecasesValueOptionExample,
  },
  {
    id: "component-create",
    name: "Validate Component",
    description: componentValidationDocs["component-create"].description,
    recipe: componentValidationDocs["component-create"].recipe,
    Component: ValidationUsecasesComponentCreateExample,
  },
  {
    id: "messages-custom",
    name: "Messages Custom",
    description: componentValidationDocs["messages-custom"].description,
    recipe: componentValidationDocs["messages-custom"].recipe,
    Component: ValidationUsecasesMessagesCustomExample,
  },
  {
    id: "reset-method",
    name: "Reset Component",
    description: componentValidationDocs["reset-method"].description,
    recipe: componentValidationDocs["reset-method"].recipe,
    Component: ValidationUsecasesResetMethodExample,
  },
  {
    id: "validate-method",
    name: "Validate Component",
    description: componentValidationDocs["validate-method"].description,
    recipe: componentValidationDocs["validate-method"].recipe,
    Component: ValidationUsecasesValidateMethodExample,
  },
  {
    id: "required-option",
    name: "Required Property Change",
    description: componentValidationDocs["required-option"].description,
    recipe: componentValidationDocs["required-option"].recipe,
    Component: ValidationUsecasesRequiredOptionExample,
  },
  {
    id: "validators-option",
    name: "Validators Option",
    description: componentValidationDocs["validators-option"].description,
    recipe: componentValidationDocs["validators-option"].recipe,
    Component: ValidationUsecasesValidatorsOptionExample,
  },
   {
    id: "converter-option",
    name: "Converter Property Change",
    description: componentValidationDocs["converter-option"].description,
    recipe: componentValidationDocs["converter-option"].recipe,
    Component: ValidationUsecasesConverterOptionExample,
  },
  {
    id: "refresh-method",
    name: "Refresh Method",
    description: componentValidationDocs["refresh-method"].description,
    recipe: componentValidationDocs["refresh-method"].recipe,
    Component: ValidationUsecasesRefreshMethodExample,
  },
];

export default function ComponentValidationIndex() {
  return (
    <RecipePageTemplate
      ariaLabel="Component Validation examples"
      componentType="Component Validation"
      layoutId="componentValidationNavigationLayout"
      items={componentValidationItems}
      initialItemId="component-create"
    />
  );
}
