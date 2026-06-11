import type { ComponentProps } from "preact";
import * as statesText from "text!./data/states.json";
import * as hierarchicalDataText from "text!./data/hierarchicalData.json";
import * as employeesText from "text!./data/employees_100.json";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");

type SelectManyProps = ComponentProps<"oj-select-many">;
type OptionRendererContext<TData> = {
  data: TData;
  leaf?: boolean;
};

export type OptionItem = {
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

const states = JSON.parse(statesText) as OptionItem[];
const groupedStates = JSON.parse(hierarchicalDataText) as GroupItem[];
const employees = JSON.parse(employeesText) as EmployeeOption[];

export const browserOptions: OptionItem[] = [
  { value: "Internet Explorer", label: "Internet Explorer" },
  { value: "Firefox", label: "Firefox" },
  { value: "Chrome", label: "Chrome" },
  { value: "Opera", label: "Opera" },
  { value: "Safari", label: "Safari" },
];

export const errorMessages: NonNullable<SelectManyProps["messagesCustom"]> = [
  { severity: "error", summary: "Error message", detail: "This is an error" },
];
export const warningMessages: NonNullable<SelectManyProps["messagesCustom"]> = [
  {
    severity: "warning",
    summary: "Warning message",
    detail: "This is a warning",
  },
];
export const infoMessages: NonNullable<SelectManyProps["messagesCustom"]> = [
  { severity: "info", summary: "Info message", detail: "This is info" },
];
export const confirmationMessages: NonNullable<
  SelectManyProps["messagesCustom"]
> = [
  {
    severity: "confirmation",
    summary: "Confirmation message",
    detail: "This is confirmation",
  },
];

export const createBrowserDataProvider = () =>
  new ArrayDataProvider<string, OptionItem>(browserOptions, {
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

export const formatEventDetail = (detail: Record<string, unknown>) => {
  const payload: Record<string, unknown> = {
    previousValue: detail.previousValue,
    value: detail.value,
  };

  if (detail.items) {
    payload.items = detail.items;
  }

  if (detail.valueOptions) {
    payload.valueOptions = detail.valueOptions;
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
      "#0f766e",
    ),
  );
  label.textContent = data.label;
  option.appendChild(iconSlot);
  option.appendChild(label);
  return option;
};
