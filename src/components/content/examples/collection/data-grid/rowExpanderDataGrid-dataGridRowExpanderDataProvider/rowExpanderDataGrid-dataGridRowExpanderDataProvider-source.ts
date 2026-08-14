const loadedSource = require("!!raw-loader!./rowExpanderDataGrid-dataGridRowExpanderDataProvider.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
