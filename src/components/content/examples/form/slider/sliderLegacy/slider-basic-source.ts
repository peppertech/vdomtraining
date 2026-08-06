const loadedSource = require("!!raw-loader!./slider-basic.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
