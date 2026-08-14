const loadedSource = require("!!raw-loader!./listItemLayout-twoLinecorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
