(() => {
  const { strictEqual } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const { runInNewContext } = require("node:vm");
  const typescript = require("typescript");

  const demoSource = readFileSync(join(__dirname, "table-basicTable.tsx"), "utf8");
  const initialDepartments = JSON.parse(
    readFileSync(
      join(
        __dirname,
        "../../../data/cookbook/dataCollections/table/shared/departmentData.json",
      ),
      "utf8",
    ),
  );
  const executableSource = demoSource
    .replace(/^\s*import(?:[\s\S]*?;\s*)/gm, "")
    .replace("export default function", "function");
  const transpiledSource = typescript.transpileModule(executableSource, {
    compilerOptions: {
      target: typescript.ScriptTarget.ES2020,
      module: typescript.ModuleKind.None,
      jsx: typescript.JsxEmit.React,
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      strict: true,
    },
  }).outputText;

  class CapturingDataProvider {
    constructor(public readonly rows: Array<{ DepartmentName: string }>) {}
  }

  const renderFirstDepartmentName = (name: string) => {
    const departments = structuredClone(initialDepartments);
    departments[0].DepartmentName = name;
    const component = runInNewContext(
      `"use strict";\n${transpiledSource}\nTableBasicTable;`,
      {
        h: (type: string, props: Record<string, unknown>, ...children: unknown[]) => ({
          type,
          props,
          children,
        }),
        useMemo: (create: () => unknown) => create(),
        ArrayDataProvider: CapturingDataProvider,
        departmentDataText: JSON.stringify(departments),
      },
    );
    const table = component().children[0];
    return table.props.data.rows[0].DepartmentName;
  };

  strictEqual(renderFirstDepartmentName("Before Apply"), "Before Apply");
  strictEqual(renderFirstDepartmentName("After Apply"), "After Apply");
})();
