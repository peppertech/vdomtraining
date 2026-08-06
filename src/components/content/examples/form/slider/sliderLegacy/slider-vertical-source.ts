const loadedSource = require("!!raw-loader!./slider-vertical.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
