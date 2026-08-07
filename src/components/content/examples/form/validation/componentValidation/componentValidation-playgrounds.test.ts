(() => {
  const { doesNotMatch, match, ok } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = __dirname;
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const playgroundSource = readFileSync(
    join(directory, "../../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );
  const demos = [
    ["async-validators", "validationUsecases-asyncValidators", "validationUsecasesAsyncValidatorsPlaygroundSource", "ValidationUsecasesAsyncValidators", ["IntlDateTimeConverter", "IntlNumberConverter", "Context", "AsyncNumberRangeValidator", "AsyncDateRestrictionValidator"]],
    ["show-messages", "validationUsecases-showMessagesMethod", "validationUsecasesShowMessagesPlaygroundSource", "ValidationUsecasesShowMessagesMethod", ["AsyncRegExpValidator"]],
    ["valid-option", "validationUsecases-validOption", "validationUsecasesValidOptionPlaygroundSource", "ValidationUsecasesValidOption", ["AsyncRegExpValidator"]],
    ["value-option", "validationUsecases-valueOption", "validationUsecasesValueOptionPlaygroundSource", "ValidationUsecasesValueOption", []],
    ["component-create", "validationUsecases-componentCreate", "validationUsecasesComponentCreatePlaygroundSource", "ValidationUsecasesComponentCreate", ["AsyncRegExpValidator"]],
    ["messages-custom", "validationUsecases-messagesCustom", "validationUsecasesMessagesCustomPlaygroundSource", "ValidationUsecasesMessagesCustom", []],
    ["reset-method", "validationUsecases-resetMethod", "validationUsecasesResetMethodPlaygroundSource", "ValidationUsecasesResetMethod", ["AsyncNumberRangeValidator"]],
    ["validate-method", "validationUsecases-validateMethod", "validationUsecasesValidateMethodPlaygroundSource", "ValidationUsecasesValidateMethod", ["AsyncRegExpValidator"]],
    ["required-option", "validationUsecases-requiredOption", "validationUsecasesRequiredOptionPlaygroundSource", "ValidationUsecasesRequiredOption", ["AsyncRegExpValidator"]],
    ["validators-option", "validationUsecases-validatorsOption", "validationUsecasesValidatorsOptionPlaygroundSource", "ValidationUsecasesValidatorsOption", ["AsyncRegExpValidator", "AsyncNumberRangeValidator"]],
    ["converter-option", "validationUsecases-converterOption", "validationUsecasesConverterOptionPlaygroundSource", "ValidationUsecasesConverterOption", ["IntlDateTimeConverter", "NumberConverter"]],
    ["refresh-method", "validationUsecases-refreshMethod", "validationUsecasesRefreshMethodPlaygroundSource", "ValidationUsecasesRefreshMethod", ["AsyncRegExpValidator"]],
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
      for (const binding of bindings) {
        match(item, new RegExp(`\\b${binding}\\b`));
      }
    } else {
      doesNotMatch(item, /runtimeBindings:|supportingFiles:/);
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

  match(registrationSource, /initialItemId="async-validators"/);
  for (const importSpecifier of [
    "ojs/ojasyncvalidator-daterestriction",
    "ojs/ojcontext",
    "ojs/ojconverter-datetime",
    "ojs/ojconverter-nativenumber",
    "ojs/ojselectcombobox",
    "ojs/ojvalidator-daterestriction",
  ]) {
    match(playgroundSource, new RegExp(`"${importSpecifier}"`));
  }
})();
