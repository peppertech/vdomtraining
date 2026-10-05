const { test } = require('node:test');
const { equal, deepEqual, ok } = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { dirname, join, resolve } = require('node:path');
const { runInNewContext } = require('node:vm');
const ts = require('typescript');

const demoRoot = dirname(__dirname);
const jsx = (type, props) => ({ type, props: props || {} });
const childrenOf = (node) => {
  const children = node?.props?.children;
  return children == null ? [] : Array.isArray(children) ? children : [children];
};
const find = (node, predicate) => {
  if (Array.isArray(node)) return node.map((child) => find(child, predicate)).find(Boolean);
  if (!node || typeof node !== 'object') return undefined;
  if (predicate(node)) return node;
  return find(childrenOf(node), predicate);
};

function loadDemo(folder) {
  const file = join(demoRoot, folder, `${folder}.tsx`);
  const source = readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: 'preact',
    },
    fileName: file,
  }).outputText;
  const state = [];
  let nextHook = 0;
  class ArrayDataProvider {
    constructor(data) { this.data = data; }
  }
  const hooks = {
    useMemo: (create) => create(),
    useRef: (initial) => ({ current: initial }),
    useState: (initial) => {
      const index = nextHook++;
      if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial;
      return [state[index], (update) => {
        state[index] = typeof update === 'function' ? update(state[index]) : update;
      }];
    },
  };
  const module = { exports: {} };
  const localRequire = (name) => {
    if (name === 'preact/jsx-runtime') return { jsx, jsxs: jsx, Fragment: Symbol.for('Fragment') };
    if (name === 'preact/hooks') return hooks;
    if (name === 'ojs/ojarraydataprovider') return ArrayDataProvider;
    if (name.startsWith('text!')) return readFileSync(resolve(dirname(file), name.slice(5)), 'utf8');
    return {};
  };
  runInNewContext(js, { require: localRequire, module, exports: module.exports });
  return () => {
    nextHook = 0;
    return module.exports.default();
  };
}

test('background color demo renders three core-pack tables with a department row header', () => {
  const tree = loadDemo('table-backgroundColorcorepack')();
  const tables = childrenOf(tree).map((section) => find(section, (node) => node.type === 'oj-c-table'));
  equal(tables.length, 3);
  tables.forEach((table) => {
    ok(table, 'each colored section should contain a core-pack table');
    equal(table.props.row.accessibleRowHeader, 'depName');
    equal(table.props.columns.depName.field, 'DepartmentName');
  });
});

test('no-data demo can add a customer and remove that row through its action cell', () => {
  const render = loadDemo('table-noDataTablecorepack');
  let table = find(render(), (node) => node.type === 'oj-c-table');
  ok(table);
  const noData = find(table, (node) => node.type === 'template' && node.props.slot === 'noData');
  ok(noData);
  const addButton = find(noData.props.render({ isTabbable: true }), (node) => node.type === 'oj-button');
  ok(addButton);
  addButton.props.onojAction();
  table = find(render(), (node) => node.type === 'oj-c-table');
  equal(table.props.data.data.length, 1);
  equal(table.props.data.data[0].name, 'Andrew Sky');
  const action = find(table, (node) => node.type === 'template' && node.props.slot === 'actionTemplate');
  ok(action);
  const removeButton = find(action.props.render({ item: { data: table.props.data.data[0] }, isTabbable: true }),
    (node) => node.type === 'oj-button');
  ok(removeButton);
  removeButton.props.onojAction();
  table = find(render(), (node) => node.type === 'oj-c-table');
  equal(table.props.data.data.length, 0);
});

test('template demo renders the rating gauge and employee-count footer through core-pack templates', () => {
  const table = find(loadDemo('table-templateSlotTablecorepack')(), (node) => node.type === 'oj-c-table');
  ok(table);
  equal(table.props.columns.rating.template, 'ratingCellTemplate');
  equal(table.props.columns.count.footerTemplate, 'totalFooterTemplate');
  const rating = find(table, (node) => node.type === 'template' && node.props.slot === 'ratingCellTemplate');
  const gauge = find(rating.props.render({ data: 4, item: { data: {} } }), (node) => node.type === 'oj-rating-gauge');
  equal(gauge.props.value, 4);
  const footer = find(table, (node) => node.type === 'template' && node.props.slot === 'totalFooterTemplate');
  const total = find(footer.props.render({ key: 'count' }), (node) => node.props.id === 'table:emp_total');
  const expected = table.props.data.data.reduce((sum, row) => sum + row.EmployeeCount, 0);
  equal(childrenOf(total)[0], expected);
});

test('context-menu demo reports its origin and keeps custom actions around default items', () => {
  const render = loadDemo('table-customContextMenuTablecorepack');
  let tree = render();
  const table = find(tree, (node) => node.type === 'oj-c-table');
  ok(table);
  const config = table.props.contextMenuConfig;
  ok(config);
  deepEqual(Array.from(config.items({ type: 'header', columnKey: 'depName', hasDefaultMenuItems: true }),
    (item) => typeof item === 'string' ? item : item.type === 'separator' ? 'separator' : item.label),
    ['My First Item', 'separator', 'defaultMenuItems', 'separator', 'My Other Item']);
  tree = render();
  equal(childrenOf(find(tree, (node) => node.props.id === 'results'))[0], 'Header: [depName]');
  config.items({ type: 'data', columnKey: 'depId', rowKey: 10, rowData: {}, hasDefaultMenuItems: false })[0].onAction();
  tree = render();
  equal(childrenOf(find(tree, (node) => node.props.id === 'results'))[0], 'Cell: [10, depId]');
  equal(childrenOf(find(tree, (node) => node.props.id === 'results1'))[0], 'My First Item');
});
