const loadedSource = require("!!raw-loader!./inputDatePicker-restrictRange.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
