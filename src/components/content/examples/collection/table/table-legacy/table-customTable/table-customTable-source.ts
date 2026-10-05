const loadedSource = require("!!raw-loader!./table-customTable.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
