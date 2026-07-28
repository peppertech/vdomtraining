import type { ButtonIntrinsicProps } from "oj-c/button/button";
import type { SwitchIntrinsicProps } from "ojs/ojswitch";
import { h, type VNode } from "preact";

type Props = Readonly<{
  disabled: boolean;
  isDarkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
  onApply: () => void;
  onReset: () => void;
}>;

export function PlaygroundControls({
  disabled,
  isDarkMode,
  onDarkModeChange,
  onApply,
  onReset,
}: Props): VNode {
  const switchProps: SwitchIntrinsicProps = {
    disabled,
    value: isDarkMode,
    labelHint: "Dark mode",
    labelEdge: "inside",
    onvalueChanged: (event) => onDarkModeChange(!!event.detail.value),
  };
  const applyProps: ButtonIntrinsicProps = {
    class: "oj-sm-margin-2x-start",
    disabled,
    label: "Apply changes",
    chroming: "callToAction",
    onojAction: onApply,
  };
  const resetProps: ButtonIntrinsicProps = {
    class: "oj-sm-margin-2x-start",
    disabled,
    label: "Reset",
    chroming: "outlined",
    onojAction: onReset,
  };

  return h(
    "div",
    null,
    h("oj-switch", switchProps),
    h("oj-c-button", applyProps),
    h("oj-c-button", resetProps),
  );
}
