/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from 'preact/hooks';

// CorePack component imports
import 'oj-c/checkbox';
import 'oj-c/checkboxset';
import 'oj-c/collapsible';
import 'oj-c/form-layout';
import 'oj-c/input-date-mask';
import 'oj-c/input-date-picker';
import 'oj-c/input-date-text';
import 'oj-c/input-month-mask';
import 'oj-c/input-number';
import 'oj-c/input-password';
import 'oj-c/input-sensitive-text';
import 'oj-c/input-text';
import 'oj-c/input-time-mask';
import 'oj-c/labelled-link';
import 'oj-c/radioset';
import 'oj-c/rich-checkboxset';
import 'oj-c/rich-radioset';
import 'oj-c/select-multiple';
import 'oj-c/select-single';
import 'oj-c/text-area';

// Type imports
import { CInputMonthMaskElement } from 'oj-c/input-month-mask';
import { CInputTimeMaskElement } from 'oj-c/input-time-mask';

// Data provider
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';

type monthMaskValueType = CInputMonthMaskElement['value'];
type timeMaskValueType = CInputTimeMaskElement['value'];

type InputTextProps = ComponentProps<"oj-c-input-text">;
type InputPasswordProps = ComponentProps<"oj-c-input-password">;
type InputSensitiveTextProps = ComponentProps<"oj-c-input-sensitive-text">;
type InputNumberProps = ComponentProps<"oj-c-input-number">;
type InputDateMaskProps = ComponentProps<"oj-c-input-date-mask">;
type InputMonthMaskProps = ComponentProps<"oj-c-input-month-mask">;
type InputDateTextProps = ComponentProps<"oj-c-input-date-text">;
type InputDatePickerProps = ComponentProps<"oj-c-input-date-picker">;
type InputTimeMaskProps = ComponentProps<"oj-c-input-time-mask">;
type FormLayoutProps = ComponentProps<"oj-c-form-layout">;
type SelectSingleProps = ComponentProps<"oj-c-select-single">;
type SelectMultipleProps = ComponentProps<"oj-c-select-multiple">;
type TextAreaProps = ComponentProps<"oj-c-text-area">;
type RadiosetProps = ComponentProps<"oj-c-radioset">;
type CheckboxsetProps = ComponentProps<"oj-c-checkboxset">;
type RichCheckboxsetProps = ComponentProps<"oj-c-rich-checkboxset">;
type RichRadiosetProps = ComponentProps<"oj-c-rich-radioset">;
type CheckboxProps = ComponentProps<"oj-c-checkbox">;

type FormControlHelpHints = InputTextProps["helpHints"];
type ReadonlyUserAssistanceShownType = InputTextProps["readonlyUserAssistanceShown"];

type RadiosetValueChangedEvent = Parameters<NonNullable<RadiosetProps["onvalueChanged"]>>[0];
type CheckboxsetValueChangedEvent = Parameters<NonNullable<CheckboxsetProps["onvalueChanged"]>>[0];
type InputTextValueChangedEvent = Parameters<NonNullable<InputTextProps["onvalueChanged"]>>[0];
type InputPasswordValueChangedEvent = Parameters<NonNullable<InputPasswordProps["onvalueChanged"]>>[0];
type InputSensitiveTextValueChangedEvent = Parameters<NonNullable<InputSensitiveTextProps["onvalueChanged"]>>[0];
type InputNumberValueChangedEvent = Parameters<NonNullable<InputNumberProps["onvalueChanged"]>>[0];
type InputDateMaskValueChangedEvent = Parameters<NonNullable<InputDateMaskProps["onvalueChanged"]>>[0];
type InputMonthMaskValueChangedEvent = Parameters<NonNullable<InputMonthMaskProps["onvalueChanged"]>>[0];
type InputDateTextValueChangedEvent = Parameters<NonNullable<InputDateTextProps["onvalueChanged"]>>[0];
type InputDatePickerValueChangedEvent = Parameters<NonNullable<InputDatePickerProps["onvalueChanged"]>>[0];
type InputTimeMaskValueChangedEvent = Parameters<NonNullable<InputTimeMaskProps["onvalueChanged"]>>[0];
type SelectMultipleValueChangedEvent = Parameters<NonNullable<SelectMultipleProps["onvalueChanged"]>>[0];
type TextAreaValueChangedEvent = Parameters<NonNullable<TextAreaProps["onvalueChanged"]>>[0];
type RichCheckboxsetValueChangedEvent = Parameters<NonNullable<RichCheckboxsetProps["onvalueChanged"]>>[0];
type RichRadiosetValueChangedEvent = Parameters<NonNullable<RichRadiosetProps["onvalueChanged"]>>[0];
type CheckboxValueChangedEvent = Parameters<NonNullable<CheckboxProps["onvalueChanged"]>>[0];
type FormLayoutLabelEdge = NonNullable<FormLayoutProps["labelEdge"]>;

