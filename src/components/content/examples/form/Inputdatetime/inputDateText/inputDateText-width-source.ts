const loadedSource = require("!!raw-loader!./inputDateText-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
