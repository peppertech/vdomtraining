const loadedSource = require("!!raw-loader!./inputDateTime-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
