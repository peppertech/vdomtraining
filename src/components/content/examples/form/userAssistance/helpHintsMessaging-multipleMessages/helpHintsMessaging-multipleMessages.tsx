import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import Message = require('ojs/ojmessaging');
import 'ojs/ojbutton';
import 'ojs/ojoption';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
type ButtonsetValue = NonNullable<ComponentProps<'oj-buttonset-many'>['value']>;
type InputTextValue = ComponentProps<'oj-input-text'>['value'];
type TextAreaValue = ComponentProps<'oj-text-area'>['value'];
type InputNumberValue = ComponentProps<'oj-input-number'>['value'];
type ButtonsetChangedEvent = Parameters<NonNullable<ComponentProps<'oj-buttonset-many'>['onvalueChanged']>>[0];
type InputTextChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];
type TextAreaChangedEvent = Parameters<NonNullable<ComponentProps<'oj-text-area'>['onvalueChanged']>>[0];
type InputNumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];

const buildMessages = (severities: Message.SEVERITY_TYPE[]) =>
  severities.map(
    (severity) =>
      ({
          summary: `${severity} summary`,
          detail: `${severity} detail`,
          severity
      }) as Message
  );
export const HelpHintsMessagingMultipleMessages = () => {
  const [types, setTypes] = useState<ButtonsetValue>([]);
  const [textValue, setTextValue] = useState<InputTextValue>('');
  const [textAreaValue, setTextAreaValue] = useState<TextAreaValue>('');
  const [numberValue, setNumberValue] = useState<InputNumberValue>(null);
  const messages = useMemo(() => buildMessages(types), [types]);

  const handleTypesChanged = (event: ButtonsetChangedEvent) => {
      setTypes((event.detail.value ?? []) as ButtonsetValue);
  };

  const handleTextChanged = (event: InputTextChangedEvent) => {
      setTextValue(event.detail.value ?? '');
  };

  const handleTextAreaChanged = (event: TextAreaChangedEvent) => {
      setTextAreaValue(event.detail.value ?? '');
  };

  const handleNumberChanged = (event: InputNumberChangedEvent) => {
      setNumberValue(event.detail.value ?? null);
  };

  return (
      <div id="form-container">
            <div id="buttons-container">
                    <oj-buttonset-many id="severityCheckboxButtonSet" onvalueChanged={handleTypesChanged} value={types}>
                              <oj-option id="error" value="error">Error</oj-option>
                              <oj-option id="warning" value="warning">Warning</oj-option>
                              <oj-option id="info" value="info">Info</oj-option>
                              <oj-option id="confirmation" value="confirmation">Confirmation</oj-option>
                          </oj-buttonset-many>
                </div>
            <hr />
            <oj-form-layout maxColumns={2}>
                    <oj-input-text id="inputcontrol" onvalueChanged={handleTextChanged} value={textValue} messagesCustom={messages} labelHint="input" />
                    <oj-text-area id="textareacontrol" rows={6} onvalueChanged={handleTextAreaChanged} value={textAreaValue} messagesCustom={messages} labelHint="textarea" />
                    <oj-input-number id="spinnercontrol" max={5} min={0} step={1} onvalueChanged={handleNumberChanged} value={numberValue} messagesCustom={messages} labelHint="input number" />
                </oj-form-layout>
        </div>
    );
};

export default HelpHintsMessagingMultipleMessages;
