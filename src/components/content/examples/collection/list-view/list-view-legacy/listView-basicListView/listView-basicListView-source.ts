const loadedSource = require("!!raw-loader!./listView-basicListView.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
