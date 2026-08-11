const loadedSource = require("!!raw-loader!./inputDateTime.css");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
