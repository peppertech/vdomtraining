const { match, doesNotMatch } = require("node:assert/strict");
const { h } = require("preact");
const renderToString = require("preact-render-to-string");
const { PlaygroundControls } = require("./playground-controls.ts");

const callbacks = {
  onDarkModeChange: (_value: boolean) => undefined,
  onApply: () => undefined,
  onReset: () => undefined,
};

const infoMarkup = renderToString(
  h(PlaygroundControls, {
    ...callbacks,
    disabled: true,
    isDarkMode: false,
  }),
);

match(
  infoMarkup,
  /<oj-switch(?=[^>]*labelHint="Dark mode")(?=[^>]*\sdisabled(?:\s|>))[^>]*>/,
);
match(
  infoMarkup,
  /<oj-c-button(?=[^>]*label="Apply changes")(?=[^>]*\sdisabled(?:\s|>))[^>]*>/,
);
match(
  infoMarkup,
  /<oj-c-button(?=[^>]*label="Reset")(?=[^>]*\sdisabled(?:\s|>))[^>]*>/,
);

const editableMarkup = renderToString(
  h(PlaygroundControls, {
    ...callbacks,
    disabled: false,
    isDarkMode: false,
  }),
);

match(editableMarkup, /labelHint="Dark mode"/);
match(editableMarkup, /label="Apply changes"/);
match(editableMarkup, /label="Reset"/);
doesNotMatch(editableMarkup, /\sdisabled(?:\s|>)/);
