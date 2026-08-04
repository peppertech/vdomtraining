(() => {
  const { doesNotMatch, strictEqual } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const typescript = require("typescript");

  const source = readFileSync(
    join(__dirname, "inputPassword-patternMatching.tsx"),
    "utf8",
  );
  const rulesEnd = source.indexOf("const getStrengthText");
  const rulesSource = source.slice(0, rulesEnd).replace(/import[\s\S]*?;\s*/g, "");
  const compiledRules = typescript.transpileModule(`${rulesSource}\nreturn rules;`, {
    compilerOptions: {
      target: typescript.ScriptTarget.ES2020,
      module: typescript.ModuleKind.None,
      strict: true,
    },
  });
  const rules = new Function(compiledRules.outputText)();

  strictEqual(rules[2].test("12345678"), true);
  strictEqual(rules[2].test("123456789"), false);
  doesNotMatch(source, /rawValue=\{/);
})();
