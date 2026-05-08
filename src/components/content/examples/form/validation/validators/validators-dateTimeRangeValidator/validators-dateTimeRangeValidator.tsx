import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import AsyncDateTimeRangeValidator = require('ojs/ojasyncvalidator-datetimerange');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojdatetimepicker';
import 'ojs/ojformlayout';

type InputDateValue = string | undefined;
type InputDateChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-date'>['onvalueChanged']>
>[0];

const toIsoDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ValidatorsDateTimeRangeValidator = () => {
  const [dateValue1, setDateValue1] = useState<InputDateValue>('');
  const [dateValue2, setDateValue2] = useState<InputDateValue>('');
  const todayIsoDate = useMemo(() => toIsoDateString(new Date()), []);
  const milleniumStartIsoDate = '2000-01-01';
  const validators = useMemo(
    () => [
      new AsyncDateTimeRangeValidator({
        max: todayIsoDate,
        min: milleniumStartIsoDate,
        hint: {
          inRange: 'Custom Hint: Enter a date that falls in the current millennium.'
        },
        converter: new IntlDateTimeConverter({
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })
      })
    ],
    [todayIsoDate]
  );

  const handleDate1Changed = (event: InputDateChangedEvent) => {
    setDateValue1(event.detail.value ?? undefined);
  };

  const handleDate2Changed = (event: InputDateChangedEvent) => {
    setDateValue2(event.detail.value ?? undefined);
  };

  return (
    <oj-form-layout id="validator-example">
      <oj-input-date
        id="dateTimeRange1"
        value={dateValue1}
        onvalueChanged={handleDate1Changed}
        min="2000-01-01T08:00:00.000"
        help={{
          instruction:
            "help instruction - Enter a date that falls in the current millenium and not greater than today's date."
        }}
        max={todayIsoDate}
        labelHint="'min' and 'max' attributes"
      />
      <oj-input-date
        id="dateTimeRange2"
        value={dateValue2}
        onvalueChanged={handleDate2Changed}
        validators={validators}
        labelHint="'validators' attribute"
      />
    </oj-form-layout>
  );
};

export default ValidatorsDateTimeRangeValidator;
