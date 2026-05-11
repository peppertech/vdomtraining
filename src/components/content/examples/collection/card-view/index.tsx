import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { CardViewActionCardBehaviorcorepack } from "./cardView-actionCardBehaviorcorepack/cardView-actionCardBehaviorcorepack";
import { cardViewActionCardBehaviorcorepackDescription } from "./cardView-actionCardBehaviorcorepack/description";
import { cardViewActionCardBehaviorcorepackRecipe } from "./cardView-actionCardBehaviorcorepack/recipe";
import { CardViewBasiccorepack } from "./cardView-basiccorepack/cardView-basiccorepack";
import { cardViewBasiccorepackDescription } from "./cardView-basiccorepack/description";
import { cardViewBasiccorepackRecipe } from "./cardView-basiccorepack/recipe";
import { CardViewColumnscorepack } from "./cardView-columnscorepack/cardView-columnscorepack";
import { cardViewColumnscorepackDescription } from "./cardView-columnscorepack/description";
import { cardViewColumnscorepackRecipe } from "./cardView-columnscorepack/recipe";
import { CardViewCustomSkeletoncorepack } from "./cardView-customSkeletoncorepack/cardView-customSkeletoncorepack";
import { cardViewCustomSkeletoncorepackDescription } from "./cardView-customSkeletoncorepack/description";
import { cardViewCustomSkeletoncorepackRecipe } from "./cardView-customSkeletoncorepack/recipe";
import { CardViewGutterSizecorepack } from "./cardView-gutterSizecorepack/cardView-gutterSizecorepack";
import { cardViewGutterSizecorepackDescription } from "./cardView-gutterSizecorepack/description";
import { cardViewGutterSizecorepackRecipe } from "./cardView-gutterSizecorepack/recipe";
import { CardViewLoadMoreOnScrollcorepack } from "./cardView-loadMoreOnScrollcorepack/cardView-loadMoreOnScrollcorepack";
import { cardViewLoadMoreOnScrollcorepackDescription } from "./cardView-loadMoreOnScrollcorepack/description";
import { cardViewLoadMoreOnScrollcorepackRecipe } from "./cardView-loadMoreOnScrollcorepack/recipe";
import { CardViewManageTabStopcorepack } from "./cardView-manageTabStopcorepack/cardView-manageTabStopcorepack";
import { cardViewManageTabStopcorepackDescription } from "./cardView-manageTabStopcorepack/description";
import { cardViewManageTabStopcorepackRecipe } from "./cardView-manageTabStopcorepack/recipe";
import { CardViewMultipleSelectioncorepack } from "./cardView-multipleSelectioncorepack/cardView-multipleSelectioncorepack";
import { cardViewMultipleSelectioncorepackDescription } from "./cardView-multipleSelectioncorepack/description";
import { cardViewMultipleSelectioncorepackRecipe } from "./cardView-multipleSelectioncorepack/recipe";
import { CardViewNoDatacorepack } from "./cardView-noDatacorepack/cardView-noDatacorepack";
import { cardViewNoDatacorepackDescription } from "./cardView-noDatacorepack/description";
import { cardViewNoDatacorepackRecipe } from "./cardView-noDatacorepack/recipe";
import { CardViewProgressiveLoadingcorepack } from "./cardView-progressiveLoadingcorepack/cardView-progressiveLoadingcorepack";
import { cardViewProgressiveLoadingcorepackDescription } from "./cardView-progressiveLoadingcorepack/description";
import { cardViewProgressiveLoadingcorepackRecipe } from "./cardView-progressiveLoadingcorepack/recipe";
import { CardViewReordercorepack } from "./cardView-reordercorepack/cardView-reordercorepack";
import { cardViewReordercorepackDescription } from "./cardView-reordercorepack/description";
import { cardViewReordercorepackRecipe } from "./cardView-reordercorepack/recipe";
import { CardViewSingleSelectioncorepack } from "./cardView-singleSelectioncorepack/cardView-singleSelectioncorepack";
import { cardViewSingleSelectioncorepackDescription } from "./cardView-singleSelectioncorepack/description";
import { cardViewSingleSelectioncorepackRecipe } from "./cardView-singleSelectioncorepack/recipe";

const cardViewItems = [
  {
    id: "basic",
    name: "Basic",
    description: cardViewBasiccorepackDescription,
    recipe: cardViewBasiccorepackRecipe,
    Component: CardViewBasiccorepack,
  },
  {
    id: "gutter-size",
    name: "Gutter Size",
    description: cardViewGutterSizecorepackDescription,
    recipe: cardViewGutterSizecorepackRecipe,
    Component: CardViewGutterSizecorepack,
  },
 
  {
    id: "single-selection",
    name: "Single Selection",
    description: cardViewSingleSelectioncorepackDescription,
    recipe: cardViewSingleSelectioncorepackRecipe,
    Component: CardViewSingleSelectioncorepack,
  },
  {
    id: "multiple-selection",
    name: "Multiple Selection",
    description: cardViewMultipleSelectioncorepackDescription,
    recipe: cardViewMultipleSelectioncorepackRecipe,
    Component: CardViewMultipleSelectioncorepack,
  },
  {
    id: "load-more-on-scroll",
    name: "Load More on Scroll",
    description: cardViewLoadMoreOnScrollcorepackDescription,
    recipe: cardViewLoadMoreOnScrollcorepackRecipe,
    Component: CardViewLoadMoreOnScrollcorepack,
  },
   {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: cardViewProgressiveLoadingcorepackDescription,
    recipe: cardViewProgressiveLoadingcorepackRecipe,
    Component: CardViewProgressiveLoadingcorepack,
  },
  {
    id: "no-data",
    name: "No Data",
    description: cardViewNoDatacorepackDescription,
    recipe: cardViewNoDatacorepackRecipe,
    Component: CardViewNoDatacorepack,
  },
  {
    id: "action-card-behavior",
    name: "Action Card",
    description: cardViewActionCardBehaviorcorepackDescription,
    recipe: cardViewActionCardBehaviorcorepackRecipe,
    Component: CardViewActionCardBehaviorcorepack,
  },
   {
    id: "columns",
    name: "Number of Columns",
    description: cardViewColumnscorepackDescription,
    recipe: cardViewColumnscorepackRecipe,
    Component: CardViewColumnscorepack,
  },
  {
    id: "reorder",
    name: "Reorder",
    description: cardViewReordercorepackDescription,
    recipe: cardViewReordercorepackRecipe,
    Component: CardViewReordercorepack,
  },
  {
    id: "custom-skeleton",
    name: "Custom Skeleton",
    description: cardViewCustomSkeletoncorepackDescription,
    recipe: cardViewCustomSkeletoncorepackRecipe,
    Component: CardViewCustomSkeletoncorepack,
  },
   {
    id: "manage-tab-stop",
    name: "Manage Tab Stop",
    description: cardViewManageTabStopcorepackDescription,
    recipe: cardViewManageTabStopcorepackRecipe,
    Component: CardViewManageTabStopcorepack,
  },
];

export default function CardViewRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Card View examples"
      componentType="oj-c-card-view"
      items={cardViewItems}
      initialItemId="basic"
      navigationTitle="Card View"
    />
  );
}
