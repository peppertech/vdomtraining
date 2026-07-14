import 'ojs/ojcolor';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatetimepicker';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ColorConverter = require('ojs/ojconverter-color');
export const ConvertersDefaultConverterMessages = () => {
  const [colorValue, setColorValue] = useState<string>('');
  const [numberValue, setNumberValue] = useState<number | null>(null);
  const [currencyValue, setCurrencyValue] = useState<number | null>(null);
  const [dateValue1, setDateValue1] = useState<string>('');
  const colorConverter = useMemo(() => new ColorConverter({ format: 'hex' }), []);
  const usdNumberConverter = useMemo(() => new IntlNumberConverter({
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol'
  }), []);
  const handleDateValue1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-date'>['onvalueChanged']>>[0]) => {
    setDateValue1((event.detail.value as string));
  };
  const handleNumberValueValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
    setNumberValue((event.detail.value as number | null));
  };
  const handleCurrencyValueValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
    setCurrencyValue((event.detail.value as number | null));
  };
  const handleColorValueValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
    setColorValue((event.detail.value as string));
  };
  return (
      <oj-form-layout id="converter-example">
            <span>
                    There is no hint for IntlDateTimeConverter. To see the converter's error message, enter a value that is not in an iso string format, like 'abc', and step off the field.
                </span>
            <oj-input-date id="dateTimeRange1" onvalueChanged={handleDateValue1ValueChanged} value={dateValue1} labelHint="IntlDateTimeConverter" />
            <span>
                    There is no hint for IntlNumberConverter. To see the converter's error message, enter a value that is not a number, like 'abc', and step off the field.
                </span>
            <oj-input-number id="inputnumber" onvalueChanged={handleNumberValueValueChanged} value={numberValue} autocomplete="off" labelHint="IntlNumberConverter" />
            <span>
                    This example shows an IntlNumberConverter for currency. To see the converter's error message for type of currency, enter a value that is not a number, like 'abc', and step off the field.
                </span>
            <oj-input-number id="currency" onvalueChanged={handleCurrencyValueValueChanged} value={currencyValue} converter={usdNumberConverter} autocomplete="off" labelHint="IntlNumberConverter currency" />
            <span>
                    When placeholder is set, it is shown in the field and the converter hint shows in a notewindow on focus of the field. When no placeholder is set, the converter hint shows in the field as seen in this example. To see the converter's error message, enter a value that isn't a color, like 'xyz', and step off the field.
                </span>
            <oj-input-text id="color1" onvalueChanged={handleColorValueValueChanged} value={colorValue} autocomplete="off" converter={colorConverter} labelHint="ColorConverter" />
        </oj-form-layout>
    );
};
export default ConvertersDefaultConverterMessages;
