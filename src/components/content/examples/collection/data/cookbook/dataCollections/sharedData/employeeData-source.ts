const loadedSource = require("!!raw-loader!./employeeData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
