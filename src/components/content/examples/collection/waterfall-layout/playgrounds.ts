import ArrayDataProvider = require("ojs/ojarraydataprovider");
import Context = require("ojs/ojcontext");
import DemoDelayingDataProvider from "../shared/DemoDelayingDataProvider";
import { FilterFactory } from "ojs/ojdataprovider";
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";

import WaterfallLayoutBasicWaterfallLayoutSource from "./waterfallLayout-basicWaterfallLayout/waterfallLayout-basicWaterfallLayout-source";
import WaterfallLayoutBasicWaterfallLayoutDemoSource from "./waterfallLayout-basicWaterfallLayout/demo-source";
import WaterfallLayoutFilteringWaterfallLayoutSource from "./waterfallLayout-filteringWaterfallLayout/waterfallLayout-filteringWaterfallLayout-source";
import WaterfallLayoutFilteringWaterfallLayoutDemoSource from "./waterfallLayout-filteringWaterfallLayout/demo-source";
import WaterfallLayoutPerformanceWaterfallLayoutSource from "./waterfallLayout-performanceWaterfallLayout/waterfallLayout-performanceWaterfallLayout-source";
import WaterfallLayoutPerformanceWaterfallLayoutDemoSource from "./waterfallLayout-performanceWaterfallLayout/demo-source";
import WaterfallLayoutProgressiveLoadWaterfallLayoutSource from "./waterfallLayout-progressiveLoadWaterfallLayout/waterfallLayout-progressiveLoadWaterfallLayout-source";
import WaterfallLayoutProgressiveLoadWaterfallLayoutDemoSource from "./waterfallLayout-progressiveLoadWaterfallLayout/demo-source";

const runtimeBindings = { ArrayDataProvider, Context, DemoDelayingDataProvider, FilterFactory, ListDataProviderView };

export const waterfallPlaygrounds: Record<string, PlaygroundConfig> = {
  "waterfallLayout-basicWaterfallLayout": { initialSource: WaterfallLayoutBasicWaterfallLayoutSource, fileName: "waterfallLayout-basicWaterfallLayout.tsx", runtimeBindings,
    supportingFiles: [{ fileName: "demo.css", initialSource: WaterfallLayoutBasicWaterfallLayoutDemoSource, language: "css", importSpecifier: "css!./demo.css" }],
  },
  "waterfallLayout-filteringWaterfallLayout": { initialSource: WaterfallLayoutFilteringWaterfallLayoutSource, fileName: "waterfallLayout-filteringWaterfallLayout.tsx", runtimeBindings,
    supportingFiles: [{ fileName: "demo.css", initialSource: WaterfallLayoutFilteringWaterfallLayoutDemoSource, language: "css", importSpecifier: "css!./demo.css" }],
  },
  "waterfallLayout-performanceWaterfallLayout": { initialSource: WaterfallLayoutPerformanceWaterfallLayoutSource, fileName: "waterfallLayout-performanceWaterfallLayout.tsx", runtimeBindings,
    supportingFiles: [{ fileName: "demo.css", initialSource: WaterfallLayoutPerformanceWaterfallLayoutDemoSource, language: "css", importSpecifier: "css!./demo.css" }],
  },
  "waterfallLayout-progressiveLoadWaterfallLayout": { initialSource: WaterfallLayoutProgressiveLoadWaterfallLayoutSource, fileName: "waterfallLayout-progressiveLoadWaterfallLayout.tsx", runtimeBindings,
    supportingFiles: [{ fileName: "demo.css", initialSource: WaterfallLayoutProgressiveLoadWaterfallLayoutDemoSource, language: "css", importSpecifier: "css!./demo.css" }],
  },
};

