const loadedSource = require("!!raw-loader!./validationGroup-crossFieldValidation.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
