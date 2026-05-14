import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TruncatingBadgeOverviewcorepack } from "./truncatingBadge-overviewcorepack/truncatingBadge-overviewcorepack";
import { truncatingBadgeOverviewcorepackDescription } from "./truncatingBadge-overviewcorepack/description";
import { truncatingBadgeOverviewcorepackRecipe } from "./truncatingBadge-overviewcorepack/recipe";
import { TruncatingBadgeColorscorepack } from "./truncatingBadge-colorscorepack/truncatingBadge-colorscorepack";
import { truncatingBadgeColorscorepackDescription } from "./truncatingBadge-colorscorepack/description";
import { truncatingBadgeColorscorepackRecipe } from "./truncatingBadge-colorscorepack/recipe";

const truncatingBadgeCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: truncatingBadgeOverviewcorepackDescription,
    recipe: truncatingBadgeOverviewcorepackRecipe,
    Component: TruncatingBadgeOverviewcorepack,
  },
  {
    id: "colors",
    name: "Colors",
    description: truncatingBadgeColorscorepackDescription,
    recipe: truncatingBadgeColorscorepackRecipe,
    Component: TruncatingBadgeColorscorepack,
  },
];

export default function TruncatingBadgeCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Truncating Badge Core Pack examples"
      componentType="oj-c-truncating-badge"
      packLabel="Core Pack"
      items={truncatingBadgeCorePackItems}
      initialItemId="overview"
      navigationTitle="Truncating Badge"
    />
  );
}
