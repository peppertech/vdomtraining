const loadedSource = require("!!raw-loader!./projectData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
