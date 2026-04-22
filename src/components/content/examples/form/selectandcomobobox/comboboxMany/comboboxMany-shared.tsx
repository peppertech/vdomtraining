import type { ComponentProps } from "preact";
import * as statesText from "text!./data/states.json";
import * as hierarchicalDataText from "text!./data/hierarchicalData.json";
import * as employeesText from "text!./data/employees_100.json";
import * as formattedCurrencyText from "text!./data/formattedCurrencyData.json";
import * as unformattedCurrencyText from "text!./data/unformattedCurrencyData.json";
import * as emailDataText from "text!./data/emailData.json";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import RegExpValidator = require("ojs/ojvalidator-regexp");
import { IntlNumberConverter } from "ojs/ojconverter-number";

type ComboboxManyProps = ComponentProps<"oj-combobox-many">;

export type BrowserOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type StateOption = {
  value: string;
  label: string;
};

export type CurrencyOption = {
  value: number;
  label: string;
};

type RawCurrencyOption = {
  value: string;
  label: string;
};

export type EmployeeOption = {
  value: string;
  firstname: string;
  lastname: string;
  label: string;
  location_code: string;
  isManager: boolean;
  isContractor: boolean;
  level: string;
  department_name: string;
};

type EmployeeGroup = {
  value: string;
  label: string;
  children: EmployeeOption[];
};

const states = JSON.parse(statesText) as StateOption[];
const hierarchicalData = JSON.parse(hierarchicalDataText) as EmployeeGroup[];
const employees = JSON.parse(employeesText) as EmployeeOption[];
const formattedCurrency = JSON.parse(formattedCurrencyText) as CurrencyOption[];
const unformattedCurrency = JSON.parse(
  unformattedCurrencyText,
) as RawCurrencyOption[];
const emailData = JSON.parse(emailDataText) as StateOption[];

export const browserOptions: BrowserOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

export const browserLabelOptions: StateOption[] = browserOptions.map((browser) => ({
  value: browser.label,
  label: browser.label,
}));

export const errorMessages: NonNullable<ComboboxManyProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "error" },
];

export const warningMessages: NonNullable<ComboboxManyProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "warning" },
];

export const infoMessages: NonNullable<ComboboxManyProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "info" },
];

export const confirmationMessages: NonNullable<
  ComboboxManyProps["messagesCustom"]
> = [{ summary: "summary", detail: "detail", severity: "confirmation" }];

export const createBrowserDataProvider = (
  items: BrowserOption[] = browserOptions,
) =>
  new ArrayDataProvider<string, BrowserOption>(items, {
    keyAttributes: "value",
  });

export const createBrowserLabelDataProvider = () =>
  new ArrayDataProvider<string, StateOption>(browserLabelOptions, {
    keyAttributes: "value",
  });

export const createStatesDataProvider = () =>
  new ArrayDataProvider<string, StateOption>(states, {
    keyAttributes: "value",
  });

export const createTimeZoneDataProvider = () =>
  new ArrayTreeDataProvider<string, EmployeeGroup>(hierarchicalData, {
    keyAttributes: "value",
    childrenAttribute: "children",
  });

export const createEmployeeDataProvider = () =>
  new ArrayDataProvider<string, EmployeeOption>(employees, {
    keyAttributes: "value",
  });

export const createEmployeeMappedDataProvider = () =>
  new ListDataProviderView(createEmployeeDataProvider(), {
    dataMapping: {
      mapFields: (item: any) => ({
        data: {
          label: `${item.data.lastname}, ${item.data.firstname}`,
          value: item.data.value,
        },
        metadata: { key: item.data.value },
      }),
    },
  });

export const createGroupedEmployeeDataProvider = () => {
  const managers: EmployeeGroup = {
    value: "MANAGERS",
    label: "MANAGERS",
    children: employees.filter((employee) => employee.isManager),
  };
  const members: EmployeeGroup = {
    value: "EMPLOYEES",
    label: "EMPLOYEES",
    children: employees.filter((employee) => !employee.isManager),
  };

  return new ArrayTreeDataProvider<string, EmployeeGroup>(
    [managers, members],
    {
      keyAttributes: "value",
      childrenAttribute: "children",
    },
  );
};

