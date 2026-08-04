const loadedSource = require("!!raw-loader!./inputSensitiveText-states.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
