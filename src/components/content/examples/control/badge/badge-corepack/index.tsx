import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { BadgeColorscorepack } from "./badge-colorscorepack/badge-colorscorepack";
import { badgeColorscorepackDescription } from "./badge-colorscorepack/description";
import { badgeColorscorepackRecipe } from "./badge-colorscorepack/recipe";
import { BadgeOverviewcorepack } from "./badge-overviewcorepack/badge-overviewcorepack";
import { badgeOverviewcorepackDescription } from "./badge-overviewcorepack/description";
import { badgeOverviewcorepackRecipe } from "./badge-overviewcorepack/recipe";

const badgeCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: badgeOverviewcorepackDescription,
    recipe: badgeOverviewcorepackRecipe,
    Component: BadgeOverviewcorepack,
  },
  {
    id: "colors",
    name: "Colors",
    description: badgeColorscorepackDescription,
    recipe: badgeColorscorepackRecipe,
    Component: BadgeColorscorepack,
  },
];

export default function BadgeCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Badge Core Pack examples"
      componentType="oj-c-badge"
      packLabel="Core Pack"
      items={badgeCorePackItems}
      initialItemId="overview"
      navigationTitle="Badge"
    />
  );
}
