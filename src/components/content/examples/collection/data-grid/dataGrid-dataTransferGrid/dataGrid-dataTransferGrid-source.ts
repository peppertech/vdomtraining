const loadedSource = require("!!raw-loader!./dataGrid-dataTransferGrid.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
