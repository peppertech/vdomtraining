const loadedSource = require("!!raw-loader!./listView-gridlinescorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
