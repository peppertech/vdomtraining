const loadedSource = require("!!raw-loader!./inputNumber-textAlign.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
