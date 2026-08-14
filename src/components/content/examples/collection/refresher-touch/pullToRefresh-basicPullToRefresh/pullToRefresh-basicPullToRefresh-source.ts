const loadedSource = require("!!raw-loader!./pullToRefresh-basicPullToRefresh.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
