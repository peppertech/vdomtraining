const loadedSource = require("!!raw-loader!./listItemLayout-multiColumnlegacy.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
