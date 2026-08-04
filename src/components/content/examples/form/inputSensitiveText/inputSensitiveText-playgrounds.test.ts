(() => {
  const { match, ok } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = __dirname;
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const playgroundSource = readFileSync(
    join(directory, "../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );
  const demos = [
    ["states", "inputSensitiveText-states", "inputSensitiveTextStatesPlaygroundSource"],
    ["binding", "inputSensitiveText-binding", "inputSensitiveTextBindingPlaygroundSource"],
    ["clear-icon", "inputSensitiveText-clearicon", "inputSensitiveTextClearIconPlaygroundSource"],
    ["max-length", "inputSensitiveText-maxLength", "inputSensitiveTextMaxLengthPlaygroundSource"],
    ["no-label", "inputSensitiveText-nolabel", "inputSensitiveTextNoLabelPlaygroundSource"],
    ["text-align", "inputSensitiveText-textalign", "inputSensitiveTextTextAlignPlaygroundSource"],
    ["virtual-keyboard", "inputSensitiveText-virtualKeyboard", "inputSensitiveTextVirtualKeyboardPlaygroundSource"],
    ["width", "inputSensitiveText-width", "inputSensitiveTextWidthPlaygroundSource"],
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

  match(registrationSource, /runtimeBindings:\s*\{ messageSets \}/);
  match(registrationSource, /runtimeBindings:\s*\{ textAlignItems \}/);
  match(registrationSource, /runtimeBindings:\s*\{ labelEdgeOptions \}/);
  match(playgroundSource, /"oj-c\/input-sensitive-text"/);
  match(playgroundSource, /"oj-c\/buttonset-single"/);
  match(playgroundSource, /"\.\/inputSensitiveText-shared"/);
})();
