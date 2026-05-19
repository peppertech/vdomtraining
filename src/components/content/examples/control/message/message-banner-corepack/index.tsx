import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { MessagebannerOverviewcorepack } from "./messagebanner-overviewcorepack/messagebanner-overviewcorepack";
import { messagebannerOverviewcorepackDescription } from "./messagebanner-overviewcorepack/description";
import { messagebannerOverviewcorepackRecipe } from "./messagebanner-overviewcorepack/recipe";
import { MessagebannerPageMessagescorepack } from "./messagebanner-pageMessagescorepack/messagebanner-pageMessagescorepack";
import { messagebannerPageMessagescorepackDescription } from "./messagebanner-pageMessagescorepack/description";
import { messagebannerPageMessagescorepackRecipe } from "./messagebanner-pageMessagescorepack/recipe";
import { MessagebannerSectionMessagescorepack } from "./messagebanner-sectionMessagescorepack/messagebanner-sectionMessagescorepack";
import { messagebannerSectionMessagescorepackDescription } from "./messagebanner-sectionMessagescorepack/description";
import { messagebannerSectionMessagescorepackRecipe } from "./messagebanner-sectionMessagescorepack/recipe";
import { MessagebannerKeyboardNavigationcorepack } from "./messagebanner-keyboardNavigationcorepack/messagebanner-keyboardNavigationcorepack";
import { messagebannerKeyboardNavigationcorepackDescription } from "./messagebanner-keyboardNavigationcorepack/description";
import { messagebannerKeyboardNavigationcorepackRecipe } from "./messagebanner-keyboardNavigationcorepack/recipe";
import { MessagebannerDetailListcorepack } from "./messagebanner-detailListcorepack/messagebanner-detailListcorepack";
import { messagebannerDetailListcorepackDescription } from "./messagebanner-detailListcorepack/description";
import { messagebannerDetailListcorepackRecipe } from "./messagebanner-detailListcorepack/recipe";
import { MessagebannerDetailActionscorepack } from "./messagebanner-detailActionscorepack/messagebanner-detailActionscorepack";
import { messagebannerDetailActionscorepackDescription } from "./messagebanner-detailActionscorepack/description";
import { messagebannerDetailActionscorepackRecipe } from "./messagebanner-detailActionscorepack/recipe";
import { MessagebannerSortingcorepack } from "./messagebanner-sortingcorepack/messagebanner-sortingcorepack";
import { messagebannerSortingcorepackDescription } from "./messagebanner-sortingcorepack/description";
import { messagebannerSortingcorepackRecipe } from "./messagebanner-sortingcorepack/recipe";

const messageBannerCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: messagebannerOverviewcorepackDescription,
    recipe: messagebannerOverviewcorepackRecipe,
    Component: MessagebannerOverviewcorepack,
  },
  {
    id: "page-messages",
    name: "Page Messages",
    description: messagebannerPageMessagescorepackDescription,
    recipe: messagebannerPageMessagescorepackRecipe,
    Component: MessagebannerPageMessagescorepack,
  },
  {
    id: "section-messages",
    name: "Section Messages",
    description: messagebannerSectionMessagescorepackDescription,
    recipe: messagebannerSectionMessagescorepackRecipe,
    Component: MessagebannerSectionMessagescorepack,
  },
  {
    id: "detail-actions",
    name: "Custom Detail Content",
    description: messagebannerDetailActionscorepackDescription,
    recipe: messagebannerDetailActionscorepackRecipe,
    Component: MessagebannerDetailActionscorepack,
  },
   {
    id: "detail-list",
    name: "Grouping Messages",
    description: messagebannerDetailListcorepackDescription,
    recipe: messagebannerDetailListcorepackRecipe,
    Component: MessagebannerDetailListcorepack,
  },
  {
    id: "sorting",
    name: "Sorting Messages",
    description: messagebannerSortingcorepackDescription,
    recipe: messagebannerSortingcorepackRecipe,
    Component: MessagebannerSortingcorepack,
  },
  {
    id: "keyboard-navigation",
    name: "Keyboard Navigation",
    description: messagebannerKeyboardNavigationcorepackDescription,
    recipe: messagebannerKeyboardNavigationcorepackRecipe,
    Component: MessagebannerKeyboardNavigationcorepack,
  },
];

export default function MessageBannerCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Message Banner Core Pack examples"
      componentType="oj-c-message-banner"
      packLabel="Core Pack"
      items={messageBannerCorePackItems}
      initialItemId="overview"
      navigationTitle="Message Banner"
    />
  );
}
