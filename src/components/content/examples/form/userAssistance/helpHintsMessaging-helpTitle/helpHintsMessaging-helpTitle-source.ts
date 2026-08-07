const loadedSource = require("!!raw-loader!./helpHintsMessaging-helpTitle.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
