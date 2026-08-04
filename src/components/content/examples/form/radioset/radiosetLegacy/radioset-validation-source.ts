const loadedSource = require("!!raw-loader!./radioset-validation.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
