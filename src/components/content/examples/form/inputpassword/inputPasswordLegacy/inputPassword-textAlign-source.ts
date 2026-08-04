const loadedSource = require("!!raw-loader!./inputPassword-textAlign.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
