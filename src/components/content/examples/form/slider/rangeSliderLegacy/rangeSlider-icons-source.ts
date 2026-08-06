const loadedSource = require("!!raw-loader!./rangeSlider-icons.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
