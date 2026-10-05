const loadedSource = require("!!raw-loader!./resultData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
