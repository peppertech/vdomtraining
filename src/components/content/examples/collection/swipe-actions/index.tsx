import 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { RecipePageTemplate, type RecipePageItem } from "../../../../shared/demo-page-layout/recipe-page-template";
import swipeToRevealBasicSwipeToRevealDemoSource from "./swipeToReveal-basicSwipeToReveal/demo-source";
import { swipeToRevealBasicSwipeToRevealDescription } from "./swipeToReveal-basicSwipeToReveal/description";
import { swipeToRevealBasicSwipeToRevealRecipe } from "./swipeToReveal-basicSwipeToReveal/recipe";
import SwipeToRevealBasicSwipeToReveal from "./swipeToReveal-basicSwipeToReveal/swipeToReveal-basicSwipeToReveal";
import swipeToRevealBasicSwipeToRevealSource from "./swipeToReveal-basicSwipeToReveal/swipeToReveal-basicSwipeToReveal-source";

const swipeActionsItems: RecipePageItem[] = [
  {
    id: "basic",
    name: "Basic",
    description: swipeToRevealBasicSwipeToRevealDescription,
    recipe: swipeToRevealBasicSwipeToRevealRecipe,
    Component: SwipeToRevealBasicSwipeToReveal,
    playground: {
      initialSource: swipeToRevealBasicSwipeToRevealSource,
      fileName: "swipeToReveal-basicSwipeToReveal.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: swipeToRevealBasicSwipeToRevealDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
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
