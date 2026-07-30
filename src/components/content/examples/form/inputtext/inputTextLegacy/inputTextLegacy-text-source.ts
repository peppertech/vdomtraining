const loadedSource = require("!!raw-loader!./inputTextLegacy-text.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
