const loadedSource = require("!!raw-loader!./listView-progressiveLoadingcorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
