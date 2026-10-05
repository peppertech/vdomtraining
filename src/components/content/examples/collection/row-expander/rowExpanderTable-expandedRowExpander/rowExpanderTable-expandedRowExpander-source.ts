const loadedSource = require("!!raw-loader!./rowExpanderTable-expandedRowExpander.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
