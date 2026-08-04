const loadedSource = require("!!raw-loader!./inputPassword.css");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
