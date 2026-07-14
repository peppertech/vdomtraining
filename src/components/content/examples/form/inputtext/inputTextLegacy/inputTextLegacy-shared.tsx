import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import 'preact';
import { ComponentProps } from 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import Message = require("ojs/ojmessaging");

export type InputTextProps = ComponentProps<"oj-input-text">;

export type BrowserOption = {
  value: string;
  label: string;
};

export const browserOptions: BrowserOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const createBrowserDataProvider = () =>
  new ArrayDataProvider<BrowserOption["value"], BrowserOption>(browserOptions, {
    keyAttributes: "value",
  });

export const todayIsoDate = IntlConverterUtils.dateToLocalIsoDateString(
  new Date(),
);
export const nowIsoDateTime = IntlConverterUtils.dateToLocalIso(new Date());
export const defaultTimeValue = "T18:00:00";

export const errorMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "error" },
];
export const warningMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "warning" },
];
export const infoMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "info" },
];
export const confirmationMessages: Message[] = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];

export const maxLengthConfig: InputTextProps["length"] = {
  max: 3,
  countBy: "codeUnit",
};
