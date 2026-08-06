const loadedSource = require("!!raw-loader!./input-search-basic.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
