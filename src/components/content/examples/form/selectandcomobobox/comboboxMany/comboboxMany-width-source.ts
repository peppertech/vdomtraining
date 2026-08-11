const loadedSource = require("!!raw-loader!./comboboxMany-width.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
