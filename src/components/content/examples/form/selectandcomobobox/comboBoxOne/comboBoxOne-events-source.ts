const loadedSource = require("!!raw-loader!./comboBoxOne-events.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
