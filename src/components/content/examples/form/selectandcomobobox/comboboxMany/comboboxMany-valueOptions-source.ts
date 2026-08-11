const loadedSource = require("!!raw-loader!./comboboxMany-valueOptions.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
