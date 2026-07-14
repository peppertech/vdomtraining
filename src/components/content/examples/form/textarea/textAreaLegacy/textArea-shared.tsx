import 'preact';
import { ComponentProps } from 'preact';
import Message = require("ojs/ojmessaging");

export type TextAreaProps = ComponentProps<"oj-text-area">;
export type TextAreaValueChangedEvent = Parameters<
  NonNullable<TextAreaProps["onvalueChanged"]>
>[0];

export const sampleValue =
  "This is a really long sample text to show text area value.";

export const multilineSampleValue =
  "This is the first line of a really long multiline sample text to show text area value.\nThis is a new line.";

export const autoGrowSampleValue =
  "This is a really long sample text to show text area value. This text is repeated a few times so that you can see how it behaves in a oj-text-area. The max-rows in this example is -1. In enabled mode, as you type more text the text area will grow automatically.";

export const fixedMaxRowsSampleValue =
  "This is a really long sample text to show text area value. This text is repeated a few times so that you can see how it behaves in a oj-text-area. The max-rows in this example is 5. Once the content reaches the maximum rows, the text area stops growing and scrolls.";

export const helpDefinition: TextAreaProps["helpHints"] = {
  definition: "Cost of a single item",
};

export const helpSource: TextAreaProps["helpHints"] = {
  source: "https://www.oracle.com",
};

export const lengthConfig: TextAreaProps["length"] = {
  countBy: "codePoint",
  max: 40,
  counter: "remaining",
};

export const errorMessages: Message[] = [
  { summary: "Summary", detail: "Detail", severity: "error" },
];

export const warningMessages: Message[] = [
  { summary: "Summary", detail: "Detail", severity: "warning" },
];

export const infoMessages: Message[] = [
  { summary: "Summary", detail: "Detail", severity: "info" },
];

export const confirmationMessages: Message[] = [
  { summary: "Summary", detail: "Detail", severity: "confirmation" },
];
