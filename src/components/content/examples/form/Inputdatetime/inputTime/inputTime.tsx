import { h, ComponentProps } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";

import "ojs/ojformlayout";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import "ojs/ojconverterutils-i18n";
import "ojs/ojdatetimepicker";
import "ojs/ojmessaging";

type InputTimeProps = ComponentProps<"oj-input-time">;
type InputTimeValueChangedEvent = Parameters<
  NonNullable<InputTimeProps["onvalueChanged"]>
>[0];

export const InputTime = () => {
  const [value, setValue] = useState<InputTimeProps["value"]>("T18:00:00");
  const [militaryValue, setMilitaryValue] =
    useState<InputTimeProps["value"]>("T18:00:00");
  const [secondsValue, setSecondsValue] =
    useState<InputTimeProps["value"]>("T18:00:00");
  const [requiredValue, setRequiredValue] =
    useState<InputTimeProps["value"]>("T18:00:00");
  const [helpValue, setHelpValue] =
    useState<InputTimeProps["value"]>("T18:00:00");
  const [errorValue, setErrorValue] =
    useState<InputTimeProps["value"]>("T18:00:00");
  const [warningValue, setWarningValue] =
    useState<InputTimeProps["value"]>("T18:00:00");
  const [infoValue, setInfoValue] =
    useState<InputTimeProps["value"]>("T18:00:00");
  const [confirmationValue, setConfirmationValue] =
    useState<InputTimeProps["value"]>("T18:00:00");

  const timeConverter = new IntlDateTimeConverter({
    minute: "2-digit",
    hour: "2-digit",
    hour12: false,
  });

  const timeFullConverter = new IntlDateTimeConverter({
    formatType: "time",
    timeFormat: "medium",
  });

  const error = useMemo(
    () => [
      {
        summary: "Error message",
        detail: "This is an error message",
        severity: "error" as const,
      },
    ],
    [],
  );

  const warning = useMemo(
    () => [
      {
        summary: "Warning message",
        detail: "This is a warning message",
        severity: "warning" as const,
      },
    ],
    [],
  );

  const info = useMemo(
    () => [
      {
        summary: "Info message",
        detail: "This is an info message",
        severity: "info" as const,
      },
    ],
    [],
  );

  const confirmation = useMemo(
    () => [
      {
        summary: "Confirmation message",
        detail: "This is a confirmation message",
        severity: "confirmation" as const,
      },
    ],
    [],
  );

  const handleValueChanged = useCallback((event: InputTimeValueChangedEvent) => {
    setValue(event.detail.value);
  }, []);

  const handleMilitaryValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setMilitaryValue(event.detail.value);
    },
    [],
  );

  const handleSecondsValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setSecondsValue(event.detail.value);
    },
    [],
  );

  const handleRequiredValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setRequiredValue(event.detail.value);
    },
    [],
  );

  const handleHelpValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setHelpValue(event.detail.value);
    },
    [],
  );

  const handleErrorValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setErrorValue(event.detail.value);
    },
    [],
  );

  const handleWarningValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setWarningValue(event.detail.value);
    },
    [],
  );

  const handleInfoValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setInfoValue(event.detail.value);
    },
    [],
  );

  const handleConfirmationValueChanged = useCallback(
    (event: InputTimeValueChangedEvent) => {
      setConfirmationValue(event.detail.value);
    },
    [],
  );

  return (
    <div id="div1">
      <h5 className="oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time labelHint="Enabled no value"></oj-input-time>
        <oj-input-time labelHint="Disabled no value" disabled></oj-input-time>
        <oj-input-time labelHint="Read only no value" readonly></oj-input-time>
        <oj-input-time
          value={value}
          labelHint="Enabled"
          onvalueChanged={handleValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={value}
          labelHint="Disabled"
          disabled
          onvalueChanged={handleValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={value}
          labelHint="Read only"
          readonly
          onvalueChanged={handleValueChanged}
        ></oj-input-time>
      </oj-form-layout>

      <h5 className="oj-sm-margin-4x-top">Required</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time
          required={true}
          labelHint="required"
          onvalueChanged={handleRequiredValueChanged}
        ></oj-input-time>
      </oj-form-layout>

      <h5 className="oj-sm-margin-4x-top">Time Variations</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time
          value={militaryValue}
          converter={timeConverter as InputTimeProps["converter"]}
          labelHint="Military Time (no am/pm)"
          onvalueChanged={handleMilitaryValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={secondsValue}
          converter={timeFullConverter as InputTimeProps["converter"]}
          labelHint="Time with seconds"
          onvalueChanged={handleSecondsValueChanged}
        ></oj-input-time>
      </oj-form-layout>

      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time
          value={helpValue}
          labelHint="help.instruction"
          help={{ instruction: "help-hints.instruction text" }}
          onvalueChanged={handleHelpValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={helpValue}
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
          onvalueChanged={handleHelpValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={helpValue}
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
          onvalueChanged={handleHelpValueChanged}
        ></oj-input-time>
      </oj-form-layout>

      <h5 className="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time
          value={errorValue}
          labelHint="Error"
          messagesCustom={error}
          onvalueChanged={handleErrorValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={warningValue}
          labelHint="Warning"
          messagesCustom={warning}
          onvalueChanged={handleWarningValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={infoValue}
          labelHint="Information"
          messagesCustom={info}
          onvalueChanged={handleInfoValueChanged}
        ></oj-input-time>
        <oj-input-time
          value={confirmationValue}
          labelHint="Confirmation"
          messagesCustom={confirmation}
          onvalueChanged={handleConfirmationValueChanged}
        ></oj-input-time>
      </oj-form-layout>
    </div>
  );
};

export default InputTime;
