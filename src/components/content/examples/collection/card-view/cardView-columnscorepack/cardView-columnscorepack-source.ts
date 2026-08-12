const loadedSource = require("!!raw-loader!./cardView-columnscorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
