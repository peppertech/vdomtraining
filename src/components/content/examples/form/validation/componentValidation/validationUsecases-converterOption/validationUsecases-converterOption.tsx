import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { NumberConverter, type ConverterOptions } from 'ojs/ojconverter-nativenumber';
import 'oj-c/button';
import 'oj-c/input-text';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';
import 'ojs/ojswitch';

type InputTextValid = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type InputTextValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalidChanged']>
>[0];
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];

export const ValidationUsecasesConverterOption = () => {
  const [birthDate, setBirthDate] = useState<string | undefined>(undefined);
  const [birthDateValid, setBirthDateValid] = useState<InputTextValid>('valid');
  const [numberValue, setNumberValue] = useState<unknown>(1000);
  const [numberValid, setNumberValid] = useState<InputTextValid>('valid');
  const [checkValue, setCheckValue] = useState(false);
  const [dcOptions, setDcOptions] = useState<IntlDateTimeConverter.ConverterOptions | null>({
    formatType: 'date',
    dateFormat: 'short'
  });
  const [ncOptions, setNcOptions] = useState<ConverterOptions | null>({
    style: 'decimal'
  });

  const dateConverter = useMemo(
    () => (dcOptions ? new IntlDateTimeConverter(dcOptions) : null),
    [dcOptions]
  );
  const numberConverter = useMemo(
    () => (ncOptions ? new NumberConverter(ncOptions) : null),
    [ncOptions]
  );

  useEffect(() => {
    if (checkValue && typeof numberValue === 'number' && !Number.isFinite(numberValue)) {
      setNumberValue(null);
    }
  }, [checkValue, numberValue]);

  const handleBirthDateChanged = (event: InputTextValueChangedEvent) => {
    setBirthDate((event.detail.value as string | undefined) ?? undefined);
  };

  const handleBirthDateValidChanged = (event: InputTextValidChangedEvent) => {
    setBirthDateValid(event.detail.value);
  };

  const handleNumberValueChanged = (event: InputTextValueChangedEvent) => {
    setNumberValue(event.detail.value);
  };

  const handleNumberValidChanged = (event: InputTextValidChangedEvent) => {
    setNumberValid(event.detail.value);
  };

  const handleChangeDateConverter = () => {
    setDcOptions({ dateFormat: 'long' });
  };

  const handleClearDateConverter = () => {
    setDcOptions(null);
  };

  const handleChangeNumberConverter = () => {
    setNcOptions({ style: 'percent' });
  };

  const handleClearNumberConverter = () => {
    setNcOptions(null);
  };

  const handleCheckValueChanged = (event: SwitchValueChangedEvent) => {
    setCheckValue(Boolean(event.detail.value));
  };

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-text
        id="birthdate"
        labelHint="Birth Date"
        autocomplete="off"
        required
        value={birthDate}
        converter={dateConverter}
        onvalidChanged={handleBirthDateValidChanged}
        onvalueChanged={handleBirthDateChanged}
      />
      <oj-label-value>
        <span slot="value">[Component Value: {String(birthDate)}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">[Component Valid: {birthDateValid}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">
          <oj-c-button id="changeDC" onojAction={handleChangeDateConverter} label="Change Converter" />
          <oj-c-button id="clearDC" onojAction={handleClearDateConverter} label="Remove Converter" />
        </span>
      </oj-label-value>

      <oj-c-input-text
        id="numberfield"
        labelHint="Number"
        autocomplete="off"
        value={numberValue}
        converter={numberConverter}
        onvalidChanged={handleNumberValidChanged}
        onvalueChanged={handleNumberValueChanged}
      />
      <oj-label-value>
        <span slot="value">[Component Value: {String(numberValue)}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">[Component Valid: {numberValid}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">
          <oj-c-button
            id="changeNC"
            onojAction={handleChangeNumberConverter}
            label="Change Number Converter"
          />
          <oj-c-button
            id="clearNC"
            onojAction={handleClearNumberConverter}
            label="Remove Number Converter"
          />
        </span>
      </oj-label-value>

      <oj-switch
        id="valueModel"
        labelHint="Check value before adding converter"
        value={checkValue}
        onvalueChanged={handleCheckValueChanged}
      />
    </oj-form-layout>
  );
};

export default ValidationUsecasesConverterOption;
