const loadedSource = require("!!raw-loader!./treeView-contextMenu.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
