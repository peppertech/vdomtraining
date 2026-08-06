const loadedSource = require("!!raw-loader!./input-search.css");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
