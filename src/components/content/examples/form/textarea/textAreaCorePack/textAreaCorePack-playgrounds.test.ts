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
    ["overview", "textAreaCorePack-overview", "textAreaCorePackOverviewPlaygroundSource"],
    ["width", "textAreaCorePack-width", "textAreaCorePackWidthPlaygroundSource"],
    ["resize", "textAreaCorePack-resize", "textAreaCorePackResizePlaygroundSource"],
    ["length-max", "textAreaCorePack-lengthMax", "textAreaCorePackLengthMaxPlaygroundSource"],
    ["max-rows", "textAreaCorePack-maxRows", "textAreaCorePackMaxRowsPlaygroundSource"],
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

  match(registrationSource, /runtimeBindings:\s*\{[\s\S]*?overviewLengthConfig/);
  match(registrationSource, /runtimeBindings:\s*\{[\s\S]*?labelEdgeOptions/);
  match(registrationSource, /runtimeBindings:\s*\{[\s\S]*?remainingLengthConfig/);
  match(registrationSource, /runtimeBindings:\s*\{[\s\S]*?maxRowsStretchValue/);
  match(registrationSource, /playground=\{activeExample\.playground\}/);
  match(playgroundSource, /"oj-c\/text-area"/);
  match(playgroundSource, /"\.\/textAreaCorePack-shared"/);
})();
