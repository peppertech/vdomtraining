const loadedSource = require("!!raw-loader!./treeView-json.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
