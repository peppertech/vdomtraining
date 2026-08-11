const loadedSource = require(
  "!!raw-loader!../../inputtext/inputTextLegacy/inputTextLegacy.css",
);
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
