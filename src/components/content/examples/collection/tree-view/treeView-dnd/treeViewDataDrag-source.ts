const loadedSource = require("!!raw-loader!./treeViewDataDrag.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
