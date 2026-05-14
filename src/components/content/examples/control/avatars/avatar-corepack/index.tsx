import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { AvatarOverviewcorepack } from "./avatar-overviewcorepack/avatar-overviewcorepack";
import { avatarOverviewcorepackDescription } from "./avatar-overviewcorepack/description";
import { avatarOverviewcorepackRecipe } from "./avatar-overviewcorepack/recipe";
import { AvatarCombinationscorepack } from "./avatar-combinationscorepack/avatar-combinationscorepack";
import { avatarCombinationscorepackDescription } from "./avatar-combinationscorepack/description";
import { avatarCombinationscorepackRecipe } from "./avatar-combinationscorepack/recipe";

const avatarCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: avatarOverviewcorepackDescription,
    recipe: avatarOverviewcorepackRecipe,
    Component: AvatarOverviewcorepack,
  },
  {
    id: "combinations",
    name: "Combinations",
    description: avatarCombinationscorepackDescription,
    recipe: avatarCombinationscorepackRecipe,
    Component: AvatarCombinationscorepack,
  },
];

export default function AvatarCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Avatar Core Pack examples"
      componentType="oj-c-avatar"
      packLabel="Core Pack"
      items={avatarCorePackItems}
      initialItemId="overview"
      navigationTitle="Avatar"
    />
  );
}
