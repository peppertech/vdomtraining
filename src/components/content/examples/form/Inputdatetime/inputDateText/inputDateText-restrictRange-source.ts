const loadedSource = require("!!raw-loader!./inputDateText-restrictRange.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
