import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import BufferingDataProvider = require("ojs/ojbufferingdataprovider");
import BufferingTreeDataProvider = require("ojs/ojbufferingtreedataprovider");
import { CollectionMockFetchServer } from "../shared/CollectionMockFetchServer";
import FlattenedTreeDataProviderView = require("ojs/ojflattenedtreedataproviderview");
import { AllKeySetImpl, KeySetImpl } from "ojs/ojkeyset";
import * as Context from "ojs/ojcontext";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { RESTTreeDataProvider } from "ojs/ojresttreedataprovider";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";

import BufferingTreeDataProviderTableRowExpanderMutationsSource from "./bufferingTreeDataProvider-tableRowExpanderMutations/bufferingTreeDataProvider-tableRowExpanderMutations-source";
import RowExpanderTableExpandedRowExpanderSource from "./rowExpanderTable-expandedRowExpander/rowExpanderTable-expandedRowExpander-source";
import RowExpanderTableTableAnimationRowExpanderSource from "./rowExpanderTable-tableAnimationRowExpander/rowExpanderTable-tableAnimationRowExpander-source";
import RowExpanderTableTableCollectionRowExpanderSource from "./rowExpanderTable-tableCollectionRowExpander/rowExpanderTable-tableCollectionRowExpander-source";
import RowExpanderTableTablePerformanceRowExpanderSource from "./rowExpanderTable-tablePerformanceRowExpander/rowExpanderTable-tablePerformanceRowExpander-source";
import RowExpanderTableTableRowExpanderSource from "./rowExpanderTable-tableRowExpander/rowExpanderTable-tableRowExpander-source";
import BufferingTreeDataProviderTableRowExpanderMutationsProjectDataSource from "../data/cookbook/dataCollections/rowExpanderTable/tableEditableRowExpander/projectData-source";
import BufferingTreeDataProviderTableRowExpanderMutationsDemoSource from "./bufferingTreeDataProvider-tableRowExpanderMutations/demo-source";
import RowExpanderTableExpandedRowExpanderProjectDataSource from "../data/cookbook/dataCollections/rowExpanderTable/expandedRowExpander/projectData-source";
import RowExpanderTableTableAnimationRowExpanderDemoSource from "./rowExpanderTable-tableAnimationRowExpander/demo-source";
import RowExpanderTableTableAnimationRowExpanderProjectDataSource from "../data/cookbook/dataCollections/rowExpanderTable/tableAnimationRowExpander/projectData-source";
import RowExpanderTableTableCollectionRowExpanderProjectDataSource from "../data/cookbook/dataCollections/rowExpanderTable/tableCollectionRowExpander/projectData-source";
import RowExpanderTableTablePerformanceRowExpanderDemoSource from "./rowExpanderTable-tablePerformanceRowExpander/demo-source";
import RowExpanderTableTableRowExpanderProjectDataSource from "../data/cookbook/dataCollections/rowExpanderTable/tableRowExpander/projectData-source";

const runtimeBindings = { AllKeySetImpl, ArrayTreeDataProvider, BufferingDataProvider, BufferingTreeDataProvider, CollectionMockFetchServer, Context, FlattenedTreeDataProviderView, KeySetImpl, MockFetchServer: CollectionMockFetchServer, MutableArrayTreeDataProvider, RESTTreeDataProvider };

export const rowExpanderPlaygrounds: Record<string, PlaygroundConfig> = {
  "bufferingTreeDataProvider-tableRowExpanderMutations": {
    initialSource: BufferingTreeDataProviderTableRowExpanderMutationsSource,
    fileName: "bufferingTreeDataProvider-tableRowExpanderMutations.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "projectData.json", initialSource: BufferingTreeDataProviderTableRowExpanderMutationsProjectDataSource, language: "json", importSpecifier: "text!../../data/cookbook/dataCollections/rowExpanderTable/tableEditableRowExpander/projectData.json", bindingName: "jsonDataText", },
      { fileName: "demo.css", initialSource: BufferingTreeDataProviderTableRowExpanderMutationsDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "rowExpanderTable-expandedRowExpander": {
    initialSource: RowExpanderTableExpandedRowExpanderSource,
    fileName: "rowExpanderTable-expandedRowExpander.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "projectData.json", initialSource: RowExpanderTableExpandedRowExpanderProjectDataSource, language: "json", importSpecifier: "text!../../data/cookbook/dataCollections/rowExpanderTable/expandedRowExpander/projectData.json", bindingName: "jsonDataStr", },
    ],
  },
  "rowExpanderTable-tableAnimationRowExpander": {
    initialSource: RowExpanderTableTableAnimationRowExpanderSource,
    fileName: "rowExpanderTable-tableAnimationRowExpander.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: RowExpanderTableTableAnimationRowExpanderDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "projectData.json", initialSource: RowExpanderTableTableAnimationRowExpanderProjectDataSource, language: "json", importSpecifier: "text!../../data/cookbook/dataCollections/rowExpanderTable/tableAnimationRowExpander/projectData.json", bindingName: "jsonDataStr", },
    ],
  },
  "rowExpanderTable-tableCollectionRowExpander": {
    initialSource: RowExpanderTableTableCollectionRowExpanderSource,
    fileName: "rowExpanderTable-tableCollectionRowExpander.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "projectData.json", initialSource: RowExpanderTableTableCollectionRowExpanderProjectDataSource, language: "json", importSpecifier: "text!../../data/cookbook/dataCollections/rowExpanderTable/tableCollectionRowExpander/projectData.json", bindingName: "treeDataText", },
    ],
  },
  "rowExpanderTable-tablePerformanceRowExpander": {
    initialSource: RowExpanderTableTablePerformanceRowExpanderSource,
    fileName: "rowExpanderTable-tablePerformanceRowExpander.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: RowExpanderTableTablePerformanceRowExpanderDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "rowExpanderTable-tableRowExpander": {
    initialSource: RowExpanderTableTableRowExpanderSource,
    fileName: "rowExpanderTable-tableRowExpander.tsx",
    runtimeBindings,
    supportingFiles: [
      { fileName: "projectData.json", initialSource: RowExpanderTableTableRowExpanderProjectDataSource, language: "json", importSpecifier: "text!../../data/cookbook/dataCollections/rowExpanderTable/tableRowExpander/projectData.json", bindingName: "jsonDataStr", },
    ],
  },
};
