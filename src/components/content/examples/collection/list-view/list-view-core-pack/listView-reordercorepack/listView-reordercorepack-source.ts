const loadedSource = require("!!raw-loader!./listView-reordercorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
