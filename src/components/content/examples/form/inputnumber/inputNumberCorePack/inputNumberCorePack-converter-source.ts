const loadedSource = require("!!raw-loader!./inputNumberCorePack-converter.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
