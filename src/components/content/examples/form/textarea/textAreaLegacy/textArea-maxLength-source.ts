const loadedSource = require("!!raw-loader!./textArea-maxLength.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
