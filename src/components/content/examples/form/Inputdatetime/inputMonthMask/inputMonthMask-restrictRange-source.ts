const loadedSource = require("!!raw-loader!./inputMonthMask-restrictRange.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
