import type { FunctionComponent } from "preact";

export type AppliedPlayground = Readonly<{
  Component: FunctionComponent;
  revision: number;
}>;

export function nextAppliedPlayground(
  current: AppliedPlayground | undefined,
  component: FunctionComponent | undefined,
): AppliedPlayground | undefined {
  if (!component) {
    return undefined;
  }

  return {
    Component: component,
    revision: (current?.revision ?? 0) + 1,
  };
}
