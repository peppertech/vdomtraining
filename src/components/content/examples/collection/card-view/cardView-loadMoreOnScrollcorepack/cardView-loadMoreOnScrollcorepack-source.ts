const loadedSource = require("!!raw-loader!./cardView-loadMoreOnScrollcorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
