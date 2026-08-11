const loadedSource = require("!!raw-loader!./inputDateTime-textAlign.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
