const loadedSource = require("!!raw-loader!./inputTime-customValidator.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
