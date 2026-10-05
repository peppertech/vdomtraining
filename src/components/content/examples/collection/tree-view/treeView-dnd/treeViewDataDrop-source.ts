const loadedSource = require("!!raw-loader!./treeViewDataDrop.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
