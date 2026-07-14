import type { CInputDateTextElement } from "oj-c/input-date-text";
import type { CRadiosetElement,RadiosetDataItem } from "oj-c/radioset";
import type { CSelectSingleElement } from "oj-c/select-single";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";

export type InputDateTextValue = CInputDateTextElement["value"];
export type InputDateTextValueChangedEvent = CInputDateTextElement.valueChanged;

export type InputDateTextLabelEdge = Exclude<
  NonNullable<CInputDateTextElement["labelEdge"]>,
  "none"
>;

export type LabelEdgeOption = RadiosetDataItem & {
  value: InputDateTextLabelEdge;
};

export type RadiosetValueChangedEvent = CRadiosetElement.valueChanged<
  InputDateTextLabelEdge,
  LabelEdgeOption
>;

export type SelectSingleValueChangedEvent<
  V extends string | number,
  D extends Record<string, unknown>,
> = CSelectSingleElement.valueChanged<V, D>;

export const labelEdgeOptions: LabelEdgeOption[] = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const messageSets: {
  error: NonNullable<CInputDateTextElement["messagesCustom"]>;
  warning: NonNullable<CInputDateTextElement["messagesCustom"]>;
  info: NonNullable<CInputDateTextElement["messagesCustom"]>;
  confirmation: NonNullable<CInputDateTextElement["messagesCustom"]>;
} = {
  error: [{ summary: "summary", detail: "detail", severity: "error" }],
  warning: [{ summary: "summary", detail: "detail", severity: "warning" }],
  info: [{ summary: "summary", detail: "detail", severity: "info" }],
  confirmation: [
    { summary: "summary", detail: "detail", severity: "confirmation" },
  ],
};

export const todayIsoDate =
  IntlConverterUtils.dateToLocalIsoDateString(new Date()) ?? "";

export const isInputDateTextLabelEdge = (
  value: unknown,
): value is InputDateTextLabelEdge =>
  value === "inside" || value === "start" || value === "top";
