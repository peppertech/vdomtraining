const loadedSource = require("!!raw-loader!./richRadioSet-basic.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
