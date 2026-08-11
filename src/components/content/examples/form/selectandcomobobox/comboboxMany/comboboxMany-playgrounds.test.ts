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
      "overview",
      "comboboxMany-overview",
      "comboboxManyOverviewPlaygroundSource",
      "ComboboxManyOverviewExample",
      [
        "confirmationMessages",
        "createBrowserDataProvider",
        "errorMessages",
        "infoMessages",
        "warningMessages",
      ],
    ],
    [
      "basic",
      "comboboxMany-basic",
      "comboboxManyBasicPlaygroundSource",
      "ComboboxManyBasicExample",
      ["createBrowserDataProvider"],
    ],
    [
      "grouping",
      "comboboxMany-grouping",
      "comboboxManyGroupingPlaygroundSource",
      "ComboboxManyGroupingExample",
      ["createTimeZoneDataProvider"],
    ],
    [
      "width",
      "comboboxMany-width",
      "comboboxManyWidthPlaygroundSource",
      "ComboboxManyWidthExample",
      ["createBrowserDataProvider"],
    ],
    [
      "events",
      "comboboxMany-events",
      "comboboxManyEventsPlaygroundSource",
      "ComboboxManyEventsExample",
      ["createBrowserLabelDataProvider", "formatEventDetail"],
    ],
    [
      "value-options",
      "comboboxMany-valueOptions",
      "comboboxManyValueOptionsPlaygroundSource",
      "ComboboxManyValueOptionsExample",
      ["createStatesDataProvider"],
    ],
    [
      "data-mapping",
      "comboboxMany-dataMapping",
      "comboboxManyDataMappingPlaygroundSource",
      "ComboboxManyDataMappingExample",
      ["createEmployeeMappedDataProvider"],
    ],
    [
      "custom-template",
      "comboboxMany-customTemplate",
      "comboboxManyCustomTemplatePlaygroundSource",
      "ComboboxManyCustomTemplateExample",
      ["createGroupedEmployeeDataProvider", "renderEmployeeCustomOption"],
    ],
    [
      "item-image",
      "comboboxMany-itemImg",
      "comboboxManyItemImgPlaygroundSource",
      "ComboboxManyItemImgExample",
      ["createBrowserLabelDataProvider", "renderBrowserImageOption"],
    ],
    [
      "min-length",
      "comboboxMany-minLength",
      "comboboxManyMinLengthPlaygroundSource",
      "ComboboxManyMinLengthExample",
      ["createStatesDataProvider"],
    ],
    [
      "maximum-result-count",
      "comboboxMany-maximumResultCount",
      "comboboxManyMaximumResultCountPlaygroundSource",
      "ComboboxManyMaximumResultCountExample",
      ["createStatesDataProvider"],
    ],
    [
      "converter",
      "comboboxMany-converter",
      "comboboxManyConverterPlaygroundSource",
      "ComboboxManyConverterExample",
      ["createFormattedCurrencyDataProvider", "usdCurrencyConverter"],
    ],
    [
      "converter-with-data-mapping",
      "comboboxMany-converterWithDataMapping",
      "comboboxManyConverterWithDataMappingPlaygroundSource",
      "ComboboxManyConverterWithDataMappingExample",
      ["createUnformattedCurrencyDataProvider", "usdCurrencyConverter"],
    ],
    [
      "validator",
      "comboboxMany-validator",
      "comboboxManyValidatorPlaygroundSource",
      "ComboboxManyValidatorExample",
      ["createEmailDataProvider", "multipleEmailValidator"],
    ],
  ] as const;

  match(registrationSource, /playground\?: PlaygroundConfig;/);
  match(registrationSource, /playground=\{activeExample\.playground\}/);

  for (const [id, fileBaseName, sourceName, componentName, bindings] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    doesNotMatch(item, /supportingFiles:/);

    const runtimeBindings = item.match(
      /runtimeBindings:\s*\{([\s\S]*?)^      \},/m,
    )?.[1];
    ok(runtimeBindings, `Missing runtime bindings for ${id}`);
    const registeredBindings = Array.from(
      runtimeBindings.matchAll(/^        ([A-Za-z_$][\w$]*),$/gm),
      (binding: RegExpMatchArray) => binding[1],
    );
    deepEqual(registeredBindings.sort(), [...bindings].sort());

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
    "ojs/ojformlayout",
    "ojs/ojinputnumber",
    "ojs/ojselectcombobox",
    "./comboboxMany-shared",
  ]) {
    match(
      allowedImports,
      new RegExp(`"${importSpecifier.replaceAll("/", "\\/").replace(".", "\\.")}"`),
    );
  }
})();
