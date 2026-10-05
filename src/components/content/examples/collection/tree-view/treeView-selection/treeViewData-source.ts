const loadedSource = require("!!raw-loader!./treeViewData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
