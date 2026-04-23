import { ComponentProps } from "preact";
import type { CheckboxsetDataItem } from "oj-c/checkboxset";

export type CheckBoxCorePackProps = ComponentProps<"oj-c-checkbox">;
export type CheckBoxsetCorePackProps = ComponentProps<"oj-c-checkboxset">;

export type GroceryOption = CheckboxsetDataItem & {
  value: string;
  label: string;
};

export const groceryOptions: GroceryOption[] = [
  { value: "milk", label: "Milk" },
  { value: "yogurt", label: "Yogurt" },
  { value: "wine", label: "Wine" },
  { value: "beer", label: "Beer" },
];

export const errorMessages: NonNullable<CheckBoxCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "error" }];

export const warningMessages: NonNullable<
  CheckBoxCorePackProps["messagesCustom"]
> = [{ summary: "summary", detail: "detail", severity: "warning" }];

export const infoMessages: NonNullable<CheckBoxCorePackProps["messagesCustom"]> =
  [{ summary: "summary", detail: "detail", severity: "info" }];

export const confirmationMessages: NonNullable<
  CheckBoxCorePackProps["messagesCustom"]
> = [{ summary: "summary", detail: "detail", severity: "confirmation" }];
