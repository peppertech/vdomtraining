import 'preact';
import { ComponentProps } from 'preact';
import Message = require("ojs/ojmessaging");

export type SliderProps = ComponentProps<"oj-slider">;
export type SliderValueChangedEvent = Parameters<
  NonNullable<SliderProps["onvalueChanged"]>
>[0];
export type SliderTransientValueChangedEvent = Parameters<
  NonNullable<SliderProps["ontransientValueChanged"]>
>[0];

export const sliderDefinitionHints: SliderProps["helpHints"] = {
  definition: "help-hints.definition text",
};

export const sliderSourceHints: SliderProps["helpHints"] = {
  source: "https://www.oracle.com",
};

export const sliderInstructionHelp = {
  instruction: "help.instruction text",
};

export const sliderErrorMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "error" },
];

export const sliderWarningMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "warning" },
];

export const sliderInfoMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "info" },
];

export const sliderConfirmationMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];
