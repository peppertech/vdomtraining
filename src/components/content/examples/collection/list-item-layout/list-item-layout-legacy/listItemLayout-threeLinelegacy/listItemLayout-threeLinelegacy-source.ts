const loadedSource = require("!!raw-loader!./listItemLayout-threeLinelegacy.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
