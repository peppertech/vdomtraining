const loadedSource = require("!!raw-loader!./richRadioSet-layout.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