const hintDefinition: FormControlHelpHints = {
  definition: "help hints definition",
};
//hintDefinition. helpHintSource
const helpHintSource: FormControlHelpHints = {
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
  const [labelEdge, setLabelEdge] = useState<FormLayoutLabelEdge>('inside');
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
  const [label, setLabel] = useState<string>('short');
  const [controlsState, setControlsState] = useState<string>('enabled');
  const [readonlyUserAssistanceShown, setReadonlyUserAssistanceShown] = useState<ReadonlyUserAssistanceShownType>('none');

  // Form field values
  const [inputTextValue, setInputTextValue] = useState<string>('This is a form layout example');
  const [inputPasswordValue, setInputPasswordValue] = useState<InputPasswordProps['value']>('abrakadabra');
  const [inputSensitiveValue, setInputSensitiveValue] = useState<InputSensitiveTextProps['value']>('abrakadabra');
  const [inputNumberValue, setInputNumberValue] = useState<InputNumberProps['value']>(10);
  const [inputDateMaskValue, setInputDateMaskValue] = useState<InputDateMaskProps['value']>((IntlConverterUtils.dateToLocalIsoDateString(new Date(2026, 0, 1))) || '');
  const [inputMonthMaskValue, setInputMonthMaskValue] = useState<InputMonthMaskProps['value']>({year:2026, month:3} as monthMaskValueType);
  const [inputDateValue, setInputDateValue] = useState<InputDateTextProps['value']>('2026-03-01');
  const [inputDatePickerValue, setInputDatePickerValue] = useState<InputDatePickerProps['value']>((IntlConverterUtils.dateToLocalIsoDateString(new Date(2026, 0, 1))) || '');
  const [inputTimeMaskValue, setInputTimeMaskValue] = useState<InputTimeMaskProps['value']>('T20:11' as timeMaskValueType);
  const [selectMultipleValue, setSelectMultipleValue] = useState<SelectMultipleProps['value']>(new Set());
  const [textareaValue3, setTextareaValue3] = useState<TextAreaProps['value']>('textarea is a field that has rows so that a user can see more text than an input text without needing to scroll.');
  const [textareaValue3b, setTextareaValue3b] = useState<TextAreaProps['value']>('textarea is a field that has rows so that a user can see more text than an input text without needing to scroll.');
  const [textareaValue3c, setTextareaValue3c] = useState<TextAreaProps['value']>('textarea is a field that has rows so that a user can see more text than an input text without needing to scroll.');
  const [radioValue, setRadioValue] = useState<RadiosetProps['value']>('');
  const [checkboxsetValue, setCheckboxsetValue] = useState<CheckboxsetProps['value']>(['blueopt']);
  const [richCheckboxsetValue, setRichCheckboxsetValue] = useState<RichCheckboxsetProps['value']>(['automotive']);
  const [richRadiosetValue, setRichRadiosetValue] = useState<RichRadiosetProps['value']>('communications');
  const [checkboxValue, setCheckboxValue] = useState<CheckboxProps['value']>(false);

  const longTextValue = useMemo(
    () =>
      'This sample text is intentionally long so that every text box demonstrates how wrapping and scrolling behave when the user selects the long value option in the controls panel. It contains more than one hundred words and mirrors realistic form input such as customer notes, business descriptions, and extended comments that users might provide in enterprise applications. The content is written in plain language, but it is long enough to test layout density, label placement, and field rendering in different form states. You can switch between modes and observe how this value appears across input text and text area fields while the rest of the form controls continue to function as expected for validation, required indicators, and readonly or disabled settings.',
    []
  );

  // Computed values
  const columns = useMemo(() => parseInt(columnsString), [columnsString]);
  const maxColumns = useMemo(() => parseInt(maxColumnsString), [maxColumnsString]);
  const fullWidth = useMemo(() => fullWidthString === 'true', [fullWidthString]);
  const readonlyFormLayout = useMemo(() => formState === 'readonly', [formState]);
  const disableFormControls = useMemo(
    () => controlsState === 'disabled' || formState === 'disabled',
    [controlsState, formState]
  );
  const readonlyFormControls = useMemo(
    () => controlsState === 'readonly' || formState === 'readonly',
    [controlsState, formState]
  );
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
  const getLabelHint = useCallback(
    (baseLabel: string) => {
      if (label === 'none') {
        return undefined;
      }
      if (label === 'long') {
        return `${baseLabel} label is intentionally long to test form layout behavior across edge positions, wrapping, spacing, and responsiveness in this sample page`;
      }
      return baseLabel;
    },
    [label]
  );

  const labelHint1 = useMemo(() => getLabelHint('Input Text'), [getLabelHint]);
  const labelHint2 = useMemo(() => getLabelHint('Input Password'), [getLabelHint]);
  const labelHint2b = useMemo(() => getLabelHint('Input Sensitive Text'), [getLabelHint]);
  const labelHint4 = useMemo(() => getLabelHint('Input Number'), [getLabelHint]);
  const labelHint6 = useMemo(() => getLabelHint('Input Date Mask'), [getLabelHint]);
  const labelHint6a = useMemo(() => getLabelHint('Input Month Mask'), [getLabelHint]);
  const labelHint5 = useMemo(() => getLabelHint('Input Date Text'), [getLabelHint]);
  const labelHint20 = useMemo(() => getLabelHint('Input Date Picker'), [getLabelHint]);
  const labelHint7 = useMemo(() => getLabelHint('Input Time Mask'), [getLabelHint]);
  const labelHint19 = useMemo(() => getLabelHint('Select Single'), [getLabelHint]);
  const labelHint11a = useMemo(() => getLabelHint('Select Multiple'), [getLabelHint]);
  const labelHint3 = useMemo(() => getLabelHint('Text Area'), [getLabelHint]);
  const labelHint3b = useMemo(() => getLabelHint('Text Area Max Rows'), [getLabelHint]);
  const labelHint3c = useMemo(() => getLabelHint('Text Area Max Length'), [getLabelHint]);
  const labelHint14 = useMemo(() => getLabelHint('Radioset'), [getLabelHint]);
  const labelHint15 = useMemo(() => getLabelHint('Checkboxset'), [getLabelHint]);
  const labelHint16 = useMemo(() => getLabelHint('Labelled Link'), [getLabelHint]);
  const labelHint17 = useMemo(() => getLabelHint('Rich Checkboxset'), [getLabelHint]);
  const labelHint18 = useMemo(() => getLabelHint('Rich Radioset'), [getLabelHint]);
  const labelHint21 = useMemo(() => getLabelHint('Rich Radioset'), [getLabelHint]);
  const labelHint22 = useMemo(() => getLabelHint('Rich Checkboxset'), [getLabelHint]);

  // Event handlers
  const handleLabelEdgeChange = useCallback((event: RadiosetValueChangedEvent) => {
    setLabelEdge((event.detail.value || 'inside') as FormLayoutLabelEdge);
  }, []);

  const handleDirectionChange = useCallback((event: RadiosetValueChangedEvent) => {
    setDirection(event.detail.value || 'row');
  }, []);

  const handleColumnsChange = useCallback((event: RadiosetValueChangedEvent) => {
    setColumnsString(event.detail.value || '1');
  }, []);

  const handleMaxColumnsChange = useCallback((event: RadiosetValueChangedEvent) => {
    setMaxColumnsString(event.detail.value || '3');
  }, []);

  const handleFormStateChange = useCallback((event: RadiosetValueChangedEvent) => {
    setFormState(event.detail.value || 'enabled');
  }, []);

  const handleUserAssistanceDensityChange = useCallback((event: RadiosetValueChangedEvent) => {
    setUserAssistanceDensity(event.detail.value || 'efficient');
  }, []);

  const handleFullWidthChange = useCallback((event: RadiosetValueChangedEvent) => {
    setFullWidthString(event.detail.value || 'false');
  }, []);

  const handleValueLengthChange = useCallback((event: RadiosetValueChangedEvent) => {
    const newValueLength = event.detail.value || 'none';
    setValueLength(newValueLength);

    if (newValueLength === 'long') {
      setInputTextValue(longTextValue);
      setTextareaValue3(longTextValue);
      setTextareaValue3b(longTextValue);
      setTextareaValue3c(longTextValue);
    }
  }, [longTextValue]);

  const handleUserAssistanceChange = useCallback((event: CheckboxsetValueChangedEvent) => {
    setUserAssistanceBooleans(event.detail.value || []);
  }, []);

  const handleFormControlMessagesChange = useCallback((event: CheckboxsetValueChangedEvent) => {
    setFormControlMessages(event.detail.value || []);
  }, []);

  const handleLabelChange = useCallback((event: RadiosetValueChangedEvent) => {
    setLabel(event.detail.value || 'label');
  }, []);

  const handleControlsStateChange = useCallback((event: RadiosetValueChangedEvent) => {
    setControlsState(event.detail.value || 'enabled');
  }, []);

  const handleReadonlyUserAssistanceShownChange = useCallback((event: RadiosetValueChangedEvent) => {
    setReadonlyUserAssistanceShown((event.detail.value || 'none') as ReadonlyUserAssistanceShownType);
  }, []);

  // Form field event handlers
  const handleInputTextChange = useCallback((event: InputTextValueChangedEvent) => {
    setInputTextValue(event.detail.value || '');
  }, []);

  const handleInputPasswordChange = useCallback((event: InputPasswordValueChangedEvent) => {
    setInputPasswordValue(event.detail.value || '');
  }, []);

  const handleInputSensitiveChange = useCallback((event: InputSensitiveTextValueChangedEvent) => {
    setInputSensitiveValue(event.detail.value || '');
  }, []);

  const handleInputNumberChange = useCallback((event: InputNumberValueChangedEvent) => {
    setInputNumberValue((event.detail.value as InputNumberProps['value']));
  }, []);

  const handleInputDateMaskChange = useCallback((event: InputDateMaskValueChangedEvent) => {
    setInputDateMaskValue(event.detail.value || '');
  }, []);

  const handleInputMonthMaskChange = useCallback((event: InputMonthMaskValueChangedEvent) => {
    setInputMonthMaskValue((event.detail.value as InputMonthMaskProps['value']));
  }, []);

  const handleInputDateChange = useCallback((event: InputDateTextValueChangedEvent) => {
    setInputDateValue(event.detail.value || '');
  }, []);

  const handleInputDatePickerChange = useCallback((event: InputDatePickerValueChangedEvent) => {
    setInputDatePickerValue(event.detail.value || '');
  }, []);

  const handleInputTimeMaskChange = useCallback((event: InputTimeMaskValueChangedEvent) => {
    setInputTimeMaskValue(event.detail.value || '');
  }, []);

  const handleSelectMultipleChange = useCallback((event: SelectMultipleValueChangedEvent) => {
    const value = event.detail.value;
    setSelectMultipleValue(value instanceof Set ? value : new Set(Array.isArray(value) ? value : []));
  }, []);

  const handleTextarea3Change = useCallback((event: TextAreaValueChangedEvent) => {
    setTextareaValue3(event.detail.value || '');
  }, []);

  const handleTextarea3bChange = useCallback((event: TextAreaValueChangedEvent) => {
    setTextareaValue3b(event.detail.value || '');
  }, []);

  const handleTextarea3cChange = useCallback((event: TextAreaValueChangedEvent) => {
    setTextareaValue3c(event.detail.value || '');
  }, []);

  const handleRadioChange = useCallback((event: RadiosetValueChangedEvent) => {
    setRadioValue(event.detail.value || '');
  }, []);

  const handleCheckboxsetChange = useCallback((event: CheckboxsetValueChangedEvent) => {
    setCheckboxsetValue(event.detail.value || []);
  }, []);

  const handleRichRadioChange = useCallback((event: RichRadiosetValueChangedEvent) => {
    setRichRadiosetValue(event.detail.value || '');
  }, []);

  const handleRichCheckboxsetChange = useCallback((event: RichCheckboxsetValueChangedEvent) => {
    setRichCheckboxsetValue(event.detail.value || []);
  }, []);

  const handleCheckboxChange = useCallback((event: CheckboxValueChangedEvent) => {
    setCheckboxValue(event.detail.value || false);
  }, []);

  return (
    <div id="sampleDemo" class="demo-padding">
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
            labelEdge={labelEdge}
            columns={columns as ComponentProps<'oj-c-form-layout'>['columns']}
            maxColumns={maxColumns as ComponentProps<'oj-c-form-layout'>['maxColumns']}
            direction={direction as ComponentProps<'oj-c-form-layout'>['direction']}
            fullWidth={fullWidth}
            readonly={readonlyFormLayout}
            userAssistanceDensity={userAssistanceDensity as ComponentProps<'oj-c-form-layout'>['userAssistanceDensity']}
          >
            <oj-c-input-text
              id="f1"
              labelHint={labelHint1}
              placeholder={placeholder ? "placeholder text" : undefined}
              value={inputTextValue}
              disabled={disableFormControls}
              messagesCustom={messages as ComponentProps<'oj-c-input-text'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-input-password'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-input-sensitive-text'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-input-number'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-select-single'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-select-multiple'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-text-area'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-text-area'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-text-area'>['messagesCustom'] }
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
              messagesCustom={messages as ComponentProps<'oj-c-input-date-mask'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-input-month-mask'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-input-time-mask'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-input-date-text'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-input-date-picker'>['messagesCustom']}
              readonly={readonlyFormControls}
              readonlyUserAssistanceShown={readonlyUserAssistanceShownBool}
              required={required}
              helpHints={{ source, definition }}
              onvalueChanged={handleInputDatePickerChange}
            />

            <oj-c-checkbox
              id="f17"
              messagesCustom={messages as ComponentProps<'oj-c-checkbox'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-radioset'>['messagesCustom']}
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
              messagesCustom={messages as ComponentProps<'oj-c-checkboxset'>['messagesCustom']}
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