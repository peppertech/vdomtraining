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
    ["states", "switch-states", "switchStatesPlaygroundSource"],
    [
      "switch-component",
      "switch-switchComponent",
      "switchComponentPlaygroundSource",
    ],
    ["readonly", "switch-readonly", "switchReadonlyPlaygroundSource"],
    [
      "cross-field-validation",
      "switch-crossFieldValidation",
      "switchCrossFieldValidationPlaygroundSource",
    ],
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

  for (const importSpecifier of [
    "ojs/ojbutton",
    "ojs/ojcheckboxset",
    "ojs/ojformlayout",
    "ojs/ojlabel",
    "ojs/ojlabelvalue",
    "ojs/ojoption",
    "ojs/ojswitch",
  ]) {
    match(playgroundSource, new RegExp(`"${importSpecifier}"`));
  }
})();
