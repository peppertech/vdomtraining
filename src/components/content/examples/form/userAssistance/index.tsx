import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import HelpHintsMessagingConverterHintMessagesExample from "./helpHintsMessaging-converterHintMessages/helpHintsMessaging-converterHintMessages";
import HelpHintsMessagingHelpTitleExample from "./helpHintsMessaging-helpTitle/helpHintsMessaging-helpTitle";
import HelpHintsMessagingHintsMessagesTitleExample from "./helpHintsMessaging-hintsMessagesTitle/helpHintsMessaging-hintsMessagesTitle";
import HelpHintsMessagingMultipleMessagesExample from "./helpHintsMessaging-multipleMessages/helpHintsMessaging-multipleMessages";
import HelpHintsMessagingValidatorHintsMessagesExample from "./helpHintsMessaging-validatorHintsMessages/helpHintsMessaging-validatorHintsMessages";
import {
  userAssistanceDocs,
  type UserAssistanceDemoId,
} from "./userAssistance-docs";

const userAssistanceItems: {
  id: UserAssistanceDemoId;
  name: string;
  description: (typeof userAssistanceDocs)[UserAssistanceDemoId]["description"];
  recipe: (typeof userAssistanceDocs)[UserAssistanceDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "help-title",
    name: "Help",
    description: userAssistanceDocs["help-title"].description,
    recipe: userAssistanceDocs["help-title"].recipe,
    Component: HelpHintsMessagingHelpTitleExample,
  },
  
  {
    id: "converter-hint-messages",
    name: "Converter Hint and Messages",
    description: userAssistanceDocs["converter-hint-messages"].description,
    recipe: userAssistanceDocs["converter-hint-messages"].recipe,
    Component: HelpHintsMessagingConverterHintMessagesExample,
  },
  {
    id: "validator-hints-messages",
    name: "Validator Hints and Messages",
    description: userAssistanceDocs["validator-hints-messages"].description,
    recipe: userAssistanceDocs["validator-hints-messages"].recipe,
    Component: HelpHintsMessagingValidatorHintsMessagesExample,
  },
  {
    id: "hints-messages-title",
    name: "Display Options",
    description: userAssistanceDocs["hints-messages-title"].description,
    recipe: userAssistanceDocs["hints-messages-title"].recipe,
    Component: HelpHintsMessagingHintsMessagesTitleExample,
  },
  {
    id: "multiple-messages",
    name: "Inline Messages",
    description: userAssistanceDocs["multiple-messages"].description,
    recipe: userAssistanceDocs["multiple-messages"].recipe,
    Component: HelpHintsMessagingMultipleMessagesExample,
  }
];

export default function UserAssistanceRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="User Assistance examples"
      componentType="Form User Assistance"
      packLabel="Core Pack"
      layoutId="userAssistanceNavigationLayout"
      items={userAssistanceItems}
      initialItemId="help-title"
    />
  );
}
