const loadedSource = require("!!raw-loader!./listItemLayout-tablelegacy.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