export const createFormattedCurrencyDataProvider = () =>
  new ArrayDataProvider<number, CurrencyOption>(formattedCurrency, {
    keyAttributes: "value",
  });

export const usdCurrencyConverter = new IntlNumberConverter({
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

export const createUnformattedCurrencyDataProvider = () =>
  new ListDataProviderView(
    new ArrayDataProvider<string, RawCurrencyOption>(unformattedCurrency, {
      keyAttributes: "value",
    }),
    {
      dataMapping: {
        mapFields: (item: any) => {
          const parsedValue = usdCurrencyConverter.parse(item.data.value);
          const value =
            typeof parsedValue === "number"
              ? parsedValue
              : Number(item.data.value);
          return {
            data: {
              value,
              label: usdCurrencyConverter.format(value),
            },
            metadata: { key: value },
          };
        },
      },
    },
  );

export const createEmailDataProvider = () =>
  new ArrayDataProvider<string, StateOption>(emailData, {
    keyAttributes: "value",
  });

export const multipleEmailValidator = {
  validate: (value: Array<string> = []) => {
    const emailValidator = new RegExpValidator({
      pattern:
        "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
      hint: "enter a valid email format",
      messageDetail: "Not a valid email format",
    });

    value.forEach((entry) => emailValidator.validate(entry));
  },
  getHint: () => "enter a valid email format",
};

export const formatEventDetail = (detail: Record<string, any>) => {
  const valueObj: Record<string, any> = {
    previousValue: detail.previousValue,
    value: detail.value,
  };

  if (detail.data) {
    valueObj.data = detail.data;
  }

  if (detail.metadata && detail.metadata.length > 0) {
    valueObj.metadata = detail.metadata.map((item: any) =>
      item ? { key: item.key } : undefined,
    );
  }

  return JSON.stringify(valueObj, null, 2);
};

const buildCircle = (text: string, background: string) => {
  const icon = document.createElement("span");
  icon.textContent = text;
  icon.style.alignItems = "center";
  icon.style.background = background;
  icon.style.borderRadius = "999px";
  icon.style.color = "#ffffff";
  icon.style.display = "inline-flex";
  icon.style.fontSize = "11px";
  icon.style.fontWeight = "600";
  icon.style.height = "20px";
  icon.style.justifyContent = "center";
  icon.style.width = "20px";
  return icon;
};

export const renderEmployeeCustomOption = (context: any) => {
  const data = context.data as EmployeeOption | EmployeeGroup;

  if (!context.leaf) {
    const group = document.createElement("oj-optgroup");
    group.setAttribute("label", data.label);
    return group;
  }

  const option = document.createElement("oj-option");
  const primary = document.createElement("span");
  primary.className = "oj-listbox-highlighter-section";
  primary.textContent = `${(data as EmployeeOption).lastname}, ${(data as EmployeeOption).firstname} `;

  const secondary = document.createElement("span");
  secondary.className = "oj-typography-body-xs";
  secondary.textContent = `${(data as EmployeeOption).department_name} - ${(data as EmployeeOption).location_code}`;

  option.appendChild(primary);
  option.appendChild(secondary);
  return option;
};

export const renderBrowserImageOption = (context: any) => {
  const data = context.data as StateOption;
  const option = document.createElement("oj-option");
  const iconSlot = document.createElement("span");
  const label = document.createElement("span");

  iconSlot.setAttribute("slot", "startIcon");
  iconSlot.appendChild(
    buildCircle(
      data.label
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      "#0f766e",
    ),
  );
  iconSlot.style.marginRight = "8px";

  label.textContent = data.label;

  option.appendChild(iconSlot);
  option.appendChild(label);
  return option;
};
