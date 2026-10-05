const loadedSource = require("!!raw-loader!./rowExpanderTable-tableAnimationRowExpander.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
