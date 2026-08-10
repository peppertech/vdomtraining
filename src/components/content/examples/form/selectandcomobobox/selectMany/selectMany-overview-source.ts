const loadedSource = require("!!raw-loader!./selectMany-overview.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
