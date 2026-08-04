const loadedSource = require("!!raw-loader!./inputPasswordCorePack-clearIcon.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
