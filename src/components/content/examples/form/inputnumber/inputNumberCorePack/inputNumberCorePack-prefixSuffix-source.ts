const loadedSource = require("!!raw-loader!./inputNumberCorePack-prefixSuffix.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
