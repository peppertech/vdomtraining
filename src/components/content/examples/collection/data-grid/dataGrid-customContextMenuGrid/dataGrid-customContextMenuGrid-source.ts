const loadedSource = require("!!raw-loader!./dataGrid-customContextMenuGrid.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
