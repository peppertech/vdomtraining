(() => {
  const { equal, ok, throws } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { dirname, join, resolve } = require("node:path");
  const { runInNewContext } = require("node:vm");
  const typescript = require("typescript");

  const root = __dirname;
  const indexSource = readFileSync(join(root, "index.tsx"), "utf8");
  const indexAst = typescript.createSourceFile(
    "index.tsx", indexSource, typescript.ScriptTarget.Latest, true,
    typescript.ScriptKind.TSX,
  );
  const itemsDeclaration = indexAst.statements
    .filter(typescript.isVariableStatement)
    .flatMap((statement: any) => statement.declarationList.declarations)
    .find((declaration: any) => declaration.name.text === "tableCorePackItems");
  ok(itemsDeclaration && typescript.isArrayLiteralExpression(itemsDeclaration.initializer));
  const items = itemsDeclaration.initializer.elements;
  equal(items.length, 19, "The page should retain all 19 demos");

  const getProperty = (object: any, name: string) => object.properties.find(
    (property: any) => property.name?.text === name,
  );
  const h = (type: string, props: Record<string, unknown>, ...children: unknown[]) => ({
    type,
    props: { ...props, children },
  });
  const sourceImports = new Map<string, string>();
  class RuntimeStub {
    data: unknown;
    constructor(data: unknown) { this.data = data; }
    getUrl() { return "http://localhost/"; }
    static getFilter() { return {}; }
    static getFrameworkQuery() { return "(min-width: 1px)"; }
    static FRAMEWORK_QUERY_KEY = { XL_UP: "XL_UP", LG_UP: "LG_UP", MD_UP: "MD_UP" };
  }
  const demoCases: Array<{
    id: string;
    source: string;
    supportingFiles: Array<Record<string, string>>;
    runtimeBindings: Record<string, unknown>;
  }> = [];
  for (const statement of indexAst.statements) {
    if (typescript.isImportDeclaration(statement) && statement.importClause?.name) {
      sourceImports.set(statement.importClause.name.text, statement.moduleSpecifier.text);
    }
  }

  for (const item of items) {
    const id = getProperty(item, "id")?.initializer.text;
    const component = getProperty(item, "Component")?.initializer.text;
    const playground = getProperty(item, "playground")?.initializer;
    ok(id && component && playground, `Missing playground for ${id ?? component}`);
    const fileName = getProperty(playground, "fileName")?.initializer.text;
    const sourceBinding = getProperty(playground, "initialSource")?.initializer.text;
    const sourceImport = sourceImports.get(sourceBinding) ?? "";
    ok(sourceImport, `${id}: missing source wrapper import`);
    equal(fileName, `${(sourceImport.split("/").pop() ?? "").replace(/-source$/, "")}.tsx`);
    const wrapperPath = join(root, `${sourceImport}.ts`);
    ok(existsSync(wrapperPath), `${id}: missing TSX source wrapper`);
    const wrapper = readFileSync(wrapperPath, "utf8");
    ok(wrapper.includes(`!!raw-loader!./${fileName}`), `${id}: wrapper must load real TSX`);
    const demoPath = join(root, sourceImport.slice(0, sourceImport.lastIndexOf("/")), fileName);
    const demoSource = readFileSync(demoPath, "utf8");
    ok(demoSource.includes(`export default function ${component}(`), `${id}: named default function required`);
    ok(demoSource.includes(`export { ${component} };`), `${id}: retain named export`);

    const supporting = getProperty(playground, "supportingFiles")?.initializer.elements ?? [];
    const supportingFiles: Array<Record<string, string>> = [];
    const demoAst = typescript.createSourceFile(
      fileName, demoSource, typescript.ScriptTarget.Latest, true, typescript.ScriptKind.TSX,
    );
    const editableImports = demoAst.statements
      .filter(typescript.isImportDeclaration)
      .map((statement: any) => statement.moduleSpecifier.text)
      .filter((specifier: string) => specifier.startsWith("text!") || specifier.startsWith("css!"));
    equal(supporting.length, editableImports.length, `${id}: every asset needs a tab`);
    for (const specifier of editableImports) {
      const entry = supporting.find((file: any) =>
        getProperty(file, "importSpecifier")?.initializer.text === specifier,
      );
      ok(entry, `${id}: missing supporting file for ${specifier}`);
      const binding = getProperty(entry, "initialSource")?.initializer.text;
      const importPath = sourceImports.get(binding);
      ok(importPath && existsSync(join(root, `${importPath}.ts`)), `${id}: missing asset wrapper`);
      const assetName = getProperty(entry, "fileName")?.initializer.text;
      const language = getProperty(entry, "language")?.initializer.text;
      const wrapperSource = readFileSync(join(root, `${importPath}.ts`), "utf8");
      const rawTarget = wrapperSource.match(/!!raw-loader!(.+?)["']/)?.[1];
      ok(rawTarget, `${id}: missing raw-loader asset target`);
      equal(
        resolve(dirname(join(root, `${importPath}.ts`)), rawTarget),
        resolve(dirname(demoPath), specifier.slice(specifier.indexOf("!") + 1)),
        `${id}: asset wrapper must load the imported file`,
      );
      const assetPath = join(
        root,
        sourceImport.slice(0, sourceImport.lastIndexOf("/")),
        specifier.slice(specifier.indexOf("!") + 1),
      );
      supportingFiles.push({
        fileName: assetName,
        initialSource: readFileSync(assetPath, "utf8"),
        language,
        importSpecifier: specifier,
        ...(getProperty(entry, "bindingName")
          ? { bindingName: getProperty(entry, "bindingName").initializer.text }
          : {}),
      });
      ok(readFileSync(join(root, `${importPath}.ts`), "utf8").includes(`!!raw-loader!`),
        `${id}: asset wrapper must use raw-loader`);
      ok(assetName && getProperty(entry, "language"), `${id}: asset tab incomplete`);
      if (specifier.startsWith("text!")) {
        ok(getProperty(entry, "bindingName"), `${id}: data binding missing`);
        const importedName = demoAst.statements.find((statement: any) =>
          typescript.isImportDeclaration(statement) && statement.moduleSpecifier.text === specifier,
        )?.importClause?.namedBindings?.name?.text;
        equal(getProperty(entry, "bindingName").initializer.text, importedName,
          `${id}: data binding must match the TSX import`);
      } else {
        ok(!getProperty(entry, "bindingName"), `${id}: CSS must not have a runtime binding`);
      }
    }
    const runtimeBindings = Object.fromEntries(
      (getProperty(playground, "runtimeBindings")?.initializer.properties ?? [])
        .map((binding: any) => [binding.name.text, RuntimeStub]),
    );
    if ("preact" in runtimeBindings) runtimeBindings.preact = { h };
    demoCases.push({ id, source: demoSource, supportingFiles, runtimeBindings });
  }

  const runnerSource = readFileSync(
    join(root, "../../../../../shared/code-playground/tsx-playground.tsx"), "utf8",
  );
  const functionSource = runnerSource.match(
    /function getImportError\([\s\S]*?\n}\n\nfunction getMonacoLanguage/,
  )?.[0].replace(/\n\nfunction getMonacoLanguage$/, "");
  ok(functionSource, "Missing playground compilation functions");
  const executableFunctions = typescript.transpileModule(functionSource, {
    compilerOptions: {
      target: typescript.ScriptTarget.ES2020,
      module: typescript.ModuleKind.None,
    },
  }).outputText;
  const allowedImportSource = runnerSource.match(
    /const ALLOWED_IMPORTS = new Set\(\[([\s\S]*?)\]\);/,
  )?.[1];
  ok(allowedImportSource, "Missing shared import allowlist");
  const allowedImports = new Set<string>(
    [...allowedImportSource.matchAll(/"([^"]+)"/g)].map((match: any) => match[1]),
  );
  const compileComponent = runInNewContext(
    `${executableFunctions}\ncompileComponent;`,
    {
      ALLOWED_IMPORTS: allowedImports,
      typescript,
      preact: { h, Fragment: Symbol("Fragment") },
      hooks: {
        useMemo: (callback: () => unknown) => callback(),
        useState: (value: unknown) => [typeof value === "function" ? value() : value, () => {}],
        useEffect: () => {},
        useRef: (value: unknown) => ({ current: value }),
        useCallback: (callback: unknown) => callback,
      },
      matchMedia: () => ({ matches: false }),
    },
  );
  const renderedTags = (value: any): string[] => {
    if (Array.isArray(value)) return value.flatMap(renderedTags);
    if (!value || typeof value !== "object") return [];
    return [
      ...(typeof value.type === "string" ? [value.type] : []),
      ...renderedTags(value.props?.children),
    ];
  };
  const renderedNodes = (value: any): any[] => {
    if (Array.isArray(value)) return value.flatMap(renderedNodes);
    if (!value || typeof value !== "object") return [];
    return [value, ...renderedNodes(value.props?.children)];
  };
  const legacyDemos: string[] = [];
  const renderedById = new Map<string, any>();
  for (const demo of demoCases) {
    const component = compileComponent(demo.source, demo.runtimeBindings, demo.supportingFiles, {});
    equal(typeof component, "function", `${demo.id}: full source should compile`);
    const rendered = component();
    ok(rendered, `${demo.id}: initial component should render without missing bindings`);
    renderedById.set(demo.id, rendered);
    const tags = renderedTags(rendered);
    if (!tags.includes("oj-c-table") || tags.includes("oj-table")) {
      legacyDemos.push(demo.id);
    }
  }
  const filteringNodes = renderedNodes(renderedById.get("filtering"));
  const filteringTable = filteringNodes.find((node) => node.type === "oj-c-table");
  ok(filteringTable, "Filtering should use a core-pack table");
  equal(filteringTable.props.row.accessibleRowHeader, "depName");
  ok(filteringNodes.some((node) =>
    node.type === "template" && node.props.slot === "highlight"),
  "Filtering should retain highlighted cells through a core-pack template");
  const gridTable = renderedNodes(renderedById.get("grid-styling"))
    .find((node) => node.type === "oj-c-table");
  ok(gridTable, "Grid styling should use a core-pack table");
  equal(gridTable.props.horizontalGridVisible, "disabled");
  equal(gridTable.props.verticalGridVisible, "disabled");
  const progressiveTable = renderedNodes(renderedById.get("progressive-loading"))
    .find((node) => node.type === "oj-c-table");
  ok(progressiveTable, "Progressive loading should use a core-pack table");
  equal(progressiveTable.props.row.accessibleRowHeader.join(","), "first,last");
  equal(legacyDemos.join(", "), "", "Every preview should render only core-pack tables");
  const overviewPath = join(root, "table-overviewcorepack/table-overviewcorepack.tsx");
  const overview = readFileSync(overviewPath, "utf8");
  const overviewData = readFileSync(join(root, "table-overviewcorepack/departmentData.json"), "utf8");
  class MutableArrayDataProvider {
    data: unknown;
    constructor(data: unknown) { this.data = data; }
  }
  const dataFile = [{
    fileName: "demo.css",
    initialSource: readFileSync(join(root, "table-overviewcorepack/demo.css"), "utf8"),
    language: "css",
    importSpecifier: "css!./demo.css",
  }, {
    fileName: "departmentData.json",
    initialSource: overviewData,
    language: "json",
    importSpecifier: "text!./departmentData.json",
    bindingName: "deptData",
  }];
  const renderRows = (name: string) => {
    const edited = JSON.stringify([{ DepartmentId: 1, DepartmentName: name }]);
    const component = compileComponent(overview, { MutableArrayDataProvider }, dataFile, {
      "departmentData.json": edited,
    });
    return component().props.data.data;
  };
  equal(renderRows("Before Apply")[0].DepartmentName, "Before Apply");
  equal(renderRows("After Apply")[0].DepartmentName, "After Apply");
  const basic = demoCases.find((demo) => demo.id === "basic");
  if (!basic) throw new Error("Basic demo should be registered");
  const basicData = [{
    DepartmentId: 42,
    DepartmentName: "Edited Basic Department",
    LocationId: 1700,
    ManagerId: 100,
    EmployeeCount: 8,
  }];
  const basicComponent = compileComponent(
    basic.source,
    basic.runtimeBindings,
    basic.supportingFiles,
    { "departmentData.json": JSON.stringify(basicData) },
  );
  const basicTable = basicComponent().props.children[0];
  equal(basicTable.type, "oj-c-table", "Basic preview should use the core-pack table");
  equal(basicTable.props.columns.departmentName.field, "DepartmentName");
  equal(basicTable.props.row.accessibleRowHeader, "departmentName");
  equal(basicTable.props.data.data[0].DepartmentName, "Edited Basic Department");
  const editedComponent = compileComponent(
    overview.replace('aria-label="Departments"', 'aria-label="Edited TSX"'),
    { MutableArrayDataProvider }, dataFile, {},
  );
  equal(editedComponent().props["aria-label"], "Edited TSX");
  throws(() => compileComponent(overview, { MutableArrayDataProvider }, dataFile, {
    "departmentData.json": "{invalid",
  }), /departmentData.json/);
})();
