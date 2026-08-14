const loadedSource = require("!!raw-loader!../../../data/cookbook/dataVisualizations/timeline/customRendererTimeline/employeeStartData.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
