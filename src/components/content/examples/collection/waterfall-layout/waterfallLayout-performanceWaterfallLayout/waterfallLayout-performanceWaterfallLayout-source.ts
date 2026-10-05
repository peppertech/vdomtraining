const loadedSource = require("!!raw-loader!./waterfallLayout-performanceWaterfallLayout.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
