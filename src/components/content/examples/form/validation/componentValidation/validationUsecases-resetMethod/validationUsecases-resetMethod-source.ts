const loadedSource = require("!!raw-loader!./validationUsecases-resetMethod.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
