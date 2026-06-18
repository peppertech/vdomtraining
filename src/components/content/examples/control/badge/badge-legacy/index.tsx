import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { BadgeOverview } from "./badge-overview/badge-overview";
import { badgeOverviewDescription } from "./badge-overview/description";
import { badgeOverviewRecipe } from "./badge-overview/recipe";
import { BadgeBadgecolors } from "./badge-badgecolors/badge-badgecolors";
import { badgeBadgecolorsDescription } from "./badge-badgecolors/description";
import { badgeBadgecolorsRecipe } from "./badge-badgecolors/recipe";
import { BadgeCustomstyling } from "./badge-customstyling/badge-customstyling";
import { badgeCustomstylingDescription } from "./badge-customstyling/description";
import { badgeCustomstylingRecipe } from "./badge-customstyling/recipe";
import { ListItemLayoutTablelegacy } from "./listItemLayout-tablelegacy/listItemLayout-tablelegacy";
import { listItemLayoutTablelegacyDescription } from "./listItemLayout-tablelegacy/description";
import { listItemLayoutTablelegacyRecipe } from "./listItemLayout-tablelegacy/recipe";

const badgeLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: badgeOverviewDescription,
    recipe: badgeOverviewRecipe,
    Component: BadgeOverview,
  },
  {
    id: "badge-colors",
    name: "Badge Colors",
    description: badgeBadgecolorsDescription,
    recipe: badgeBadgecolorsRecipe,
    Component: BadgeBadgecolors,
  },
  {
    id: "table",
    name: "Table",
    description: listItemLayoutTablelegacyDescription,
    recipe: listItemLayoutTablelegacyRecipe,
    Component: ListItemLayoutTablelegacy,
  },
  
  {
    id: "custom-styling",
    name: "Custom Colors",
    description: badgeCustomstylingDescription,
    recipe: badgeCustomstylingRecipe,
    Component: BadgeCustomstyling,
  },

];

export default function BadgeLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Badge examples"
      componentType="oj-badge"
      items={badgeLegacyItems}
      initialItemId="overview"
      navigationTitle="Badge"
    />
  );
}
