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
    [
      "states",
      "rangeSlider-states",
      "rangeSliderStatesPlaygroundSource",
      [
        "rangeSliderConfirmationMessages",
        "rangeSliderDefinitionHints",
        "rangeSliderErrorMessages",
        "rangeSliderInfoMessages",
        "rangeSliderInstructionHelp",
        "rangeSliderSourceHints",
        "rangeSliderWarningMessages",
      ],
    ],
    [
      "basic",
      "rangeSlider-basic",
      "rangeSliderBasicPlaygroundSource",
      ["formatRangeValue"],
    ],
    [
      "vertical",
      "rangeSlider-vertical",
      "rangeSliderVerticalPlaygroundSource",
      ["formatRangeValue"],
    ],
    [
      "validation",
      "rangeSlider-validation",
      "rangeSliderValidationPlaygroundSource",
      ["formatRangeValue"],
    ],
    [
      "icons",
      "rangeSlider-icons",
      "rangeSliderIconsPlaygroundSource",
      ["formatRangeValue"],
    ],
    [
      "width",
      "rangeSlider-width",
      "rangeSliderWidthPlaygroundSource",
      [],
    ],
  ] as const;

  for (const [id, fileBaseName, sourceName, bindings] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},`, "m"),
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
    if (bindings.length) {
      for (const binding of bindings) {
        match(item, new RegExp(`\\b${binding}\\b`));
      }
    } else {
      doesNotMatch(item, /runtimeBindings:/);
    }
  }

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const importSpecifier of [
    "ojs/ojslider",
    "./rangeSlider-shared",
  ]) {
    match(
      playgroundSource,
      new RegExp(`"${escapeRegExp(importSpecifier)}"`),
    );
  }
})();
