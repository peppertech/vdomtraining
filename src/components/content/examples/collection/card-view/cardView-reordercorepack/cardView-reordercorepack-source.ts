const loadedSource = require("!!raw-loader!./cardView-reordercorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
