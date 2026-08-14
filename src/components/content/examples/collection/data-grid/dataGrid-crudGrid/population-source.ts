const loadedSource = require("!!raw-loader!../../data/cookbook/dataCollections/dataGrid/shared/population.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
