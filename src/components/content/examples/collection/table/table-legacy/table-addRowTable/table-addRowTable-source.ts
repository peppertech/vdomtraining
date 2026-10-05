const loadedSource = require("!!raw-loader!./table-addRowTable.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
