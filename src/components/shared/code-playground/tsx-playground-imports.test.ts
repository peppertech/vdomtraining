(() => {
  const { equal, ok } = require("node:assert/strict");
  const { readFileSync } = require("node:fs");
  const { join } = require("node:path");
  const typescript = require("typescript");

  const runnerSource = readFileSync(join(__dirname, "tsx-playground.tsx"), "utf8");
  const functionSource = runnerSource.match(
    /function getImportError\([\s\S]*?\n}\n\nfunction getSupportingRuntimeBindings/,
  )?.[0].replace(/\n\nfunction getSupportingRuntimeBindings$/, "");
  ok(functionSource, "Missing playground import validation function");

  const executableFunction = typescript.transpileModule(functionSource, {
    compilerOptions: {
      target: typescript.ScriptTarget.ES2020,
      module: typescript.ModuleKind.None,
    },
  }).outputText;
  const getImportError = new Function(
    "ALLOWED_IMPORTS",
    "typescript",
    `${executableFunction}\nreturn getImportError;`,
  )(
    new Set([
      "allowed/equal",
      "allowed/from",
      "allowed/side-effect",
      "preact/hooks",
    ]),
    typescript,
  );

  equal(
    getImportError(
      [
        'import "allowed/side-effect";',
        'import "blocked/side-effect";',
        'import { useState } from "preact/hooks";',
      ].join("\n"),
      [],
    ),
    'The import "blocked/side-effect" is not available in this playground.',
  );
  equal(
    getImportError(
      [
        'import { allowed } from "allowed/from";',
        'import { blocked } from "blocked/from";',
      ].join("\n"),
      [],
    ),
    'The import "blocked/from" is not available in this playground.',
  );
  equal(
    getImportError(
      [
        'import Allowed = require("allowed/equal");',
        'import Blocked = require("blocked/equal");',
      ].join("\n"),
      [],
    ),
    'The import "blocked/equal" is not available in this playground.',
  );
  equal(
    getImportError(
      [
        'import "allowed/side-effect";',
        'import { allowed } from "allowed/from";',
        'import Allowed = require("allowed/equal");',
      ].join("\n"),
      [],
    ),
    undefined,
  );
})();
