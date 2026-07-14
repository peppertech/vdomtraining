import 'preact';
import { ComponentProps } from 'preact';

export type TextAreaCorePackProps = ComponentProps<"oj-c-text-area">;
export type RadiosetProps = ComponentProps<"oj-c-radioset">;
export type TextAreaCorePackValueChangedEvent = Parameters<
  NonNullable<TextAreaCorePackProps["onvalueChanged"]>
>[0];
export type RadiosetValueChangedEvent = Parameters<
  NonNullable<RadiosetProps["onvalueChanged"]>
>[0];
export type TextAreaLabelEdge = NonNullable<TextAreaCorePackProps["labelEdge"]>;

export const sampleValue =
  "This is a really long sample text to show text area value.";

export const longValue =
  "This is a long sample text to show text area value. It contains two sentences.";

export const lengthSampleValue = "This is 32 characters in length.";

export const maxRowsDefaultValue =
  "The max-rows in this example is 0. The text area height will not grow as you overflow, but a scrollbar will appear.";

export const maxRowsStretchValue =
  "This is a really long sample text to show text area value. This text is repeated a few times so that you can see how it behaves in a oj-c-text-area. The max-rows in this example is -1. In enabled mode, as you type more text the text area will grow automatically. In readonly mode, the text area shows all the text.";

export const maxRowsPositiveValue =
  "This is a really long sample text to show text area value. This text is repeated a few times so that you can see how it behaves in a oj-c-text-area. The max-rows in this example is 3. As you type, once you get to 3 rows, the text area will stop growing.";

export const helpDefinition: TextAreaCorePackProps["helpHints"] = {
  definition: "help-hints.definition text",
};

export const helpSource: TextAreaCorePackProps["helpHints"] = {
  source: "https://www.oracle.com",
};

export const helpInstruction: TextAreaCorePackProps["help"] = {
  instruction: "help.instruction text",
};

export const remainingLengthConfig: TextAreaCorePackProps["length"] = {
  max: 100,
  counter: "remaining",
  countBy: "codeUnit",
};

export const hiddenLengthConfig: TextAreaCorePackProps["length"] = {
  max: 100,
  counter: "none",
  countBy: "codeUnit",
};

export const overviewLengthConfig: TextAreaCorePackProps["length"] = {
  max: 40,
  counter: "remaining",
  countBy: "codeUnit",
};

export const errorMessages: NonNullable<TextAreaCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "error" }];

export const warningMessages: NonNullable<TextAreaCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "warning" }];

export const infoMessages: NonNullable<TextAreaCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "info" }];

export const confirmationMessages: NonNullable<TextAreaCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "confirmation" }];

export const labelEdgeOptions: Array<{
  value: TextAreaLabelEdge;
  label: string;
}> = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];
