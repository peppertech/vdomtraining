const loadedSource = require("!!raw-loader!./formLayoutLegacy-formInputs.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
