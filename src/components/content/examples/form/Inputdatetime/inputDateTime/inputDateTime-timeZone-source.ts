const loadedSource = require("!!raw-loader!./inputDateTime-timeZone.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
