const loadedSource = require("!!raw-loader!../../data/employeeData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
