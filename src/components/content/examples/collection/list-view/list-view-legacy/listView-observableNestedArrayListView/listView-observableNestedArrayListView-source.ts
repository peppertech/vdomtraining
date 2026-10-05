const loadedSource = require("!!raw-loader!./listView-observableNestedArrayListView.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
