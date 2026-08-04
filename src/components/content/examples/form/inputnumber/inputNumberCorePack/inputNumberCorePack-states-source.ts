const loadedSource = require("!!raw-loader!./inputNumberCorePack-states.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
