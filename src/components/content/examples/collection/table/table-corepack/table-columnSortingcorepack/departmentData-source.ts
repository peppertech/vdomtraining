const loadedSource = require("!!raw-loader!./departmentData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
