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
    ["overview", "textArea-overview", "textAreaOverviewPlaygroundSource"],
    ["binding", "textArea-binding", "textAreaBindingPlaygroundSource"],
    ["width", "textArea-width", "textAreaWidthPlaygroundSource"],
    ["resize", "textArea-resize", "textAreaResizePlaygroundSource"],
    ["max-length", "textArea-maxLength", "textAreaMaxLengthPlaygroundSource"],
    ["max-rows", "textArea-maxRows", "textAreaMaxRowsPlaygroundSource"],
  ] as const;

  for (const [id, fileBaseName, sourceName] of demos) {
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
  }

  match(registrationSource, /runtimeBindings:\s*\{[\s\S]*?sampleValue/);
  match(registrationSource, /runtimeBindings:\s*\{ multilineSampleValue \}/);
  match(registrationSource, /runtimeBindings:\s*\{ lengthConfig \}/);
  match(playgroundSource, /"\.\/textArea-shared"/);
  match(registrationSource, /playground=\{activeExample\.playground\}/);
})();
