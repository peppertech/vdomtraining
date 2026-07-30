const loadedSource = require("!!raw-loader!./inputTextLegacy-maxLength.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
