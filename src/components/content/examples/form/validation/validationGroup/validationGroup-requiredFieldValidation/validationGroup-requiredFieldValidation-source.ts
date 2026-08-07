const loadedSource = require("!!raw-loader!./validationGroup-requiredFieldValidation.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
