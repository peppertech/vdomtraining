const loadedSource = require("!!raw-loader!./inputDateMask-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
