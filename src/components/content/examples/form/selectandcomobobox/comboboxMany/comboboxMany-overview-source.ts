const loadedSource = require("!!raw-loader!./comboboxMany-overview.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
