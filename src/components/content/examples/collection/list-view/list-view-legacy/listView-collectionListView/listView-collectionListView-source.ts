const loadedSource = require("!!raw-loader!./listView-collectionListView.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
