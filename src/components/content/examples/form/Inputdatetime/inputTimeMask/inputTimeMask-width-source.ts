const loadedSource = require("!!raw-loader!./inputTimeMask-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
