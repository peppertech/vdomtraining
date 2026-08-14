const loadedSource = require("!!raw-loader!./dataGrid-performanceGrid.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
