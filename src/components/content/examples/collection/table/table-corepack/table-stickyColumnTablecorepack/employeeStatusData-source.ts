const loadedSource = require("!!raw-loader!./employeeStatusData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
