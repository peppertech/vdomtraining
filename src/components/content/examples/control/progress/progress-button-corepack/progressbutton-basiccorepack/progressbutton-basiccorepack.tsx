import { h } from "preact";
import type { ComponentProps } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import "oj-c/progress-button";
import "oj-c/radioset";

type ControlState = "initial" | "loaded";
type ProgressButtonActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-progress-button">["onojAction"]>
>[0];
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const controlStateItems: Array<{ value: ControlState; label: string }> = [
  { value: "initial", label: "Initial" },
  { value: "loaded", label: "Loaded" }
];

export const ProgressbuttonBasiccorepack = () => {
  const [controlState, setControlState] = useState<ControlState>("initial");
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAction = (_event: ProgressButtonActionEvent) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setControlState("initial");
    setIsLoading(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      setControlState("loaded");
    }, 4000);
  };

  const handleStateChanged = (event: RadiosetValueChangedEvent) => {
    const nextValue = (event.detail.value as ControlState | null) ?? "initial";
    setControlState(nextValue);
    if (nextValue === "loaded") {
      setIsLoading(false);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  return (
    <div id="buttons-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          labelHint="State"
          direction="row"
          value={controlState}
          aria-controls="toggle1"
          options={controlStateItems}
          onvalueChanged={handleStateChanged}
        />
      </div>

      <oj-c-progress-button
        id="toggle1"
        isLoading={isLoading}
        onojAction={handleAction}
        label="Approve"
      />
    </div>
  );
};

export default ProgressbuttonBasiccorepack;
