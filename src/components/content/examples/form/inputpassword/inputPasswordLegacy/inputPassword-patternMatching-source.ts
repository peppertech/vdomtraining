const loadedSource = require("!!raw-loader!./inputPassword-patternMatching.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
