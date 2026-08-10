const loadedSource = require("!!raw-loader!./formLayoutLegacy-formInputsMixed.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
