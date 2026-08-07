import 'preact';
import { type ComponentProps } from 'preact';

import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import 'ojs/ojdatetimepicker';
import 'ojs/ojformlayout';
import { useMemo,useState } from 'preact/hooks';

type InputDateValue = ComponentProps<'oj-input-date'>['value'];
type InputDateTimeValue = ComponentProps<'oj-input-date-time'>['value'];
type InputTimeValue = ComponentProps<'oj-input-time'>['value'];

export default function ConvertersDateTimeConverter() {
  const [date, setDate] = useState<InputDateValue>(IntlConverterUtils.dateToLocalIsoDateString(new Date(2019, 2, 11)));
  const [datetime, setDatetime] = useState<InputDateTimeValue>(IntlConverterUtils.dateToLocalIso(new Date(2019, 0, 1)));
  const [time, setTime] = useState<InputTimeValue>('T18:00:00');

  const dateShortConverter = useMemo(() => new IntlDateTimeConverter({
      formatType: 'date',
      dateFormat: 'short'
  }), [date]);
  const dateTimeShortConverter = useMemo(() => new IntlDateTimeConverter({
      formatType: 'datetime',
      dateFormat: 'short',
      timeFormat: 'short'
  }), [datetime]);
  const timeFullConverter = useMemo(() => new IntlDateTimeConverter({
      formatType: 'time',
      timeFormat: 'full'
  }), [time]);
  const twoDigitTimeConverter = useMemo(() => new IntlDateTimeConverter({
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  }), []);
  const handleDatetimeValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-date-time'>['onvalueChanged']>>[0]) => {
    setDatetime((event.detail.value as InputDateTimeValue));
  };

  const handleTimeValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-time'>['onvalueChanged']>>[0]) => {
    setTime((event.detail.value as InputTimeValue));
  };

  return (
      <div id="datetime-converter-example">
            <h3 class="oj-header-border">Date and Time</h3>
            <p>Converts between locale specific date and time string and Date value.</p>
            <p />
            <b>Example 1</b>
            : Default converter on the input dateTime component demo (when
            <code class="prettyprint">converter</code>
            is not set).
            <oj-form-layout>
                    <oj-input-date-time id="datetime1" onvalueChanged={handleDatetimeValueChanged} value={datetime} labelHint="input datetime with default converter" />
                </oj-form-layout>
            <p />
            <b>Example 2</b>
            :
            <code class="prettyprint">IntlDateTimeConverter's</code>
            option is set to
            <code class="prettyprint">{`{formatType: 'datetime', dateFormat: 'short', timeFormat: 'short'}`}</code>
            .
            <oj-form-layout>
                    <oj-input-date-time id="datetime2" onvalueChanged={handleDatetimeValueChanged} value={datetime} converter={dateTimeShortConverter} labelHint="input datetime short" />
                </oj-form-layout>
            <h3 class="oj-header-border">Time</h3>
            <p>Converts between locale specific time string and Date value.</p>
            <p />
            <b>Example 1</b>
            : Default converter on the input time component demo (when
            <code class="prettyprint">converter</code>
            attribute is not set).
            <oj-form-layout>
                    <oj-input-time id="time1" onvalueChanged={handleTimeValueChanged} value={time} labelHint="input time with default converter" />
                </oj-form-layout>
            <p />
            <b>Example 2</b>
            :
            <code class="prettyprint">IntlDateTimeConverter's</code>
            option set to -
            <code class="prettyprint">{`{formatType: 'time', timeFormat: 'full'}`}</code>
            .
            <oj-form-layout>
                    <oj-input-time id="time2" onvalueChanged={handleTimeValueChanged} value={time} converter={timeFullConverter} labelHint="input time full" />
                </oj-form-layout>
            <p />
            <b>Example 3</b>
            :
            <code class="prettyprint">IntlDateTimeConverter's</code>
            option set to -
            <code class="prettyprint">{`{hour: '2-digit', minute: '2-digit', second: '2-digit'}`}</code>
            .
            <oj-form-layout>
                    <oj-input-time id="time3" onvalueChanged={handleTimeValueChanged} value={time} converter={twoDigitTimeConverter} labelHint="input time 2-digit" />
                </oj-form-layout>
        </div>
    );
}
