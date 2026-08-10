const loadedSource = require("!!raw-loader!./formLayoutCorePack-readonlyVsMixed.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
