import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { messagebannerDetailActionsDescription } from "./messagebanner-detailActions/description";
import { MessagebannerDetailActions } from "./messagebanner-detailActions/messagebanner-detailActions";
import { messagebannerDetailActionsRecipe } from "./messagebanner-detailActions/recipe";
import { messagebannerDetailListDescription } from "./messagebanner-detailList/description";
import { MessagebannerDetailList } from "./messagebanner-detailList/messagebanner-detailList";
import { messagebannerDetailListRecipe } from "./messagebanner-detailList/recipe";
import { messagebannerKeyboardNavigationDescription } from "./messagebanner-keyboardNavigation/description";
import { MessagebannerKeyboardNavigation } from "./messagebanner-keyboardNavigation/messagebanner-keyboardNavigation";
import { messagebannerKeyboardNavigationRecipe } from "./messagebanner-keyboardNavigation/recipe";
import { messagebannerPageMessagesDescription } from "./messagebanner-pageMessages/description";
import { MessagebannerPageMessages } from "./messagebanner-pageMessages/messagebanner-pageMessages";
import { messagebannerPageMessagesRecipe } from "./messagebanner-pageMessages/recipe";
import { messagebannerSectionMessagesDescription } from "./messagebanner-sectionMessages/description";
import { MessagebannerSectionMessages } from "./messagebanner-sectionMessages/messagebanner-sectionMessages";
import { messagebannerSectionMessagesRecipe } from "./messagebanner-sectionMessages/recipe";
import { messagebannerSimpleDescription } from "./messagebanner-simple/description";
import { MessagebannerSimple } from "./messagebanner-simple/messagebanner-simple";
import { messagebannerSimpleRecipe } from "./messagebanner-simple/recipe";

const messageBannerLegacyItems = [
  {
    id: "simple",
    name: "Overview",
    description: messagebannerSimpleDescription,
    recipe: messagebannerSimpleRecipe,
    Component: MessagebannerSimple,
  },
  {
    id: "page-messages",
    name: "Page Messages",
    description: messagebannerPageMessagesDescription,
    recipe: messagebannerPageMessagesRecipe,
    Component: MessagebannerPageMessages,
  },
  {
    id: "section-messages",
    name: "Section Messages",
    description: messagebannerSectionMessagesDescription,
    recipe: messagebannerSectionMessagesRecipe,
    Component: MessagebannerSectionMessages,
  },
  {
    id: "detail-actions",
    name: "Custom Detail Content",
    description: messagebannerDetailActionsDescription,
    recipe: messagebannerDetailActionsRecipe,
    Component: MessagebannerDetailActions,
  },
  {
    id: "detail-list",
    name: "Grouping Messages",
    description: messagebannerDetailListDescription,
    recipe: messagebannerDetailListRecipe,
    Component: MessagebannerDetailList,
  },
  {
    id: "keyboard-navigation",
    name: "Keyboard Navigation",
    description: messagebannerKeyboardNavigationDescription,
    recipe: messagebannerKeyboardNavigationRecipe,
    Component: MessagebannerKeyboardNavigation,
  },
];

export default function MessageBannerLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Message Banner examples"
      componentType="oj-message-banner"
      items={messageBannerLegacyItems}
      initialItemId="simple"
      navigationTitle="Message Banner"
    />
  );
}
