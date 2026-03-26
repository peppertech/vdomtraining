/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';
import { ComponentProps } from 'preact';

// CorePack component imports
import 'oj-c/form-layout';
import 'oj-c/collapsible';
import 'oj-c/radioset';
import 'oj-c/checkboxset';
import 'oj-c/input-text';
import 'oj-c/input-password';
import 'oj-c/input-sensitive-text';
import 'oj-c/input-number';
import 'oj-c/input-date-mask';
import 'oj-c/input-month-mask';
import 'oj-c/input-date-text';
import 'oj-c/input-date-picker';
import 'oj-c/input-time-mask';
import 'oj-c/select-single';
import 'oj-c/select-multiple';
import 'oj-c/text-area';
import 'oj-c/checkbox';
import 'oj-c/labelled-link';
import 'oj-c/rich-checkboxset';
import 'oj-c/rich-radioset';

// Type imports
import { CCollapsibleElement } from 'oj-c/collapsible';
import { CRadiosetElement } from 'oj-c/radioset';
import { CCheckboxsetElement } from 'oj-c/checkboxset';
import { CInputTextElement } from 'oj-c/input-text';
import { CInputPasswordElement } from 'oj-c/input-password';
import { CInputSensitiveTextElement } from 'oj-c/input-sensitive-text';
import { CInputNumberElement } from 'oj-c/input-number';
import { CInputDateMaskElement } from 'oj-c/input-date-mask';
import { CInputMonthMaskElement } from 'oj-c/input-month-mask';
import { CInputDateTextElement } from 'oj-c/input-date-text';
import { CInputDatePickerElement } from 'oj-c/input-date-picker';
import { CInputTimeMaskElement } from 'oj-c/input-time-mask';
import { CSelectSingleElement } from 'oj-c/select-single';
import { CSelectMultipleElement } from 'oj-c/select-multiple';
import { CTextAreaElement } from 'oj-c/text-area';
import { CCheckboxElement } from 'oj-c/checkbox';

// Data provider
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
//import { MutableArrayDataProvider } from 'ojs/ojmutablearraydataprovider';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';

type monthMaskValueType = CInputMonthMaskElement['value'];
type timeMaskValueType = CInputTimeMaskElement['value'];

type InputTextProps = ComponentProps<"oj-c-input-text">;

const hintDefinition: InputTextProps["helpHints"] = {
  definition: "help hints definition",
};
//hintDefinition. helpHintSource
const helpHintSource: InputTextProps["helpHints"] = {
  source: "https://www.oracle.com",
};

type RadiosetArrayDataItem = {
    value: string;
    label: string;
    assistiveText?: string;
    helpSourceLink?: string;
    helpSourceText?: string;
  };

 const setItems: RadiosetArrayDataItem[] = [
    { value: 'blueopt', label: 'Blue' },
    { value: 'greenopt', label: 'Green' },
    { value: 'redopt', label: 'Red' }
  ];
  

