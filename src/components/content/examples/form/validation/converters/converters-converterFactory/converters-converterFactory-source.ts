const loadedSource = require("!!raw-loader!./converters-converterFactory.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
