const loadedSource = require("!!raw-loader!./pendingData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
