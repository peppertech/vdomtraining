const loadedSource = require("!!raw-loader!./demo.css");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
