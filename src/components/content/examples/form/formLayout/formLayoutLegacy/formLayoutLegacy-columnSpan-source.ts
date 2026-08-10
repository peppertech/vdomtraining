const loadedSource = require("!!raw-loader!./formLayoutLegacy-columnSpan.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
