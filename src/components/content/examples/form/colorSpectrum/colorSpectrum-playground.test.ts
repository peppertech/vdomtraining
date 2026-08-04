(() => {
  const { match } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");

  const directory = __dirname;
  const demoSource = readFileSync(join(directory, "colorSpectrum.tsx"), "utf8");
  const registrationSource = readFileSync(join(directory, "index.tsx"), "utf8");

  match(demoSource, /export default function ColorSpectrum\(\)/);
  match(registrationSource, /playground:\s*\{/);
  match(registrationSource, /initialSource:\s*colorSpectrumPlaygroundSource/);
  match(registrationSource, /runtimeBindings:\s*\{\s*Color,?\s*\}/);
})();
