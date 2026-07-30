const loadedSource = require("!!raw-loader!./inputTextCorePack-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
