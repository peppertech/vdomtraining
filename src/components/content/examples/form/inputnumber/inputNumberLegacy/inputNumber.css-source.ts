const loadedSource = require("!!raw-loader!./inputNumber.css");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
