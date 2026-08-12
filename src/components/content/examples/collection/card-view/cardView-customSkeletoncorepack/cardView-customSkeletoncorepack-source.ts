const loadedSource = require("!!raw-loader!./cardView-customSkeletoncorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
