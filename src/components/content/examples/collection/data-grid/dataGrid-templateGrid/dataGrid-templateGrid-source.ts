const loadedSource = require("!!raw-loader!./dataGrid-templateGrid.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
