const loadedSource = require("!!raw-loader!./dataGrid-resizing.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
