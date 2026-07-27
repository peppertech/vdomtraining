// Load Monaco's ESM editor API rather than its legacy AMD package entry.
// Keeping the require calls in this local module avoids the JET loader's
// declaration-resolution issue with Monaco's export map.
const monaco: any = require("monaco-editor/editor/editor.api.js");
require("monaco-editor/language/typescript/monaco.contribution.js");

export default monaco;
