(() => {
  const { match, ok, strictEqual } = require("node:assert/strict");
  const { existsSync, readdirSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = __dirname;
  const pageIndexes = [join(directory, "list-view-legacy/index.tsx")];
  const registrationSource = [
    ...pageIndexes,
    join(directory, "list-view-legacy/playgrounds.ts"),
  ]
    .map((fileName) => readFileSync(fileName, "utf8"))
    .join("\n");
  const playgroundSource = readFileSync(
    join(directory, "../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );

  const demos = pageIndexes.flatMap((pageIndex) => {
    const groupDirectory = pageIndex.slice(0, -"index.tsx".length);
    return readdirSync(groupDirectory, { withFileTypes: true }).flatMap((entry: any) => {
      if (!entry.isDirectory()) return [];
      const demoFileName = `${entry.name}.tsx`;
      const demoPath = join(groupDirectory, entry.name, demoFileName);
      return existsSync(demoPath) ? [[demoPath, entry.name, groupDirectory]] : [];
    });
  });

  strictEqual(demos.length, 25, "Expected every registered oj-list-view demo to be covered.");

  for (const [demoPath, fileBaseName, groupDirectory] of demos) {
    const demoSource = readFileSync(demoPath, "utf8");
    const wrapperPath = join(groupDirectory, fileBaseName, `${fileBaseName}-source.ts`);
    ok(existsSync(wrapperPath), `Missing source wrapper for ${fileBaseName}.tsx`);
    match(
      readFileSync(wrapperPath, "utf8"),
      new RegExp(`!!raw-loader!\\./${fileBaseName}\\.tsx`),
    );
    match(
      demoSource,
      /export default function [A-Za-z_$][\w$]*\s*\(/,
      `${fileBaseName}.tsx must export a named default function.`,
    );
    match(
      registrationSource,
      new RegExp(`fileName: "${fileBaseName}\\.tsx"`),
      `${fileBaseName} must register a playground.`,
    );

    for (const importSpecifier of demoSource.matchAll(/(?:from\s+|import\s+)["']([^"']+)["']/g)) {
      const specifier = importSpecifier[1];
      if (specifier.startsWith("css!") || specifier.startsWith("text!")) {
        match(registrationSource, new RegExp(`importSpecifier: ["']${specifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`));
      }
    }
  }

  match(playgroundSource, /"ojs\/ojlistdataproviderview"/);
  match(playgroundSource, /"ojs\/ojlistviewdnd"/);
})();
