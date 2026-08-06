const loadedSource = require("!!raw-loader!./slider-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
