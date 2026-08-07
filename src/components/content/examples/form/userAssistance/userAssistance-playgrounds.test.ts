(() => {
  const { doesNotMatch, match, ok } = require("node:assert/strict");
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
      "help-title",
      "helpHintsMessaging-helpTitle",
      "helpHintsMessagingHelpTitlePlaygroundSource",
      "HelpHintsMessagingHelpTitle",
      false,
    ],
    [
      "converter-hint-messages",
      "helpHintsMessaging-converterHintMessages",
      "helpHintsMessagingConverterHintMessagesPlaygroundSource",
      "HelpHintsMessagingConverterHintMessages",
      true,
    ],
    [
      "validator-hints-messages",
      "helpHintsMessaging-validatorHintsMessages",
      "helpHintsMessagingValidatorHintsMessagesPlaygroundSource",
      "HelpHintsMessagingValidatorHintsMessages",
      false,
    ],
    [
      "hints-messages-title",
      "helpHintsMessaging-hintsMessagesTitle",
      "helpHintsMessagingHintsMessagesTitlePlaygroundSource",
      "HelpHintsMessagingHintsMessagesTitle",
      false,
    ],
    [
      "multiple-messages",
      "helpHintsMessaging-multipleMessages",
      "helpHintsMessagingMultipleMessagesPlaygroundSource",
      "HelpHintsMessagingMultipleMessages",
      false,
    ],
  ] as const;

  for (const [id, fileBaseName, sourceName, componentName, hasConverter] of demos) {
    const item = registrationSource.match(
      new RegExp(`  \\{\\n    id: "${id}",[\\s\\S]*?^  \\},?`, "m"),
    )?.[0];
    ok(item, `Missing recipe item ${id}`);
    match(item, /playground:\s*\{/);
    match(item, new RegExp(`initialSource: ${sourceName}`));
    match(item, new RegExp(`fileName: "${fileBaseName}\\.tsx"`));
    if (hasConverter) {
      match(item, /runtimeBindings:\s*\{\s*ColorConverter\s*\}/);
    } else {
      doesNotMatch(item, /runtimeBindings:|supportingFiles:/);
    }
    match(
      registrationSource,
      new RegExp(`import ${sourceName} from "\\./${fileBaseName}/${fileBaseName}-source";`),
    );
    const sourcePath = join(directory, fileBaseName, `${fileBaseName}.tsx`);
    const wrapperPath = join(directory, fileBaseName, `${fileBaseName}-source.ts`);
    ok(existsSync(wrapperPath), `Missing source wrapper for ${fileBaseName}.tsx`);
    const source = readFileSync(sourcePath, "utf8");
    match(source, new RegExp(`export default function ${componentName}\\s*\\(`));
    match(
      readFileSync(wrapperPath, "utf8"),
      new RegExp(`!!raw-loader!\\./${fileBaseName}\\.tsx`),
    );
  }

  for (const importSpecifier of [
    "ojs/ojconverter-color",
    "ojs/ojmessaging",
  ]) {
    match(playgroundSource, new RegExp(`"${importSpecifier}"`));
  }
})();
