const loadedSource = require("!!raw-loader!./inputDate-states.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
