const loadedSource = require("!!raw-loader!./richCheckBoxsetCorePack-maximum.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
