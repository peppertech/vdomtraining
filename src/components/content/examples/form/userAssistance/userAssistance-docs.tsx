import type { ComponentChildren } from "preact";
import { helpHintsMessagingConverterHintMessagesDescription } from "./helpHintsMessaging-converterHintMessages/description";
import { helpHintsMessagingConverterHintMessagesRecipe } from "./helpHintsMessaging-converterHintMessages/recipe";
import { helpHintsMessagingHelpTitleDescription } from "./helpHintsMessaging-helpTitle/description";
import { helpHintsMessagingHelpTitleRecipe } from "./helpHintsMessaging-helpTitle/recipe";
import { helpHintsMessagingHintsMessagesTitleDescription } from "./helpHintsMessaging-hintsMessagesTitle/description";
import { helpHintsMessagingHintsMessagesTitleRecipe } from "./helpHintsMessaging-hintsMessagesTitle/recipe";
import { helpHintsMessagingMultipleMessagesDescription } from "./helpHintsMessaging-multipleMessages/description";
import { helpHintsMessagingMultipleMessagesRecipe } from "./helpHintsMessaging-multipleMessages/recipe";
import { helpHintsMessagingMultipleMessagesInlineDescription } from "./helpHintsMessaging-multipleMessagesInline/description";
import { helpHintsMessagingMultipleMessagesInlineRecipe } from "./helpHintsMessaging-multipleMessagesInline/recipe";
import { helpHintsMessagingValidatorHintsMessagesDescription } from "./helpHintsMessaging-validatorHintsMessages/description";
import { helpHintsMessagingValidatorHintsMessagesRecipe } from "./helpHintsMessaging-validatorHintsMessages/recipe";

export type UserAssistanceDemoId =
  | "help-title"
  | "hints-messages-title"
  | "converter-hint-messages"
  | "validator-hints-messages"
  | "multiple-messages"
  | "multiple-messages-inline";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const userAssistanceDocs: Record<UserAssistanceDemoId, DocsEntry> = {
  "help-title": {
    description: helpHintsMessagingHelpTitleDescription,
    recipe: helpHintsMessagingHelpTitleRecipe,
  },
  "hints-messages-title": {
    description: helpHintsMessagingHintsMessagesTitleDescription,
    recipe: helpHintsMessagingHintsMessagesTitleRecipe,
  },
  "converter-hint-messages": {
    description: helpHintsMessagingConverterHintMessagesDescription,
    recipe: helpHintsMessagingConverterHintMessagesRecipe,
  },
  "validator-hints-messages": {
    description: helpHintsMessagingValidatorHintsMessagesDescription,
    recipe: helpHintsMessagingValidatorHintsMessagesRecipe,
  },
  "multiple-messages": {
    description: helpHintsMessagingMultipleMessagesDescription,
    recipe: helpHintsMessagingMultipleMessagesRecipe,
  },
  "multiple-messages-inline": {
    description: helpHintsMessagingMultipleMessagesInlineDescription,
    recipe: helpHintsMessagingMultipleMessagesInlineRecipe,
  },
};
