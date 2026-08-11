const loadedSource = require("!!raw-loader!./inputDateTime-multipleWidgets.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
