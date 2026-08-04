const loadedSource = require("!!raw-loader!./richRadioSet-overview.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
