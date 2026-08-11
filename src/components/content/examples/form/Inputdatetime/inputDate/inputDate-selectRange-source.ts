const loadedSource = require("!!raw-loader!./inputDate-selectRange.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
