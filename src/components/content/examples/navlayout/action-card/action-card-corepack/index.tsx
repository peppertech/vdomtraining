import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ActionCardBasicActionCardcorepack } from "./actionCard-basicActionCardcorepack/actionCard-basicActionCardcorepack";
import { actionCardBasicActionCardcorepackDescription } from "./actionCard-basicActionCardcorepack/description";
import { actionCardBasicActionCardcorepackRecipe } from "./actionCard-basicActionCardcorepack/recipe";
import { ActionCardContentActionCardcorepack } from "./actionCard-contentActionCardcorepack/actionCard-contentActionCardcorepack";
import { actionCardContentActionCardcorepackDescription } from "./actionCard-contentActionCardcorepack/description";
import { actionCardContentActionCardcorepackRecipe } from "./actionCard-contentActionCardcorepack/recipe";

const actionCardCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: actionCardBasicActionCardcorepackDescription,
    recipe: actionCardBasicActionCardcorepackRecipe,
    Component: ActionCardBasicActionCardcorepack,
  },
  {
    id: "content",
    name: "Card Content",
    description: actionCardContentActionCardcorepackDescription,
    recipe: actionCardContentActionCardcorepackRecipe,
    Component: ActionCardContentActionCardcorepack,
  },
];

export default function ActionCardCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Action Card Core Pack examples"
      componentType="oj-c-action-card"
      packLabel="Core Pack"
      items={actionCardCorePackItems}
      initialItemId="basic"
      navigationTitle="Action Card"
    />
  );
}
