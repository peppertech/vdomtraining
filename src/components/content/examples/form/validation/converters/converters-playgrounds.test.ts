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
    ["date-time-converter", "converters-dateTimeConverter", "convertersDateTimeConverterPlaygroundSource", "ConvertersDateTimeConverter", ["IntlDateTimeConverter", "IntlConverterUtils"]],
    ["number-converter", "converters-numberConverter", "convertersNumberConverterPlaygroundSource", "ConvertersNumberConverter", ["IntlNumberConverter"]],
    ["native-number-converter", "converters-nativeNumberConverter", "convertersNativeNumberConverterPlaygroundSource", "ConvertersNativeNumberConverter", ["NumberConverter"]],
    ["big-decimal-converter", "converters-bigDecimalConverter", "convertersBigDecimalConverterPlaygroundSource", "ConvertersBigDecimalConverter", ["BigDecimalStringConverter"]],
    ["converter-factory", "converters-converterFactory", "convertersConverterFactoryPlaygroundSource", "ConvertersConverterFactory", ["IntlDateTimeConverter", "IntlNumberConverter"]],
    ["color-converters", "converters-colorConverters", "convertersColorConvertersPlaygroundSource", "ConvertersColorConverters", ["Color", "ColorConverter"]],
    ["default-converter-messages", "converters-defaultConverterMessages", "convertersDefaultConverterMessagesPlaygroundSource", "ConvertersDefaultConverterMessages", ["IntlNumberConverter", "ColorConverter"]],
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

  const colorItem = registrationSource.match(
    /  \{\n    id: "color-converters",[\s\S]*?^  \},/m,
  )?.[0];
  ok(colorItem, "Missing Color Converters recipe item");
  match(colorItem, /supportingFiles:\s*\[/);
  match(colorItem, /fileName: "demo\.css"/);
  match(colorItem, /initialSource: convertersColorConvertersCssSource/);
  match(colorItem, /language: "css"/);
  match(colorItem, /importSpecifier: "css!\.\/demo\.css"/);

  for (const importSpecifier of [
    "ojs/index",
    "ojs/ojconverterutils-i18n",
  ]) {
    match(playgroundSource, new RegExp(`"${importSpecifier}"`));
  }
})();
