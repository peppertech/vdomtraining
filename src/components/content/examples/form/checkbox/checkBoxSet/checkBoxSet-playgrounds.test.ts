(() => {
  const { doesNotMatch, match } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const directory = __dirname;
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const demos = [
    ["overview", "checkBoxSet-overview", "checkBoxSetOverviewPlaygroundSource"], ["basic", "checkBoxSet-basic", "checkBoxSetBasicPlaygroundSource"], ["readonly", "checkBoxSet-readonly", "checkBoxSetReadonlyPlaygroundSource"], ["validation", "checkBoxSet-validation", "checkBoxSetValidationPlaygroundSource"], ["data-provider", "checkBoxSet-dataProvider", "checkBoxSetDataProviderPlaygroundSource"], ["filter", "checkBoxSet-filter", "checkBoxSetFilterPlaygroundSource"], ["single-item", "checkBoxSet-singleItem", "checkBoxSetSingleItemPlaygroundSource"], ["no-item-label", "checkBoxSet-noItemLabel", "checkBoxSetNoItemLabelPlaygroundSource"],
  ];
  for (const [id, fileBaseName, sourceName] of demos) {
    match(registrationSource, new RegExp(`id: "${id}"[\\s\\S]*?playground:`));
    match(registrationSource, new RegExp(`initialSource: ${sourceName}`));
    if (!existsSync(join(directory, `${fileBaseName}-source.ts`))) throw new Error(`Missing source wrapper for ${fileBaseName}.tsx`);
  }
  doesNotMatch(registrationSource, /id: "context-menu"/);
})();
