const loadedSource = require("!!raw-loader!./selectMultiple-itemTemplate.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
