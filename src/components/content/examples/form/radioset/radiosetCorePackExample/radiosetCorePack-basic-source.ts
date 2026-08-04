const loadedSource = require("!!raw-loader!./radiosetCorePack-basic.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
