(() => {
  const { match, ok, strictEqual } = require("node:assert/strict");
  const { existsSync, readdirSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = join(__dirname, "list-view-core-pack");
  const registrationSource = readFileSync(join(directory, "playgrounds.ts"), "utf8");
  const demos = readdirSync(directory, { withFileTypes: true }).flatMap((entry: any) => {
    const fileName = `${entry.name}.tsx`;
    return entry.isDirectory() && existsSync(join(directory, entry.name, fileName))
      ? [[entry.name, join(directory, entry.name, fileName)]]
      : [];
  });

  strictEqual(demos.length, 16);
  for (const [baseName, sourcePath] of demos) {
    ok(existsSync(join(directory, baseName, `${baseName}-source.ts`)));
    match(readFileSync(sourcePath, "utf8"), /export default function [A-Za-z_$][\w$]*\s*\(/);
    match(registrationSource, new RegExp(`fileName: "${baseName}\\.tsx"`));
  }
})();
