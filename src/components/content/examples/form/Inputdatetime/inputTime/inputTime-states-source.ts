const loadedSource = require("!!raw-loader!./inputTime-states.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
