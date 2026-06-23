import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { PullToRefreshBasicPullToRefresh } from "./pullToRefresh-basicPullToRefresh/pullToRefresh-basicPullToRefresh";
import { pullToRefreshBasicPullToRefreshDescription } from "./pullToRefresh-basicPullToRefresh/description";
import { pullToRefreshBasicPullToRefreshRecipe } from "./pullToRefresh-basicPullToRefresh/recipe";

const refresherTouchItems = [
  {
    id: "basic",
    name: "Basic",
    description: pullToRefreshBasicPullToRefreshDescription,
    recipe: pullToRefreshBasicPullToRefreshRecipe,
    Component: PullToRefreshBasicPullToRefresh,
  },
];

export default function RefresherTouchRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Refresher touch examples"
      componentType="oj-refresher"
      items={refresherTouchItems}
      initialItemId="basic"
      navigationTitle="Refresher Touch"
      showNavigationForSingleItem
    />
  );
}
