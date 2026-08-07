const loadedSource = require("!!raw-loader!./validators-defaultValidatorMessages.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
