const loadedSource = require("!!raw-loader!./inputDate-customizeDays.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
