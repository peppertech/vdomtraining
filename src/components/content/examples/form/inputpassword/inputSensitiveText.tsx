import { h } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";

// CorePack component imports
import "oj-c/input-sensitive-text";
import "oj-c/form-layout";

// Type imports
import { CInputSensitiveTextElement } from "oj-c/input-sensitive-text";

export const InputSensitiveText = () => {
  // State for input values
  const [enabledValue, setEnabledValue] = useState<string>("");
  const [disabledValue, setDisabledValue] =
    useState<string>("disabled-example");
  const [readonlyValue, setReadonlyValue] =
    useState<string>("readonly-example");
  const [requiredValue, setRequiredValue] = useState<string>("");
  const [helpValue, setHelpValue] = useState<string>("");
  const [errorValue, setErrorValue] = useState<string>("error-example");
  const [warningValue, setWarningValue] = useState<string>("warning-example");
  const [infoValue, setInfoValue] = useState<string>("info-example");
  const [confirmationValue, setConfirmationValue] = useState<string>(
    "confirmation-example",
  );

  // Message configurations
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

  // Event handlers
  const handleEnabledValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setEnabledValue(event.detail.value as string);
    },
    [],
  );

  const handleDisabledValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setDisabledValue(event.detail.value as string);
    },
    [],
  );

  const handleReadonlyValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setReadonlyValue(event.detail.value as string);
    },
    [],
  );

  const handleRequiredValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setRequiredValue(event.detail.value as string);
    },
    [],
  );

  const handleHelpValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setHelpValue(event.detail.value as string);
    },
    [],
  );

  const handleErrorValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setErrorValue(event.detail.value as string);
    },
    [],
  );

  const handleWarningValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setWarningValue(event.detail.value as string);
    },
    [],
  );

  const handleInfoValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setInfoValue(event.detail.value as string);
    },
    [],
  );

  const handleConfirmationValueChanged = useCallback(
    (event: CInputSensitiveTextElement.valueChanged<string>) => {
      setConfirmationValue(event.detail.value as string);
    },
    [],
  );

  return (
    <div id="div1">
      <h4 className="oj-sm-padding-2x-bottom">
        States inside oj-c-form-layout
      </h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-sensitive-text labelHint="Enabled no value" />
        <oj-c-input-sensitive-text labelHint="Disabled no value" disabled />
        <oj-c-input-sensitive-text labelHint="Read only no value" readonly />
        <oj-c-input-sensitive-text
          value={enabledValue}
          labelHint="Enabled"
          onvalueChanged={handleEnabledValueChanged}
        />
        <oj-c-input-sensitive-text
          value={disabledValue}
          labelHint="Disabled"
          disabled
          onvalueChanged={handleDisabledValueChanged}
        />
        <oj-c-input-sensitive-text
          value={readonlyValue}
          labelHint="Read only"
          readonly
          onvalueChanged={handleReadonlyValueChanged}
        />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div className="oj-flex oj-sm-padding-2x-vertical">
        <div className="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            value={enabledValue}
            labelHint="enabled"
            labelEdge="inside"
            onvalueChanged={handleEnabledValueChanged}
          />
        </div>
        <div className="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            value={disabledValue}
            labelHint="disabled"
            labelEdge="inside"
            disabled={true}
            onvalueChanged={handleDisabledValueChanged}
          />
        </div>
        <div className="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            value={readonlyValue}
            labelHint="readonly"
            labelEdge="inside"
            readonly={true}
            onvalueChanged={handleReadonlyValueChanged}
          />
        </div>
      </div>
      <div className="oj-flex oj-sm-padding-2x-vertical">
        <div className="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            labelHint="enabled no value"
            labelEdge="inside"
          />
        </div>
        <div className="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            labelHint="disabled no value"
            labelEdge="inside"
            disabled={true}
          />
        </div>
        <div className="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            labelHint="readonly no value"
            labelEdge="inside"
            readonly={true}
          />
        </div>
      </div>

      <h4 className="oj-sm-margin-4x-top">Required</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-sensitive-text
          id="required-sensitive"
          required={true}
          labelHint="required"
          onvalueChanged={handleRequiredValueChanged}
        />
      </oj-c-form-layout>

      <h4 className="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-sensitive-text
          labelHint="help.instruction"
          onvalueChanged={handleHelpValueChanged}
        />
        <oj-c-input-sensitive-text
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
          onvalueChanged={handleHelpValueChanged}
        />
        <oj-c-input-sensitive-text
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
          onvalueChanged={handleHelpValueChanged}
        />
      </oj-c-form-layout>

      <h4 className="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-sensitive-text
          value={errorValue}
          labelHint="Error"
          messagesCustom={error as any}
          onvalueChanged={handleErrorValueChanged}
        />
        <oj-c-input-sensitive-text
          value={warningValue}
          labelHint="Warning"
          messagesCustom={warning as any}
          onvalueChanged={handleWarningValueChanged}
        />
        <oj-c-input-sensitive-text
          value={infoValue}
          labelHint="Information"
          messagesCustom={info as any}
          onvalueChanged={handleInfoValueChanged}
        />
        <oj-c-input-sensitive-text
          value={confirmationValue}
          labelHint="Confirmation"
          messagesCustom={confirmation as any}
          onvalueChanged={handleConfirmationValueChanged}
        />
      </oj-c-form-layout>
    </div>
  );
};
