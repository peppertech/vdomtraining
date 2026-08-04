(() => {
  const { doesNotMatch, match } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const demoSource = readFileSync(
    join(__dirname, "inputTextLegacy-rawValue.tsx"),
    "utf8",
  );

  match(demoSource, /<oj-input-text/);
  doesNotMatch(demoSource, /\srawValue=\{currentRawValue\}/);
})();
