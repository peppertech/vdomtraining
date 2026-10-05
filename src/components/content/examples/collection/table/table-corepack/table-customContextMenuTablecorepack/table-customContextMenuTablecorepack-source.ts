const loadedSource = require("!!raw-loader!./table-customContextMenuTablecorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
