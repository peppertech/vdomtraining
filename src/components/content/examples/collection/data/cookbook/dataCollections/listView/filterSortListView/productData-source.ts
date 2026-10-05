const loadedSource = require("!!raw-loader!./productData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
