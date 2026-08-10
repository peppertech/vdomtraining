const loadedSource = require("!!raw-loader!./comboBoxOne-itemImg.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
