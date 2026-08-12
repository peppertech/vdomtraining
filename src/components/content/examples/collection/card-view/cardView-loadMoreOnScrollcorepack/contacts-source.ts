const loadedSource = require("!!raw-loader!./contacts.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
