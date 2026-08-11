(() => {
  const { deepEqual, doesNotMatch, match, ok, strictEqual } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const rootDirectory = join(
    process.cwd(),
    "src/components/content/examples/form/Inputdatetime",
  );
  const recipePageTemplateSource = readFileSync(
    join(rootDirectory, "../../../../shared/demo-page-layout/recipe-page-template.tsx"),
    "utf8",
  );
  const playgroundSource = readFileSync(
    join(rootDirectory, "../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );
  const registries = [
    {
      directoryName: "inputDatePicker",
      itemsName: "inputDatePickerItemsVdom",
      helperSpecifier: "./inputDatePicker-shared",
      requiredIndexImports: [],
      demos: [
        ["overview", "inputDatePicker-overview", "inputDatePickerOverviewPlaygroundSource", "InputDatePickerOverviewExample", ["messageSets"], false],
        ["simple", "inputDatePicker-simple", "inputDatePickerSimplePlaygroundSource", "InputDatePickerSimpleExample", ["todayIsoDate"], false],
        ["restrict-range", "inputDatePicker-restrictRange", "inputDatePickerRestrictRangePlaygroundSource", "InputDatePickerRestrictRangeExample", [], false],
        ["show-week-of-year", "inputDatePicker-showWeekOfYear", "inputDatePickerShowWeekOfYearPlaygroundSource", "InputDatePickerShowWeekOfYearExample", [], false],
        ["customize-days", "inputDatePicker-customizeDays", "inputDatePickerCustomizeDaysPlaygroundSource", "InputDatePickerCustomizeDaysExample", ["getWeekday"], false],
        ["select-range", "inputDatePicker-selectRange", "inputDatePickerSelectRangePlaygroundSource", "InputDatePickerSelectRangeExample", ["todayIsoDate"], false],
        ["width", "inputDatePicker-width", "inputDatePickerWidthPlaygroundSource", "InputDatePickerWidthExample", ["labelEdgeOptions"], false],
      ],
    },
    {
      directoryName: "inputDateText",
      itemsName: "inputDateTextItems",
      helperSpecifier: "./inputDateText-shared",
      requiredIndexImports: [
        /import \{ LocalDateConverter \} from "ojs\/ojconverter-localdate";/,
        /import ArrayDataProvider = require\("ojs\/ojarraydataprovider"\);/,
      ],
      demos: [
        ["overview", "inputDateText-overview", "inputDateTextOverviewPlaygroundSource", "InputDateTextOverviewExample", ["messageSets"], false],
        ["simple", "inputDateText-simple", "inputDateTextSimplePlaygroundSource", "InputDateTextSimpleExample", ["todayIsoDate"], false],
        ["converter", "inputDateText-converter", "inputDateTextConverterPlaygroundSource", "InputDateTextConverterExample", ["ArrayDataProvider", "LocalDateConverter"], false],
        ["restrict-range", "inputDateText-restrictRange", "inputDateTextRestrictRangePlaygroundSource", "InputDateTextRestrictRangeExample", [], false],
        ["width", "inputDateText-width", "inputDateTextWidthPlaygroundSource", "InputDateTextWidthExample", ["isInputDateTextLabelEdge", "labelEdgeOptions"], false],
      ],
    },
    {
      directoryName: "inputDateTime",
      itemsName: "inputDateTimeItems",
      helperSpecifier: "./inputDateTime-shared",
      requiredIndexImports: [
        /import \{ IntlDateTimeConverter \} from "ojs\/ojconverter-datetime";/,
        /import \{ IntlConverterUtils \} from "ojs\/ojconverterutils-i18n";/,
      ],
      demos: [
        ["states", "inputDateTime-states", "inputDateTimeStatesPlaygroundSource", "InputDateTimeStatesExample", ["IntlDateTimeConverter", "messageSets", "sampleDateTimeValue"], false],
        ["simple", "inputDateTime-simple", "inputDateTimeSimplePlaygroundSource", "InputDateTimeSimpleExample", ["sampleDateTimeValue"], false],
        ["time-zone", "inputDateTime-timeZone", "inputDateTimeTimeZonePlaygroundSource", "InputDateTimeTimeZoneExample", ["IntlConverterUtils", "IntlDateTimeConverter"], false],
        ["multiple-widgets", "inputDateTime-multipleWidgets", "inputDateTimeMultipleWidgetsPlaygroundSource", "InputDateTimeMultipleWidgetsExample", ["IntlDateTimeConverter", "localDateTimeValue"], false],
        ["width", "inputDateTime-width", "inputDateTimeWidthPlaygroundSource", "InputDateTimeWidthExample", ["localDateTimeValue"], true],
        ["text-align", "inputDateTime-textAlign", "inputDateTimeTextAlignPlaygroundSource", "InputDateTimeTextAlignExample", ["localDateTimeValue"], false],
        ["styling", "inputDateTime-styling", "inputDateTimeStylingPlaygroundSource", "InputDateTimeStylingExample", ["localDateTimeValue"], true],
      ],
    },
    {
      directoryName: "inputMonthMask",
      itemsName: "inputMonthMaskItems",
      helperSpecifier: "./inputMonthMask-shared",
      requiredIndexImports: [],
      demos: [
        ["overview", "inputMonthMask-overview", "inputMonthMaskOverviewPlaygroundSource", "InputMonthMaskOverviewExample", ["messageSets", "todayMonthValue"], false],
        ["simple", "inputMonthMask-simple", "inputMonthMaskSimplePlaygroundSource", "InputMonthMaskSimpleExample", ["todayMonthValue"], false],
        ["restrict-range", "inputMonthMask-restrictRange", "inputMonthMaskRestrictRangePlaygroundSource", "InputMonthMaskRestrictRangeExample", [], false],
        ["width", "inputMonthMask-width", "inputMonthMaskWidthPlaygroundSource", "InputMonthMaskWidthExample", ["labelEdgeOptions", "todayMonthValue"], false],
      ],
    },
    {
      directoryName: "inputTime",
      itemsName: "inputTimeItems",
      helperSpecifier: "./inputTime-shared",
      requiredIndexImports: [
        /import \{ IntlDateTimeConverter \} from "ojs\/ojconverter-datetime";/,
        /import \{ IntlConverterUtils \} from "ojs\/ojconverterutils-i18n";/,
      ],
      demos: [
        ["states", "inputTime-states", "inputTimeStatesPlaygroundSource", "InputTimeStatesExample", ["defaultTimeValue", "messageSets", "militaryTimeConverter", "timeFullConverter"], false],
        ["simple", "inputTime-simple", "inputTimeSimplePlaygroundSource", "InputTimeSimpleExample", ["shortTimeValue"], false],
        ["minmax", "inputTime-minmax", "inputTimeMinMaxPlaygroundSource", "InputTimeMinMaxExample", ["IntlDateTimeConverter"], false],
        ["time-zone", "inputTime-timeZone", "inputTimeTimeZonePlaygroundSource", "InputTimeTimeZoneExample", ["IntlDateTimeConverter"], false],
        ["custom-validator", "inputTime-customValidator", "inputTimeCustomValidatorPlaygroundSource", "InputTimeCustomValidatorExample", ["IntlConverterUtils", "IntlDateTimeConverter"], false],
      ],
    },
    {
      directoryName: "inputTimeMask",
      itemsName: "inputTimeMaskItemsVdom",
      helperSpecifier: "./inputTimeMask-shared",
      requiredIndexImports: [],
      demos: [
        ["overview", "inputTimeMask-overview", "inputTimeMaskOverviewPlaygroundSource", "InputTimeMaskOverviewVdomExample", ["messageSets"], false],
        ["simple", "inputTimeMask-simple", "inputTimeMaskSimplePlaygroundSource", "InputTimeMaskSimpleVdomExample", [], false],
        ["restrict-range", "inputTimeMask-restrictRange", "inputTimeMaskRestrictRangePlaygroundSource", "InputTimeMaskRestrictRangeVdomExample", [], false],
        ["width", "inputTimeMask-width", "inputTimeMaskWidthPlaygroundSource", "InputTimeMaskWidthVdomExample", ["labelEdgeOptions"], false],
      ],
    },
  ] as const;

  match(recipePageTemplateSource, /playground=\{activeExample\.playground\}/);
  strictEqual(
    registries.reduce((count, registry) => count + registry.demos.length, 0),
    32,
  );

  for (const registry of registries) {
    const directory = join(rootDirectory, registry.directoryName);
    const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
    match(
      registrationSource,
      new RegExp(`<RecipePageTemplate[\\s\\S]*?items=\\{${registry.itemsName}\\}`),
    );
    match(
      registrationSource,
      new RegExp(`from "\\${registry.helperSpecifier}";`),
    );
    for (const requiredImport of registry.requiredIndexImports) {
      match(registrationSource, requiredImport);
    }

    for (const [id, fileBaseName, sourceName, componentName, bindings, hasCss] of registry.demos) {
      const item = registrationSource.match(
        new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
      )?.[0];
      ok(item, `Missing ${registry.directoryName} recipe item ${id}`);
      match(item, /playground:\s*\{/);
      match(item, new RegExp(`initialSource: ${sourceName}`));
      match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));

      if (bindings.length === 0) {
        doesNotMatch(item, /runtimeBindings:/);
      } else {
        const runtimeBindings = item.match(
          /runtimeBindings:\s*\{([\s\S]*?)^      \},/m,
        )?.[1];
        ok(runtimeBindings, `Missing runtime bindings for ${registry.directoryName}/${id}`);
        const registeredBindings = Array.from(
          runtimeBindings.matchAll(/^        ([A-Za-z_$][\w$]*),$/gm),
          (binding: RegExpMatchArray) => binding[1],
        );
        deepEqual(registeredBindings.sort(), [...bindings].sort());
      }

      if (hasCss) {
        match(item, /supportingFiles:\s*\[/);
        match(item, /fileName: "inputDateTime\.css"/);
        match(item, /initialSource: inputDateTimeCssPlaygroundSource/);
        match(item, /language: "css"/);
        match(item, /importSpecifier: "css!\.\/inputDateTime\.css"/);
        doesNotMatch(item, /bindingName:/);
      } else {
        doesNotMatch(item, /supportingFiles:/);
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

    match(registrationSource, /playground\?: PlaygroundConfig;/);
  }

  const dateTimeRegistrationSource = readFileSync(
    join(rootDirectory, "inputDateTime/index.tsx"),
    "utf8",
  );
  match(
    dateTimeRegistrationSource,
    /import inputDateTimeCssPlaygroundSource from "\.\/inputDateTime-css-source";/,
  );
  const cssWrapperPath = join(rootDirectory, "inputDateTime/inputDateTime-css-source.ts");
  ok(existsSync(cssWrapperPath), "Missing Input Date Time CSS source wrapper");
  match(
    readFileSync(cssWrapperPath, "utf8"),
    /!!raw-loader!\.\/inputDateTime\.css/,
  );

  const allowedImports = playgroundSource.match(
    /const ALLOWED_IMPORTS = new Set\(\[([\s\S]*?)\]\);/,
  )?.[1];
  ok(allowedImports, "Missing shared playground import allowlist");
  for (const importSpecifier of [
    "./inputDatePicker-shared",
    "./inputDateText-shared",
    "./inputDateTime-shared",
    "./inputMonthMask-shared",
    "./inputTime-shared",
    "./inputTimeMask-shared",
    "ojs/ojarraydataprovider",
    "ojs/ojconverter-datetime",
    "ojs/ojconverter-localdate",
    "ojs/ojconverterutils-i18n",
    "ojs/ojvalidator",
  ]) {
    match(
      allowedImports,
      new RegExp(`"${importSpecifier.replaceAll("/", "\\/").replace(".", "\\.")}"`),
    );
  }
})();
