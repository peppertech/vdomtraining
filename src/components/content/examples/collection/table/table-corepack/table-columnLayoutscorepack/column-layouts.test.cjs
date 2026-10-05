(() => {
  const { equal, ok } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const { runInNewContext } = require("node:vm");
  const typescript = require("typescript");
  const source = readFileSync(join(__dirname, "table-columnLayoutscorepack.tsx"), "utf8");
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
  class ArrayDataProvider {
    constructor(data) { this.data = data; }
  }
  const exports = {};
  const module = { exports };
  runInNewContext(compiled, {
    exports, module, React: { createElement: h },
    require: (specifier) => {
      if (specifier === "preact/hooks") return {
        useMemo: (callback) => callback(),
        useEffect: () => {},
        useRef: (value) => ({ current: value }),
        useState: (initial) => {
          const index = cursor++;
          if (!(index in state)) state[index] = initial;
          return [state[index], (value) => { state[index] = value; }];
        },
      };
      if (specifier === "ojs/ojarraydataprovider") return ArrayDataProvider;
      if (specifier.startsWith("text!")) return JSON.stringify([{
        DepartmentId: 10, DepartmentName: "Finance", LocationId: 300, ManagerId: 7001,
      }]);
      if (specifier === "preact" || specifier === "css!./demo.css" ||
          specifier === "oj-c/table" || specifier.startsWith("ojs/")) return {};
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
  const input = (id) => find(tree, (node) => node.props?.id === id);
  ok(find(tree, (node) => node.type === "oj-c-table"), "Layouts should use the core table");
  input("width1").props.onvalueChanged({ detail: { value: "175" } });
  input("minWidth1").props.onvalueChanged({ detail: { value: "125" } });
  input("maxWidth1").props.onvalueChanged({ detail: { value: "250" } });
  input("weight1").props.onvalueChanged({ detail: { value: "2" } });
  tree = render();
  const table = find(tree, (node) => node.type === "oj-c-table");
  equal(table.props.columnWidths.departmentId, 175, "Width input should set pixel width");
  equal(table.props.columns.departmentId.minWidth, 125, "Minimum width should be numeric");
  equal(table.props.columns.departmentId.maxWidth, 250, "Maximum width should be numeric");
  equal(table.props.columns.departmentId.weight, 2, "Weight should set relative fixed-layout size");
  input("width1").props.onvalueChanged({ detail: { value: "" } });
  tree = render();
  equal(find(tree, (node) => node.type === "oj-c-table").props.columnWidths.departmentId,
    undefined, "Clearing width should restore automatic sizing");
})();
