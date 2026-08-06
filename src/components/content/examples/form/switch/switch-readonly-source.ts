const loadedSource = require("!!raw-loader!./switch-readonly.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
