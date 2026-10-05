const loadedSource = require("!!raw-loader!./table-editableFormTable.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
