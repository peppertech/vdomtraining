import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import Context = require('ojs/ojcontext');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import AsyncNumberRangeValidator = require('ojs/ojasyncvalidator-numberrange');
import AsyncDateRestrictionValidator = require('ojs/ojasyncvalidator-daterestriction');
import type DateRestrictionValidator = require('ojs/ojvalidator-daterestriction');
import type { DayFormatterInput, DayFormatterOutput } from 'ojs/ojvalidator-daterestriction';
import 'ojs/ojdatetimepicker';
import 'ojs/ojformlayout';
import 'oj-c/input-number';
import 'oj-c/input-text';

type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputNumberValue = ComponentProps<'oj-c-input-number'>['value'];
type InputDateValue = string | undefined;
type InputTextValid = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type InputNumberValid = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type InputDateValid = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown' | undefined;
type InputTextValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalidChanged']>
>[0];
type InputNumberValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalidChanged']>
>[0];
type InputDateValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-date'>['onvalidChanged']>
>[0];
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];
type InputDateValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-date'>['onvalueChanged']>
>[0];

const aprilFoolsFormatter = (dateInfo: DayFormatterInput): DayFormatterOutput | null => {
  if (dateInfo.month === 4 && dateInfo.date === 1) {
    return { disabled: true };
  }
  return null;
};

export const ValidationUsecasesAsyncValidators = () => {
  const [quantityLimit, setQuantityLimit] = useState<InputTextValue>(undefined);
  const [quantityLimitNumber, setQuantityLimitNumber] = useState<InputNumberValue>(null);
  const [dateValue, setDateValue] = useState<InputDateValue>(undefined);
  const [inputValid, setInputValid] = useState<InputTextValid>('valid');
  const [inputNumberValid, setInputNumberValid] = useState<InputNumberValid>('valid');
  const [inputDateValid, setInputDateValid] = useState<InputDateValid>('valid');
  const dateValidatorRef = useRef<AsyncDateRestrictionValidator<string> | null>(null);

  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    []
  );
  const currencyConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
      }),
    []
  );
  const syncValidators = useMemo(
    () => [
      {
        validate: (value: string | number | null) => {
          if (value === 500 || value === '500') {
            throw new Error('500 is invalid');
          }
        },
        getHint: () => 'Enter 500 to see an error displayed immediately from the sync validator.'
      }
    ],
    []
  );
  const asyncValidator = useMemo(
    () => ({
      validate: (value: string | number | null) => {
        const converterOptions: IntlNumberConverter.ConverterOptions = {
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol'
        };
        const numberRangeValidator = new AsyncNumberRangeValidator({
          min: 100,
          max: 10000,
          converter: new IntlNumberConverter(converterOptions)
        });

        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            numberRangeValidator.validate(value).then(
              () => resolve(),
              (error) => {
                const formattedValue =
                  typeof value === 'string' || value === null
                    ? value
                    : new IntlNumberConverter(converterOptions).format(value);
                reject(new Error(`${error} Your value is ${formattedValue}.`));
              }
            );
          }, 1000);
        });
      },
      hint: new Promise<string>((resolve) => {
        setTimeout(() => {
          const minPurchase = currencyConverter.format(100);
          const maxPurchase = currencyConverter.format(10000);
          resolve(
            `Enter a number outside of the range ${minPurchase} and ${maxPurchase} to see an error that occurs after a second.`
          );
        }, 100);
      })
    }),
    [currencyConverter]
  );
  const dateAsyncValidator = useMemo(
    () => ({
      validate: (value: string) =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            const validator = dateValidatorRef.current;
            if (!validator) {
              resolve();
              return;
            }

            validator.validate(value).then(
              () => resolve(),
              (error) => reject(error)
            );
          }, 1000);
        }),
      hint: new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('Select April Fools Day to see an error');
        }, 100);
      })
    }),
    []
  );

  useEffect(() => {
    Context.getPageContext()
      .getBusyContext()
      .whenReady()
      .then(() => {
        const dateRestrictionOptions: DateRestrictionValidator.ValidatorOptions = {
          converter: new IntlDateTimeConverter({ formatType: 'date', dateFormat: 'short' }),
          dayFormatter: aprilFoolsFormatter,
          messageSummary: 'Ha! Ha!',
          messageDetail: "You can't fool me! Try a different date."
        };
        dateValidatorRef.current = new AsyncDateRestrictionValidator(dateRestrictionOptions);
      });
  }, []);

  const handleInputValidChanged = (event: InputTextValidChangedEvent) => {
    setInputValid(event.detail.value);
  };

  const handleInputNumberValidChanged = (event: InputNumberValidChangedEvent) => {
    setInputNumberValid(event.detail.value);
  };

  const handleInputDateValidChanged = (event: InputDateValidChangedEvent) => {
    setInputDateValid(event.detail.value);
  };

  const handleInputTextValueChanged = (event: InputTextValueChangedEvent) => {
    setQuantityLimit(event.detail.value ?? null);
  };

  const handleInputNumberValueChanged = (event: InputNumberValueChangedEvent) => {
    setQuantityLimitNumber(event.detail.value ?? null);
  };

  const handleInputDateValueChanged = (event: InputDateValueChangedEvent) => {
    setDateValue(event.detail.value ?? undefined);
  };

  return (
    <div id="validation-usecase">
      <oj-form-layout id="fl1">
        <oj-c-input-text
          id="input-text"
          required
          labelHint="Quantity Limit"
          onvalidChanged={handleInputValidChanged}
          validators={[...syncValidators, asyncValidator]}
          value={quantityLimit}
          onvalueChanged={handleInputTextValueChanged}
          converter={currencyConverter}
        />
        <span id="inputvalid">[Component's valid property: {inputValid}]</span>
        <span id="inputvalue">[Component's value property: {String(quantityLimit)}]</span>

        <oj-c-input-number
          id="input-number"
          required
          labelHint="Quantity Limit Input Number"
          onvalidChanged={handleInputNumberValidChanged}
          validators={[...syncValidators, asyncValidator]}
          value={quantityLimitNumber}
          onvalueChanged={handleInputNumberValueChanged}
          converter={currencyConverter}
        />
        <span id="inputNumberValid">[Component's valid property: {inputNumberValid}]</span>
        <span id="inputNumberValue">
          [Component's value property: {String(quantityLimitNumber)}]
        </span>

        <oj-input-date
          id="foolsErrand3"
          value={dateValue}
          labelHint="Pick a Date"
          onvalidChanged={handleInputDateValidChanged}
          onvalueChanged={handleInputDateValueChanged}
          converter={dateConverter}
          validators={[dateAsyncValidator]}
        />
        <span id="inputDateValid">[Component's valid property: {inputDateValid}]</span>
        <span id="inputDateValue">[Component's value property: {String(dateValue)}]</span>
      </oj-form-layout>
    </div>
  );
};

export default ValidationUsecasesAsyncValidators;
