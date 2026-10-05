import ArrayDataProvider = require("ojs/ojarraydataprovider");
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl } from "ojs/ojkeyset";
import DemoDelayingDataProvider from "../../shared/DemoDelayingDataProvider";
import DemoSmartSuggestionsDataProvider = require("../../../../../dataProvider/DemoSmartSuggestionsDataProvider");
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";

import ListViewBasiccorepackSource from "./listView-basiccorepack/listView-basiccorepack-source";
import ListViewContextMenucorepackSource from "./listView-contextMenucorepack/listView-contextMenucorepack-source";
import ListViewCrudcorepackSource from "./listView-crudcorepack/listView-crudcorepack-source";
import ListViewCustomSkeletoncorepackSource from "./listView-customSkeletoncorepack/listView-customSkeletoncorepack-source";
import ListViewDrillDowncorepackSource from "./listView-drillDowncorepack/listView-drillDowncorepack-source";
import ListViewGridlinescorepackSource from "./listView-gridlinescorepack/listView-gridlinescorepack-source";
import ListViewHighWaterMarkScrollingcorepackSource from "./listView-highWaterMarkScrollingcorepack/listView-highWaterMarkScrollingcorepack-source";
import ListViewItemPaddingcorepackSource from "./listView-itemPaddingcorepack/listView-itemPaddingcorepack-source";
import ListViewManageTabStopcorepackSource from "./listView-manageTabStopcorepack/listView-manageTabStopcorepack-source";
import ListViewMultipleSelectioncorepackSource from "./listView-multipleSelectioncorepack/listView-multipleSelectioncorepack-source";
import ListViewNoDatacorepackSource from "./listView-noDatacorepack/listView-noDatacorepack-source";
import ListViewOverviewcorepackSource from "./listView-overviewcorepack/listView-overviewcorepack-source";
import ListViewProgressiveLoadingcorepackSource from "./listView-progressiveLoadingcorepack/listView-progressiveLoadingcorepack-source";
import ListViewReordercorepackSource from "./listView-reordercorepack/listView-reordercorepack-source";
import ListViewSingleSelectioncorepackSource from "./listView-singleSelectioncorepack/listView-singleSelectioncorepack-source";
import ListViewSmartSuggestionscorepackSource from "./listView-smartSuggestionscorepack/listView-smartSuggestionscorepack-source";
import ListViewCustomSkeletoncorepackDemoSource from "./listView-customSkeletoncorepack/demo-source";
import ListViewCustomSkeletoncorepackTweetsSource from "./listView-customSkeletoncorepack/tweets-source";
import ListViewDrillDowncorepackDemoSource from "./listView-drillDowncorepack/demo-source";
import ListViewHighWaterMarkScrollingcorepackDemoSource from "./listView-highWaterMarkScrollingcorepack/demo-source";
import ListViewHighWaterMarkScrollingcorepackTweetsSource from "./listView-highWaterMarkScrollingcorepack/tweets-source";
import ListViewManageTabStopcorepackDemoSource from "./listView-manageTabStopcorepack/demo-source";
import ListViewOverviewcorepackDemoSource from "./listView-overviewcorepack/demo-source";
import ListViewProgressiveLoadingcorepackDemoSource from "./listView-progressiveLoadingcorepack/demo-source";
import ListViewProgressiveLoadingcorepackTweetsSource from "./listView-progressiveLoadingcorepack/tweets-source";
import ListViewReordercorepackDemoSource from "./listView-reordercorepack/demo-source";

const runtimeBindings = { ArrayDataProvider, DemoDelayingDataProvider, DemoSmartSuggestionsDataProvider, KeySetImpl, MutableArrayDataProvider };

export const listViewCorePackPlaygrounds: Record<string, PlaygroundConfig> = {
  "listView-basiccorepack": {
    initialSource: ListViewBasiccorepackSource,
    fileName: "listView-basiccorepack.tsx",
    runtimeBindings,
  },
  "listView-contextMenucorepack": {
    initialSource: ListViewContextMenucorepackSource,
    fileName: "listView-contextMenucorepack.tsx",
    runtimeBindings,
  },
  "listView-crudcorepack": {
    initialSource: ListViewCrudcorepackSource,
    fileName: "listView-crudcorepack.tsx",
    runtimeBindings,
  },
  "listView-customSkeletoncorepack": {
    initialSource: ListViewCustomSkeletoncorepackSource,
    fileName: "listView-customSkeletoncorepack.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewCustomSkeletoncorepackDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "tweets.json", initialSource: ListViewCustomSkeletoncorepackTweetsSource, language: "json", importSpecifier: "text!./tweets.json", bindingName: "tweetsText", },
    ],
  },
  "listView-drillDowncorepack": {
    initialSource: ListViewDrillDowncorepackSource,
    fileName: "listView-drillDowncorepack.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewDrillDowncorepackDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-gridlinescorepack": {
    initialSource: ListViewGridlinescorepackSource,
    fileName: "listView-gridlinescorepack.tsx",
    runtimeBindings,
  },
  "listView-highWaterMarkScrollingcorepack": {
    initialSource: ListViewHighWaterMarkScrollingcorepackSource,
    fileName: "listView-highWaterMarkScrollingcorepack.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewHighWaterMarkScrollingcorepackDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "tweets.json", initialSource: ListViewHighWaterMarkScrollingcorepackTweetsSource, language: "json", importSpecifier: "text!./tweets.json", bindingName: "jsonDataStr", },
    ],
  },
  "listView-itemPaddingcorepack": {
    initialSource: ListViewItemPaddingcorepackSource,
    fileName: "listView-itemPaddingcorepack.tsx",
    runtimeBindings,
  },
  "listView-manageTabStopcorepack": {
    initialSource: ListViewManageTabStopcorepackSource,
    fileName: "listView-manageTabStopcorepack.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewManageTabStopcorepackDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-multipleSelectioncorepack": {
    initialSource: ListViewMultipleSelectioncorepackSource,
    fileName: "listView-multipleSelectioncorepack.tsx",
    runtimeBindings,
  },
  "listView-noDatacorepack": {
    initialSource: ListViewNoDatacorepackSource,
    fileName: "listView-noDatacorepack.tsx",
    runtimeBindings,
  },
  "listView-overviewcorepack": {
    initialSource: ListViewOverviewcorepackSource,
    fileName: "listView-overviewcorepack.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewOverviewcorepackDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-progressiveLoadingcorepack": {
    initialSource: ListViewProgressiveLoadingcorepackSource,
    fileName: "listView-progressiveLoadingcorepack.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewProgressiveLoadingcorepackDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "tweets.json", initialSource: ListViewProgressiveLoadingcorepackTweetsSource, language: "json", importSpecifier: "text!./tweets.json", bindingName: "jsonDataStr", },
    ],
  },
  "listView-reordercorepack": {
    initialSource: ListViewReordercorepackSource,
    fileName: "listView-reordercorepack.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewReordercorepackDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-singleSelectioncorepack": {
    initialSource: ListViewSingleSelectioncorepackSource,
    fileName: "listView-singleSelectioncorepack.tsx",
    runtimeBindings,
  },
  "listView-smartSuggestionscorepack": {
    initialSource: ListViewSmartSuggestionscorepackSource,
    fileName: "listView-smartSuggestionscorepack.tsx",
    runtimeBindings,
  },
};

