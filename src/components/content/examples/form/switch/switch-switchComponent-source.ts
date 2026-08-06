const loadedSource = require("!!raw-loader!./switch-switchComponent.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
