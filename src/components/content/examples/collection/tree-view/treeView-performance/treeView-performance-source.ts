const loadedSource = require("!!raw-loader!./treeView-performance.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
