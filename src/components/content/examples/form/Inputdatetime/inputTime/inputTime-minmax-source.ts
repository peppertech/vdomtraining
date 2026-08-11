const loadedSource = require("!!raw-loader!./inputTime-minmax.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
