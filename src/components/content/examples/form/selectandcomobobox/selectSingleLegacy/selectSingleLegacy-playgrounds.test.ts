(() => {
  const { deepEqual, doesNotMatch, match, ok } = require("node:assert/strict");
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
      "selectSingle-states",
      "selectSingleLegacyStatesPlaygroundSource",
      "SelectSingleLegacyStatesExample",
      ["createBrowserDataProvider"],
    ],
    [
      "basic",
      "selectSingle-basic",
      "selectSingleLegacyBasicPlaygroundSource",
      "SelectSingleLegacyBasicExample",
      ["createBrowserDataProvider"],
    ],
    [
      "events",
      "selectSingle-events",
      "selectSingleLegacyEventsPlaygroundSource",
      "SelectSingleLegacyEventsExample",
      ["createBrowserDataProvider"],
    ],
    [
      "item-text",
      "selectSingle-itemText",
      "selectSingleLegacyItemTextPlaygroundSource",
      "SelectSingleLegacyItemTextExample",
      ["createOracleEmployeeDataProvider", "getEmployeeItemText"],
    ],
    [
      "item-template",
      "selectSingle-itemTemplate",
      "selectSingleLegacyItemTemplatePlaygroundSource",
      "SelectSingleLegacyItemTemplateExample",
      [
        "createOracleEmployeeDataProvider",
        "getEmployeeItemText",
        "renderEmployeeItemTemplate",
      ],
    ],
    [
      "collection-list-view",
      "selectSingle-collectionTemplateListView",
      "selectSingleLegacyCollectionTemplateListViewPlaygroundSource",
      "SelectSingleLegacyCollectionTemplateListViewExample",
      [
        "createOracleEmployeeDataProvider",
        "getEmployeeItemText",
        "renderEmployeeCollectionListView",
      ],
    ],
    [
      "collection-table",
      "selectSingle-collectionTemplateTable",
      "selectSingleLegacyCollectionTemplateTablePlaygroundSource",
      "SelectSingleLegacyCollectionTemplateTableExample",
      [
        "createOracleEmployeeDataProvider",
        "getEmployeeItemText",
        "renderEmployeeCollectionTable",
      ],
    ],
    [
      "value-item",
      "selectSingle-valueItem",
      "selectSingleLegacyValueItemPlaygroundSource",
      "SelectSingleLegacyValueItemExample",
      ["browserOptions", "createBrowserDataProvider"],
    ],
    [
      "virtual-keyboard",
      "selectSingle-virtualKeyboard",
      "selectSingleLegacyVirtualKeyboardPlaygroundSource",
      "SelectSingleLegacyVirtualKeyboardExample",
      ["createBrowserDataProvider"],
    ],
    [
      "width",
      "selectSingle-width",
      "selectSingleLegacyWidthPlaygroundSource",
      "SelectSingleLegacyWidthExample",
      ["createBrowserDataProvider"],
    ],
    [
      "add-to-list",
      "selectSingle-addToList",
      "selectSingleLegacyAddToListPlaygroundSource",
      "SelectSingleLegacyAddToListExample",
      ["createBrowserDataProvider"],
    ],
    [
      "advanced-search",
      "selectSingle-advancedSearch",
      "selectSingleLegacyAdvancedSearchPlaygroundSource",
      "SelectSingleLegacyAdvancedSearchExample",
      ["createOracleEmployeeDataProvider", "getEmployeeItemText"],
    ],
  ] as const;

  match(registrationSource, /playground\?: PlaygroundConfig;/);
  match(registrationSource, /playground=\{activeExample\.playground\}/);

  for (const [id, fileBaseName, sourceName, componentName, bindings] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    doesNotMatch(item, /supportingFiles:/);

    if (bindings.length) {
      const runtimeBindings = item.match(
        /runtimeBindings:\s*\{([\s\S]*?)^      \},/m,
      )?.[1];
      ok(runtimeBindings, `Missing runtime bindings for ${id}`);
      const registeredBindings = Array.from(
        runtimeBindings.matchAll(/^        ([A-Za-z_$][\w$]*),$/gm),
        (binding: RegExpMatchArray) => binding[1],
      );
      deepEqual(registeredBindings.sort(), [...bindings].sort());
    } else {
      doesNotMatch(item, /runtimeBindings:/);
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

  const allowedImports = playgroundSource.match(
    /const ALLOWED_IMPORTS = new Set\(\[([\s\S]*?)\]\);/,
  )?.[1];
  ok(allowedImports, "Missing shared playground import allowlist");
  for (const importSpecifier of [
    "ojs/ojformlayout",
    "ojs/ojoption",
    "ojs/ojradioset",
    "ojs/ojselectsingle",
    "./selectSingle-shared",
  ]) {
    match(
      allowedImports,
      new RegExp(`"${importSpecifier.replaceAll("/", "\\/").replace(".", "\\.")}"`),
    );
  }
})();
