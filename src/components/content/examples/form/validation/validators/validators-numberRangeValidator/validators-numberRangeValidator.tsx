import 'oj-c/input-number';
import 'oj-c/input-text';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojformlayout';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import AsyncNumberRangeValidator = require('ojs/ojasyncvalidator-numberrange');

type InputTextChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputNumberChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputNumberValue = ComponentProps<'oj-c-input-number'>['value'];

export default function ValidatorsNumberRangeValidator() {
  const [numberValue1, setNumberValue1] = useState<InputTextValue>('');
  const [numberValue2, setNumberValue2] = useState<InputNumberValue>(null);
  const [numberValue3, setNumberValue3] = useState<InputTextValue>('');
  const [numberValue4, setNumberValue4] = useState<InputNumberValue>(null);

  const numberConverter = useMemo(() => new IntlNumberConverter(), []);
  const currencyConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
      }),
    []
  );
  const validators = useMemo(
    () => [
      new AsyncNumberRangeValidator({
        min: 10000.05,
        max: 25000.95,
        hint: { inRange: 'Custom: Enter a value between {min} and {max}.' },
        converter: currencyConverter
      })
    ],
    [currencyConverter]
  );
  const validators2 = useMemo(
    () => [
      new AsyncNumberRangeValidator({
        min: 1,
        max: 1,
        hint: { exact: 'Custom: The only value you can enter is {num}.' },
        messageDetail: { exact: 'Custom: Please enter the value {num}' }
      })
    ],
    []
  );

  const handleText1Changed = (event: InputTextChangedEvent) => {
    setNumberValue1((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleNumber2Changed = (event: InputNumberChangedEvent) => {
    setNumberValue2((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  const handleText3Changed = (event: InputTextChangedEvent) => {
    setNumberValue3((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleNumber4Changed = (event: InputNumberChangedEvent) => {
    setNumberValue4((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  return (
    <oj-form-layout id="validator-example">
      <oj-c-input-text
        id="numberRange1"
        value={numberValue1}
        onvalueChanged={handleText1Changed}
        validators={validators}
        converter={currencyConverter}
        labelHint="oj-c-input-text with NumberRangeValidator"
      />
      <oj-c-input-number
        id="numberRange2"
        value={numberValue2}
        onvalueChanged={handleNumber2Changed}
        min={10000}
        max={25000}
        labelHint="oj-c-input-number with min and max"
      />
      <oj-c-input-text
        id="numberRange3"
        value={numberValue3}
        onvalueChanged={handleText3Changed}
        validators={validators2}
        converter={numberConverter}
        labelHint="oj-c-input-text NumberRangeValidator min==max"
      />
      <oj-c-input-number
        id="numberRange4"
        value={numberValue4}
        onvalueChanged={handleNumber4Changed}
        min={1}
        max={1}
        labelHint="oj-c-input-number min==max"
      />
    </oj-form-layout>
  );
}
