import { ComponentProps, h } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';
import 'ojs/ojslider';
import 'ojs/ojformlayout';
type InputTextProps = ComponentProps<"oj-input-text">;

export const Slider = () => {
  // State for slider values
  const [horizontalValue, setHorizontalValue] = useState<number>(50);
  const [verticalValue, setVerticalValue] = useState<number>(50);
  const [helpValue, setHelpValue] = useState<number>(50);
  const [errorValue, setErrorValue] = useState<number>(50);
  const [warningValue, setWarningValue] = useState<number>(50);
  const [infoValue, setInfoValue] = useState<number>(50);
  const [confirmationValue, setConfirmationValue] = useState<number>(50);

  const helpHint: InputTextProps["helpHints"] = {
   definition: "Help hints definition",
   source: "https://www.oracle.com",
   };

  // Message configurations
  const error = useMemo(() => [{
    summary: 'Error message',
    detail: 'This is an error message',
    severity: 'error'
  }], []);

  const warning = useMemo(() => [{
    summary: 'Warning message',
    detail: 'This is a warning message',
    severity: 'warning'
  }], []);

  const info = useMemo(() => [{
    summary: 'Info message',
    detail: 'This is an info message',
    severity: 'info'
  }], []);

  const confirmation = useMemo(() => [{
    summary: 'Confirmation message',
    detail: 'This is a confirmation message',
    severity: 'confirmation'
  }], []);

  // Event handlers for value changes
  const handleHorizontalValueChanged = useCallback((event: any) => {
    setHorizontalValue(event.detail.value as number);
  }, []);

  const handleVerticalValueChanged = useCallback((event: any) => {
    setVerticalValue(event.detail.value as number);
  }, []);

  const handleHelpValueChanged = useCallback((event: any) => {
    setHelpValue(event.detail.value as number);
  }, []);

  const handleErrorValueChanged = useCallback((event: any) => {
    setErrorValue(event.detail.value as number);
  }, []);

  const handleWarningValueChanged = useCallback((event: any) => {
    setWarningValue(event.detail.value as number);
  }, []);

  const handleInfoValueChanged = useCallback((event: any) => {
    setInfoValue(event.detail.value as number);
  }, []);

  const handleConfirmationValueChanged = useCallback((event: any) => {
    setConfirmationValue(event.detail.value as number);
  }, []);

  return (
    <div id="div1">
      <h5 class="oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout max-columns="3" direction="row">
        <oj-slider
          min={0}
          max={100}
          value={horizontalValue}
          labelHint="Enabled"
          onvalueChanged={handleHorizontalValueChanged}
        />
        <oj-slider
          min={0}
          max={100}
          value={horizontalValue}
          labelHint="Disabled"
          disabled
        />
      </oj-form-layout>

      <oj-form-layout max-columns="3" direction="row">
        <oj-slider
          min={0}
          max={100}
          value={verticalValue}
          orientation="vertical"
          labelHint="Vertical Enabled"
          onvalueChanged={handleVerticalValueChanged}
        />
        <oj-slider
          min={0}
          max={100}
          value={verticalValue}
          orientation="vertical"
          labelHint="Vertical Disabled"
          disabled
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Help</h5>
      <oj-form-layout max-columns="3" direction="row" class="oj-sm-padding-2x-bottom">
        <oj-slider
          min={0}
          max={100}
          value={helpValue}
          labelHint="help.instruction"
          helpHints={helpHint.definition as any}
          onvalueChanged={handleHelpValueChanged}
        />
        <oj-slider
          min={0}
          max={100}
          value={helpValue}
          labelHint="help-hints.definition"
          helpHints={helpHint.definition as any}
          onvalueChanged={handleHelpValueChanged}
        />
        <oj-slider
          min={0}
          max={100}
          value={helpValue}
          labelHint="help-hints.source"
         helpHints={helpHint.source as any}
          onvalueChanged={handleHelpValueChanged}
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout max-columns="3" direction="row">
        <oj-slider
          min={0}
          max={100}
          value={errorValue}
          labelHint="Error"
          messagesCustom={error as any}
          onvalueChanged={handleErrorValueChanged}
        />
        <oj-slider
          min={0}
          max={100}
          value={warningValue}
          labelHint="Warning"
          messagesCustom={warning as any}
          onvalueChanged={handleWarningValueChanged}
        />
        <oj-slider
          min={0}
          max={100}
          value={infoValue}
          labelHint="Information"
          messagesCustom={info as any}
          onvalueChanged={handleInfoValueChanged}
        />
        <oj-slider
          min={0}
          max={100}
          value={confirmationValue}
          labelHint="Confirmation"
          messagesCustom={confirmation as any}
          onvalueChanged={handleConfirmationValueChanged}
        />
      </oj-form-layout>
    </div>
  );
};