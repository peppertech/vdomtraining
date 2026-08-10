const loadedSource = require("!!raw-loader!./selectMany-minimumResultsForSearch.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
