import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { AvatarOverview } from "./avatar-overview/avatar-overview";
import { avatarOverviewDescription } from "./avatar-overview/description";
import { avatarOverviewRecipe } from "./avatar-overview/recipe";
import { AvatarCombinations } from "./avatar-combinations/avatar-combinations";
import { avatarCombinationsDescription } from "./avatar-combinations/description";
import { avatarCombinationsRecipe } from "./avatar-combinations/recipe";
import { AvatarCustomStyling } from "./avatar-customStyling/avatar-customStyling";
import { avatarCustomStylingDescription } from "./avatar-customStyling/description";
import { avatarCustomStylingRecipe } from "./avatar-customStyling/recipe";

const avatarLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: avatarOverviewDescription,
    recipe: avatarOverviewRecipe,
    Component: AvatarOverview,
  },
  {
    id: "custom-styling",
    name: "Custom Styling",
    description: avatarCustomStylingDescription,
    recipe: avatarCustomStylingRecipe,
    Component: AvatarCustomStyling,
  },
  {
    id: "combinations",
    name: "Combinations",
    description: avatarCombinationsDescription,
    recipe: avatarCombinationsRecipe,
    Component: AvatarCombinations,
  },
];

export default function AvatarLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Avatar examples"
      componentType="oj-avatar"
      items={avatarLegacyItems}
      initialItemId="overview"
      navigationTitle="Avatar"
    />
  );
}
