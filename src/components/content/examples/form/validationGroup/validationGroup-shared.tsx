import { ojValidationGroup } from "ojs/ojvalidationgroup";

export type ValidationState =
  | "valid"
  | "pending"
  | "invalidHidden"
  | "invalidShown"
  | "";

export function getValidationGroup(id: string) {
  return document.getElementById(id) as ojValidationGroup | null;
}

export function checkValidationGroup(id: string) {
  const tracker = getValidationGroup(id) as any;
  if (!tracker) {
    return false;
  }
  if (tracker.valid === "valid") {
    return true;
  }
  if (tracker.valid === "invalidHidden") {
    tracker.showMessages();
  }
  tracker.focusOn("@firstInvalidShown");
  return false;
}
