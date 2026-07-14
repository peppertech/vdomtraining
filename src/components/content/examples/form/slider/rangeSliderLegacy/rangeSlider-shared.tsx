import 'preact';
import { ComponentProps } from 'preact';
import Message = require("ojs/ojmessaging");

export type RangeSliderValue = {
  start: number;
  end: number;
};

export type RangeSliderProps = ComponentProps<"oj-range-slider">;
export type RangeSliderValueChangedEvent = Parameters<
  NonNullable<RangeSliderProps["onvalueChanged"]>
>[0];
export type RangeSliderTransientValueChangedEvent = Parameters<
  NonNullable<RangeSliderProps["ontransientValueChanged"]>
>[0];

export const rangeSliderDefinitionHints: RangeSliderProps["helpHints"] = {
  definition: "help-hints.definition text",
};

export const rangeSliderSourceHints: RangeSliderProps["helpHints"] = {
  source: "https://www.oracle.com",
};

export const rangeSliderInstructionHelp = {
  instruction: "help.instruction text",
};

export const rangeSliderErrorMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "error" },
];

export const rangeSliderWarningMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "warning" },
];

export const rangeSliderInfoMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "info" },
];

export const rangeSliderConfirmationMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];

export const formatRangeValue = (value: RangeSliderValue | null | undefined) =>
  value ? `${value.start} , ${value.end}` : "-";
