(() => {
  const { deepEqual, doesNotMatch, match, ok } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = __dirname;
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const playgroundSource = readFileSync(
    join(directory, "../../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );
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
})();
