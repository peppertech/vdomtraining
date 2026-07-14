import { IntlNumberConverter } from "ojs/ojconverter-number";
import type { ComponentProps } from "preact";
import * as emailDataText from "text!./data/emailData.json";
import * as employeesText from "text!./data/employees_100.json";
import * as formattedCurrencyText from "text!./data/formattedCurrencyData.json";
import * as hierarchicalDataText from "text!./data/hierarchicalData.json";
import * as statesText from "text!./data/states.json";
import * as unformattedCurrencyText from "text!./data/unformattedCurrencyData.json";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import RegExpValidator = require("ojs/ojvalidator-regexp");

type ComboboxOneProps = ComponentProps<"oj-combobox-one">;
type OptionRendererContext<TData> = {
  data: TData;
  leaf?: boolean;
};

type OptionItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

type EmployeeOption = {
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

type GroupItem = {
  value: string;
  label: string;
  children: Array<GroupItem | OptionItem | EmployeeOption>;
};

type CurrencyItem = {
  value: number;
  label: string;
};

type RawCurrencyItem = {
  value: string;
  label: string;
};

const states = JSON.parse(statesText) as OptionItem[];
const groupedStates = JSON.parse(hierarchicalDataText) as GroupItem[];
const employees = JSON.parse(employeesText) as EmployeeOption[];
const formattedCurrency = JSON.parse(formattedCurrencyText) as CurrencyItem[];
const unformattedCurrency = JSON.parse(
  unformattedCurrencyText,
) as RawCurrencyItem[];
const emailOptions = JSON.parse(emailDataText) as OptionItem[];

export const browserOptions: OptionItem[] = [
  { value: "Internet Explorer", label: "Internet Explorer" },
  { value: "Firefox", label: "Firefox" },
  { value: "Chrome", label: "Chrome" },
  { value: "Opera", label: "Opera" },
  { value: "Safari", label: "Safari" },
];

export const browserOptionsWithDisabled: OptionItem[] = [
  { value: "Internet Explorer", label: "Internet Explorer" },
  { value: "Firefox", label: "Firefox" },
  { value: "Chrome", label: "Chrome" },
  { value: "Opera", label: "Opera", disabled: true },
  { value: "Safari", label: "Safari" },
];

export const errorMessages: NonNullable<ComboboxOneProps["messagesCustom"]> = [
  { severity: "error", summary: "Error message", detail: "This is an error" },
];
export const warningMessages: NonNullable<ComboboxOneProps["messagesCustom"]> = [
  {
    severity: "warning",
    summary: "Warning message",
    detail: "This is a warning",
  },
];
export const infoMessages: NonNullable<ComboboxOneProps["messagesCustom"]> = [
  { severity: "info", summary: "Info message", detail: "This is info" },
];
export const confirmationMessages: NonNullable<
  ComboboxOneProps["messagesCustom"]
> = [
  {
    severity: "confirmation",
    summary: "Confirmation message",
    detail: "This is confirmation",
  },
];

export const usdCurrencyConverter = new IntlNumberConverter({
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

export const emailValidator = new RegExpValidator({
  pattern:
    "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
  hint: "enter a valid email format",
  messageDetail: "Not a valid email format",
});

export const createBrowserDataProvider = (items: OptionItem[] = browserOptions) =>
  new ArrayDataProvider<string, OptionItem>(items, {
    keyAttributes: "value",
  });

export const createStatesDataProvider = () =>
  new ArrayDataProvider<string, OptionItem>(states, {
    keyAttributes: "value",
  });

export const createGroupedStatesDataProvider = () =>
  new ArrayTreeDataProvider<string, GroupItem>(groupedStates, {
    keyAttributes: "value",
    childrenAttribute: "children",
  });

export const createEmployeeMappedDataProvider = () =>
  new ListDataProviderView(
    new ArrayDataProvider<string, EmployeeOption>(employees, {
      keyAttributes: "value",
    }),
    {
      dataMapping: {
        mapFields: (item) => ({
          data: {
            value: item.data.value,
            label: `${item.data.lastname}, ${item.data.firstname}`,
          },
          metadata: { key: item.data.value },
        }),
      },
    },
  );

export const createGroupedEmployeeDataProvider = () => {
  const managers: GroupItem = {
    value: "MANAGERS",
    label: "MANAGERS",
    children: employees.filter((employee) => employee.isManager),
  };
  const members: GroupItem = {
    value: "EMPLOYEES",
    label: "EMPLOYEES",
    children: employees.filter((employee) => !employee.isManager),
  };

  return new ArrayTreeDataProvider<string, GroupItem>([managers, members], {
    keyAttributes: "value",
    childrenAttribute: "children",
  });
};

export const createFormattedCurrencyDataProvider = () =>
  new ArrayDataProvider<number, CurrencyItem>(formattedCurrency, {
    keyAttributes: "value",
  });

export const createUnformattedCurrencyDataProvider = () =>
  new ListDataProviderView(
    new ArrayDataProvider<string, RawCurrencyItem>(unformattedCurrency, {
      keyAttributes: "value",
    }),
    {
      dataMapping: {
        mapFields: (item) => {
          const parsed = usdCurrencyConverter.parse(item.data.value);
          const value = typeof parsed === "number" ? parsed : Number(item.data.value);
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
  new ArrayDataProvider<string, OptionItem>(emailOptions, {
    keyAttributes: "value",
  });

export const formatEventDetail = (detail: Record<string, unknown>) => {
  const payload: Record<string, unknown> = {
    previousValue: detail.previousValue,
    value: detail.value,
  };

  if (detail.valueOption) {
    payload.valueOption = detail.valueOption;
  }

  return JSON.stringify(payload, null, 2);
};

const buildBadge = (text: string, background: string) => {
  const badge = document.createElement("span");
  badge.textContent = text;
  badge.style.alignItems = "center";
  badge.style.background = background;
  badge.style.borderRadius = "999px";
  badge.style.color = "#ffffff";
  badge.style.display = "inline-flex";
  badge.style.fontSize = "11px";
  badge.style.fontWeight = "600";
  badge.style.height = "20px";
  badge.style.justifyContent = "center";
  badge.style.width = "20px";
  return badge;
};

export const renderOptionWithBadge = (
  context: OptionRendererContext<OptionItem | GroupItem>,
) => {
  const data = context.data as OptionItem | GroupItem;

  if (!context.leaf) {
    const group = document.createElement("oj-optgroup");
    group.setAttribute("label", data.label);
    return group;
  }

  const option = document.createElement("oj-option");
  const iconSlot = document.createElement("span");
  const label = document.createElement("span");

  iconSlot.setAttribute("slot", "startIcon");
  iconSlot.style.marginRight = "8px";
  iconSlot.appendChild(
    buildBadge(
      data.label
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      "#1d4ed8",
    ),
  );
  label.textContent = data.label;
  option.appendChild(iconSlot);
  option.appendChild(label);
  return option;
};

export const renderEmployeeOption = (
  context: OptionRendererContext<EmployeeOption | GroupItem>,
) => {
  const data = context.data as EmployeeOption | GroupItem;

  if (!context.leaf) {
    const group = document.createElement("oj-optgroup");
    group.setAttribute("label", data.label);
    return group;
  }

  const option = document.createElement("oj-option");
  const primary = document.createElement("span");
  const secondary = document.createElement("span");

  primary.className = "oj-listbox-highlighter-section";
  primary.textContent = `${(data as EmployeeOption).lastname}, ${(data as EmployeeOption).firstname} `;

  secondary.className = "oj-typography-body-xs";
  secondary.textContent = `${(data as EmployeeOption).department_name} - ${(data as EmployeeOption).location_code}`;

  option.appendChild(primary);
  option.appendChild(secondary);
  return option;
};
