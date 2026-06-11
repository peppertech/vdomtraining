import { h, type ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'oj-c/input-number';
import 'oj-c/input-text';
import 'oj-c/select-single';
import 'oj-c/text-area';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojoption';

type ButtonsetChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-many'>['onvalueChanged']>
>[0];
type InputTextChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type TextAreaChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-text-area'>['onvalueChanged']>
>[0];
type InputNumberChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];
type SelectSingleChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-select-single'>['onvalueChanged']>
>[0];
type InputTextMessagesCustom = ComponentProps<'oj-c-input-text'>['messagesCustom'];
type InputTextMessage = NonNullable<InputTextMessagesCustom>[number];
type SeverityValue = InputTextMessage['severity'];
type ButtonsetValue = NonNullable<ComponentProps<'oj-buttonset-many'>['value']>;
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type TextAreaValue = ComponentProps<'oj-c-text-area'>['value'];
type InputNumberValue = ComponentProps<'oj-c-input-number'>['value'];
type SelectSingleValue = ComponentProps<'oj-c-select-single'>['value'];

type MessageOption = {
  value: SeverityValue;
  label: string;
};

const messageOptions: MessageOption[] = [
  { value: 'error', label: 'Error' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'confirmation', label: 'Confirmation' }
];

const buildMessages = (severities: SeverityValue[]): InputTextMessagesCustom => {
  return severities.map((severity) => ({
    summary: `${severity} summary`,
    detail: `${severity} detail`,
    severity
  }));
};

export const HelpHintsMessagingMultipleMessagesInline = () => {
  const [types, setTypes] = useState<ButtonsetValue>([]);
  const [textValue, setTextValue] = useState<InputTextValue>('');
  const [textAreaValue, setTextAreaValue] = useState<TextAreaValue>('');
  const [numberValue, setNumberValue] = useState<InputNumberValue>(null);
  const [selectValue, setSelectValue] = useState<SelectSingleValue>(undefined);
  const messages = useMemo(() => buildMessages(types), [types]);
  const customMessageDP = useMemo(
    () =>
      new ArrayDataProvider<MessageOption['value'], MessageOption>(messageOptions, {
        keyAttributes: 'value'
      }),
    []
  );

  const handleTypesChanged = (event: ButtonsetChangedEvent) => {
    setTypes((event.detail.value ?? []) as ButtonsetValue);
  };

  const handleTextChanged = (event: InputTextChangedEvent) => {
    setTextValue((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleTextAreaChanged = (event: TextAreaChangedEvent) => {
    setTextAreaValue((event.detail.value as TextAreaValue | null | undefined) ?? '');
  };

  const handleNumberChanged = (event: InputNumberChangedEvent) => {
    setNumberValue((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  const handleSelectChanged = (event: SelectSingleChangedEvent) => {
    setSelectValue((event.detail.value as SelectSingleValue));
  };

  return (
    <div id="form-container">
      <div id="buttons-container">
        <oj-buttonset-many
          id="severityCheckboxButtonSet"
          onvalueChanged={handleTypesChanged}
          value={types}
        >
          <oj-option id="error" value="error">
            Error
          </oj-option>
          <oj-option id="warning" value="warning">
            Warning
          </oj-option>
          <oj-option id="info" value="info">
            Info
          </oj-option>
          <oj-option id="confirmation" value="confirmation">
            Confirmation
          </oj-option>
        </oj-buttonset-many>
      </div>
      <hr />
      <oj-form-layout maxColumns={2}>
        <oj-c-input-text
          id="inputcontrol"
          onvalueChanged={handleTextChanged}
          value={textValue}
          messagesCustom={messages}
          labelHint="input"
        />
        <oj-c-text-area
          id="textareacontrol"
          rows={6}
          onvalueChanged={handleTextAreaChanged}
          value={textAreaValue}
          messagesCustom={messages}
          labelHint="textarea"
        />
        <oj-c-input-number
          id="spinnercontrol"
          max={5}
          min={0}
          step={1}
          onvalueChanged={handleNumberChanged}
          value={numberValue}
          messagesCustom={messages}
          labelHint="input number"
        />
        <oj-c-select-single
          id="select"
          onvalueChanged={handleSelectChanged}
          value={selectValue}
          messagesCustom={messages}
          labelHint="select single"
          itemText="label"
          data={customMessageDP}
        />
      </oj-form-layout>
    </div>
  );
};

export default HelpHintsMessagingMultipleMessagesInline;
