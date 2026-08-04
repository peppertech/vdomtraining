const loadedSource = require("!!raw-loader!./richRadioSet-userAssistance.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
