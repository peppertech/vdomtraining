(() => {
  const { match, ok } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = __dirname;
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const playgroundSource = readFileSync(
    join(directory, "../../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );
  const demos = [
    ["required-fields", "validationGroup-requiredFieldValidation", "validationGroupRequiredFieldValidationPlaygroundSource", "ValidationGroupRequiredFieldValidation", []],
    ["one-required", "validationGroup-oneRequiredValidation", "validationGroupOneRequiredValidationPlaygroundSource", "ValidationGroupOneRequiredValidation", ["AsyncRegExpValidator"]],
    ["form-fields", "validationGroup-formFieldsValidation", "validationGroupFormFieldsValidationPlaygroundSource", "ValidationGroupFormFieldsValidation", []],
    ["dynamic-form", "validationGroup-dynamicFormValidation", "validationGroupDynamicFormValidationPlaygroundSource", "ValidationGroupDynamicFormValidation", ["ArrayDataProvider", "AsyncRegExpValidator"]],
    ["cross-field", "validationGroup-crossFieldValidation", "validationGroupCrossFieldValidationPlaygroundSource", "ValidationGroupCrossFieldValidation", ["AsyncRegExpValidator", "Context"]],
    ["async-validation", "validationGroup-asyncValidation", "validationGroupAsyncValidationPlaygroundSource", "ValidationGroupAsyncValidation", ["DemoNumberRangeAsyncValidator"]],
  ] as const;

  for (const [id, fileBaseName, sourceName, componentName, bindings] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    for (const binding of bindings) {
      match(item, new RegExp(`\\b${binding}\\b`));
    }
    match(
      registrationSource,
      new RegExp(`import ${sourceName} from "\\./${fileBaseName}/${fileBaseName}-source";`),
    );
    const sourcePath = join(directory, fileBaseName, `${fileBaseName}.tsx`);
    const wrapperPath = join(directory, fileBaseName, `${fileBaseName}-source.ts`);
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

  const oneRequiredItem = registrationSource.match(
    /  \{\n    id: "one-required",[\s\S]*?^  \},/m,
  )?.[0];
  ok(oneRequiredItem, "Missing One in Group Required recipe item");
  match(oneRequiredItem, /supportingFiles:\s*\[/);
  match(oneRequiredItem, /fileName: "demo\.css"/);
  match(oneRequiredItem, /initialSource: validationGroupOneRequiredValidationCssSource/);
  match(oneRequiredItem, /language: "css"/);
  match(oneRequiredItem, /importSpecifier: "css!\.\/demo\.css"/);

  for (const importSpecifier of [
    "ojs/ojvalidationgroup",
    "./DemoNumberRangeAsyncValidator",
  ]) {
    match(playgroundSource, new RegExp(`"${importSpecifier}"`));
  }
})();
