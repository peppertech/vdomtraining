const loadedSource = require("!!raw-loader!./inputSensitiveText-nolabel.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
