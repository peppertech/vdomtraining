const loadedSource = require("!!raw-loader!./comboboxMany-events.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
