const loadedSource = require("!!raw-loader!./selectMultiple-basic.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
