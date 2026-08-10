const loadedSource = require("!!raw-loader!./formLayoutLegacy-sharedColumn.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
