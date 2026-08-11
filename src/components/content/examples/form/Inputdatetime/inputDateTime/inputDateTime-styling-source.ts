const loadedSource = require("!!raw-loader!./inputDateTime-styling.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
