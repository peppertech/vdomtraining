const loadedSource = require("!!raw-loader!./formLayoutCorePack-conditionalInputs.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
