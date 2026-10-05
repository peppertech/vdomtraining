const loadedSource = require("!!raw-loader!./selector-listviewCheckboxCard.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
