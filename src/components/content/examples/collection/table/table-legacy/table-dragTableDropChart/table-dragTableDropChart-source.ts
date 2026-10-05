const loadedSource = require("!!raw-loader!./table-dragTableDropChart.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