export const FormLayoutCorePack = () => {

  // Form layout control states
  const [labelEdge, setLabelEdge] = useState<string>('inside');
  const [direction, setDirection] = useState<string>('row');
  const [columnsString, setColumnsString] = useState<string>('3');
  const [maxColumnsString, setMaxColumnsString] = useState<string>('3');
  const [formState, setFormState] = useState<string>('enabled');
  const [userAssistanceDensity, setUserAssistanceDensity] = useState<string>('efficient');
  const [fullWidthString, setFullWidthString] = useState<string>('false');

  // Form controls options states
  const [valueLength, setValueLength] = useState<string>('none');
  const [userAssistanceBooleans, setUserAssistanceBooleans] = useState<string[]>([]);
  const [formControlMessages, setFormControlMessages] = useState<string[]>([]);
  const [label, setLabel] = useState<string>('label');
  const [controlsState, setControlsState] = useState<string>('enabled');
  const [readonlyUserAssistanceShown, setReadonlyUserAssistanceShown] = useState<string>('none');

  // Form field values
  const [inputTextValue, setInputTextValue] = useState<string>('This is a form layout example');
  const [inputPasswordValue, setInputPasswordValue] = useState<string>('abrakadabra');
  const [inputSensitiveValue, setInputSensitiveValue] = useState<string>('abrakadabra');
  const [inputNumberValue, setInputNumberValue] = useState<number | null>(10);
  const [inputDateMaskValue, setInputDateMaskValue] = useState<string>((IntlConverterUtils.dateToLocalIsoDateString(new Date(2026, 0, 1))) || '');
  const [inputMonthMaskValue, setInputMonthMaskValue] = useState<monthMaskValueType>({year:2026, month:3});
  const [inputDateValue, setInputDateValue] = useState<string>('2026-03-01');
  const [inputDatePickerValue, setInputDatePickerValue] = useState<string>((IntlConverterUtils.dateToLocalIsoDateString(new Date(2026, 0, 1))) || '');
  const [inputTimeMaskValue, setInputTimeMaskValue] = useState<timeMaskValueType>('T20:11');
  const [selectMultipleValue, setSelectMultipleValue] = useState<Set<string>>(new Set());
  const [textareaValue3, setTextareaValue3] = useState<string>('textarea is a field that has rows so that a user can see more text than an input text without needing to scroll.');
  const [textareaValue3b, setTextareaValue3b] = useState<string>('textarea is a field that has rows so that a user can see more text than an input text without needing to scroll.');
  const [textareaValue3c, setTextareaValue3c] = useState<string>('textarea is a field that has rows so that a user can see more text than an input text without needing to scroll.');
  const [radioValue, setRadioValue] = useState<string>('');
  const [checkboxsetValue, setCheckboxsetValue] = useState<string[]>(['blueopt']);
  const [richCheckboxsetValue, setRichCheckboxsetValue] = useState<string[]>(['automotive']);
  const [richRadiosetValue, setRichRadiosetValue] = useState<string>('communications');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  // Computed values
  const columns = useMemo(() => parseInt(columnsString), [columnsString]);
  const maxColumns = useMemo(() => parseInt(maxColumnsString), [maxColumnsString]);
  const fullWidth = useMemo(() => fullWidthString === 'true', [fullWidthString]);
  const readonlyFormLayout = useMemo(() => formState === 'readonly', [formState]);
  const disableFormControls = useMemo(() => formState === 'disabled', [formState]);
  const readonlyFormControls = useMemo(() => controlsState === 'readonly' || formState === 'readonly', [controlsState, formState]);
  const required = useMemo(() => userAssistanceBooleans.includes('Required'), [userAssistanceBooleans]);
  const showValue = useMemo(() => valueLength !== 'none', [valueLength]);
  const placeholder = useMemo(() => userAssistanceBooleans.includes('Placeholder'), [userAssistanceBooleans]);

  // Help hints
  const source = useMemo(() => userAssistanceBooleans.includes('source') ? 'Help source text' : undefined, [userAssistanceBooleans]);
  const definition = useMemo(() => userAssistanceBooleans.includes('definition') ? 'Definition text' : undefined, [userAssistanceBooleans]);
  const instruction = useMemo(() => userAssistanceBooleans.includes('instruction') ? 'Instruction text' : undefined, [userAssistanceBooleans]);

  // Messages
  const messages = useMemo(() => {
    const msgs = [];
    if (formControlMessages.includes('error')) {
      msgs.push({ severity: 'error', summary: 'Error message', detail: 'This is an error' });
    }
    if (formControlMessages.includes('warning')) {
      msgs.push({ severity: 'warning', summary: 'Warning message', detail: 'This is a warning' });
    }
    if (formControlMessages.includes('info')) {
      msgs.push({ severity: 'info', summary: 'Info message', detail: 'This is info' });
    }
    if (formControlMessages.includes('confirmation')) {
      msgs.push({ severity: 'confirmation', summary: 'Confirmation message', detail: 'This is confirmation' });
    }
    return msgs;
  }, [formControlMessages]);

  // Data providers and options
  const labelEdgeOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'inside', label: 'Inside' },
    { value: 'top', label: 'Top' },
    { value: 'start', label: 'Start' }
  ], { keyAttributes: 'value' }), []);

  const directionOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'row', label: 'Row' },
    { value: 'column', label: 'Column' }
  ], { keyAttributes: 'value' }), []);

  const columnsOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
  ], { keyAttributes: 'value' }), []);

  const maxColumnsOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
  ], { keyAttributes: 'value' }), []);

  const formStateOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'enabled', label: 'Enabled' },
    { value: 'readonly', label: 'Readonly' }
  ], { keyAttributes: 'value' }), []);

  const userAssistanceDensityOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'compact', label: 'Compact' },
    { value: 'efficient', label: 'Efficient' },
    { value: 'reflow', label: 'Reflow' }
  ], { keyAttributes: 'value' }), []);

  const fullWidthOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'true', label: 'True' },
    { value: 'false', label: 'False' }
  ], { keyAttributes: 'value' }), []);

  const valueLengthOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'none', label: 'None' },
    { value: 'short', label: 'Short' },
    { value: 'long', label: 'Long' }
  ], { keyAttributes: 'value' }), []);

  const userAssistanceOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'Placeholder', label: 'Placeholder' },
    { value: 'Required', label: 'Required' },
    { value: 'definition', label: 'help-hints.definition' },
    { value: 'source', label: 'help-hints.source' },
    { value: 'instruction', label: 'help.instruction' }
  ], { keyAttributes: 'value' }), []);

  const formControlMessagesOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'error', label: 'Error' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' },
    { value: 'confirmation', label: 'Confirmation' }
  ], { keyAttributes: 'value' }), []);

  const labelOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'short', label: 'Short' },
    { value: 'long', label: 'Long' }
  ], { keyAttributes: 'value' }), []);

  const controlsStateOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'enabled', label: 'Enabled' },
    { value: 'readonly', label: 'Readonly' },
    { value: 'disabled', label: 'Disabled' }
  ], { keyAttributes: 'value' }), []);

  const readonlyUserAssistanceShownOptionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'confirmationAndInfoMessages', label: 'confirmationAndInfoMessages' },
    { value: 'none', label: 'None' }
  ], { keyAttributes: 'value' }), []);

  const browsersDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'CH', label: 'Chrome' },
    { value: 'FF', label: 'Firefox' },
    { value: 'SF', label: 'Safari' },
    { value: 'IE', label: 'Internet Explorer' }
  ], { keyAttributes: 'value' }), []);

  const optionsDP = useMemo(() => new MutableArrayDataProvider([
    { value: 'blueopt', label: 'Blue' },
    { value: 'greenopt', label: 'Green' },
    { value: 'redopt', label: 'Red' }
  ], { keyAttributes: 'value' }), []);

  const richOptions = useMemo(() => [
    {
      value: 'automotive',
      label: 'Automotive',
      secondaryText: 'Industry category for automotive solutions'
    },
    {
      value: 'communications',
      label: 'Communications',
      secondaryText: 'Industry category for communication products'
    },
    {
      value: 'construction',
      label: 'Construction',
      secondaryText: 'Industry category for construction services'
    }
  ], []);

  // Computed readonly user assistance shown
  const readonlyUserAssistanceShownBool = useMemo(() => readonlyUserAssistanceShown === 'confirmationAndInfoMessages' ? 'confirmationAndInfoMessages' : 'none', [readonlyUserAssistanceShown]);

  // Computed disabled state for controls
  const formControlDisabledState = useMemo(() => formState === 'disabled' ? 'yes' : 'no', [formState]);

  // Label hints based on label state
  const labelHint1 = useMemo(() => label === 'label' ? 'Input Text' : undefined, [label]);
  const labelHint2 = useMemo(() => label === 'label' ? 'Input Password' : undefined, [label]);
  const labelHint2b = useMemo(() => label === 'label' ? 'Input Sensitive Text' : undefined, [label]);
  const labelHint4 = useMemo(() => label === 'label' ? 'Input Number' : undefined, [label]);
  const labelHint6 = useMemo(() => label === 'label' ? 'Input Date Mask' : undefined, [label]);
  const labelHint6a = useMemo(() => label === 'label' ? 'Input Month Mask' : undefined, [label]);
  const labelHint5 = useMemo(() => label === 'label' ? 'Input Date Text' : undefined, [label]);
  const labelHint20 = useMemo(() => label === 'label' ? 'Input Date Picker' : undefined, [label]);
  const labelHint7 = useMemo(() => label === 'label' ? 'Input Time Mask' : undefined, [label]);
  const labelHint19 = useMemo(() => label === 'label' ? 'Select Single' : undefined, [label]);
  const labelHint11a = useMemo(() => label === 'label' ? 'Select Multiple' : undefined, [label]);
  const labelHint3 = useMemo(() => label === 'label' ? 'Text Area' : undefined, [label]);
  const labelHint3b = useMemo(() => label === 'label' ? 'Text Area Max Rows' : undefined, [label]);
  const labelHint3c = useMemo(() => label === 'label' ? 'Text Area Max Length' : undefined, [label]);
  const labelHint14 = useMemo(() => label === 'label' ? 'Radioset' : undefined, [label]);
  const labelHint15 = useMemo(() => label === 'label' ? 'Checkboxset' : undefined, [label]);
  const labelHint16 = useMemo(() => label === 'label' ? 'Labelled Link' : undefined, [label]);
  const labelHint17 = useMemo(() => label === 'label' ? 'Rich Checkboxset' : undefined, [label]);
  const labelHint18 = useMemo(() => label === 'label' ? 'Rich Radioset' : undefined, [label]);
  const labelHint21 = useMemo(() => label === 'label' ? 'Rich Radioset' : undefined, [label]);
  const labelHint22 = useMemo(() => label === 'label' ? 'Rich Checkboxset' : undefined, [label]);

  // Event handlers
  const handleLabelEdgeChange = useCallback((event: any) => {
    setLabelEdge(event.detail.value || 'inside');
  }, []);

  const handleDirectionChange = useCallback((event: any) => {
    setDirection(event.detail.value || 'row');
  }, []);

  const handleColumnsChange = useCallback((event: any) => {
    setColumnsString(event.detail.value || '1');
  }, []);

  const handleMaxColumnsChange = useCallback((event: any) => {
    setMaxColumnsString(event.detail.value || '3');
  }, []);

  const handleFormStateChange = useCallback((event: any) => {
    setFormState(event.detail.value || 'enabled');
  }, []);

  const handleUserAssistanceDensityChange = useCallback((event: any) => {
    setUserAssistanceDensity(event.detail.value || 'efficient');
  }, []);

  const handleFullWidthChange = useCallback((event: any) => {
    setFullWidthString(event.detail.value || 'false');
  }, []);

  const handleValueLengthChange = useCallback((event: any) => {
    setValueLength(event.detail.value || 'none');
  }, []);

  const handleUserAssistanceChange = useCallback((event: any) => {
    setUserAssistanceBooleans(event.detail.value || []);
  }, []);

  const handleFormControlMessagesChange = useCallback((event: any) => {
    setFormControlMessages(event.detail.value || []);
  }, []);

  const handleLabelChange = useCallback((event: any) => {
    setLabel(event.detail.value || 'label');
  }, []);

  const handleControlsStateChange = useCallback((event: any) => {
    setControlsState(event.detail.value || 'enabled');
  }, []);

  const handleReadonlyUserAssistanceShownChange = useCallback((event: any) => {
    setReadonlyUserAssistanceShown(event.detail.value || false);
  }, []);

  // Form field event handlers
  const handleInputTextChange = useCallback((event: any) => {
    setInputTextValue(event.detail.value || '');
  }, []);

  const handleInputPasswordChange = useCallback((event: any) => {
    setInputPasswordValue(event.detail.value || '');
  }, []);

  const handleInputSensitiveChange = useCallback((event: any) => {
    setInputSensitiveValue(event.detail.value || '');
  }, []);

  const handleInputNumberChange = useCallback((event: any) => {
    setInputNumberValue(event.detail.value);
  }, []);

  const handleInputDateMaskChange = useCallback((event: any) => {
    setInputDateMaskValue(event.detail.value || '');
  }, []);

  const handleInputMonthMaskChange = useCallback((event: any) => {
    setInputMonthMaskValue(event.detail.value || '');
  }, []);

  const handleInputDateChange = useCallback((event: any) => {
    setInputDateValue(event.detail.value || '');
  }, []);

  const handleInputDatePickerChange = useCallback((event: any) => {
    setInputDatePickerValue(event.detail.value || '');
  }, []);

  const handleInputTimeMaskChange = useCallback((event: any) => {
    setInputTimeMaskValue(event.detail.value || '');
  }, []);

  const handleSelectMultipleChange = useCallback((event: any) => {
    const value = event.detail.value;
    setSelectMultipleValue(value instanceof Set ? value : new Set(Array.isArray(value) ? value : []));
  }, []);

  const handleTextarea3Change = useCallback((event: any) => {
    setTextareaValue3(event.detail.value || '');
  }, []);

  const handleTextarea3bChange = useCallback((event: any) => {
    setTextareaValue3b(event.detail.value || '');
  }, []);

  const handleTextarea3cChange = useCallback((event: any) => {
    setTextareaValue3c(event.detail.value || '');
  }, []);

  const handleRadioChange = useCallback((event: any) => {
    setRadioValue(event.detail.value || '');
  }, []);

  const handleCheckboxsetChange = useCallback((event: any) => {
    setCheckboxsetValue(event.detail.value || []);
  }, []);

  const handleRichRadioChange = useCallback((event: any) => {
    setRichRadiosetValue(event.detail.value || '');
  }, []);

  const handleRichCheckboxsetChange = useCallback((event: any) => {
    setRichCheckboxsetValue(event.detail.value || []);
  }, []);

  const handleCheckboxChange = useCallback((event: any) => {
    setCheckboxValue(event.detail.value || false);
  }, []);

  return (
    <div id="sampleDemo" class="demo-padding demo-container">
      <div id="componentDemoContent" style="width: 1px; min-width: 100%;">
        <div id="form-container">
          <oj-c-collapsible expanded={true}>
            <h6 slot="header">Options To Control The Form Layout Below</h6>
            <div class="oj-panel oj-bg-info-30">
              <oj-c-form-layout
                id="formLayoutOptions"
                maxColumns={4}
                direction="row"
                user-assistance-density="compact"
              >
                <oj-c-radioset
                  labelHint="Label Edge"
                  value={labelEdge}
                  onvalueChanged={handleLabelEdgeChange}
                  options={labelEdgeOptionsDP}
                />
                <oj-c-radioset
                  labelHint="Direction"
                  value={direction}
                  onvalueChanged={handleDirectionChange}
                  options={directionOptionsDP}
                />
                <oj-c-radioset
                  labelHint="Columns"
                  value={columnsString}
                  onvalueChanged={handleColumnsChange}
                  options={columnsOptionsDP}
                />
                <oj-c-radioset
                  labelHint="Max Columns"
                  value={maxColumnsString}
                  onvalueChanged={handleMaxColumnsChange}
                  options={maxColumnsOptionsDP}
                />
                <oj-c-radioset
                  labelHint="State"
                  id="flSeverityCheckboxButtonSet"
                  value={formState}
                  onvalueChanged={handleFormStateChange}
                  disabled={formControlDisabledState === 'yes'}
                  options={formStateOptionsDP}
                />
                <oj-c-radioset
                  labelHint="User Assistance Density"
                  id="userAssistance"
                  value={userAssistanceDensity}
                  onvalueChanged={handleUserAssistanceDensityChange}
                  options={userAssistanceDensityOptionsDP}
                />
                <oj-c-radioset
                  labelHint="Full Width"
                  id="fullWidth"
                  value={fullWidthString}
                  onvalueChanged={handleFullWidthChange}
                  options={fullWidthOptionsDP}
                />
              </oj-c-form-layout>
            </div>
          </oj-c-collapsible>

          <oj-c-collapsible expanded={true} class="oj-sm-margin-4x-bottom">
            <h6 slot="header">Options To Control the Form Controls Below</h6>
            <div class="oj-panel oj-bg-info-30">
              <oj-c-form-layout
                id="formOptions"
                max-columns="4"
                direction="row"
                userAssistanceDensity="efficient"
              >
                <oj-c-radioset
                  label-hint="Value"
                  id="valueradio"
                  value={valueLength}
                  onvalueChanged={handleValueLengthChange}
                  options={valueLengthOptionsDP}
                />
                <oj-c-checkboxset
                  labelHint="User Assistance"
                  id="booleans"
                  value={userAssistanceBooleans}
                  onvalueChanged={handleUserAssistanceChange}
                  options={userAssistanceOptionsDP}
                />
                <oj-c-checkboxset
                  labelHint="Messages"
                  value={formControlMessages}
                  onvalueChanged={handleFormControlMessagesChange}
                  disabled={formState === 'disabled'}
                  options={formControlMessagesOptionsDP}
                />
                <oj-c-radioset
                  id="labelsradio"
                  labelHint="Label"
                  value={label}
                  onvalueChanged={handleLabelChange}
                  options={labelOptionsDP}
                />
                <oj-c-radioset
                  id="formStateDisabledCBS"
                  value={controlsState}
                  labelHint="State"
                  onvalueChanged={handleControlsStateChange}
                  disabled={formState !== 'enabled'}
                  options={controlsStateOptionsDP}
                />
                <oj-c-radioset
                  id="readonlyUserAssistanceShownRadio"
                  labelHint="readonlyUserAssistanceShown"
                  value={readonlyUserAssistanceShown}
                  onvalueChanged={handleReadonlyUserAssistanceShownChange}
                  options={readonlyUserAssistanceShownOptionsDP}
                />
              </oj-c-form-layout>
            </div>
          </oj-c-collapsible>

          <h6>Controls frequently used in a form layout</h6>
          <oj-c-form-layout
            id="myform"
            labelEdge={labelEdge as any}
            columns={columns as any}
            maxColumns={maxColumns as any}
            direction={direction as any}
            fullWidth={fullWidth}
            readonly={readonlyFormLayout}
            userAssistanceDensity={userAssistanceDensity as any}
          >
            <oj-c-input-text
              id="f1"
              labelHint={labelHint1}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={inputTextValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              readonly={readonlyFormControls}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputTextChange}
            />
            <oj-c-input-password
              id="f2"
              labelHint={labelHint2}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={inputPasswordValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputPasswordChange}
            />
             <oj-c-input-sensitive-text
              id="f2b"
              labelHint={labelHint2b}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={inputSensitiveValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputSensitiveChange}
            />
            <oj-c-input-number
              id="f4"
              labelHint={labelHint4}
              max={100}
              min={0}
              step={10}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={inputNumberValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
             readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputNumberChange}
            />
            
            <oj-c-select-single
              id="f12"
              labelHint={labelHint19}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={valueLength === 'long' ? 'IE' : valueLength === 'short' ? 'CH' : undefined}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              data={browsersDP}
              itemText="label"
            />
            <oj-c-select-multiple
              id="selectMultiple1"
              labelHint={labelHint11a}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={selectMultipleValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              data={browsersDP}
              itemText="label"
              onvalueChanged={handleSelectMultipleChange}
            />
            <oj-c-text-area
              id="f3"
              labelHint={labelHint3}
              rows={4}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={textareaValue3}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleTextarea3Change}
            />
             <oj-c-text-area
              id="f3b"
              labelHint={labelHint3b}
              maxRows={-1}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={textareaValue3b}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleTextarea3bChange}
            />
            <oj-c-text-area
              id="f3c"
              labelHint={labelHint3c}
              rows={4}
              length={{ max: 300 }}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={textareaValue3c}
              disabled={disableFormControls}
              messagesCustom={messages as any }
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleTextarea3cChange}
            />

             <oj-c-input-date-mask
              id="f6"
              labelHint={labelHint6}
              value={inputDateMaskValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputDateMaskChange}
            />
            <oj-c-input-month-mask
              id="f6a"
              labelHint={labelHint6a}
              value={inputMonthMaskValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputMonthMaskChange}
            />

            <oj-c-input-time-mask
              id="f7"
              labelHint={labelHint7}
              value={inputTimeMaskValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputTimeMaskChange}
            />
             <oj-c-input-date-text
              id="f5"
              labelHint={labelHint5}
              value={inputDateValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputDateChange}
            />
             <oj-c-input-date-picker
              id="f20"
              labelHint={labelHint20}
              value={inputDatePickerValue}
              disabled={disableFormControls}
              messagesCustom={messages as any}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputDatePickerChange}
            />

            <oj-c-checkbox
              id="f17"
              messagesCustom={messages as any}
              value={showValue ? checkboxValue : false}
              disabled={disableFormControls}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleCheckboxChange}
            >
              I Agree
            </oj-c-checkbox>

             <oj-c-radioset
              id="f15"
              labelHint={labelHint14}
              messagesCustom={messages as any}
              value={showValue ? radioValue : undefined}
              disabled={disableFormControls}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              options={optionsDP}
              helpHints={{ source, definition }}
              onvalueChanged={handleRadioChange}
            />
            <oj-c-checkboxset
              id="f16"
              labelHint={labelHint15}
              messagesCustom={messages as any}
              value={showValue ? checkboxsetValue : undefined}
              disabled={disableFormControls}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              options={optionsDP}
              helpHints={{ definition, source }}
              onvalueChanged={handleCheckboxsetChange}
            />
            <oj-c-labelled-link
              id="f18"
              labelHint={labelHint16}
              href="https://www.oracle.com"
              text="Visit Oracle"
              target="_blank"
            />
            <oj-c-rich-checkboxset
              id="f19"
              layout="md"
              labelHint={labelHint17}
              value={showValue ? richCheckboxsetValue : undefined}
              options={richOptions}
              disabled={disableFormControls}
              readonly={readonlyFormControls}
              required={required}
              onvalueChanged={handleRichCheckboxsetChange}
            />
            <oj-c-rich-radioset
              id="f21"
              layout="md"
              labelHint={labelHint18}
              value={showValue ? richRadiosetValue : undefined}
              options={richOptions}
              disabled={disableFormControls}
              readonly={readonlyFormControls}
              required={required}
              onvalueChanged={handleRichRadioChange}
            />

          
          </oj-c-form-layout>

          
         
        </div>
      </div>
    </div>
  );
};