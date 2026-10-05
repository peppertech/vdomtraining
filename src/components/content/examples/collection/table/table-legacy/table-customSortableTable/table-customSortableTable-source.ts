const loadedSource = require("!!raw-loader!./table-customSortableTable.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
