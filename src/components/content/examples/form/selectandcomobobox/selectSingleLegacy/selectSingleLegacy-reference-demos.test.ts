(() => {
  const { doesNotMatch, match } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const preact = require("preact");
  const hooks = require("preact/hooks");
  const renderToString = require("preact-render-to-string");
  const typescript = require("typescript");

  const renderDemo = (
    fileName: string,
    runtimeBindings: Record<string, unknown>,
  ) => {
    const source = readFileSync(join(__dirname, fileName), "utf8");
    const componentMatch = source.match(
      /export\s+default\s+function\s+([A-Za-z_$][\w$]*)\s*\(/,
    );
    if (!componentMatch) {
      throw new Error(`${fileName}: missing named default function`);
    }

    const executableSource = source
      .replace(/import[\s\S]*?;\s*/g, "")
      .replace("export default function", "function");
    const result = typescript.transpileModule(executableSource, {
      compilerOptions: {
        target: typescript.ScriptTarget.ES2020,
        module: typescript.ModuleKind.None,
        jsx: typescript.JsxEmit.React,
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
        strict: true,
      },
      reportDiagnostics: true,
    });
    const errors = (result.diagnostics ?? []).filter(
      (diagnostic: { category: number }) =>
        diagnostic.category === typescript.DiagnosticCategory.Error,
    );
    if (errors.length) {
      throw new Error(
        `${fileName}: ${typescript.flattenDiagnosticMessageText(
          errors[0].messageText,
          "\n",
        )}`,
      );
    }

    const bindingNames = Object.keys(runtimeBindings);
    const createComponent = new Function(
      "h",
      "Fragment",
      "useState",
      "useEffect",
      "useMemo",
      "useCallback",
      "useRef",
      ...bindingNames,
      `"use strict";\n${result.outputText}\nreturn ${componentMatch[1]};`,
    );
    const Component = createComponent(
      preact.h,
      preact.Fragment,
      hooks.useState,
      hooks.useEffect,
      hooks.useMemo,
      hooks.useCallback,
      hooks.useRef,
      ...Object.values(runtimeBindings),
    );
    return renderToString(preact.h(Component));
  };

  const addToListHtml = renderDemo("selectSingle-addToList.tsx", {
    createBrowserDataProvider: () => ({}),
  });
  match(addToListHtml, /<oj-select-single/);
  match(addToListHtml, /Current selected value/);
  match(addToListHtml, />CH</);
  doesNotMatch(addToListHtml, /Not Supported/);

  const advancedSearchHtml = renderDemo("selectSingle-advancedSearch.tsx", {
    createOracleEmployeeDataProvider: () => ({}),
    getEmployeeItemText: () => "Employee",
  });
  match(advancedSearchHtml, /<oj-select-single/);
  match(advancedSearchHtml, /Select Single Filtering All Fields/);
  match(advancedSearchHtml, /Current selected value/);
  match(advancedSearchHtml, /Current selected value-item/);
  doesNotMatch(advancedSearchHtml, /Not Supported/);
})();
