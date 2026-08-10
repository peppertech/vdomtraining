const loadedSource = require("!!raw-loader!./formLayoutCorePack-jobApplication.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
