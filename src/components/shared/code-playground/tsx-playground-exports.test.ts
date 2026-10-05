(() => {
  const { equal, ok } = require("node:assert/strict");
  const { readFileSync, readdirSync } = require("node:fs");
  const { join } = require("node:path");
  const { runInNewContext } = require("node:vm");
  const typescript = require("typescript");

  const runnerSource = readFileSync(join(__dirname, "tsx-playground.tsx"), "utf8");
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
  const allowedImports = new Set(["ojs/ojtable"]);
  const compileComponent = runInNewContext(
    `${executableFunctions}\ncompileComponent;`,
    {
      ALLOWED_IMPORTS: allowedImports,
      typescript,
      preact: {
        h: (type: string, props: Record<string, unknown>) => ({ type, props }),
        Fragment: Symbol("Fragment"),
      },
      hooks: {},
    },
  );

  const source = [
    'import "ojs/ojtable";',
    'import * as dataText from "text!./data.json";',
    "export default function TableExample() {",
    '  return <oj-table aria-label={JSON.parse(dataText)[0].name} />;',
    "}",
    "export { TableExample };",
  ].join("\n");
  const supportingFiles = [{
    fileName: "data.json",
    initialSource: '[{"name":"Original"}]',
    language: "json",
    importSpecifier: "text!./data.json",
    bindingName: "dataText",
  }];
  const renderName = (name: string) => {
    const component = compileComponent(source, {}, supportingFiles, {
      "data.json": JSON.stringify([{ name }]),
    });
    return component().props["aria-label"];
  };

  equal(renderName("Before Apply"), "Before Apply");
  equal(renderName("After Apply"), "After Apply");

  const tableDemos = join(
    __dirname,
    "../../content/examples/collection/table/table-legacy",
  );
  const demoNames = readdirSync(tableDemos).filter((name: string) =>
    name.startsWith("table-") &&
    readdirSync(join(tableDemos, name)).includes(`${name}.tsx`),
  );
  equal(demoNames.length, 34);
  for (const name of demoNames) {
    const demoPath = join(tableDemos, name, `${name}.tsx`);
    const demoSource = readFileSync(demoPath, "utf8");
    const sourceFile = typescript.createSourceFile(
      `${name}.tsx`, demoSource, typescript.ScriptTarget.Latest, true,
      typescript.ScriptKind.TSX,
    );
    const runtimeBindings: Record<string, unknown> = {};
    for (const statement of sourceFile.statements) {
      if (typescript.isImportDeclaration(statement)) {
        const specifier = statement.moduleSpecifier.text;
        allowedImports.add(specifier);
        if (specifier.startsWith("text!")) {
          const bindingName = statement.importClause.namedBindings.name.text;
          runtimeBindings[bindingName] = readFileSync(
            join(tableDemos, name, specifier.slice(5)), "utf8",
          );
        } else if (specifier === "./DemoDataTransfer") {
          runtimeBindings[statement.importClause.name.text] = class DemoDataTransfer {};
        }
      } else if (typescript.isImportEqualsDeclaration(statement)) {
        allowedImports.add(statement.moduleReference.expression.text);
      }
    }
    equal(typeof compileComponent(demoSource, runtimeBindings, [], {}), "function", name);
  }
})();
