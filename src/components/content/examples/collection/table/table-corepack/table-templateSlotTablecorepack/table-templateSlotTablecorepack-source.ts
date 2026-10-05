const loadedSource = require("!!raw-loader!./table-templateSlotTablecorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
