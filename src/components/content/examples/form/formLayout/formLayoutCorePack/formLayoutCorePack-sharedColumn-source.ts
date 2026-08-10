const loadedSource = require("!!raw-loader!./formLayoutCorePack-sharedColumn.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
