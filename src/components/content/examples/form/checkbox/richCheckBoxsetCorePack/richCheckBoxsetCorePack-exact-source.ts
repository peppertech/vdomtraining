const loadedSource = require("!!raw-loader!./richCheckBoxsetCorePack-exact.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
