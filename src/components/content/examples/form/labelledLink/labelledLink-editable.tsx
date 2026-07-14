import "oj-c/form-layout";
import "oj-c/input-text";
import type { CInputTextElement } from "oj-c/input-text";
import "oj-c/labelled-link";
import "oj-c/radioset";
import type { CRadiosetElement } from "oj-c/radioset";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

type ComponentState = "enabled" | "fullReadonly" | "mixedReadonly";

type StateOption = {
  value: ComponentState;
  label: string;
};

function DemoInputEmail({
  readonly,
  value,
  onValueChanged,
}: {
  readonly: boolean;
  value: string;
  onValueChanged: (event: CInputTextElement.valueChanged<string>) => void;
}) {
  if (readonly && value) {
    return (
      <oj-c-labelled-link
        labelHint="Employee Email"
        href={`mailto:${value}`}
        text={value}
        containerReadonly={value ==='mixedReadonly' ? false : true}
      ></oj-c-labelled-link>
    );
  }

 else return (
    <oj-c-input-text
      labelHint="Employee Email"
      readonly={readonly}
      value={value}
      onvalueChanged={onValueChanged}
    ></oj-c-input-text>
  );
}

export default function LabelledLinkEditableExample() {
  const [componentState, setComponentState] =
    useState<ComponentState>("enabled");
  const [emailValue, setEmailValue] = useState("your.email@example.com");

  const componentStateOptions = useMemo<StateOption[]>(
    () => [
      { value: "enabled", label: "Enabled" },
      {
        value: "fullReadonly",
        label: "Full Readonly (oj-c-form-layout is readonly)",
      },
      {
        value: "mixedReadonly",
        label: "Mixed Readonly (oj-c-form-layout is enabled and the component is readonly)",
      },
    ],
    [],
  );

  const handleStateChanged = useCallback(
    (event: CRadiosetElement.valueChanged<ComponentState, StateOption>) => {
      if (event.detail.value) {
        setComponentState((event.detail.value as ComponentState));
      }
    },
    [],
  );

  const handleEmailChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setEmailValue((event.detail.value as string | null | undefined) ?? "");
    },
    [],
  );

  return (
    <div id="container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x">
        <div class="oj-typography-heading-xs oj-header-border">
          Demo settings
        </div>
        <div class="oj-flex">
          <div class="oj-sm-margin-2x oj-flex-item">
            <oj-c-radioset
              options={componentStateOptions}
              value={componentState}
              labelHint="Component State"
              labelEdge="inside"
              onvalueChanged={handleStateChanged}
            ></oj-c-radioset>
          </div>
        </div>
      </div>

      <oj-c-form-layout readonly={componentState === "fullReadonly"}>
        <DemoInputEmail
          readonly={componentState !== "enabled"}
          value={emailValue}
          onValueChanged={handleEmailChanged}
        />
      </oj-c-form-layout>
    </div>
  );
}
