const loadedSource = require("!!raw-loader!./input-search-hero.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
