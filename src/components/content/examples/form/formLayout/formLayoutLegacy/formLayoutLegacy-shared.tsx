import { h } from "preact";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";

export type LabelEdge = "inside" | "start" | "top";

export const createDataProvider = <T extends Record<string, any>>(items: T[]) =>
  new MutableArrayDataProvider(items, {
    keyAttributes: "value",
  });

export const browserOptions = [
  { value: "IE", label: "Windows Internet Explorer Version 11" },
  { value: "FF", label: "Android 11 Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Windows 10 Opera" },
  { value: "SA", label: "iOS iPhone 11 Pro Safari" },
];

export const colorOptions = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
];

export const labelEdgeOptions = [
  { value: "inside", label: "inside" },
  { value: "start", label: "start" },
  { value: "top", label: "top" },
];

export const directionOptions = [
  { value: "row", label: "row" },
  { value: "column", label: "column" },
];

export const columnOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

export const maxColumnOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

export const formStateOptions = [
  { value: "enabled", label: "enabled" },
  { value: "readonly", label: "readonly" },
];

export const controlStateOptions = [
  { value: "enabled", label: "inherit" },
  { value: "disabled", label: "disabled" },
  { value: "readonly", label: "readonly" },
];

export const valueLengthOptions = [
  { value: "none", label: "None" },
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
];

export const stateOptions = [
  "AL",
  "AK",
  "AZ",
  "CA",
  "CO",
  "FL",
  "GA",
  "IL",
  "MA",
  "NC",
  "NJ",
  "NY",
  "OR",
  "TX",
  "UT",
  "VA",
  "WA",
].map((value) => ({ value, label: value }));

export const experienceOptions = [
  { value: "lessthanone", label: "Less than 1 year" },
  { value: "onefive", label: "Between 1 and 5 years" },
  { value: "fiveten", label: "Between 5 and 10 years" },
  { value: "tenfifteen", label: "Between 10 and 15 years" },
  { value: "fifteentwenty", label: "Between 15 and 20 years" },
  { value: "more20", label: "More than 20 years" },
];

export const sponsorshipTypeOptions = [
  { value: "H-1B", label: "H-1B" },
  { value: "L-1B", label: "L-1B" },
  { value: "O-1", label: "O-1" },
  { value: "TN", label: "TN" },
];

export const todayIsoDate =
  IntlConverterUtils.dateToLocalIsoDateString(new Date(2026, 2, 19)) ?? "";
export const todayIsoDateTime =
  IntlConverterUtils.dateToLocalIso(new Date(2026, 2, 19, 15, 0)) ?? "";

export const getLegacyTextValue = (length: string, shortText: string) => {
  if (length === "none") {
    return null;
  }
  if (length === "long") {
    return `${shortText} ${shortText} ${shortText}`;
  }
  return shortText;
};

export const getLegacySelectManyValue = (length: string) => {
  if (length === "none") {
    return [];
  }
  if (length === "long") {
    return ["Internet Explorer", "Firefox", "Chrome", "Opera", "Safari"];
  }
  return ["Chrome", "Safari"];
};
