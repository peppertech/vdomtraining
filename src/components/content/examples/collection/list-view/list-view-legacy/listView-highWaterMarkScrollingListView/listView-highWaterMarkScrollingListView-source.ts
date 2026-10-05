const loadedSource = require("!!raw-loader!./listView-highWaterMarkScrollingListView.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
