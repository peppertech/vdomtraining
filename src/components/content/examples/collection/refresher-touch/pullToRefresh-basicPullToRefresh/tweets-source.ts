const loadedSource = require("!!raw-loader!../cookbook/dataCollections/listView/collectionListView/tweets.json");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
