import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { messagetoastAccessibilityAndUsabilityDescription } from "./messagetoast-accessibilityAndUsability/description";
import { MessagetoastAccessibilityAndUsability } from "./messagetoast-accessibilityAndUsability/messagetoast-accessibilityAndUsability";
import { messagetoastAccessibilityAndUsabilityRecipe } from "./messagetoast-accessibilityAndUsability/recipe";
import { messagetoastAddingButtonLinkAndMoreDescription } from "./messagetoast-addingButtonLinkAndMore/description";
import { MessagetoastAddingButtonLinkAndMore } from "./messagetoast-addingButtonLinkAndMore/messagetoast-addingButtonLinkAndMore";
import { messagetoastAddingButtonLinkAndMoreRecipe } from "./messagetoast-addingButtonLinkAndMore/recipe";
import { messagetoastAutoTimeoutDescription } from "./messagetoast-autoTimeout/description";
import { MessagetoastAutoTimeout } from "./messagetoast-autoTimeout/messagetoast-autoTimeout";
import { messagetoastAutoTimeoutRecipe } from "./messagetoast-autoTimeout/recipe";
import { messagetoastNotificationDescription } from "./messagetoast-notification/description";
import { MessagetoastNotification } from "./messagetoast-notification/messagetoast-notification";
import { messagetoastNotificationRecipe } from "./messagetoast-notification/recipe";
import { messagetoastPageNotificationDescription } from "./messagetoast-pageNotification/description";
import { MessagetoastPageNotification } from "./messagetoast-pageNotification/messagetoast-pageNotification";
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
  }
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
