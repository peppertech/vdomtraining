import 'preact';
import * as preact from "preact";
import { AllKeySetImpl, KeySetImpl } from "ojs/ojkeyset";
import { RESTDataProvider } from "ojs/ojrestdataprovider";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { RecipePageTemplate, type RecipePageItem } from "../../../../shared/demo-page-layout/recipe-page-template";
import CardViewActionCardBehaviorcorepack from "./cardView-actionCardBehaviorcorepack/cardView-actionCardBehaviorcorepack";
import cardViewActionCardBehaviorcorepackSource from "./cardView-actionCardBehaviorcorepack/cardView-actionCardBehaviorcorepack-source";
import { cardViewActionCardBehaviorcorepackDescription } from "./cardView-actionCardBehaviorcorepack/description";
import { cardViewActionCardBehaviorcorepackRecipe } from "./cardView-actionCardBehaviorcorepack/recipe";
import CardViewBasiccorepack from "./cardView-basiccorepack/cardView-basiccorepack";
import cardViewBasiccorepackSource from "./cardView-basiccorepack/cardView-basiccorepack-source";
import { cardViewBasiccorepackDescription } from "./cardView-basiccorepack/description";
import { cardViewBasiccorepackRecipe } from "./cardView-basiccorepack/recipe";
import CardViewColumnscorepack from "./cardView-columnscorepack/cardView-columnscorepack";
import cardViewColumnscorepackSource from "./cardView-columnscorepack/cardView-columnscorepack-source";
import cardViewColumnsDemoSource from "./cardView-columnscorepack/demo-source";
import { cardViewColumnscorepackDescription } from "./cardView-columnscorepack/description";
import { cardViewColumnscorepackRecipe } from "./cardView-columnscorepack/recipe";
import CardViewCustomSkeletoncorepack from "./cardView-customSkeletoncorepack/cardView-customSkeletoncorepack";
import cardViewCustomSkeletoncorepackSource from "./cardView-customSkeletoncorepack/cardView-customSkeletoncorepack-source";
import cardViewCustomSkeletonContactsSource from "./cardView-customSkeletoncorepack/contacts-source";
import cardViewCustomSkeletonDemoSource from "./cardView-customSkeletoncorepack/demo-source";
import { cardViewCustomSkeletoncorepackDescription } from "./cardView-customSkeletoncorepack/description";
import { cardViewCustomSkeletoncorepackRecipe } from "./cardView-customSkeletoncorepack/recipe";
import CardViewGutterSizecorepack from "./cardView-gutterSizecorepack/cardView-gutterSizecorepack";
import cardViewGutterSizecorepackSource from "./cardView-gutterSizecorepack/cardView-gutterSizecorepack-source";
import { cardViewGutterSizecorepackDescription } from "./cardView-gutterSizecorepack/description";
import { cardViewGutterSizecorepackRecipe } from "./cardView-gutterSizecorepack/recipe";
import CardViewLoadMoreOnScrollcorepack from "./cardView-loadMoreOnScrollcorepack/cardView-loadMoreOnScrollcorepack";
import cardViewLoadMoreOnScrollcorepackSource from "./cardView-loadMoreOnScrollcorepack/cardView-loadMoreOnScrollcorepack-source";
import cardViewLoadMoreOnScrollContactsSource from "./cardView-loadMoreOnScrollcorepack/contacts-source";
import cardViewLoadMoreOnScrollDemoSource from "./cardView-loadMoreOnScrollcorepack/demo-source";
import { cardViewLoadMoreOnScrollcorepackDescription } from "./cardView-loadMoreOnScrollcorepack/description";
import { cardViewLoadMoreOnScrollcorepackRecipe } from "./cardView-loadMoreOnScrollcorepack/recipe";
import CardViewManageTabStopcorepack from "./cardView-manageTabStopcorepack/cardView-manageTabStopcorepack";
import cardViewManageTabStopcorepackSource from "./cardView-manageTabStopcorepack/cardView-manageTabStopcorepack-source";
import cardViewManageTabStopDemoSource from "./cardView-manageTabStopcorepack/demo-source";
import { cardViewManageTabStopcorepackDescription } from "./cardView-manageTabStopcorepack/description";
import { cardViewManageTabStopcorepackRecipe } from "./cardView-manageTabStopcorepack/recipe";
import CardViewMultipleSelectioncorepack from "./cardView-multipleSelectioncorepack/cardView-multipleSelectioncorepack";
import cardViewMultipleSelectioncorepackSource from "./cardView-multipleSelectioncorepack/cardView-multipleSelectioncorepack-source";
import { cardViewMultipleSelectioncorepackDescription } from "./cardView-multipleSelectioncorepack/description";
import { cardViewMultipleSelectioncorepackRecipe } from "./cardView-multipleSelectioncorepack/recipe";
import CardViewNoDatacorepack from "./cardView-noDatacorepack/cardView-noDatacorepack";
import cardViewNoDatacorepackSource from "./cardView-noDatacorepack/cardView-noDatacorepack-source";
import cardViewNoDataDemoSource from "./cardView-noDatacorepack/demo-source";
import { cardViewNoDatacorepackDescription } from "./cardView-noDatacorepack/description";
import { cardViewNoDatacorepackRecipe } from "./cardView-noDatacorepack/recipe";
import CardViewProgressiveLoadingcorepack from "./cardView-progressiveLoadingcorepack/cardView-progressiveLoadingcorepack";
import cardViewProgressiveLoadingcorepackSource from "./cardView-progressiveLoadingcorepack/cardView-progressiveLoadingcorepack-source";
import cardViewProgressiveLoadingContactsSource from "./cardView-progressiveLoadingcorepack/contacts-source";
import cardViewProgressiveLoadingDemoSource from "./cardView-progressiveLoadingcorepack/demo-source";
import { cardViewProgressiveLoadingcorepackDescription } from "./cardView-progressiveLoadingcorepack/description";
import { cardViewProgressiveLoadingcorepackRecipe } from "./cardView-progressiveLoadingcorepack/recipe";
import CardViewReordercorepack from "./cardView-reordercorepack/cardView-reordercorepack";
import cardViewReordercorepackSource from "./cardView-reordercorepack/cardView-reordercorepack-source";
import cardViewReorderDemoSource from "./cardView-reordercorepack/demo-source";
import { cardViewReordercorepackDescription } from "./cardView-reordercorepack/description";
import { cardViewReordercorepackRecipe } from "./cardView-reordercorepack/recipe";
import CardViewSingleSelectioncorepack from "./cardView-singleSelectioncorepack/cardView-singleSelectioncorepack";
import cardViewSingleSelectioncorepackSource from "./cardView-singleSelectioncorepack/cardView-singleSelectioncorepack-source";
import { cardViewSingleSelectioncorepackDescription } from "./cardView-singleSelectioncorepack/description";
import { cardViewSingleSelectioncorepackRecipe } from "./cardView-singleSelectioncorepack/recipe";
import { CollectionMockFetchServer } from "../shared/CollectionMockFetchServer";
import DemoDelayingDataProvider from "../shared/DemoDelayingDataProvider";

