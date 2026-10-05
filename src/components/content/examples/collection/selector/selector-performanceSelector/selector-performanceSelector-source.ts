const loadedSource = require("!!raw-loader!./selector-performanceSelector.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
