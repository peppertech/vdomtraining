import { h, type ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import type { ojInputText } from 'ojs/ojinputtext';
import 'ojs/ojbutton';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>
>[0];
export const ValidationUsecasesRefreshMethod = () => {
  const inputRef = useRef<ojInputText | null>(null);
  const [userName, setUserName] = useState('');
  const [labelText, setLabelText] = useState('Username');
  const userNameValidators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z]{3,}',
        messageDetail: '{label} field requires at least 3 characters.'
      })
    ],
    []
  );

  const handleUserNameChanged = (event: InputTextValueChangedEvent) => {
    setUserName((event.detail.value as string | null | undefined) ?? '');
  };

  const handleChangeLabel = () => {
    setLabelText('USERNAME');
    inputRef.current?.refresh();
  };

  return (
    <div id="validation-usecase">
      <oj-label for="username" showRequired>
        <span id="labeltext">{labelText}</span>
      </oj-label>
      <oj-input-text
        ref={inputRef}
        id="username"
        autocomplete="off"
        required
        value={userName}
        onvalueChanged={handleUserNameChanged}
        validators={userNameValidators}
        translations={{
          required: {
            messageSummary: 'Custom: {label} Required',
            messageDetail: 'Custom: A value is required for the {label} field.'
          }
        }}
      />

      <span id="val">[Component Value: {userName}]</span>

      <div>
        <oj-button id="changeLabel" onojAction={handleChangeLabel}>
          Change Label and Refresh
        </oj-button>
      </div>
    </div>
  );
};

export default ValidationUsecasesRefreshMethod;
