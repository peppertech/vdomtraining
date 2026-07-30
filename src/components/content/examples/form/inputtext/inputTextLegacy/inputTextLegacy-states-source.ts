const loadedSource = require("!!raw-loader!./inputTextLegacy-states.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
