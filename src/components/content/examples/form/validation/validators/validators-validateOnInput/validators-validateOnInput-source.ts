const loadedSource = require("!!raw-loader!./validators-validateOnInput.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
