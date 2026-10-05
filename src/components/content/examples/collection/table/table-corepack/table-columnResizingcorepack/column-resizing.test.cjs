(() => {
  const { equal, ok } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const { runInNewContext } = require("node:vm");
  const typescript = require("typescript");
  const source = readFileSync(join(__dirname, "table-columnResizingcorepack.tsx"), "utf8");
  const compiled = typescript.transpileModule(source, {
    compilerOptions: {
      jsx: typescript.JsxEmit.React,
      target: typescript.ScriptTarget.ES2020,
      module: typescript.ModuleKind.CommonJS,
    },
  }).outputText;
  const state = [];
  let cursor = 0;
  const h = (type, props, ...children) => ({ type, props: { ...props, children } });
  class MutableArrayDataProvider {
    constructor(data) { this.data = data; }
  }
  const exports = {};
  const module = { exports };
  runInNewContext(compiled, {
    exports, module, React: { createElement: h },
    require: (specifier) => {
      if (specifier === "preact/hooks") return {
        useMemo: (callback) => callback(),
        useState: (initial) => {
          const index = cursor++;
          if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial;
          return [state[index], (value) => { state[index] = value; }];
        },
      };
      if (specifier === "ojs/ojmutablearraydataprovider") return MutableArrayDataProvider;
      if (specifier === "preact" || specifier === "oj-c/table" ||
          specifier.startsWith("ojs/")) return {};
      throw new Error(`Unexpected import: ${specifier}`);
    },
  });
  const find = (node, predicate) => {
    if (!node || typeof node !== "object") return undefined;
    if (predicate(node)) return node;
    for (const child of node.props?.children ?? []) {
      const match = find(child, predicate);
      if (match) return match;
    }
    return undefined;
  };
  const render = () => { cursor = 0; return module.exports.default(); };
  let tree = render();
  const table = () => find(tree, (node) => node.type === "oj-c-table");
  ok(table(), "Resizing should use the core table");
  equal(Object.keys(table().props.columns).length, 10);
  equal(table().props.columns.col0.resizable, "enabled");
  table().props.oncolumnWidthsChanged({ detail: { value: { col0: 210 } } });
  tree = render();
  equal(table().props.columnWidths.col0, 210, "Resize writeback should retain column width");
  find(tree, (node) => node.props?.id === "inputnumber-columns")
    .props.onvalueChanged({ detail: { value: 3 } });
  tree = render();
  equal(Object.keys(table().props.columns).length, 3, "Column count should rebuild the table");
  equal(table().props.columnWidths.col0, undefined, "Changing columns should clear old widths");
})();
