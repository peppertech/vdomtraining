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
      "selectSingleStatesSource",
      "SelectSingleStatesExample",
      ["createBrowserDataProvider"],
      false,
    ],
    [
      "basic",
      "selectSingle-basic",
      "selectSingleBasicSource",
      "SelectSingleBasicExample",
      ["createBrowserDataProvider"],
      false,
    ],
    [
      "add-to-list",
      "selectSingle-addToList",
      "selectSingleAddToListSource",
      "SelectSingleAddToListExample",
      ["createBrowserDataProvider"],
      false,
    ],
    [
      "advanced-search",
      "selectSingle-advancedSearch",
      "selectSingleAdvancedSearchSource",
      "SelectSingleAdvancedSearchExample",
      [
        "createOracleEmployeeDataProvider",
        "getEmployeeItemText",
        "renderEmployeeItemTemplate",
      ],
      false,
    ],
    [
      "collection-list-view",
      "selectSingle-collectionTemplateListView",
      "selectSingleCollectionTemplateListViewSource",
      "SelectSingleCollectionTemplateListViewExample",
      [
        "createOracleEmployeeDataProvider",
        "getEmployeeItemText",
        "renderEmployeeCollectionListView",
      ],
      true,
    ],
    [
      "collection-table",
      "selectSingle-collectionTemplateTable",
      "selectSingleCollectionTemplateTableSource",
      "SelectSingleCollectionTemplateTableExample",
      [
        "createOracleEmployeeDataProvider",
        "getEmployeeItemText",
        "renderEmployeeCollectionTable",
      ],
      true,
    ],
    [
      "events",
      "selectSingle-events",
      "selectSingleEventsSource",
      "SelectSingleEventsExample",
      ["createBrowserDataProvider"],
      false,
    ],
    [
      "item-template",
      "selectSingle-itemTemplate",
      "selectSingleItemTemplateSource",
      "SelectSingleItemTemplateExample",
      [
        "createOracleEmployeeDataProvider",
        "getEmployeeItemText",
        "renderEmployeeItemTemplate",
      ],
      false,
    ],
    [
      "item-text",
      "selectSingle-itemText",
      "selectSingleItemTextSource",
      "SelectSingleItemTextExample",
      ["createOracleEmployeeDataProvider", "getEmployeeItemText"],
      false,
    ],
    [
      "value-item",
      "selectSingle-valueItem",
      "selectSingleValueItemSource",
      "SelectSingleValueItemExample",
      ["browserOptions", "createBrowserDataProvider"],
      false,
    ],
    [
      "virtual-keyboard",
      "selectSingle-virtualKeyboard",
      "selectSingleVirtualKeyboardSource",
      "SelectSingleVirtualKeyboardExample",
      ["createBrowserDataProvider", "virtualKeyboardOptions"],
      false,
    ],
    [
      "width",
      "selectSingle-width",
      "selectSingleWidthSource",
      "SelectSingleWidthExample",
      ["createBrowserDataProvider", "labelEdgeOptions"],
      false,
    ],
  ] as const;

  match(registrationSource, /playground\?: PlaygroundConfig;/);
  match(registrationSource, /playground=\{activeExample\.playground\}/);
  match(
    registrationSource,
    /import selectSingleEmployeeDataSource from "\.\/selectSingle-employeeData-source";/,
  );
  match(
    registrationSource,
    /fileName: "employeeData\.json",[\s\S]*?initialSource: selectSingleEmployeeDataSource,[\s\S]*?language: "json",[\s\S]*?importSpecifier: "text!\.\.\/\.\.\/data\/employeeData\.json",[\s\S]*?bindingName: "employeeDataText",/,
  );

  for (const [id, fileBaseName, sourceName, componentName, bindings, hasDataFile] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));

    if (hasDataFile) {
      match(item, /supportingFiles: collectionTemplateSupportingFiles/);
    } else {
      doesNotMatch(item, /supportingFiles:/);
    }

    const runtimeBindings = item.match(
      /runtimeBindings:\s*\{([\s\S]*?)^      \},/m,
    )?.[1];
    ok(runtimeBindings, `Missing runtime bindings for ${id}`);
    const registeredBindings = Array.from(
      runtimeBindings.matchAll(/^        ([A-Za-z_$][\w$]*),$/gm),
      (binding: RegExpMatchArray) => binding[1],
    );
    deepEqual(registeredBindings.sort(), [...bindings].sort());

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
    "oj-c/form-layout",
    "oj-c/radioset",
    "oj-c/select-single",
    "./selectSingle-shared",
  ]) {
    match(
      allowedImports,
      new RegExp(`"${importSpecifier.replaceAll("/", "\\/").replace(".", "\\.")}"`),
    );
  }
})();
