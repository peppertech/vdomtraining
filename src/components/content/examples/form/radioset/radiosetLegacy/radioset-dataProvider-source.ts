const loadedSource = require("!!raw-loader!./radioset-dataProvider.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
