const loadedSource = require("!!raw-loader!./streamList-scrollPosition.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
