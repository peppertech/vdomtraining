const loadedSource = require("!!raw-loader!./dataGrid-scrollPositionGrid.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
