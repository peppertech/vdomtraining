import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import Context = require("ojs/ojcontext");
import DemoDelayingDataProvider from "../shared/DemoDelayingDataProvider";
import DemoDelayingTreeDataProvider from "../shared/DemoDelayingTreeDataProvider";
import GroupingDataProvider = require("ojs/ojgroupingdataprovider");
import { AllKeySetImpl, KeySetImpl } from "ojs/ojkeyset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";

import StreamListMutationsSource from "./streamList-mutations/streamList-mutations-source";
import StreamListPerformanceSource from "./streamList-performance/streamList-performance-source";
import StreamListProgressiveLoadSource from "./streamList-progressiveLoad/streamList-progressiveLoad-source";
import StreamListScrollPositionSource from "./streamList-scrollPosition/streamList-scrollPosition-source";
import StreamListStreamlistSource from "./streamList-streamlist/streamList-streamlist-source";
import StreamListMutationsDemoSource from "./streamList-mutations/demo-source";
import StreamListPerformanceDemoSource from "./streamList-performance/demo-source";
import StreamListProgressiveLoadDemoSource from "./streamList-progressiveLoad/demo-source";
import StreamListScrollPositionDemoSource from "./streamList-scrollPosition/demo-source";
import StreamListStreamlistDemoSource from "./streamList-streamlist/demo-source";
import StreamListStreamlistPastDataSource from "./streamList-streamlist/pastData-source";
import StreamListStreamlistPendingDataSource from "./streamList-streamlist/pendingData-source";
import StreamListStreamlistPinnedDataSource from "./streamList-streamlist/pinnedData-source";

const runtimeBindings = { AllKeySetImpl, ArrayDataProvider, ArrayTreeDataProvider, Context, DemoDelayingDataProvider, DemoDelayingTreeDataProvider, GroupingDataProvider, KeySetImpl, MutableArrayDataProvider };

export const streamListPlaygrounds: Record<string, PlaygroundConfig> = {
  "streamList-mutations": { initialSource: StreamListMutationsSource, fileName: "streamList-mutations.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: StreamListMutationsDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "streamList-performance": { initialSource: StreamListPerformanceSource, fileName: "streamList-performance.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: StreamListPerformanceDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "streamList-progressiveLoad": { initialSource: StreamListProgressiveLoadSource, fileName: "streamList-progressiveLoad.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: StreamListProgressiveLoadDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "streamList-scrollPosition": { initialSource: StreamListScrollPositionSource, fileName: "streamList-scrollPosition.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: StreamListScrollPositionDemoSource, language: "css", importSpecifier: "css!./demo.css", },
    ],
  },
  "streamList-streamlist": { initialSource: StreamListStreamlistSource, fileName: "streamList-streamlist.tsx", runtimeBindings,
    supportingFiles: [
      { fileName: "demo.css", initialSource: StreamListStreamlistDemoSource, language: "css", importSpecifier: "css!./demo.css", },
      { fileName: "pastData.json", initialSource: StreamListStreamlistPastDataSource, language: "json", importSpecifier: "text!./pastData.json", bindingName: "pastDataText", },
      { fileName: "pendingData.json", initialSource: StreamListStreamlistPendingDataSource, language: "json", importSpecifier: "text!./pendingData.json", bindingName: "pendingDataText", },
      { fileName: "pinnedData.json", initialSource: StreamListStreamlistPinnedDataSource, language: "json", importSpecifier: "text!./pinnedData.json", bindingName: "pinnedDataText", },
    ],
  },
};

