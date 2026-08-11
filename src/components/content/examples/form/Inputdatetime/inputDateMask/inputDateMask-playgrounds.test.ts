(() => {
  const { deepEqual, doesNotMatch, match, ok } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = join(
    process.cwd(),
    "src/components/content/examples/form/Inputdatetime/inputDateMask",
  );
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const recipePageTemplateSource = readFileSync(
    join(directory, "../../../../../shared/demo-page-layout/recipe-page-template.tsx"),
    "utf8",
  );
  const playgroundSource = readFileSync(
    join(directory, "../../../../../shared/code-playground/tsx-playground.tsx"),
    "utf8",
  );
  const demos = [
    [
      "overview",
      "inputDateMask-overview",
      "inputDateMaskOverviewPlaygroundSource",
      "InputDateMaskOverviewExample",
      ["messageSets"],
    ],
    [
      "simple",
      "inputDateMask-simple",
      "inputDateMaskSimplePlaygroundSource",
      "InputDateMaskSimpleExample",
      ["todayIsoDate"],
    ],
    [
      "restrict-range",
      "inputDateMask-restrictRange",
      "inputDateMaskRestrictRangePlaygroundSource",
      "InputDateMaskRestrictRangeExample",
      [],
    ],
    [
      "width",
      "inputDateMask-width",
      "inputDateMaskWidthPlaygroundSource",
      "InputDateMaskWidthExample",
      ["labelEdgeOptions"],
    ],
  ] as const;

  match(registrationSource, /<RecipePageTemplate[\s\S]*?items=\{inputDateMaskItems\}/);
  match(recipePageTemplateSource, /playground=\{activeExample\.playground\}/);

  for (const [id, fileBaseName, sourceName, componentName, bindings] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    doesNotMatch(item, /supportingFiles:/);

    if (bindings.length === 0) {
      doesNotMatch(item, /runtimeBindings:/);
    } else {
      const runtimeBindings = item.match(
        /runtimeBindings:\s*\{([\s\S]*?)^      \},/m,
      )?.[1];
      ok(runtimeBindings, `Missing runtime bindings for ${id}`);
      const registeredBindings = Array.from(
        runtimeBindings.matchAll(/^        ([A-Za-z_$][\w$]*),$/gm),
        (binding: RegExpMatchArray) => binding[1],
      );
      deepEqual(registeredBindings.sort(), [...bindings].sort());
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

  const allowedImports = playgroundSource.match(
    /const ALLOWED_IMPORTS = new Set\(\[([\s\S]*?)\]\);/,
  )?.[1];
  ok(allowedImports, "Missing shared playground import allowlist");
  for (const importSpecifier of [
    "oj-c/form-layout",
    "oj-c/input-date-mask",
    "oj-c/radioset",
    "./inputDateMask-shared",
  ]) {
    match(
      allowedImports,
      new RegExp(`"${importSpecifier.replaceAll("/", "\\/").replace(".", "\\.")}"`),
    );
  }
})();