const cardViewItems: RecipePageItem[] = [
  {
    id: "basic",
    name: "Basic",
    description: cardViewBasiccorepackDescription,
    recipe: cardViewBasiccorepackRecipe,
    Component: CardViewBasiccorepack,
    playground: {
      initialSource: cardViewBasiccorepackSource,
      fileName: "cardView-basiccorepack.tsx",
      runtimeBindings: { ArrayDataProvider, preact },
    },
  },
  {
    id: "gutter-size",
    name: "Gutter Size",
    description: cardViewGutterSizecorepackDescription,
    recipe: cardViewGutterSizecorepackRecipe,
    Component: CardViewGutterSizecorepack,
    playground: {
      initialSource: cardViewGutterSizecorepackSource,
      fileName: "cardView-gutterSizecorepack.tsx",
      runtimeBindings: { ArrayDataProvider, preact },
    },
  },
 
  {
    id: "single-selection",
    name: "Single Selection",
    description: cardViewSingleSelectioncorepackDescription,
    recipe: cardViewSingleSelectioncorepackRecipe,
    Component: CardViewSingleSelectioncorepack,
    playground: {
      initialSource: cardViewSingleSelectioncorepackSource,
      fileName: "cardView-singleSelectioncorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl, preact },
    },
  },
  {
    id: "multiple-selection",
    name: "Multiple Selection",
    description: cardViewMultipleSelectioncorepackDescription,
    recipe: cardViewMultipleSelectioncorepackRecipe,
    Component: CardViewMultipleSelectioncorepack,
    playground: {
      initialSource: cardViewMultipleSelectioncorepackSource,
      fileName: "cardView-multipleSelectioncorepack.tsx",
      runtimeBindings: { AllKeySetImpl, ArrayDataProvider, KeySetImpl, preact },
    },
  },
  {
    id: "load-more-on-scroll",
    name: "Load More on Scroll",
    description: cardViewLoadMoreOnScrollcorepackDescription,
    recipe: cardViewLoadMoreOnScrollcorepackRecipe,
    Component: CardViewLoadMoreOnScrollcorepack,
    playground: {
      initialSource: cardViewLoadMoreOnScrollcorepackSource,
      fileName: "cardView-loadMoreOnScrollcorepack.tsx",
      runtimeBindings: { CollectionMockFetchServer, preact, RESTDataProvider },
      supportingFiles: [
        {
          fileName: "contacts.json",
          initialSource: cardViewLoadMoreOnScrollContactsSource,
          language: "json",
          importSpecifier: "text!./contacts.json",
          bindingName: "jsonDataStr",
        },
        {
          fileName: "demo.css",
          initialSource: cardViewLoadMoreOnScrollDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
   {
    id: "progressive-loading",
    name: "Progressive Loading",
    description: cardViewProgressiveLoadingcorepackDescription,
    recipe: cardViewProgressiveLoadingcorepackRecipe,
    Component: CardViewProgressiveLoadingcorepack,
    playground: {
      initialSource: cardViewProgressiveLoadingcorepackSource,
      fileName: "cardView-progressiveLoadingcorepack.tsx",
      runtimeBindings: { DemoDelayingDataProvider, MutableArrayDataProvider, preact },
      supportingFiles: [
        {
          fileName: "contacts.json",
          initialSource: cardViewProgressiveLoadingContactsSource,
          language: "json",
          importSpecifier: "text!./contacts.json",
          bindingName: "jsonDataStr",
        },
        {
          fileName: "demo.css",
          initialSource: cardViewProgressiveLoadingDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "no-data",
    name: "No Data",
    description: cardViewNoDatacorepackDescription,
    recipe: cardViewNoDatacorepackRecipe,
    Component: CardViewNoDatacorepack,
    playground: {
      initialSource: cardViewNoDatacorepackSource,
      fileName: "cardView-noDatacorepack.tsx",
      runtimeBindings: { ArrayDataProvider, preact },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: cardViewNoDataDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "action-card-behavior",
    name: "Action Card",
    description: cardViewActionCardBehaviorcorepackDescription,
    recipe: cardViewActionCardBehaviorcorepackRecipe,
    Component: CardViewActionCardBehaviorcorepack,
    playground: {
      initialSource: cardViewActionCardBehaviorcorepackSource,
      fileName: "cardView-actionCardBehaviorcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, preact },
    },
  },
   {
    id: "columns",
    name: "Number of Columns",
    description: cardViewColumnscorepackDescription,
    recipe: cardViewColumnscorepackRecipe,
    Component: CardViewColumnscorepack,
    playground: {
      initialSource: cardViewColumnscorepackSource,
      fileName: "cardView-columnscorepack.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: cardViewColumnsDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "reorder",
    name: "Reorder",
    description: cardViewReordercorepackDescription,
    recipe: cardViewReordercorepackRecipe,
    Component: CardViewReordercorepack,
    playground: {
      initialSource: cardViewReordercorepackSource,
      fileName: "cardView-reordercorepack.tsx",
      runtimeBindings: { ArrayDataProvider, preact },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: cardViewReorderDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "custom-skeleton",
    name: "Custom Skeleton",
    description: cardViewCustomSkeletoncorepackDescription,
    recipe: cardViewCustomSkeletoncorepackRecipe,
    Component: CardViewCustomSkeletoncorepack,
    playground: {
      initialSource: cardViewCustomSkeletoncorepackSource,
      fileName: "cardView-customSkeletoncorepack.tsx",
      runtimeBindings: { DemoDelayingDataProvider, MutableArrayDataProvider, preact },
      supportingFiles: [
        {
          fileName: "contacts.json",
          initialSource: cardViewCustomSkeletonContactsSource,
          language: "json",
          importSpecifier: "text!./contacts.json",
          bindingName: "jsonDataStr",
        },
        {
          fileName: "demo.css",
          initialSource: cardViewCustomSkeletonDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
   {
    id: "manage-tab-stop",
    name: "Manage Tab Stop",
    description: cardViewManageTabStopcorepackDescription,
    recipe: cardViewManageTabStopcorepackRecipe,
    Component: CardViewManageTabStopcorepack,
    playground: {
      initialSource: cardViewManageTabStopcorepackSource,
      fileName: "cardView-manageTabStopcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, preact },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: cardViewManageTabStopDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
];

export default function CardViewRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Card View examples"
      componentType="oj-c-card-view"
      packLabel="Core Pack"
      items={cardViewItems}
      initialItemId="basic"
      navigationTitle="Card View"
    />
  );
}
