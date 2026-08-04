(() => {
  const { match } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const demoSource = readFileSync(
    join(__dirname, "radioset-readonly.tsx"),
    "utf8",
  );

  match(
    demoSource,
    /<oj-radioset\s+key=\{noValueColor\}[\s\S]*?value=\{noValueColor\}/,
  );
})();
