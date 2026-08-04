const loadedSource = require("!!raw-loader!./radioset-readonly.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
