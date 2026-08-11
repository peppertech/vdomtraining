const loadedSource = require("!!raw-loader!./selectMultiple-valueItems.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
