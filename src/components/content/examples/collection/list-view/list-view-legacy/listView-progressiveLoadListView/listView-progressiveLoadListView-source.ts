const loadedSource = require("!!raw-loader!./listView-progressiveLoadListView.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
