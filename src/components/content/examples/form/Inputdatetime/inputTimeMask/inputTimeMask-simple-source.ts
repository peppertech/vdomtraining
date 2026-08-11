const loadedSource = require("!!raw-loader!./inputTimeMask-simple.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
