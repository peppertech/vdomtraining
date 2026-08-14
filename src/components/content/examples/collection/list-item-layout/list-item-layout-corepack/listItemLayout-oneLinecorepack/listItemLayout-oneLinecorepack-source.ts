const loadedSource = require("!!raw-loader!./listItemLayout-oneLinecorepack.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
