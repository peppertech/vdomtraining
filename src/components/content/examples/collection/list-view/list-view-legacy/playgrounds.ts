import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import { FilterFactory } from "ojs/ojdataprovider";
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import { AllKeySetImpl, KeySetImpl } from "ojs/ojkeyset";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import Context = require("ojs/ojcontext");
import DemoDelayingDataProvider from "../../shared/DemoDelayingDataProvider";
import DemoDelayingTreeDataProvider from "../../shared/DemoDelayingTreeDataProvider";
import DemoSmartSuggestionsDataProvider = require("../../../../../dataProvider/DemoSmartSuggestionsDataProvider");
import DemoDataTransfer from "./listView-withTableDndListView/DemoDataTransfer";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";

import ListViewArrayListViewSource from "./listView-arrayListView/listView-arrayListView-source";
import ListViewBasicListViewSource from "./listView-basicListView/listView-basicListView-source";
import ListViewCardLayoutHierListViewSource from "./listView-cardLayoutHierListView/listView-cardLayoutHierListView-source";
import ListViewCollapsibleListViewSource from "./listView-collapsibleListView/listView-collapsibleListView-source";
import ListViewCollectionListViewSource from "./listView-collectionListView/listView-collectionListView-source";
import ListViewCustomContextMenuListViewSource from "./listView-customContextMenuListView/listView-customContextMenuListView-source";
import ListViewDrillableListViewSource from "./listView-drillableListView/listView-drillableListView-source";
import ListViewFilterSortListViewSource from "./listView-filterSortListView/listView-filterSortListView-source";
import ListViewGridlinesListViewSource from "./listView-gridlinesListView/listView-gridlinesListView-source";
import ListViewGroupHeaderListViewSource from "./listView-groupHeaderListView/listView-groupHeaderListView-source";
import ListViewHighWaterMarkScrollingListViewSource from "./listView-highWaterMarkScrollingListView/listView-highWaterMarkScrollingListView-source";
import ListViewJsonHierListViewSource from "./listView-jsonHierListView/listView-jsonHierListView-source";
import ListViewNoDataListViewSource from "./listView-noDataListView/listView-noDataListView-source";
import ListViewObservableArrayListViewSource from "./listView-observableArrayListView/listView-observableArrayListView-source";
import ListViewObservableNestedArrayListViewSource from "./listView-observableNestedArrayListView/listView-observableNestedArrayListView-source";
import ListViewOverviewListViewSource from "./listView-overviewListView/listView-overviewListView-source";
import ListViewPerformanceListViewSource from "./listView-performanceListView/listView-performanceListView-source";
import ListViewProgressiveLoadHierListViewSource from "./listView-progressiveLoadHierListView/listView-progressiveLoadHierListView-source";
import ListViewProgressiveLoadListViewSource from "./listView-progressiveLoadListView/listView-progressiveLoadListView-source";
import ListViewReorderListViewSource from "./listView-reorderListView/listView-reorderListView-source";
import ListViewScrollPosListViewSource from "./listView-scrollPosListView/listView-scrollPosListView-source";
import ListViewSelectionListViewSource from "./listView-selectionListView/listView-selectionListView-source";
import ListViewSmartSuggestionsListViewSource from "./listView-smartSuggestionsListView/listView-smartSuggestionsListView-source";
import ListViewStickyGroupHeaderListViewSource from "./listView-stickyGroupHeaderListView/listView-stickyGroupHeaderListView-source";
import ListViewWithTableDndListViewSource from "./listView-withTableDndListView/listView-withTableDndListView-source";
import ListViewCollapsibleListViewDemoSource from "./listView-collapsibleListView/demo-source";
import ListViewCollectionListViewDemoSource from "./listView-collectionListView/demo-source";
import ListViewFilterSortListViewDemoSource from "./listView-filterSortListView/demo-source";
import ListViewFilterSortListViewProductDataSource from "../../data/cookbook/dataCollections/listView/filterSortListView/productData-source";
import ListViewHighWaterMarkScrollingListViewDemoSource from "./listView-highWaterMarkScrollingListView/demo-source";
import ListViewHighWaterMarkScrollingListViewTweetsSource from "../../data/cookbook/dataCollections/listView/collectionListView/tweets-source";
import ListViewJsonHierListViewFilesSource from "../../data/cookbook/dataCollections/listView/jsonHierListView/files-source";
import ListViewObservableNestedArrayListViewDemoSource from "./listView-observableNestedArrayListView/demo-source";
import ListViewOverviewListViewDemoSource from "./listView-overviewListView/demo-source";
import ListViewPerformanceListViewDemoSource from "./listView-performanceListView/demo-source";
import ListViewProgressiveLoadListViewDemoSource from "./listView-progressiveLoadListView/demo-source";
import ListViewProgressiveLoadListViewTweetsSource from "./listView-progressiveLoadListView/tweets-source";
import ListViewReorderListViewDemoSource from "./listView-reorderListView/demo-source";
import ListViewScrollPosListViewDemoSource from "./listView-scrollPosListView/demo-source";
import ListViewStickyGroupHeaderListViewDemoSource from "./listView-stickyGroupHeaderListView/demo-source";
import ListViewStickyGroupHeaderListViewContactsSource from "../../data/cookbook/dataCollections/listView/stickyGroupHeaderListView/contacts-source";
import ListViewWithTableDndListViewDemoSource from "./listView-withTableDndListView/demo-source";

const runtimeBindings = { ArrayDataProvider, ArrayTreeDataProvider, AllKeySetImpl, Context, DemoDataTransfer, DemoDelayingDataProvider, DemoDelayingTreeDataProvider, DemoSmartSuggestionsDataProvider, FilterFactory, IntlNumberConverter, KeySetImpl, ListDataProviderView };

