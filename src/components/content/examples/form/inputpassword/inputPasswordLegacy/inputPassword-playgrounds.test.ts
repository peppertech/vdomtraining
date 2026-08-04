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
    ["overview", "inputPassword-overview", "inputPasswordOverviewPlaygroundSource", false],
    ["binding", "inputPassword-binding", "inputPasswordBindingPlaygroundSource", false],
    ["pattern-matching", "inputPassword-patternMatching", "inputPasswordPatternMatchingPlaygroundSource", true],
    ["read-only", "inputPassword-readOnly", "inputPasswordReadOnlyPlaygroundSource", false],
    ["no-label", "inputPassword-noLabel", "inputPasswordNoLabelPlaygroundSource", false],
    ["width", "inputPassword-width", "inputPasswordWidthPlaygroundSource", true],
    ["text-align", "inputPassword-textAlign", "inputPasswordTextAlignPlaygroundSource", false],
    ["styling", "inputPassword-styling", "inputPasswordStylingPlaygroundSource", true],
  ] as const;

  for (const [id, fileBaseName, sourceName, hasCss] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    match(registrationSource, new RegExp(`import ${sourceName} from "\\./${fileBaseName}-source";`));
    const wrapperPath = join(directory, `${fileBaseName}-source.ts`);
    ok(existsSync(wrapperPath), `Missing source wrapper for ${fileBaseName}.tsx`);
    match(readFileSync(wrapperPath, "utf8"), new RegExp(`!!raw-loader!\\./${fileBaseName}\\.tsx`));
    if (hasCss) {
      match(item, /supportingFiles:/);
      match(item, /initialSource: inputPasswordCssPlaygroundSource/);
      match(item, /importSpecifier: "css!\.\/inputPassword\.css"/);
    } else {
      doesNotMatch(item, /supportingFiles:/);
    }
  }

  const cssWrapperPath = join(directory, "inputPassword.css-source.ts");
  ok(existsSync(cssWrapperPath), "Missing source wrapper for inputPassword.css");
  match(readFileSync(cssWrapperPath, "utf8"), /!!raw-loader!\.\/inputPassword\.css/);
  match(registrationSource, /runtimeBindings:\s*\{ messageSets \}/);
  match(playgroundSource, /"ojs\/ojgauge"/);
  match(playgroundSource, /"\.\/inputPassword-shared"/);
})();
