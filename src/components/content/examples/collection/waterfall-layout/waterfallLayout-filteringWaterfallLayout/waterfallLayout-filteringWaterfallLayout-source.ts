const loadedSource = require("!!raw-loader!./waterfallLayout-filteringWaterfallLayout.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
