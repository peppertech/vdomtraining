const loadedSource = require("!!raw-loader!./comboBoxOne-grouping.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
