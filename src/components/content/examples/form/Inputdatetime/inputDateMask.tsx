import { ComponentProps, h } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';

// CorePack component imports
import 'oj-c/input-date-mask';
import 'oj-c/form-layout';

// Type imports
import { CInputDateMaskElement } from 'oj-c/input-date-mask';
type InputTextProps = ComponentProps<"oj-input-text">;


export const InputDateMask = () => {
  // State for input values
  const [enabledValue, setEnabledValue] = useState<string>('2024-01-15');
  const [disabledValue, setDisabledValue] = useState<string>('2024-01-15');
  const [readonlyValue, setReadonlyValue] = useState<string>('2024-01-15');
  const [requiredValue, setRequiredValue] = useState<string>('2024-01-15');
  const [helpValue, setHelpValue] = useState<string>('2024-01-15');
  const [errorValue, setErrorValue] = useState<string>('2024-01-15');
  const [warningValue, setWarningValue] = useState<string>('2024-01-15');
  const [infoValue, setInfoValue] = useState<string>('2024-01-15');
  const [confirmationValue, setConfirmationValue] = useState<string>('2024-01-15');

  const helpHint: InputTextProps["helpHints"] = {
   definition: "Help hints definition",
   source: "https://www.oracle.com",
   };

  // Message configurations
  const error = useMemo(() => [{
    summary: 'Error message',
    detail: 'This is an error message',
    severity: 'error' as const
  }], []);

  const warning = useMemo(() => [{
    summary: 'Warning message',
    detail: 'This is a warning message',
    severity: 'warning' as const
  }], []);

  const info = useMemo(() => [{
    summary: 'Info message',
    detail: 'This is an info message',
    severity: 'info' as const
  }], []);

  const confirmation = useMemo(() => [{
    summary: 'Confirmation message',
    detail: 'This is a confirmation message',
    severity: 'confirmation' as const
  }], []);

  // Event handlers
  const handleEnabledValueChanged = useCallback((event: any) => {
    setEnabledValue(event.detail.value as string);
  }, []);

  const handleDisabledValueChanged = useCallback((event: any) => {
    setDisabledValue(event.detail.value as string);
  }, []);

  const handleReadonlyValueChanged = useCallback((event: any) => {
    setReadonlyValue(event.detail.value as string);
  }, []);

  const handleRequiredValueChanged = useCallback((event: any) => {
    setRequiredValue(event.detail.value as string);
  }, []);

  const handleHelpValueChanged = useCallback((event: any) => {
    setHelpValue(event.detail.value as string);
  }, []);

  const handleErrorValueChanged = useCallback((event: any) => {
    setErrorValue(event.detail.value as string);
  }, []);

  const handleWarningValueChanged = useCallback((event: any) => {
    setWarningValue(event.detail.value as string);
  }, []);

  const handleInfoValueChanged = useCallback((event: any) => {
    setInfoValue(event.detail.value as string);
  }, []);

  const handleConfirmationValueChanged = useCallback((event: any) => {
    setConfirmationValue(event.detail.value as string);
  }, []);

  return (
    <div id="inputDateMaskDemo">
      <h5>States</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-date-mask
          labelHint="Enabled"
          value={enabledValue}
          onvalueChanged={handleEnabledValueChanged}
        />
        <oj-c-input-date-mask
          labelHint="Disabled"
          value={disabledValue}
          disabled
          onvalueChanged={handleDisabledValueChanged}
        />
        <oj-c-input-date-mask
          labelHint="Read only"
          value={readonlyValue}
          readonly
          onvalueChanged={handleReadonlyValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Required</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-date-mask
          labelHint="Required"
          value={requiredValue}
          required
          onvalueChanged={handleRequiredValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Help Hints</h5>
      <oj-c-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-c-input-date-mask
          labelHint="Help Instruction"
          value={helpValue}
          helpHints={helpHint.definition as any}
          onvalueChanged={handleHelpValueChanged}
        />
        <oj-c-input-date-mask
          labelHint="Help Definition"
          value={helpValue}
          helpHints={helpHint.definition as any}
          onvalueChanged={handleHelpValueChanged}
        />
        <oj-c-input-date-mask
          labelHint="Help Source"
          value={helpValue}
          helpHints={helpHint.source as any}
          onvalueChanged={handleHelpValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-date-mask
          labelHint="Error"
          value={errorValue}
          messagesCustom={error as any}
          onvalueChanged={handleErrorValueChanged}
        />
        <oj-c-input-date-mask
          labelHint="Warning"
          value={warningValue}
          messagesCustom={warning as any}
          onvalueChanged={handleWarningValueChanged}
        />
        <oj-c-input-date-mask
          labelHint="Information"
          value={infoValue}
          messagesCustom={info as any}
          onvalueChanged={handleInfoValueChanged}
        />
        <oj-c-input-date-mask
          labelHint="Confirmation"
          value={confirmationValue}
          messagesCustom={confirmation as any}
          onvalueChanged={handleConfirmationValueChanged}
        />
      </oj-c-form-layout>
    </div>
  );
};