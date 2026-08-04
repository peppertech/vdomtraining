const loadedSource = require("!!raw-loader!./checkBoxSet-contextMenu.tsx");
const source: string = typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
