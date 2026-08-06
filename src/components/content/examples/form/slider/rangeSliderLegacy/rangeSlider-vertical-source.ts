const loadedSource = require("!!raw-loader!./rangeSlider-vertical.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
