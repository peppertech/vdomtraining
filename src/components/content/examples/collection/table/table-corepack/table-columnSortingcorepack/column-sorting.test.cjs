(() => {
  const { deepEqual, equal, ok } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const { runInNewContext } = require("node:vm");
  const typescript = require("typescript");

  const rows = [
    { DepartmentId: 10, DepartmentName: "Finance", StartDate: "2021-01-03" },
    { DepartmentId: 20, DepartmentName: "Accounting", StartDate: "2014-06-13" },
    { DepartmentId: 30, DepartmentName: "Sales", StartDate: "2019-09-10" },
  ];
  const source = readFileSync(join(__dirname, "table-columnSortingcorepack.tsx"), "utf8");
  const compiled = typescript.transpileModule(source, {
    compilerOptions: {
      jsx: typescript.JsxEmit.React,
      target: typescript.ScriptTarget.ES2020,
      module: typescript.ModuleKind.CommonJS,
    },
  }).outputText;
  const state = [];
  let cursor = 0;
  const h = (type, props, ...children) => ({
    type, props: { ...props, children },
  });
  class ArrayDataProvider {
    constructor(data) { this.data = data; }
  }
  const exports = {};
  const module = { exports };
  runInNewContext(compiled, {
    exports,
    module,
    React: { createElement: h },
    require: (specifier) => {
      if (specifier === "preact/hooks") return {
        useMemo: (callback) => callback(),
        useState: (initial) => {
          const index = cursor++;
          if (!(index in state)) state[index] = initial;
          return [state[index], (value) => { state[index] = value; }];
        },
      };
      if (specifier === "ojs/ojarraydataprovider") return ArrayDataProvider;
      if (specifier === "text!./departmentData.json") return JSON.stringify(rows);
      if (specifier === "preact" || specifier === "css!./demo.css" ||
          specifier === "oj-c/table" || specifier === "ojs/ojtable") return {};
      throw new Error(`Unexpected import: ${specifier}`);
    },
  });
  const render = () => {
    cursor = 0;
    return module.exports.default();
  };
  const find = (node, predicate) => {
    if (!node || typeof node !== "object") return undefined;
    if (predicate(node)) return node;
    for (const child of node.props?.children ?? []) {
      const match = find(child, predicate);
      if (match) return match;
    }
    return undefined;
  };
  const table = (tree) => find(tree, (node) => node.type === "oj-c-table");
  const ids = (tree) => Array.from(table(tree).props.data.data, (row) => row.DepartmentId);

  let tree = render();
  ok(table(tree), "The preview should render a core table");
  deepEqual(ids(tree), [10, 20, 30], "Initial sort should use department IDs ascending");

  const columnControl = find(tree, (node) => node.props?.id === "sortColumn");
  ok(columnControl, "A column control should let users change the sort field");
  columnControl.props.onChange({ currentTarget: { value: "DepartmentName" } });
  tree = render();
  deepEqual(ids(tree), [20, 10, 30], "Changing the field should reorder the rows");

  const directionControl = find(tree, (node) => node.props?.id === "sortDirection");
  ok(directionControl, "A direction control should let users reverse the sort");
  directionControl.props.onChange({ currentTarget: { value: "descending" } });
  tree = render();
  deepEqual(ids(tree), [30, 10, 20], "Descending direction should reverse the names");
  const details = find(tree, (node) => node.type === "dl");
  ok(details, "The panel should report the active sort");
  equal(details.props.children[0].props.children[1].props.children[0], "Department Name");

  find(tree, (node) => node.props?.id === "sortColumn")
    .props.onChange({ currentTarget: { value: "StartDate" } });
  tree = render();
  deepEqual(ids(tree), [10, 30, 20], "Date sorting should compare dates in descending order");
})();
