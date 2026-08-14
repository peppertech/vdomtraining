const loadedSource = require("!!raw-loader!./dataGrid-dataRegionsGrid.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
