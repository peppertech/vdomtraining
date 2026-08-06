const loadedSource = require("!!raw-loader!./labelledLink-customAction.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
