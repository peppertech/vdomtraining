import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { swipeToRevealBasicSwipeToRevealDescription } from "./swipeToReveal-basicSwipeToReveal/description";
import { swipeToRevealBasicSwipeToRevealRecipe } from "./swipeToReveal-basicSwipeToReveal/recipe";
import { SwipeToRevealBasicSwipeToReveal } from "./swipeToReveal-basicSwipeToReveal/swipeToReveal-basicSwipeToReveal";

const swipeActionsItems = [
  {
    id: "basic",
    name: "Basic",
    description: swipeToRevealBasicSwipeToRevealDescription,
    recipe: swipeToRevealBasicSwipeToRevealRecipe,
    Component: SwipeToRevealBasicSwipeToReveal,
  },
];

export default function SwipeActionsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Swipe Actions examples"
      componentType="oj-swipe-actions"
      items={swipeActionsItems}
      initialItemId="basic"
      navigationTitle="Swipe Actions"
      showNavigationForSingleItem
    />
  );
}
