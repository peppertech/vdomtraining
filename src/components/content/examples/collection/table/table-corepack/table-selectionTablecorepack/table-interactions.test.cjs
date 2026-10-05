const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");

const root = join(__dirname, "..");

class KeySetImpl {
  constructor(keys = []) { this.keys = new Set(keys); }
  isAddAll() { return false; }
  values() { return this.keys; }
}

class ArrayDataProvider {
  constructor(data) { this.data = data; }
}

function mount(folder, data) {
  const filename = `${folder}.tsx`;
  const source = readFileSync(join(root, folder, filename), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React,
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const state = [];
  let hookIndex = 0;
  const useState = (initial) => {
    const index = hookIndex++;
    if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial;
    return [state[index], (next) => {
      state[index] = typeof next === "function" ? next(state[index]) : next;
    }];
  };
  const exports = {};
  const requireModule = (specifier) => {
    if (specifier === "preact/hooks") return { useState, useMemo: (factory) => factory() };
    if (specifier === "ojs/ojkeyset") return { KeySetImpl, AllKeySetImpl: KeySetImpl };
    if (specifier === "ojs/ojarraydataprovider") return ArrayDataProvider;
    if (specifier.startsWith("text!")) return JSON.stringify(data);
    return {};
  };
  runInNewContext(compiled, {
    exports,
    require: requireModule,
    h: (type, props, ...children) => ({ type, props: props ?? {}, children }),
    Fragment: "Fragment",
  }, { filename });
  const render = () => {
    hookIndex = 0;
    return exports.default();
  };
  return { render };
}

function find(node, type) {
  if (!node || typeof node !== "object") return undefined;
  if (node.type === type) return node;
  for (const child of node.children ?? []) {
    const found = find(child, type);
    if (found) return found;
  }
  return undefined;
}

function findTemplate(node, slot) {
  if (!node || typeof node !== "object") return undefined;
  if (node.type === "template" && node.props.slot === slot) return node;
  for (const child of node.children ?? []) {
    const found = findTemplate(child, slot);
    if (found) return found;
  }
  return undefined;
}

const departments = [{ DepartmentId: 10, DepartmentName: "Sales", LocationId: 1, ManagerId: 2 }];
const employees = [{ EmployeeId: 7, FirstName: "Ada", LastName: "Lovelace", Revenue: 5, Rating: 3, Status: "Pending" }];

{
  const demo = mount("table-selectionTablecorepack", departments);
  const first = demo.render();
  const table = find(first, "oj-c-table");
  assert.ok(table, "selection renders the core table");
  table.props.onselectedChanged({ detail: { value: { row: new KeySetImpl([10]), column: new KeySetImpl() } } });
  const selected = demo.render();
  assert.match(find(selected, "oj-text-area").props.value, /Row Keys: 10/);
  assert.equal(find(selected, "oj-button").props.disabled, false);
  find(selected, "oj-button").props.onojAction();
  const cleared = demo.render();
  assert.equal(find(cleared, "oj-button").props.disabled, true);
  assert.equal(find(cleared, "oj-c-table").props.selected.row.values().size, 0);
}

{
  const demo = mount("table-eventTablecorepack", departments);
  const first = demo.render();
  const table = find(first, "oj-c-table");
  assert.ok(table, "events renders the core table");
  table.props.onselectedChanged({ detail: { value: { row: new KeySetImpl([10]), column: new KeySetImpl() } } });
  table.props.oncurrentCellChanged({ detail: { value: { type: "data", rowKey: 10, columnKey: "name" } } });
  table.props.onojRowAction({ detail: { context: { item: { metadata: { key: 10 }, data: departments[0] } } } });
  const log = find(demo.render(), "oj-text-area").props.value;
  assert.match(log, /Selected Row Key\(s\):\s*10/);
  assert.match(log, /Current cell:.*10/);
  assert.match(log, /Row key: 10/);
}

{
  const demo = mount("table-actionTablecorepack", employees);
  const table = find(demo.render(), "oj-c-table");
  assert.ok(table, "actions renders the core table");
  assert.equal(table.props.dnd, undefined, "the core table has no column drag and drop");
  const action = findTemplate(table, "actionTemplate");
  const button = find(action.props.render({ item: { data: employees[0], metadata: { key: 7 } } }), "oj-button");
  button.props.onojAction({});
  const updated = find(demo.render(), "oj-c-table");
  assert.equal(updated.props.data.data[0].Status, "Approved");
}

console.log("table interaction demos pass");
