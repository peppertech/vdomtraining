const loadedSource = require("!!raw-loader!./helpHintsMessaging-converterHintMessages.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
