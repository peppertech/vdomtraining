(() => {
  const { match } = require("node:assert/strict");
  const { existsSync, readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = __dirname;
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");
  const demos = [
    ["overview", "richRadioSet-overview", "richRadioSetOverviewPlaygroundSource"],
    ["basic", "richRadioSet-basic", "richRadioSetBasicPlaygroundSource"],
    ["user-assistance", "richRadioSet-userAssistance", "richRadioSetUserAssistancePlaygroundSource"],
    ["layout", "richRadioSet-layout", "richRadioSetLayoutPlaygroundSource"],
  ];

  for (const [id, fileBaseName, sourceName] of demos) {
    match(registrationSource, new RegExp(`id: "${id}"[\\s\\S]*?playground:`));
    match(registrationSource, new RegExp(`initialSource: ${sourceName}`));
    if (!existsSync(join(directory, `${fileBaseName}-source.ts`))) {
      throw new Error(`Missing source wrapper for ${fileBaseName}.tsx`);
    }
  }

  match(registrationSource, /runtimeBindings:/);
})();
