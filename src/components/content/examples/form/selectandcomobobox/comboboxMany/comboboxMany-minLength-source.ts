const loadedSource = require("!!raw-loader!./comboboxMany-minLength.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
