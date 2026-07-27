// Keep the webpack raw-loader request out of TypeScript's module resolver.
// raw-loader emits an ES-module default export, while this code is loaded with
// webpack require(), so normalize both possible module shapes to a string.
// `!!` disables the application loader chain so raw-loader reads the original
// TSX file, rather than the JavaScript emitted by ts-loader.
const loadedSource = require("!!raw-loader!./inputTextCorePack-states.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
