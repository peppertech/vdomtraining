const loadedSource = require("!!raw-loader!../../data/cookbook/dataCollections/dataGrid/shared/customers.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