export const listViewPlaygrounds: Record<string, PlaygroundConfig> = {
  "listView-arrayListView": {
    initialSource: ListViewArrayListViewSource,
    fileName: "listView-arrayListView.tsx",
    runtimeBindings,
  },
  "listView-basicListView": {
    initialSource: ListViewBasicListViewSource,
    fileName: "listView-basicListView.tsx",
    runtimeBindings,
  },
  "listView-cardLayoutHierListView": {
    initialSource: ListViewCardLayoutHierListViewSource,
    fileName: "listView-cardLayoutHierListView.tsx",
    runtimeBindings,
  },
  "listView-collapsibleListView": {
    initialSource: ListViewCollapsibleListViewSource,
    fileName: "listView-collapsibleListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewCollapsibleListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-collectionListView": {
    initialSource: ListViewCollectionListViewSource,
    fileName: "listView-collectionListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewCollectionListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-customContextMenuListView": {
    initialSource: ListViewCustomContextMenuListViewSource,
    fileName: "listView-customContextMenuListView.tsx",
    runtimeBindings,
  },
  "listView-drillableListView": {
    initialSource: ListViewDrillableListViewSource,
    fileName: "listView-drillableListView.tsx",
    runtimeBindings,
  },
  "listView-filterSortListView": {
    initialSource: ListViewFilterSortListViewSource,
    fileName: "listView-filterSortListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewFilterSortListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "productData.json", initialSource: ListViewFilterSortListViewProductDataSource, language: "json", importSpecifier: "text!../../../data/cookbook/dataCollections/listView/filterSortListView/productData.json", bindingName: "jsonDataStr", },
    ],
  },
  "listView-gridlinesListView": {
    initialSource: ListViewGridlinesListViewSource,
    fileName: "listView-gridlinesListView.tsx",
    runtimeBindings,
  },
  "listView-groupHeaderListView": {
    initialSource: ListViewGroupHeaderListViewSource,
    fileName: "listView-groupHeaderListView.tsx",
    runtimeBindings,
  },
  "listView-highWaterMarkScrollingListView": {
    initialSource: ListViewHighWaterMarkScrollingListViewSource,
    fileName: "listView-highWaterMarkScrollingListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewHighWaterMarkScrollingListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "tweets.json", initialSource: ListViewHighWaterMarkScrollingListViewTweetsSource, language: "json", importSpecifier: "text!../../../data/cookbook/dataCollections/listView/collectionListView/tweets.json", bindingName: "jsonDataStr", },
    ],
  },
  "listView-jsonHierListView": {
    initialSource: ListViewJsonHierListViewSource,
    fileName: "listView-jsonHierListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "files.json", initialSource: ListViewJsonHierListViewFilesSource, language: "json", importSpecifier: "text!../../../data/cookbook/dataCollections/listView/jsonHierListView/files.json", bindingName: "jsonDataStr", },
    ],
  },
  "listView-noDataListView": {
    initialSource: ListViewNoDataListViewSource,
    fileName: "listView-noDataListView.tsx",
    runtimeBindings,
  },
  "listView-observableArrayListView": {
    initialSource: ListViewObservableArrayListViewSource,
    fileName: "listView-observableArrayListView.tsx",
    runtimeBindings,
  },
  "listView-observableNestedArrayListView": {
    initialSource: ListViewObservableNestedArrayListViewSource,
    fileName: "listView-observableNestedArrayListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewObservableNestedArrayListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-overviewListView": {
    initialSource: ListViewOverviewListViewSource,
    fileName: "listView-overviewListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewOverviewListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-performanceListView": {
    initialSource: ListViewPerformanceListViewSource,
    fileName: "listView-performanceListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewPerformanceListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-progressiveLoadHierListView": {
    initialSource: ListViewProgressiveLoadHierListViewSource,
    fileName: "listView-progressiveLoadHierListView.tsx",
    runtimeBindings,
  },
  "listView-progressiveLoadListView": {
    initialSource: ListViewProgressiveLoadListViewSource,
    fileName: "listView-progressiveLoadListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewProgressiveLoadListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "tweets.json", initialSource: ListViewProgressiveLoadListViewTweetsSource, language: "json", importSpecifier: "text!./tweets.json", bindingName: "jsonDataStr", },
    ],
  },
  "listView-reorderListView": {
    initialSource: ListViewReorderListViewSource,
    fileName: "listView-reorderListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewReorderListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-scrollPosListView": {
    initialSource: ListViewScrollPosListViewSource,
    fileName: "listView-scrollPosListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewScrollPosListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "listView-selectionListView": {
    initialSource: ListViewSelectionListViewSource,
    fileName: "listView-selectionListView.tsx",
    runtimeBindings,
  },
  "listView-smartSuggestionsListView": {
    initialSource: ListViewSmartSuggestionsListViewSource,
    fileName: "listView-smartSuggestionsListView.tsx",
    runtimeBindings,
  },
  "listView-stickyGroupHeaderListView": {
    initialSource: ListViewStickyGroupHeaderListViewSource,
    fileName: "listView-stickyGroupHeaderListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewStickyGroupHeaderListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "contacts.json", initialSource: ListViewStickyGroupHeaderListViewContactsSource, language: "json", importSpecifier: "text!../../../data/cookbook/dataCollections/listView/stickyGroupHeaderListView/contacts.json", bindingName: "jsonDataStr", },
    ],
  },
  "listView-withTableDndListView": {
    initialSource: ListViewWithTableDndListViewSource,
    fileName: "listView-withTableDndListView.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: ListViewWithTableDndListViewDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
};
