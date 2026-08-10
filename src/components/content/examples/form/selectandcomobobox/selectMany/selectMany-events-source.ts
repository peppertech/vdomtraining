const loadedSource = require("!!raw-loader!./selectMany-events.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
