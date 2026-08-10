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

  function renderExample(fileName: string, exportName = "default") {
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
      if (specifier.startsWith("oj-c/")) {
        return {};
      }
      if (specifier === "ojs/ojmutablearraydataprovider") {
        return TestDataProvider;
      }
      if (specifier === "ojs/ojconverterutils-i18n") {
        return {
          IntlConverterUtils: {
            dateToLocalIsoDateString: () => "2026-08-10",
          },
        };
      }
      return require(specifier);
    };

    new Function("require", "exports", "module", compiledSource)(
      testRequire,
      exampleModule.exports,
      exampleModule,
    );
    const Example = (exampleModule.exports as Record<string, () => unknown>)[
      exportName
    ];
    ok(Example, `Missing ${exportName} export in ${fileName}`);

    return renderToString(createElement(Example));
  }
  const demos = [
    [
      "form-inputs",
      "formLayoutCorePack-formInputs",
      "formLayoutCorePackFormInputsPlaygroundSource",
      "FormLayoutCorePackFormInputsExample",
      ["FormLayoutCorePack"],
    ],
    [
      "mixed",
      "formLayoutCorePack-formInputsMixed",
      "formLayoutCorePackFormInputsMixedPlaygroundSource",
      "FormLayoutCorePackFormInputsMixedExample",
      ["MutableArrayDataProvider"],
    ],
    [
      "column-span",
      "formLayoutCorePack-columnSpan",
      "formLayoutCorePackColumnSpanPlaygroundSource",
      "FormLayoutCorePackColumnSpanExample",
      ["MutableArrayDataProvider"],
    ],
    [
      "conditional-inputs",
      "formLayoutCorePack-conditionalInputs",
      "formLayoutCorePackConditionalInputsPlaygroundSource",
      "FormLayoutCorePackConditionalInputsExample",
      ["MutableArrayDataProvider"],
    ],
    [
      "job-application",
      "formLayoutCorePack-jobApplication",
      "formLayoutCorePackJobApplicationPlaygroundSource",
      "FormLayoutCorePackJobApplicationExample",
      ["MutableArrayDataProvider"],
    ],
    [
      "readonly-vs-mixed",
      "formLayoutCorePack-readonlyVsMixed",
      "formLayoutCorePackReadonlyVsMixedPlaygroundSource",
      "FormLayoutCorePackReadonlyVsMixedExample",
      ["MutableArrayDataProvider"],
    ],
    [
      "shared-column",
      "formLayoutCorePack-sharedColumn",
      "formLayoutCorePackSharedColumnPlaygroundSource",
      "FormLayoutCorePackSharedColumnExample",
      [],
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
    doesNotMatch(item, /supportingFiles:/);

    if (bindings.length) {
      const runtimeBindings = item.match(
        /runtimeBindings:\s*\{([\s\S]*?)^      \},/m,
      )?.[1];
      ok(runtimeBindings, `Missing runtime bindings for ${id}`);
      const registeredBindings = runtimeBindings
        .trim()
        .split("\n")
        .map((bindingLine: string) => {
          const binding = bindingLine
            .trim()
            .match(/^([A-Za-z_$][\w$]*)(?::.+)?,$/);
          if (!binding) {
            throw new Error(`Unsupported runtime binding syntax in ${id}`);
          }
          return binding[1];
        });
      deepEqual(registeredBindings.sort(), [...bindings].sort());
    } else {
      doesNotMatch(item, /runtimeBindings:/);
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
  for (const importSpecifier of [
    "oj-c/collapsible",
    "oj-c/input-date-mask",
    "oj-c/input-date-picker",
    "oj-c/input-date-text",
    "oj-c/input-month-mask",
    "oj-c/input-time-mask",
    "oj-c/select-multiple",
    "ojs/ojmutablearraydataprovider",
    "./formLayoutCorePack",
  ]) {
    match(allowedImports, new RegExp(`"${importSpecifier.replace(".", "\\.")}"`));
  }

  const formInputsMarkup = renderExample(
    "formLayoutCorePack.tsx",
    "FormLayoutCorePack",
  );
  match(formInputsMarkup, /^<div id="form-container">/);
  doesNotMatch(formInputsMarkup, /\bdemo-padding\b|id="componentDemoContent"/);
  deepEqual(
    formInputsMarkup.match(/userAssistanceDensity="compact"/g)?.length ?? 0,
    2,
    "Form Inputs option layouts should use the source's compact assistance density",
  );

  const mixedInputsMarkup = renderExample("formLayoutCorePack-formInputsMixed.tsx");
  match(mixedInputsMarkup, /^<div id="form-container">/);
  match(mixedInputsMarkup, /Options To Control the Form Controls Below/);
  match(
    mixedInputsMarkup,
    /class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom"/,
  );
  doesNotMatch(
    mixedInputsMarkup,
    /\boj-sm-gap-4x\b/,
    "Mixed Inputs should use only the source's targeted panel margin",
  );
  match(mixedInputsMarkup, /id="myform"[^>]*maxColumns="2"/);
  doesNotMatch(mixedInputsMarkup, /userAssistanceDensity="compact"/);
  deepEqual(
    [...mixedInputsMarkup.matchAll(/id="(f\d\w*)"/g)].map(
      (match) => match[1],
    ),
    [
      "f1",
      "f1readonly",
      "f2",
      "f2readonly",
      "f2b",
      "f2breadonly",
      "f3",
      "f3readonly",
      "f3a",
      "f3areadonly",
      "f4",
      "f4readonly",
      "f6",
      "f6readonly",
      "f5",
      "f5readonly",
      "f6a",
      "f6areadonly",
      "f18",
      "f18readonly",
      "f7",
      "f7readonly",
      "f11a",
      "f11areadonly",
      "f12",
      "f13",
      "f15",
      "f15readonly",
      "f17",
      "f17readonly",
      "f16",
      "f16readonly",
    ],
    "Mixed Inputs should pair each editable control with its readonly equivalent",
  );

  const columnSpanMarkup = renderExample("formLayoutCorePack-columnSpan.tsx");
  match(columnSpanMarkup, /^<div id="form-container">/);
  match(columnSpanMarkup, /<hr\/?>(?=<oj-c-form-layout)/);
  doesNotMatch(columnSpanMarkup, /\boj-sm-gap-4x\b/);

  const conditionalInputsMarkup = renderExample(
    "formLayoutCorePack-conditionalInputs.tsx",
  );
  match(conditionalInputsMarkup, /^<div id="form-container">/);
  match(
    conditionalInputsMarkup,
    /<oj-c-collapsible[^>]*class="oj-sm-margin-4x-bottom"/,
  );
  doesNotMatch(
    conditionalInputsMarkup,
    /\boj-sm-gap-4x\b/,
    "Conditional Inputs should space only the options collapsible",
  );
  match(
    conditionalInputsMarkup,
    /<\/oj-c-form-layout><oj-c-button/,
    "Conditional Inputs should not wrap the action in an extra spacing container",
  );

  const jobApplicationMarkup = renderExample(
    "formLayoutCorePack-jobApplication.tsx",
  );
  match(jobApplicationMarkup, /^<div id="form-container">/);
  doesNotMatch(
    jobApplicationMarkup,
    /\boj-sm-gap-\w+\b|\boj-sm-margin-(?:0|2x)-top\b/,
    "Job Application should rely on the source's native section flow",
  );
  match(
    jobApplicationMarkup,
    /<\/oj-c-form-layout><div style="margin-top:1rem;"><oj-c-button label="Add More"><\/oj-c-button><\/div>/,
    "Job Application should keep a 1rem top margin before Add More",
  );
  match(
    jobApplicationMarkup,
    /<div style="display:flex;gap:1rem;"><oj-c-button chroming="outlined" label="Save Draft"><\/oj-c-button><oj-c-button chroming="callToAction" label="Continue"><\/oj-c-button><\/div>/,
    "Job Application should keep a 1rem flex gap between its action buttons",
  );

  const readonlyVsMixedMarkup = renderExample(
    "formLayoutCorePack-readonlyVsMixed.tsx",
  );
  match(readonlyVsMixedMarkup, /^<div id="form-container">/);
  match(readonlyVsMixedMarkup, /Options To Control the Form Controls Below/);
  match(
    readonlyVsMixedMarkup,
    /class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom"/,
  );
  doesNotMatch(readonlyVsMixedMarkup, /\boj-sm-gap-4x\b/);

  const sharedColumnMarkup = renderExample(
    "formLayoutCorePack-sharedColumn.tsx",
  );
  match(sharedColumnMarkup, /^<div id="form-container">/);
  doesNotMatch(sharedColumnMarkup, /class="oj-sm-padding-2x"/);
  match(sharedColumnMarkup, /\.demo-column-width\s*\{\s*width:\s*6rem;/);
})();
