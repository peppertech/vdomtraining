const loadedSource = require("!!raw-loader!./waterfallLayout-basicWaterfallLayout.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
