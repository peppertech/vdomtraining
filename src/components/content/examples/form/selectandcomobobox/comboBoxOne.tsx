import { h } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';
import 'ojs/ojselectcombobox';
import "ojs/ojformlayout";
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

export const ComboboxOneExample = () => {
  // State for various combobox-one components
  const [enabledValue, setEnabledValue] = useState<string>('Chrome');
  const [disabledValue, setDisabledValue] = useState<string>('Chrome');
  const [readonlyValue, setReadonlyValue] = useState<string>('Chrome');
  const [enabledNoValue, setEnabledNoValue] = useState<string>('');
  const [disabledNoValue, setDisabledNoValue] = useState<string>('');
  const [readonlyNoValue, setReadonlyNoValue] = useState<string>('');
  const [outsideEnabledValue, setOutsideEnabledValue] = useState<string>('Chrome');
  const [outsideDisabledValue, setOutsideDisabledValue] = useState<string>('Chrome');
  const [outsideReadonlyValue, setOutsideReadonlyValue] = useState<string>('Chrome');
  const [outsideEnabledNoValue, setOutsideEnabledNoValue] = useState<string>('');
  const [outsideDisabledNoValue, setOutsideDisabledNoValue] = useState<string>('');
  const [outsideReadonlyNoValue, setOutsideReadonlyNoValue] = useState<string>('');
  const [requiredValue, setRequiredValue] = useState<string>('Chrome');
  const [placeholderValue, setPlaceholderValue] = useState<string>('');
  const [disabledOptionValue, setDisabledOptionValue] = useState<string>('Chrome');

  // Data provider
  const browsersDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'Internet Explorer', label: 'Internet Explorer' },
    { value: 'Firefox', label: 'Firefox' },
    { value: 'Chrome', label: 'Chrome' },
    { value: 'Opera', label: 'Opera' },
    { value: 'Safari', label: 'Safari' }
  ], { keyAttributes: 'value' }), []);

  // Data provider with disabled option
  const browsersWithDisabledDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'Internet Explorer', label: 'Internet Explorer' },
    { value: 'Firefox', label: 'Firefox' },
    { value: 'Chrome', label: 'Chrome' },
    { value: 'Opera', label: 'Opera', disabled: true },
    { value: 'Safari', label: 'Safari' }
  ], { keyAttributes: 'value' }), []);

  // Messages
  const errorMessages = useMemo(() => [{ severity: 'error' as const, summary: 'Error message', detail: 'This is an error' }], []);
  const warningMessages = useMemo(() => [{ severity: 'warning' as const, summary: 'Warning message', detail: 'This is a warning' }], []);
  const infoMessages = useMemo(() => [{ severity: 'info' as const, summary: 'Info message', detail: 'This is info' }], []);
  const confirmationMessages = useMemo(() => [{ severity: 'confirmation' as const, summary: 'Confirmation message', detail: 'This is confirmation' }], []);

  // Event handlers
  const handleEnabledChanged = useCallback((event: any) => setEnabledValue(event.detail.value), []);
  const handleDisabledChanged = useCallback((event: any) => setDisabledValue(event.detail.value), []);
  const handleReadonlyChanged = useCallback((event: any) => setReadonlyValue(event.detail.value), []);
  const handleEnabledNoValueChanged = useCallback((event: any) => setEnabledNoValue(event.detail.value), []);
  const handleDisabledNoValueChanged = useCallback((event: any) => setDisabledNoValue(event.detail.value), []);
  const handleReadonlyNoValueChanged = useCallback((event: any) => setReadonlyNoValue(event.detail.value), []);
  const handleOutsideEnabledChanged = useCallback((event: any) => setOutsideEnabledValue(event.detail.value), []);
  const handleOutsideDisabledChanged = useCallback((event: any) => setOutsideDisabledValue(event.detail.value), []);
  const handleOutsideReadonlyChanged = useCallback((event: any) => setOutsideReadonlyValue(event.detail.value), []);
  const handleOutsideEnabledNoValueChanged = useCallback((event: any) => setOutsideEnabledNoValue(event.detail.value), []);
  const handleOutsideDisabledNoValueChanged = useCallback((event: any) => setOutsideDisabledNoValue(event.detail.value), []);
  const handleOutsideReadonlyNoValueChanged = useCallback((event: any) => setOutsideReadonlyNoValue(event.detail.value), []);
  const handleRequiredChanged = useCallback((event: any) => setRequiredValue(event.detail.value), []);
  const handlePlaceholderChanged = useCallback((event: any) => setPlaceholderValue(event.detail.value), []);
  const handleDisabledOptionChanged = useCallback((event: any) => setDisabledOptionValue(event.detail.value), []);

  return (
    <div id="containerDiv">
      <h4>States inside oj-form-layout</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-one
          id="combobox1"
          value={enabledValue}
          labelHint="enabled"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleEnabledChanged}
        />
        <oj-combobox-one
          id="combobox2"
          value={disabledValue}
          labelHint="disabled"
          disabled
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleDisabledChanged}
        />
        <oj-combobox-one
          id="combobox4"
          readonly
          value={readonlyValue}
          labelHint="readonly"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleReadonlyChanged}
        />
        <oj-combobox-one
          id="combobox5"
          labelHint="enabled no value"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleEnabledNoValueChanged}
        />
        <oj-combobox-one
          id="combobox6"
          labelHint="disabled no value"
          disabled
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleDisabledNoValueChanged}
        />
        <oj-combobox-one
          id="combobox7"
          readonly
          labelHint="readonly no value"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleReadonlyNoValueChanged}
        />
        <oj-combobox-one
          id="combobox3"
          value={disabledOptionValue}
          labelHint="disabled option item"
          options={browsersWithDisabledDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleDisabledOptionChanged}
        />
      </oj-form-layout>

      <h4>States outside of oj-form-layout</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one value={outsideEnabledValue} labelHint="enabled" labelEdge="inside" onvalueChanged={handleOutsideEnabledChanged}>
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one
            value={outsideDisabledValue}
            labelHint="disabled"
            labelEdge="inside"
            disabled
            onvalueChanged={handleOutsideDisabledChanged}>
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one
            readonly
            value={outsideReadonlyValue}
            labelHint="readonly"
            labelEdge="inside"
            onvalueChanged={handleOutsideReadonlyChanged}>
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one labelHint="enabled no value" labelEdge="inside" onvalueChanged={handleOutsideEnabledNoValueChanged}>
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one labelHint="disabled no value" disabled labelEdge="inside" onvalueChanged={handleOutsideDisabledNoValueChanged}>
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one readonly labelHint="readonly no value" labelEdge="inside" onvalueChanged={handleOutsideReadonlyNoValueChanged}>
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required & Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-one
          id="combobox8"
          value={requiredValue}
          required
          labelHint="required"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handleRequiredChanged}
        />
        <oj-combobox-one
          id="combobox9"
          labelHint="placeholder"
          placeholder="placeholder text"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          onvalueChanged={handlePlaceholderChanged}
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-one
          id="combobox10"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          help={{instruction: "help.instruction text"}}
          labelHint="help.instruction"
        />
        <oj-combobox-one
          id="combobox11"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          helpHints={{definition: "help-hints.definition text"}}
          labelHint="help-hints.definition"
        />
        <oj-combobox-one
          id="combobox12"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          helpHints={{source: "https://www.oracle.com"}}
          labelHint="help-hints.source"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-one
          id="combobox13"
          value={enabledValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={errorMessages}
          labelHint="error"
        />
        <oj-combobox-one
          id="combobox14"
          value={enabledValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={warningMessages}
          labelHint="warning"
        />
        <oj-combobox-one
          id="combobox15"
          value={enabledValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={infoMessages}
          labelHint="info"
        />
        <oj-combobox-one
          id="combobox16"
          value={enabledValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={confirmationMessages}
          labelHint="confirmation"
        />
      </oj-form-layout>
    </div>
  );
};

export default ComboboxOneExample;