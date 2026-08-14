import 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { RecipePageTemplate, type RecipePageItem } from "../../../../shared/demo-page-layout/recipe-page-template";
import pullToRefreshBasicPullToRefreshDemoSource from "./pullToRefresh-basicPullToRefresh/demo-source";
import { pullToRefreshBasicPullToRefreshDescription } from "./pullToRefresh-basicPullToRefresh/description";
import PullToRefreshBasicPullToRefresh from "./pullToRefresh-basicPullToRefresh/pullToRefresh-basicPullToRefresh";
import pullToRefreshBasicPullToRefreshSource from "./pullToRefresh-basicPullToRefresh/pullToRefresh-basicPullToRefresh-source";
import { pullToRefreshBasicPullToRefreshRecipe } from "./pullToRefresh-basicPullToRefresh/recipe";
import pullToRefreshBasicPullToRefreshTweetsSource from "./pullToRefresh-basicPullToRefresh/tweets-source";

const refresherTouchItems: RecipePageItem[] = [
  {
    id: "basic",
    name: "Basic",
    description: pullToRefreshBasicPullToRefreshDescription,
    recipe: pullToRefreshBasicPullToRefreshRecipe,
    Component: PullToRefreshBasicPullToRefresh,
    playground: {
      initialSource: pullToRefreshBasicPullToRefreshSource,
      fileName: "pullToRefresh-basicPullToRefresh.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "tweets.json",
          initialSource: pullToRefreshBasicPullToRefreshTweetsSource,
          language: "json",
          importSpecifier: "text!../cookbook/dataCollections/listView/collectionListView/tweets.json",
          bindingName: "jsonDataStr",
        },
        {
          fileName: "demo.css",
          initialSource: pullToRefreshBasicPullToRefreshDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
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
