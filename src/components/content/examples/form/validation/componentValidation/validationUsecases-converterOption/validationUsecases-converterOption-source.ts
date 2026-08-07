const loadedSource = require("!!raw-loader!./validationUsecases-converterOption.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
