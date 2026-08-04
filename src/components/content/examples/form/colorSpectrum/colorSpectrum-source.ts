const loadedSource = require("!!raw-loader!./colorSpectrum.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
