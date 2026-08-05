const loadedSource = require("!!raw-loader!./textAreaCorePack-resize.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
