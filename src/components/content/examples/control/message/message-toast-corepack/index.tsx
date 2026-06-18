import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { MessagetoastAutoTimeoutcorepack } from "./messagetoast-autoTimeoutcorepack/messagetoast-autoTimeoutcorepack";
import { messagetoastAutoTimeoutcorepackDescription } from "./messagetoast-autoTimeoutcorepack/description";
import { messagetoastAutoTimeoutcorepackRecipe } from "./messagetoast-autoTimeoutcorepack/recipe";
import { MessagetoastBasiccorepack } from "./messagetoast-basiccorepack/messagetoast-basiccorepack";
import { messagetoastBasiccorepackDescription } from "./messagetoast-basiccorepack/description";
import { messagetoastBasiccorepackRecipe } from "./messagetoast-basiccorepack/recipe";
import { MessagetoastDetailActionscorepack } from "./messagetoast-detailActionscorepack/messagetoast-detailActionscorepack";
import { messagetoastDetailActionscorepackDescription } from "./messagetoast-detailActionscorepack/description";
import { messagetoastDetailActionscorepackRecipe } from "./messagetoast-detailActionscorepack/recipe";
import { MessagetoastKeyboardNavigationcorepack } from "./messagetoast-keyboardNavigationcorepack/messagetoast-keyboardNavigationcorepack";
import { messagetoastKeyboardNavigationcorepackDescription } from "./messagetoast-keyboardNavigationcorepack/description";
import { messagetoastKeyboardNavigationcorepackRecipe } from "./messagetoast-keyboardNavigationcorepack/recipe";
import { MessagetoastPageMessagescorepack } from "./messagetoast-pageMessagescorepack/messagetoast-pageMessagescorepack";
import { messagetoastPageMessagescorepackDescription } from "./messagetoast-pageMessagescorepack/description";
import { messagetoastPageMessagescorepackRecipe } from "./messagetoast-pageMessagescorepack/recipe";
import { MessagetoastProgresscorepack } from "./messagetoast-progresscorepack/messagetoast-progresscorepack";
import { messagetoastProgresscorepackDescription } from "./messagetoast-progresscorepack/description";
import { messagetoastProgresscorepackRecipe } from "./messagetoast-progresscorepack/recipe";

const messageToastCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: messagetoastBasiccorepackDescription,
    recipe: messagetoastBasiccorepackRecipe,
    Component: MessagetoastBasiccorepack,
  },
  {
    id: "page-messages",
    name: "Page Messages",
    description: messagetoastPageMessagescorepackDescription,
    recipe: messagetoastPageMessagescorepackRecipe,
    Component: MessagetoastPageMessagescorepack,
  },
  {
    id: "detail-actions",
    name: "Custom Details",
    description: messagetoastDetailActionscorepackDescription,
    recipe: messagetoastDetailActionscorepackRecipe,
    Component: MessagetoastDetailActionscorepack,
  },
  {
    id: "progress",
    name: "Progress",
    description: messagetoastProgresscorepackDescription,
    recipe: messagetoastProgresscorepackRecipe,
    Component: MessagetoastProgresscorepack,
  },
  {
    id: "auto-timeout",
    name: "Auto Timeout",
    description: messagetoastAutoTimeoutcorepackDescription,
    recipe: messagetoastAutoTimeoutcorepackRecipe,
    Component: MessagetoastAutoTimeoutcorepack,
  },
  
  {
    id: "keyboard-navigation",
    name: "Keyboard Navigation",
    description: messagetoastKeyboardNavigationcorepackDescription,
    recipe: messagetoastKeyboardNavigationcorepackRecipe,
    Component: MessagetoastKeyboardNavigationcorepack,
  }
];

export default function MessageToastCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Message Toast Core Pack examples"
      componentType="oj-c-message-toast"
      packLabel="Core Pack"
      items={messageToastCorePackItems}
      initialItemId="basic"
      navigationTitle="Message Toast"
    />
  );
}
