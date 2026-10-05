const loadedSource = require("!!raw-loader!./streamList-streamlist.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
