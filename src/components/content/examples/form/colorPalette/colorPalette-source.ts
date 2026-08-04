const loadedSource = require("!!raw-loader!./colorPalette.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
