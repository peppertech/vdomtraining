const loadedSource = require("!!raw-loader!./inputPassword-styling.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
