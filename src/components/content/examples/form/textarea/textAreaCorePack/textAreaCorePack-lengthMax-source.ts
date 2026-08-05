const loadedSource = require("!!raw-loader!./textAreaCorePack-lengthMax.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
