const loadedSource = require("!!raw-loader!./checkBoxSet-validation.tsx");
const source: string = typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
