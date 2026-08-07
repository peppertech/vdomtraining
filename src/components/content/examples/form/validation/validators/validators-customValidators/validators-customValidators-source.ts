const loadedSource = require("!!raw-loader!./validators-customValidators.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
