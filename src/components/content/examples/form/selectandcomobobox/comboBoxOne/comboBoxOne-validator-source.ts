const loadedSource = require("!!raw-loader!./comboBoxOne-validator.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
