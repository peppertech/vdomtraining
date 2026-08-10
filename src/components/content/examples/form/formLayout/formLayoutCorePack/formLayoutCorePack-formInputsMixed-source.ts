const loadedSource = require("!!raw-loader!./formLayoutCorePack-formInputsMixed.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
