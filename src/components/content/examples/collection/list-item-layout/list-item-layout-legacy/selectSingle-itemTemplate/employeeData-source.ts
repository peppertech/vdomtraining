const loadedSource = require("!!raw-loader!../../../data/cookbook/formControls/selectSingle/itemTemplate/employeeData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
