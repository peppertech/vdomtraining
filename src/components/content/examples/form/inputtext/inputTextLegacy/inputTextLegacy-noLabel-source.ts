const loadedSource = require("!!raw-loader!./inputTextLegacy-noLabel.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
