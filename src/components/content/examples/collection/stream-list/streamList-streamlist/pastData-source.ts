const loadedSource = require("!!raw-loader!./pastData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
