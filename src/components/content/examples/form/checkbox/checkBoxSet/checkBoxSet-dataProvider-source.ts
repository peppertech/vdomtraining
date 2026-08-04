const loadedSource = require("!!raw-loader!./checkBoxSet-dataProvider.tsx");
const source: string = typeof loadedSource === "string" ? loadedSource : loadedSource.default;
export default source;
