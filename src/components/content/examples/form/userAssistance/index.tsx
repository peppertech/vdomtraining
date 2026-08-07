import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";
import HelpHintsMessagingConverterHintMessagesExample from "./helpHintsMessaging-converterHintMessages/helpHintsMessaging-converterHintMessages";
import helpHintsMessagingConverterHintMessagesPlaygroundSource from "./helpHintsMessaging-converterHintMessages/helpHintsMessaging-converterHintMessages-source";
import HelpHintsMessagingHelpTitleExample from "./helpHintsMessaging-helpTitle/helpHintsMessaging-helpTitle";
import helpHintsMessagingHelpTitlePlaygroundSource from "./helpHintsMessaging-helpTitle/helpHintsMessaging-helpTitle-source";
import HelpHintsMessagingHintsMessagesTitleExample from "./helpHintsMessaging-hintsMessagesTitle/helpHintsMessaging-hintsMessagesTitle";
import helpHintsMessagingHintsMessagesTitlePlaygroundSource from "./helpHintsMessaging-hintsMessagesTitle/helpHintsMessaging-hintsMessagesTitle-source";
import HelpHintsMessagingMultipleMessagesExample from "./helpHintsMessaging-multipleMessages/helpHintsMessaging-multipleMessages";
import helpHintsMessagingMultipleMessagesPlaygroundSource from "./helpHintsMessaging-multipleMessages/helpHintsMessaging-multipleMessages-source";
import HelpHintsMessagingValidatorHintsMessagesExample from "./helpHintsMessaging-validatorHintsMessages/helpHintsMessaging-validatorHintsMessages";
import helpHintsMessagingValidatorHintsMessagesPlaygroundSource from "./helpHintsMessaging-validatorHintsMessages/helpHintsMessaging-validatorHintsMessages-source";
import ColorConverter = require("ojs/ojconverter-color");
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
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "help-title",
    name: "Help",
    description: userAssistanceDocs["help-title"].description,
    recipe: userAssistanceDocs["help-title"].recipe,
    Component: HelpHintsMessagingHelpTitleExample,
    playground: {
      initialSource: helpHintsMessagingHelpTitlePlaygroundSource,
      fileName: "helpHintsMessaging-helpTitle.tsx",
    },
  },
  
  {
    id: "converter-hint-messages",
    name: "Converter Hint and Messages",
    description: userAssistanceDocs["converter-hint-messages"].description,
    recipe: userAssistanceDocs["converter-hint-messages"].recipe,
    Component: HelpHintsMessagingConverterHintMessagesExample,
    playground: {
      initialSource: helpHintsMessagingConverterHintMessagesPlaygroundSource,
      fileName: "helpHintsMessaging-converterHintMessages.tsx",
      runtimeBindings: { ColorConverter },
    },
  },
  {
    id: "validator-hints-messages",
    name: "Validator Hints and Messages",
    description: userAssistanceDocs["validator-hints-messages"].description,
    recipe: userAssistanceDocs["validator-hints-messages"].recipe,
    Component: HelpHintsMessagingValidatorHintsMessagesExample,
    playground: {
      initialSource: helpHintsMessagingValidatorHintsMessagesPlaygroundSource,
      fileName: "helpHintsMessaging-validatorHintsMessages.tsx",
    },
  },
  {
    id: "hints-messages-title",
    name: "Display Options",
    description: userAssistanceDocs["hints-messages-title"].description,
    recipe: userAssistanceDocs["hints-messages-title"].recipe,
    Component: HelpHintsMessagingHintsMessagesTitleExample,
    playground: {
      initialSource: helpHintsMessagingHintsMessagesTitlePlaygroundSource,
      fileName: "helpHintsMessaging-hintsMessagesTitle.tsx",
    },
  },
  {
    id: "multiple-messages",
    name: "Inline Messages",
    description: userAssistanceDocs["multiple-messages"].description,
    recipe: userAssistanceDocs["multiple-messages"].recipe,
    Component: HelpHintsMessagingMultipleMessagesExample,
    playground: {
      initialSource: helpHintsMessagingMultipleMessagesPlaygroundSource,
      fileName: "helpHintsMessaging-multipleMessages.tsx",
    },
  }
];

export default function UserAssistanceRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="User Assistance examples"
      componentType="User Assistance"
      layoutId="userAssistanceNavigationLayout"
      items={userAssistanceItems}
      initialItemId="help-title"
    />
  );
}
