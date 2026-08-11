const loadedSource = require("!!raw-loader!./inputDateTime-simple.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
