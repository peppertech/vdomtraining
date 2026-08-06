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
    ["states", "slider-states", "sliderStatesPlaygroundSource", true],
    ["basic", "slider-basic", "sliderBasicPlaygroundSource", false],
    ["vertical", "slider-vertical", "sliderVerticalPlaygroundSource", false],
    [
      "validation",
      "slider-validation",
      "sliderValidationPlaygroundSource",
      false,
    ],
    ["width", "slider-width", "sliderWidthPlaygroundSource", false],
  ] as const;

  for (const [id, fileBaseName, sourceName, hasRuntimeBindings] of demos) {
    const item = registrationSource.match(
      new RegExp(
        `        \\{\\n          id: "${id}"(?: as SliderDemoId)?,[\\s\\S]*?^        \\},`,
        "m",
      ),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    match(
      registrationSource,
      new RegExp(`import ${sourceName} from "\\./${fileBaseName}-source";`),
    );
    const wrapperPath = join(directory, `${fileBaseName}-source.ts`);
    ok(existsSync(wrapperPath), `Missing source wrapper for ${fileBaseName}.tsx`);
    match(
      readFileSync(wrapperPath, "utf8"),
      new RegExp(`!!raw-loader!\\./${fileBaseName}\\.tsx`),
    );
    if (hasRuntimeBindings) {
      for (const binding of [
        "sliderConfirmationMessages",
        "sliderDefinitionHints",
        "sliderErrorMessages",
        "sliderInfoMessages",
        "sliderInstructionHelp",
        "sliderSourceHints",
        "sliderWarningMessages",
      ]) {
        match(item, new RegExp(`\\b${binding}\\b`));
      }
    } else {
      doesNotMatch(item, /runtimeBindings:/);
    }
  }

  for (const importSpecifier of ["ojs/ojslider", "./slider-shared"]) {
    match(
      playgroundSource,
      new RegExp(`"${importSpecifier.replace(".", "\\.")}"`),
    );
  }
})();
