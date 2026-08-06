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
    [
      "basic",
      "input-search-basic",
      "inputSearchBasicPlaygroundSource",
      ["InputSearchDiagnostics", "useInputSearchExampleState"],
    ],
    [
      "suggestions",
      "input-search-suggestions",
      "inputSearchSuggestionsPlaygroundSource",
      [
        "createBrowserSuggestionsDataProvider",
        "DelayingDataProvider",
        "InputSearchDiagnostics",
        "useInputSearchExampleState",
      ],
    ],
    [
      "suggestion-item-text",
      "input-search-suggestionItemText",
      "inputSearchSuggestionItemTextPlaygroundSource",
      [
        "createEmployeeLastNameDataProvider",
        "InputSearchDiagnostics",
        "useInputSearchExampleState",
      ],
    ],
    [
      "suggestion-item-template",
      "input-search-suggestionItemTemplate",
      "inputSearchSuggestionItemTemplatePlaygroundSource",
      [
        "createEmployeeTemplateDataProvider",
        "InputSearchDiagnostics",
        "renderEmployeeSuggestionItem",
        "useInputSearchExampleState",
      ],
    ],
    [
      "hero",
      "input-search-hero",
      "inputSearchHeroPlaygroundSource",
      ["createBrowserSuggestionsDataProvider"],
    ],
  ] as const;

  for (const [id, fileBaseName, sourceName, bindings] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    match(item, /supportingFiles: inputSearchCssSupportingFiles/);
    for (const binding of bindings) {
      match(item, new RegExp(`\\b${binding}\\b`));
    }
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

  const cssWrapperPath = join(directory, "input-search-css-source.ts");
  ok(existsSync(cssWrapperPath), "Missing source wrapper for input-search.css");
  match(
    readFileSync(cssWrapperPath, "utf8"),
    /!!raw-loader!\.\/input-search\.css/,
  );
  match(registrationSource, /initialSource: inputSearchCssPlaygroundSource/);
  match(registrationSource, /language: "css"/);
  match(registrationSource, /importSpecifier: "css!\.\/input-search\.css"/);

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const importSpecifier of [
    "ojs/ojinputsearch",
    "ojs/ojcheckboxset",
    "ojs/ojoption",
    "ojs/ojhighlighttext",
    "./input-search-shared",
  ]) {
    match(
      playgroundSource,
      new RegExp(`"${escapeRegExp(importSpecifier)}"`),
    );
  }
})();
