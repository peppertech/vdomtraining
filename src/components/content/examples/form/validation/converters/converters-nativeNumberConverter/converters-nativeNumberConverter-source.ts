const loadedSource = require("!!raw-loader!./converters-nativeNumberConverter.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
