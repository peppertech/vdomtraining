const loadedSource = require("!!raw-loader!./dataGrid-stylingGrid.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
