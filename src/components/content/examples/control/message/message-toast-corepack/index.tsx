import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { messagetoastAutoTimeoutcorepackDescription } from "./messagetoast-autoTimeoutcorepack/description";
import { MessagetoastAutoTimeoutcorepack } from "./messagetoast-autoTimeoutcorepack/messagetoast-autoTimeoutcorepack";
import { messagetoastAutoTimeoutcorepackRecipe } from "./messagetoast-autoTimeoutcorepack/recipe";
import { messagetoastBasiccorepackDescription } from "./messagetoast-basiccorepack/description";
import { MessagetoastBasiccorepack } from "./messagetoast-basiccorepack/messagetoast-basiccorepack";
import { messagetoastBasiccorepackRecipe } from "./messagetoast-basiccorepack/recipe";
import { messagetoastDetailActionscorepackDescription } from "./messagetoast-detailActionscorepack/description";
import { MessagetoastDetailActionscorepack } from "./messagetoast-detailActionscorepack/messagetoast-detailActionscorepack";
import { messagetoastDetailActionscorepackRecipe } from "./messagetoast-detailActionscorepack/recipe";
import { messagetoastKeyboardNavigationcorepackDescription } from "./messagetoast-keyboardNavigationcorepack/description";
import { MessagetoastKeyboardNavigationcorepack } from "./messagetoast-keyboardNavigationcorepack/messagetoast-keyboardNavigationcorepack";
import { messagetoastKeyboardNavigationcorepackRecipe } from "./messagetoast-keyboardNavigationcorepack/recipe";
import { messagetoastPageMessagescorepackDescription } from "./messagetoast-pageMessagescorepack/description";
import { MessagetoastPageMessagescorepack } from "./messagetoast-pageMessagescorepack/messagetoast-pageMessagescorepack";
import { messagetoastPageMessagescorepackRecipe } from "./messagetoast-pageMessagescorepack/recipe";
import { messagetoastProgresscorepackDescription } from "./messagetoast-progresscorepack/description";
import { MessagetoastProgresscorepack } from "./messagetoast-progresscorepack/messagetoast-progresscorepack";
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
