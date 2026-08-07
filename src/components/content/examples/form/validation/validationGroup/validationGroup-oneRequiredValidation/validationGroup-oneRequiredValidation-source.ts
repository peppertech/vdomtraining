const loadedSource = require("!!raw-loader!./validationGroup-oneRequiredValidation.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
