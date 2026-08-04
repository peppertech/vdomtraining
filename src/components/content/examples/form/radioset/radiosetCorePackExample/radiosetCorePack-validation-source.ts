const loadedSource = require("!!raw-loader!./radiosetCorePack-validation.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
