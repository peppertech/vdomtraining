(() => {
  const { deepEqual, doesNotMatch, match, ok } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const { createElement } = require("preact");
  const renderToString = require("preact-render-to-string");
  const typescript = require("typescript");

  const directory = __dirname;
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const playgroundSource = readFileSync(
    join(directory, "../../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );

  function renderExample(fileName: string) {
    const source = readFileSync(join(directory, fileName), "utf8");
    const compiledSource = typescript.transpileModule(source, {
      compilerOptions: {
        jsx: typescript.JsxEmit.ReactJSX,
        jsxImportSource: "preact",
        module: typescript.ModuleKind.CommonJS,
        target: typescript.ScriptTarget.ES2020,
      },
    }).outputText;
    const exampleModule = { exports: {} };

    class TestDataProvider {}

    const testRequire = (specifier: string) => {
      if (specifier.startsWith("ojs/")) {
        return {};
      }
      if (specifier === "./formLayoutLegacy-shared") {
        return {
          createDataProvider: () => new TestDataProvider(),
          experienceOptions: [],
          sponsorshipTypeOptions: [],
          stateOptions: [],
          todayIsoDate: "2026-08-10",
        };
      }
      return require(specifier);
    };

    new Function("require", "exports", "module", compiledSource)(
      testRequire,
      exampleModule.exports,
      exampleModule,
    );
    const Example = (exampleModule.exports as { default: () => unknown }).default;
    ok(Example, `Missing default export in ${fileName}`);

    return renderToString(createElement(Example));
  }
  const demos = [
    [
      "form-inputs",
      "formLayoutLegacy-formInputs",
      "formLayoutLegacyFormInputsPlaygroundSource",
      "FormLayoutLegacyFormInputsExample",
      [
        "Color",
        "browserOptions",
        "colorOptions",
        "columnOptions",
        "controlStateOptions",
        "createDataProvider",
        "directionOptions",
        "formStateOptions",
        "getLegacySelectManyValue",
        "getLegacyTextValue",
        "labelEdgeOptions",
        "maxColumnOptions",
        "todayIsoDate",
        "todayIsoDateTime",
        "valueLengthOptions",
      ],
    ],
    [
      "mixed",
      "formLayoutLegacy-formInputsMixed",
      "formLayoutLegacyFormInputsMixedPlaygroundSource",
      "FormLayoutLegacyFormInputsMixedExample",
      [
        "browserOptions",
        "colorOptions",
        "createDataProvider",
        "getLegacySelectManyValue",
        "getLegacyTextValue",
        "labelEdgeOptions",
        "todayIsoDate",
        "todayIsoDateTime",
        "valueLengthOptions",
      ],
    ],
    [
      "column-span",
      "formLayoutLegacy-columnSpan",
      "formLayoutLegacyColumnSpanPlaygroundSource",
      "FormLayoutLegacyColumnSpanExample",
      ["createDataProvider"],
    ],
    [
      "nested",
      "formLayoutLegacy-nested",
      "formLayoutLegacyNestedPlaygroundSource",
      "FormLayoutLegacyNestedExample",
      [],
    ],
    [
      "shared-column",
      "formLayoutLegacy-sharedColumn",
      "formLayoutLegacySharedColumnPlaygroundSource",
      "FormLayoutLegacySharedColumnExample",
      [],
    ],
    [
      "job-application",
      "formLayoutLegacy-jobApplication",
      "formLayoutLegacyJobApplicationPlaygroundSource",
      "FormLayoutLegacyJobApplicationExample",
      [
        "createDataProvider",
        "experienceOptions",
        "sponsorshipTypeOptions",
        "stateOptions",
        "todayIsoDate",
      ],
    ],
  ] as const;

  for (const [id, fileBaseName, sourceName, componentName, bindings] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    if (bindings.length) {
      const runtimeBindings = item.match(
        /runtimeBindings:\s*\{([\s\S]*?)^      \},/m,
      )?.[1];
      ok(runtimeBindings, `Missing runtime bindings for ${id}`);
      const registeredBindings = Array.from(
        runtimeBindings.matchAll(/^        ([A-Za-z_$][\w$]*),$/gm),
        (binding: RegExpMatchArray) => binding[1],
      );
      deepEqual(registeredBindings.sort(), [...bindings].sort());
    } else {
      doesNotMatch(item, /runtimeBindings:/);
    }
    for (const binding of bindings) {
      match(item, new RegExp(`\\b${binding}\\b`));
    }

    match(
      registrationSource,
      new RegExp(`import ${sourceName} from "\\./${fileBaseName}-source";`),
    );
    const sourcePath = join(directory, `${fileBaseName}.tsx`);
    const wrapperPath = join(directory, `${fileBaseName}-source.ts`);
    ok(existsSync(wrapperPath), `Missing source wrapper for ${fileBaseName}.tsx`);
    match(
      readFileSync(sourcePath, "utf8"),
      new RegExp(`export default function ${componentName}\\s*\\(`),
    );
    match(
      readFileSync(wrapperPath, "utf8"),
      new RegExp(`!!raw-loader!\\./${fileBaseName}\\.tsx`),
    );
  }

  const allowedImports = playgroundSource.match(
    /const ALLOWED_IMPORTS = new Set\(\[([\s\S]*?)\]\);/,
  )?.[1];
  ok(allowedImports, "Missing shared playground import allowlist");
  match(allowedImports, /"ojs\/ojcollapsible"/);
  match(allowedImports, /"ojs\/ojselectsingle"/);
  match(allowedImports, /"\.\/formLayoutLegacy-shared"/);

  const jobApplicationMarkup = renderExample(
    "formLayoutLegacy-jobApplication.tsx",
  );
  match(
    jobApplicationMarkup,
    /<div class="oj-flex oj-sm-flex-wrap-wrap oj-sm-margin-2x-top" style="gap:1rem;"><oj-button chroming="outlined">Save Draft<\/oj-button><oj-button chroming="callToAction">Continue<\/oj-button><\/div>/,
    "Legacy Job Application should keep a 1rem gap between its action buttons",
  );
  doesNotMatch(
    jobApplicationMarkup,
    /oj-sm-flex-wrap-wrap oj-sm-gap-2x/,
    "Legacy Job Application should not retain the smaller action-button gap",
  );
})();
