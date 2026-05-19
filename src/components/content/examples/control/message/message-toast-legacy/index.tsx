import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { MessagesCustomIcon } from "./messages-customIcon/messages-customIcon";
import { messagesCustomIconDescription } from "./messages-customIcon/description";
import { messagesCustomIconRecipe } from "./messages-customIcon/recipe";
import { MessagesGroupingMessages } from "./messages-groupingMessages/messages-groupingMessages";
import { messagesGroupingMessagesDescription } from "./messages-groupingMessages/description";
import { messagesGroupingMessagesRecipe } from "./messages-groupingMessages/recipe";
import { MessagesInline } from "./messages-inline/messages-inline";
import { messagesInlineDescription } from "./messages-inline/description";
import { messagesInlineRecipe } from "./messages-inline/recipe";
import { MessagesOverlay } from "./messages-overlay/messages-overlay";
import { messagesOverlayDescription } from "./messages-overlay/description";
import { messagesOverlayRecipe } from "./messages-overlay/recipe";
import { MessagesSortingMessages } from "./messages-sortingMessages/messages-sortingMessages";
import { messagesSortingMessagesDescription } from "./messages-sortingMessages/description";
import { messagesSortingMessagesRecipe } from "./messages-sortingMessages/recipe";
import { MessagetoastAddingButtonLinkAndMore } from "./messagetoast-addingButtonLinkAndMore/messagetoast-addingButtonLinkAndMore";
import { messagetoastAddingButtonLinkAndMoreDescription } from "./messagetoast-addingButtonLinkAndMore/description";
import { messagetoastAddingButtonLinkAndMoreRecipe } from "./messagetoast-addingButtonLinkAndMore/recipe";
import { MessagetoastAccessibilityAndUsability } from "./messagetoast-accessibilityAndUsability/messagetoast-accessibilityAndUsability";
import { messagetoastAccessibilityAndUsabilityDescription } from "./messagetoast-accessibilityAndUsability/description";
import { messagetoastAccessibilityAndUsabilityRecipe } from "./messagetoast-accessibilityAndUsability/recipe";
import { MessagetoastAutoTimeout } from "./messagetoast-autoTimeout/messagetoast-autoTimeout";
import { messagetoastAutoTimeoutDescription } from "./messagetoast-autoTimeout/description";
import { messagetoastAutoTimeoutRecipe } from "./messagetoast-autoTimeout/recipe";
import { MessagetoastNotification } from "./messagetoast-notification/messagetoast-notification";
import { messagetoastNotificationDescription } from "./messagetoast-notification/description";
import { messagetoastNotificationRecipe } from "./messagetoast-notification/recipe";
import { MessagetoastPageNotification } from "./messagetoast-pageNotification/messagetoast-pageNotification";
import { messagetoastPageNotificationDescription } from "./messagetoast-pageNotification/description";
import { messagetoastPageNotificationRecipe } from "./messagetoast-pageNotification/recipe";

const messageToastLegacyItems = [
  {
    id: "toast-notification",
    name: "Toast Notification",
    description: messagetoastNotificationDescription,
    recipe: messagetoastNotificationRecipe,
    Component: MessagetoastNotification,
  },
  {
    id: "auto-timeout",
    name: "Auto Timeout",
    description: messagetoastAutoTimeoutDescription,
    recipe: messagetoastAutoTimeoutRecipe,
    Component: MessagetoastAutoTimeout,
  },
  {
    id: "adding-button-link-and-more",
    name: "Detail slot",
    description: messagetoastAddingButtonLinkAndMoreDescription,
    recipe: messagetoastAddingButtonLinkAndMoreRecipe,
    Component: MessagetoastAddingButtonLinkAndMore,
  },
  {
    id: "accessibility-and-usability",
    name: "Accessibility and Usability",
    description: messagetoastAccessibilityAndUsabilityDescription,
    recipe: messagetoastAccessibilityAndUsabilityRecipe,
    Component: MessagetoastAccessibilityAndUsability,
  },
  {
    id: "page-toast-notification",
    name: "Page Toast Notification",
    description: messagetoastPageNotificationDescription,
    recipe: messagetoastPageNotificationRecipe,
    Component: MessagetoastPageNotification,
  },
  
  
  
  
  // {
  //   id: "custom-icon",
  //   name: "Custom Icon",
  //   description: messagesCustomIconDescription,
  //   recipe: messagesCustomIconRecipe,
  //   Component: MessagesCustomIcon,
  // },
  // {
  //   id: "grouping-messages",
  //   name: "Grouping Messages",
  //   description: messagesGroupingMessagesDescription,
  //   recipe: messagesGroupingMessagesRecipe,
  //   Component: MessagesGroupingMessages,
  // },
  // {
  //   id: "inline",
  //   name: "Inline",
  //   description: messagesInlineDescription,
  //   recipe: messagesInlineRecipe,
  //   Component: MessagesInline,
  // },
  // {
  //   id: "overlay",
  //   name: "Overlay",
  //   description: messagesOverlayDescription,
  //   recipe: messagesOverlayRecipe,
  //   Component: MessagesOverlay,
  // },
  // {
  //   id: "sorting-messages",
  //   name: "Sorting Messages",
  //   description: messagesSortingMessagesDescription,
  //   recipe: messagesSortingMessagesRecipe,
  //   Component: MessagesSortingMessages,
  // },
];

export default function MessageToastLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Messages examples"
      componentType="oj-messages"
      items={messageToastLegacyItems}
      initialItemId="toast-notification"
      navigationTitle="Messages"
    />
  );
}
