import { h } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';
import 'oj-c/select-multiple';
import 'oj-c/form-layout';
import { CSelectMultipleElement } from 'oj-c/select-multiple';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import 'ojs/ojselectcombobox';
 import 'ojs/ojformlayout';

export const SelectMany = () => {
  // State for various select-many components (using arrays for legacy-style)
  const [enabledValue, setEnabledValue] = useState<string[]>(['Chrome', 'Safari']);
  const [disabledValue, setDisabledValue] = useState<string[]>(['Chrome', 'Safari']);
  const [readonlyValue, setReadonlyValue] = useState<string[]>(['Chrome', 'Safari']);
  const [enabledNoValue, setEnabledNoValue] = useState<string[]>([]);
  const [disabledNoValue, setDisabledNoValue] = useState<string[]>([]);
  const [readonlyNoValue, setReadonlyNoValue] = useState<string[]>([]);
  const [outsideEnabledValue, setOutsideEnabledValue] = useState<string[]>(['Chrome', 'Safari']);
  const [outsideDisabledValue, setOutsideDisabledValue] = useState<string[]>(['Chrome', 'Safari']);
  const [outsideReadonlyValue, setOutsideReadonlyValue] = useState<string[]>(['Chrome', 'Safari']);
  const [outsideEnabledNoValue, setOutsideEnabledNoValue] = useState<string[]>([]);
  const [outsideDisabledNoValue, setOutsideDisabledNoValue] = useState<string[]>([]);
  const [outsideReadonlyNoValue, setOutsideReadonlyNoValue] = useState<string[]>([]);
  const [requiredValue, setRequiredValue] = useState<string[]>([]);
  const [placeholderValue, setPlaceholderValue] = useState<string[]>([]);

  const [helpDefinitionValue, setHelpDefinitionValue] = useState<string[]>([]);
  const [helpSourceValue, setHelpSourceValue] = useState<string[]>([]);
  const [errorValue, setErrorValue] = useState<string[]>(['Chrome', 'Safari']);
  const [warningValue, setWarningValue] = useState<string[]>(['Chrome', 'Safari']);
  const [infoValue, setInfoValue] = useState<string[]>(['Chrome', 'Safari']);
  const [confirmationValue, setConfirmationValue] = useState<string[]>(['Chrome', 'Safari']);

  // Data provider
  const browsersDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'Internet Explorer', label: 'Internet Explorer' },
    { value: 'Firefox', label: 'Firefox' },
    { value: 'Chrome', label: 'Chrome' },
    { value: 'Opera', label: 'Opera' },
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

  const handleHelpDefinitionChanged = useCallback((event: any) => setHelpDefinitionValue(event.detail.value), []);
  const handleHelpSourceChanged = useCallback((event: any) => setHelpSourceValue(event.detail.value), []);
  const handleErrorChanged = useCallback((event: any) => setErrorValue(event.detail.value), []);
  const handleWarningChanged = useCallback((event: any) => setWarningValue(event.detail.value), []);
  const handleInfoChanged = useCallback((event: any) => setInfoValue(event.detail.value), []);
  const handleConfirmationChanged = useCallback((event: any) => setConfirmationValue(event.detail.value), []);

  return (
    <div id="containerDiv">
      <h4>States inside oj-form-layout</h4>
      <oj-form-layout max-columns="3" direction="row">
        <oj-select-many
          id="select"
          value={enabledValue}
          labelHint="enabled multi select"
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
        <oj-select-many
          id="select2"
          value={disabledValue}
          labelHint="disabled"
          disabled={true}
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
        <oj-select-many
          id="select3"
          readonly
          value={readonlyValue}
          labelHint="readonly"
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
        <oj-select-many
          id="select4"
          labelHint="enabled no value"
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
        <oj-select-many
          id="select5"
          labelHint="disabled no value"
          disabled={true}
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
        <oj-select-many
          id="select6"
          readonly
          label-hint="readonly no value"
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <h4>States outside of oj-form-layout</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-many value={outsideEnabledValue} label-hint="enabled" label-edge="inside">
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-select-many>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-many
            value={outsideDisabledValue}
            label-hint="disabled"
            label-edge="inside"
            disabled>
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-select-many>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-many
            readonly
            value={outsideReadonlyValue}
            label-hint="readonly"
            label-edge="inside">
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-select-many>
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-many label-hint="enabled no value" label-edge="inside">
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-select-many>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-many label-hint="disabled no value" disabled label-edge="inside">
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-select-many>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-many readonly label-hint="readonly no value" label-edge="inside">
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-select-many>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required and Placeholder</h4>
      <oj-form-layout max-columns="3" direction="row">
        <oj-select-many
          id="select7"
          //required="true"
          label-hint="required"
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
        <oj-select-many
          id="select8"
          label-hint="placeholder"
          placeholder="placeholder text"
          options={browsersDP}
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout max-columns="3" direction="row">
        <oj-select-many
          id="select9"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          //help.instruction="help.instruction text"
          label-hint="help.instruction"
        />
        <oj-select-many
          id="select10"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          //help-hints.definition="help-hints.definition text"
          label-hint="help-hints.definition"
        />
        <oj-select-many
          id="select11"
          options={browsersDP}
          class="oj-form-control-max-width-md"
          //help-hints.source="https://www.oracle.com"
          label-hint="help-hints.source"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout max-columns="3" direction="row">
        <oj-select-many
          id="select12"
          value={errorValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={errorMessages as any}
          label-hint="error"
        />
        <oj-select-many
          id="select13"
          value={warningValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={warningMessages as any}
          label-hint="warning"
        />
        <oj-select-many
          id="select14"
          value={infoValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={infoMessages as any}
          label-hint="info"
        />
        <oj-select-many
          id="select15"
          value={confirmationValue}
          options={browsersDP}
          class="oj-form-control-max-width-md"
          messagesCustom={confirmationMessages as any}
          label-hint="confirmation"
        />
      </oj-form-layout>
    </div>
  );
};
