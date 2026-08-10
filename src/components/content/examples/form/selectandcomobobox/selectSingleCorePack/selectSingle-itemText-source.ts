const loadedSource = require("!!raw-loader!./selectSingle-itemText.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
