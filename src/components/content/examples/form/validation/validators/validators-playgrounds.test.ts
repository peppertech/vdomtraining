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
    ["length-validator", "validators-lengthValidator", "validatorsLengthValidatorPlaygroundSource", "ValidatorsLengthValidator", ["AsyncLengthValidator"]],
    ["validate-on-input", "validators-validateOnInput", "validatorsValidateOnInputPlaygroundSource", "ValidatorsValidateOnInput", ["AsyncLengthValidator"]],
    ["number-range-validator", "validators-numberRangeValidator", "validatorsNumberRangeValidatorPlaygroundSource", "ValidatorsNumberRangeValidator", ["IntlNumberConverter", "AsyncNumberRangeValidator"]],
    ["regexp-validator", "validators-regExpValidator", "validatorsRegExpValidatorPlaygroundSource", "ValidatorsRegExpValidator", ["AsyncRegExpValidator"]],
    ["required-validator", "validators-requiredValidator", "validatorsRequiredValidatorPlaygroundSource", "ValidatorsRequiredValidator", []],
    ["custom-validators", "validators-customValidators", "validatorsCustomValidatorsPlaygroundSource", "ValidatorsCustomValidators", ["AsyncRegExpValidator"]],
    ["default-validator-messages", "validators-defaultValidatorMessages", "validatorsDefaultValidatorMessagesPlaygroundSource", "ValidatorsDefaultValidatorMessages", ["AsyncLengthValidator", "AsyncRegExpValidator"]],
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

  match(playgroundSource, /"ojs\/ojasyncvalidator-length"/);
  match(registrationSource, /initialItemId="length-validator"/);
})();
