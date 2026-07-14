import 'ojs/ojdatetimepicker';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import AsyncLengthValidator = require('ojs/ojasyncvalidator-length');
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');

type InputTextChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>
>[0];
type InputNumberChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>
>[0];
type InputDateChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-date'>['onvalueChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-input-text'>['value'];
type InputNumberValue = ComponentProps<'oj-input-number'>['value'];
type InputDateValue = string | undefined;

export const ValidatorsDefaultValidatorMessages = () => {
  const localIsoDate = '2019-12-08';
  const [value, setValue] = useState<InputTextValue>('hi');
  const [lengthValue, setLengthValue] = useState<InputTextValue>('');
  const [regExpValue1, setRegExpValue1] = useState<InputTextValue>('');
  const [numberRangeValue, setNumberRangeValue] = useState<InputNumberValue>(null);
  const [dateValue1, setDateValue1] = useState<InputDateValue>(localIsoDate);
  const [dateValue2, setDateValue2] = useState<InputDateValue>(localIsoDate);
  const [dateValue3, setDateValue3] = useState<InputDateValue>('2020-01-01');
  const minDay = '2019-12-08';
  const maxDay = '2019-12-12';

  const lengthValidators = useMemo(
    () => [new AsyncLengthValidator({ min: 5, max: 10 })],
    []
  );
  const regExpValidators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z0-9]{3,}'
      })
    ],
    []
  );
  const dayFormatter = useMemo(
    () => (dateInfo: { month: number; date: number; fullYear: number }) => {
      if (dateInfo.fullYear === 2020 && dateInfo.month === 1 && dateInfo.date !== 1) {
        return { disabled: true };
      }
      return {};
    },
    []
  );

  return (
    <oj-form-layout id="validator-example">
      <span>
        Set focus to see the datepicker and its enabled dates when min and max are different. Type a
        value out of range and step off the field to see the default error message.
      </span>
      <oj-input-date
        id="dateTimeRange1"
        value={dateValue1}
        onvalueChanged={(event: InputDateChangedEvent) => setDateValue1((event.detail.value as InputDateValue | null | undefined) ?? undefined)}
        min={minDay}
        max={maxDay}
        labelHint="DateTimeRangeValidator"
      />
      <hr />
      <span>
        Set focus to see the datepicker and its enabled dates when min and max are equal. Type a
        value out of range and step off the field to see the default error message.
      </span>
      <oj-input-date
        id="dateTimeRange2"
        value={dateValue2}
        onvalueChanged={(event: InputDateChangedEvent) => setDateValue2((event.detail.value as InputDateValue | null | undefined) ?? undefined)}
        min={minDay}
        max={minDay}
        labelHint="DateTimeRangeValidator min==max"
      />
      <hr />
      <span>
        oj-input-date&apos;s day-formatter attribute is used to disable the invalid dates and cause
        validation errors if they are typed in. Set focus to see the datepicker and its enabled dates.
        Type a value out of range and step off the field to see the default error message.
      </span>
      <oj-input-date
        id="foolsErrand3"
        value={dateValue3}
        onvalueChanged={(event: InputDateChangedEvent) => setDateValue3((event.detail.value as InputDateValue | null | undefined) ?? undefined)}
        labelHint="DateRestrictionValidator"
        dayFormatter={dayFormatter}
      />
      <hr />
      <span>
        Set focus to see default hint. Type a value out of range and step off the field to see the
        default error message.
      </span>
      <oj-input-number
        id="numberrangeinputnumber"
        value={numberRangeValue}
        onvalueChanged={(event: InputNumberChangedEvent) => setNumberRangeValue((event.detail.value as InputNumberValue | null | undefined) ?? null)}
        min={10}
        max={10000}
        autocomplete="off"
        labelHint="NumberRangeValidator"
      />
      <hr />
      <span>
        Set focus to see default hint when min and max are equal. Type a value out of range and step off
        the field to see the default error message.
      </span>
      <oj-input-number
        id="numberrangeinputnumber2"
        min={2}
        max={2}
        autocomplete="off"
        labelHint="NumberRangeValidator min==max"
      />
      <hr />
      <span>Clear the value and step off the field to see the error.</span>
      <oj-input-text
        id="requiredinput"
        value={value}
        onvalueChanged={(event: InputTextChangedEvent) => setValue((event.detail.value as InputTextValue | null | undefined) ?? '')}
        required
        autocomplete="off"
        labelHint="RequiredValidator"
      />
      <hr />
      <span>
        Set focus to see default hint. Type a value out of range and step off the field to see the
        default error message.
      </span>
      <oj-input-text
        id="length1"
        value={lengthValue}
        onvalueChanged={(event: InputTextChangedEvent) => setLengthValue((event.detail.value as InputTextValue | null | undefined) ?? '')}
        validators={lengthValidators}
        autocomplete="off"
        labelHint="LengthValidator"
      />
      <hr />
      <span>
        Enter 1 and step off the field to see the error. The RegExpValidator has no default hint, and
        the default message shows the regexp pattern, so it is highly recommended to pass in a hint and
        messageDetail when creating a RegExpValidator.
      </span>
      <oj-input-text
        id="regexp1"
        value={regExpValue1}
        onvalueChanged={(event: InputTextChangedEvent) => setRegExpValue1((event.detail.value as InputTextValue | null | undefined) ?? '')}
        validators={regExpValidators}
        autocomplete="off"
        labelHint="RegExpValidator"
      />
    </oj-form-layout>
  );
};

export default ValidatorsDefaultValidatorMessages;
