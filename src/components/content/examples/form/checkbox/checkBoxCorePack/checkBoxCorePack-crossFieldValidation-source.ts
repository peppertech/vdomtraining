const loadedSource = require("!!raw-loader!./checkBoxCorePack-crossFieldValidation.tsx");
const source: string = typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
