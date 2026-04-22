import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import ValidationUsecasesAsyncValidatorsExample from "./componentValidation-asyncValidators";
import ValidationUsecasesComponentCreateExample from "./componentValidation-componentCreate";
import ValidationUsecasesConverterOptionExample from "./componentValidation-converterOption";
import {
  componentValidationDocs,
  type ComponentValidationDemoId,
} from "./componentValidation-docs";
import ValidationUsecasesMessagesCustomExample from "./componentValidation-messagesCustom";
import ValidationUsecasesRefreshMethodExample from "./componentValidation-refreshMethod";
import ValidationUsecasesRequiredOptionExample from "./componentValidation-requiredOption";
import ValidationUsecasesResetMethodExample from "./componentValidation-resetMethod";
import ValidationUsecasesShowMessagesExample from "./componentValidation-showMessagesMethod";
import ValidationUsecasesValidOptionExample from "./componentValidation-validOption";
import ValidationUsecasesValidateMethodExample from "./componentValidation-validateMethod";
import ValidationUsecasesValidatorsOptionExample from "./componentValidation-validatorsOption";
import ValidationUsecasesValueOptionExample from "./componentValidation-valueOption";

const componentValidationItems: {
  id: ComponentValidationDemoId;
  name: string;
  description: (typeof componentValidationDocs)[ComponentValidationDemoId]["description"];
  recipe: (typeof componentValidationDocs)[ComponentValidationDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "component-create",
    name: "Component Create",
    description: componentValidationDocs["component-create"].description,
    recipe: componentValidationDocs["component-create"].recipe,
    Component: ValidationUsecasesComponentCreateExample,
  },
  {
    id: "async-validators",
    name: "Async Validators",
    description: componentValidationDocs["async-validators"].description,
    recipe: componentValidationDocs["async-validators"].recipe,
    Component: ValidationUsecasesAsyncValidatorsExample,
  },
  {
    id: "converter-option",
    name: "Converter Option",
    description: componentValidationDocs["converter-option"].description,
    recipe: componentValidationDocs["converter-option"].recipe,
    Component: ValidationUsecasesConverterOptionExample,
  },
  {
    id: "messages-custom",
    name: "Messages Custom",
    description: componentValidationDocs["messages-custom"].description,
    recipe: componentValidationDocs["messages-custom"].recipe,
    Component: ValidationUsecasesMessagesCustomExample,
  },
  {
    id: "refresh-method",
    name: "Refresh Method",
    description: componentValidationDocs["refresh-method"].description,
    recipe: componentValidationDocs["refresh-method"].recipe,
    Component: ValidationUsecasesRefreshMethodExample,
  },
  {
    id: "required-option",
    name: "Required Option",
    description: componentValidationDocs["required-option"].description,
    recipe: componentValidationDocs["required-option"].recipe,
    Component: ValidationUsecasesRequiredOptionExample,
  },
  {
    id: "reset-method",
    name: "Reset Method",
    description: componentValidationDocs["reset-method"].description,
    recipe: componentValidationDocs["reset-method"].recipe,
    Component: ValidationUsecasesResetMethodExample,
  },
  {
    id: "show-messages",
    name: "Show Messages",
    description: componentValidationDocs["show-messages"].description,
    recipe: componentValidationDocs["show-messages"].recipe,
    Component: ValidationUsecasesShowMessagesExample,
  },
  {
    id: "valid-option",
    name: "Valid Option",
    description: componentValidationDocs["valid-option"].description,
    recipe: componentValidationDocs["valid-option"].recipe,
    Component: ValidationUsecasesValidOptionExample,
  },
  {
    id: "validate-method",
    name: "Validate Method",
    description: componentValidationDocs["validate-method"].description,
    recipe: componentValidationDocs["validate-method"].recipe,
    Component: ValidationUsecasesValidateMethodExample,
  },
  {
    id: "validators-option",
    name: "Validators Option",
    description: componentValidationDocs["validators-option"].description,
    recipe: componentValidationDocs["validators-option"].recipe,
    Component: ValidationUsecasesValidatorsOptionExample,
  },
  {
    id: "value-option",
    name: "Value Option",
    description: componentValidationDocs["value-option"].description,
    recipe: componentValidationDocs["value-option"].recipe,
    Component: ValidationUsecasesValueOptionExample,
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
