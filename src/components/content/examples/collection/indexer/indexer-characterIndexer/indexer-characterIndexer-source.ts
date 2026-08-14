const loadedSource = require("!!raw-loader!./indexer-characterIndexer.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
