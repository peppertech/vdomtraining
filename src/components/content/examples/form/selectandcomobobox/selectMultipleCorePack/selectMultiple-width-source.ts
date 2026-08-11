const loadedSource = require("!!raw-loader!./selectMultiple-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
