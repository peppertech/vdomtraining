const loadedSource = require("!!raw-loader!./timeline-customRendererTimeline.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
