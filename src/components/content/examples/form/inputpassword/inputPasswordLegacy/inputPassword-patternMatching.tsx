import "css!./inputPassword.css";
import "ojs/ojgauge";
import "ojs/ojinputtext";
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from "preact/hooks";
import {
  type InputPasswordRawValueChangedEvent,
  type InputPasswordValueChangedEvent,
} from "./inputPassword-shared";

const rules = [
  {
    label: "2 Uppercase Letters",
    test: (value: string) => /^.*[A-Z].*[A-Z].*$/.test(value),
  },
  {
    label: "1 Number",
    test: (value: string) => /^.*[0-9].*$/.test(value),
  },
  {
    label: "8 Characters",
    test: (value: string) => /^.{8,}$/.test(value),
  },
];

const getStrengthText = (progress: number) => {
  if (progress <= 33) {
    return "password strength is poor";
  }
  if (progress === 100) {
    return "password strength is great";
  }
  return "password strength is good";
};

export default function InputPasswordPatternMatchingExample() {
  const [passwordValue, setPasswordValue] = useState("");
  const [focused, setFocused] = useState(false);

  const passedRules = useMemo(
    () => rules.map((rule) => rule.test(passwordValue)),
    [passwordValue],
  );
  const progressBarValue = useMemo(() => {
    const progress = passedRules.reduce(
      (total, passed) => total + (passed ? 33 : 0),
      0,
    );
    return progress === 99 ? 100 : progress;
  }, [passedRules]);
  const showRules = focused || (passwordValue.length > 0 && progressBarValue < 100);

  const patternValidator = useMemo(
    () => [
      {
        validate: (value: string) => {
          const allPassed = rules.every((rule) => rule.test(value));
          if (!allPassed) {
            throw new Error("Password does not satisfy all pattern rules.");
          }
        },
        getHint: () => null,
      },
    ],
    [],
  );

  return (
    <div id="inputPasswordPatternMatching">
      <div>
        <oj-input-password
          labelEdge="inside"
          labelHint="password"
          id="password-pattern-match"
          value={passwordValue}
          rawValue={passwordValue}
          validators={patternValidator as ComponentProps<'oj-input-password'>['validators']}
          maskIcon="visible"
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          onrawValueChanged={(event: InputPasswordRawValueChangedEvent) => {
            setPasswordValue(String(event.detail.value ?? ""));
          }}
          onvalueChanged={(event: InputPasswordValueChangedEvent) => {
            setPasswordValue(String(event.detail.value ?? ""));
          }}
        />
        <div
          id="messages"
          class={progressBarValue === 100 ? "" : "demo-invalidshown"}
        >
          <div
            id="instr"
            class={`demo-instruction${focused ? " demo-focus" : ""}`}
          >
            Your password must contain at least
          </div>
          <div
            id="listing"
            class={`demo-rules${showRules ? " demo-focus" : ""}`}
          >
            {rules.map((rule, index) => (
              <div key={rule.label}>
                <span
                  class={
                    passedRules[index]
                      ? "demo-icon oj-helper-text-align-center oj-ux-ico-check"
                      : "demo-icon oj-helper-text-align-center demo-icon-bullet oj-typography-body-lg"
                  }
                />
                {rule.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <oj-status-meter-gauge
          min={0}
          max={100}
          value={progressBarValue}
          plotArea={{ rendered: "on" }}
          color="#759C6C"
          readonly
          class="demo-height-width"
          aria-label="status meter gauge showing strength of password"
        />

        <div>{getStrengthText(progressBarValue)}</div>
      </div>
    </div>
  );
}
