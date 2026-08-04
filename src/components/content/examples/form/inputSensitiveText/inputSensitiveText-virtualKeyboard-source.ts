const loadedSource = require("!!raw-loader!./inputSensitiveText-virtualKeyboard.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
