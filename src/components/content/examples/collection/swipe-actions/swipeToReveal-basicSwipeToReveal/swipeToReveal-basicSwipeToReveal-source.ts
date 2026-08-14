const loadedSource = require("!!raw-loader!./swipeToReveal-basicSwipeToReveal.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
