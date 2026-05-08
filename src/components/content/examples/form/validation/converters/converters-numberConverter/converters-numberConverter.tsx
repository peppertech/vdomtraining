import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';

type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>
>[0];

export const ConvertersNumberConverter = () => {
  const [currency, setCurrency] = useState<number | null>(12345);
  const [currencyRoundDuringParse, setCurrencyRoundDuringParse] = useState<number | null>(78000);
  const [decimal, setDecimal] = useState<number | null>(23450);
  const [decimalRoundingMode, setDecimalRoundingMode] = useState<number | null>(45000.5);
  const [decimalRoundingModeUpParse, setDecimalRoundingModeUpParse] = useState<number | null>(
    35450.5
  );
  const [decimalRoundingModeDownParse, setDecimalRoundingModeDownParse] = useState<number | null>(
    45999.5
  );
  const [decimalRoundingModeEvenParse, setDecimalRoundingModeEvenParse] = useState<number | null>(
    12500.5
  );
  const [percent, setPercent] = useState<number | null>(459);
  const [percentRoundDuringParse, setPercentRoundDuringParse] = useState<number | null>(890);
  const [formatDigitalUnits, setFormatDigitalUnits] = useState<number | null>(34321);

  const eurNumberConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol'
      }),
    []
  );
  const usdNumberConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'code'
      }),
    []
  );
  const currencyHalfUpConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol',
        roundingMode: 'HALF_UP',
        roundDuringParse: true
      }),
    []
  );
  const usdShortNumberConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencyFormat: 'short',
        minimumFractionDigits: 0
      }),
    []
  );
  const usdLongNumberConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencyFormat: 'long',
        minimumFractionDigits: 0
      }),
    []
  );
  const decimal1Converter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        minimumIntegerDigits: 2,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        useGrouping: false
      }),
    []
  );
  const decimal2Converter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        decimalFormat: 'short',
        minimumIntegerDigits: 2,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        useGrouping: false
      }),
    []
  );
  const decimalHalfDownGroupConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_DOWN',
        maximumFractionDigits: 0
      }),
    []
  );
  const decimalHalfUpGroupConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_UP',
        maximumFractionDigits: 0
      }),
    []
  );
  const decimalHalfEvenGroupConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_EVEN',
        maximumFractionDigits: 0
      }),
    []
  );
  const decimalHalfUpGroupRoundConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_UP',
        maximumFractionDigits: 2,
        roundDuringParse: true
      }),
    []
  );
  const decimalHalfDownGroupRoundConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_DOWN',
        maximumFractionDigits: 2,
        roundDuringParse: true
      }),
    []
  );
  const decimalHalfEvenGroupRoundConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_EVEN',
        maximumFractionDigits: 2,
        roundDuringParse: true
      }),
    []
  );
  const decimalShortConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        decimalFormat: 'short'
      }),
    []
  );
  const decimalLongConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'decimal',
        decimalFormat: 'long'
      }),
    []
  );
  const percent1Converter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'percent',
        maximumFractionDigits: 2,
        useGrouping: false,
        roundingMode: 'HALF_DOWN',
        roundDuringParse: true
      }),
    []
  );
  const percent2Converter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'percent',
        maximumFractionDigits: 2,
        useGrouping: false
      }),
    []
  );
  const unitConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'unit',
        unit: 'bit',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    []
  );

  const handleValueChanged =
    (setter: (value: number | null) => void) => (event: InputNumberValueChangedEvent) => {
      setter(event.detail.value);
    };

  return (
    <div id="number-converter-example">
      <h3 class="oj-header-border">Currency</h3>
      <p>Converts between number and a locale specific string displayed in currency format.</p>

      <p></p>
      <b>Example 1</b>:<code class="prettyprint">
        {'{"style": "currency", "currency": "EUR", "currencyDisplay": "symbol"}'}
      </code>
      <oj-form-layout id="fl1">
        <oj-input-number
          labelHint="currency EUR"
          id="currency12"
          value={currency}
          onvalueChanged={handleValueChanged(setCurrency)}
          help={{ instruction: 'enter an amount with or without grouping separator' }}
          converter={eurNumberConverter}
        />
      </oj-form-layout>
      <b>Example 2</b>:<code class="prettyprint">
        {'{"style": "currency", "currency": "USD", "currencyDisplay": "code"}'}
      </code>
      <oj-form-layout id="fl2">
        <oj-input-number
          labelHint="currency USD"
          id="currency21"
          value={currency}
          onvalueChanged={handleValueChanged(setCurrency)}
          help={{ instruction: 'enter an amount with or without grouping separator' }}
          converter={usdNumberConverter}
        />
      </oj-form-layout>
      <h4 class="oj-header-border">Currency roundDuringParse</h4>
      <p>
        Converts between number and a locale specific string displayed in currency format and rounds
        during parse.
      </p>
      <b>Example 1</b>:<code class="prettyprint">
        {
          '{"style": "currency", "currency": "EUR", "roundDuringParse": "true", "currencyDisplay": "symbol", "roundingMode": "HALF_UP"}'
        }
      </code>
      <oj-form-layout id="fl3">
        <oj-input-number
          labelHint="currency round up"
          id="currency31"
          value={currencyRoundDuringParse}
          onvalueChanged={handleValueChanged(setCurrencyRoundDuringParse)}
          help={{
            instruction:
              'Enter an amount with or without grouping separator. It will round during parse'
          }}
          converter={currencyHalfUpConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="curr-value-currency-round">{currencyRoundDuringParse ?? ''}</span>
      <br />
      <h4 class="oj-header-border">CurrencyFormat: short</h4>
      <p>
        Enter an amount in field above and the formatted currency will be displayed in readonly
        field below
      </p>
      <b>Example 2</b>:<code class="prettyprint">
        {
          '{"style": "currency", "currency": "USD", "currencyDisplay": "symbol", "currencyFormat":"short", "minimumFractionDigits":"0"}'
        }
      </code>
      <oj-form-layout id="flC1">
        <oj-input-number
          labelHint="readonly currency short"
          id="inputTextShortNumber"
          value={currencyRoundDuringParse}
          readonly
          help={{
            instruction:
              'Enter an amount in field and the formatted currency will be displayed in readonly field below'
          }}
          converter={usdShortNumberConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="valueShortNumber">{currencyRoundDuringParse ?? ''}</span>
      <br />
      <h4 class="oj-header-border">CurrencyFormat: long</h4>
      <p>
        Enter an amount in field above and the formatted currency will be displayed in readonly
        field below
      </p>
      <b>Example 3</b>:<code class="prettyprint">
        {
          '{"style": "currency", "currency": "USD", "currencyDisplay": "symbol", "currencyFormat":"long", "minimumFractionDigits":"0"}'
        }
      </code>
      <oj-form-layout id="flC2">
        <oj-input-number
          labelHint="readonly currency long"
          id="inputTextLongNumber"
          value={currencyRoundDuringParse}
          readonly
          help={{
            instruction:
              'Enter an amount in field and the formatted currency will be displayed in readonly field below'
          }}
          converter={usdLongNumberConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="valueLongNumber">{currencyRoundDuringParse ?? ''}</span>
      <br />

      <h3 class="oj-header-border">Decimal</h3>
      <p>Converts between number and a locale specific string displayed in decimal format.</p>
      <b>Example 1</b>: Default converter used on input number component demo (when{' '}
      <code class="prettyprint">converter</code> attribute is not set).
      <oj-form-layout id="fl4">
        <oj-input-number
          labelHint="decimal default"
          id="decimal10"
          value={decimal}
          onvalueChanged={handleValueChanged(setDecimal)}
          help={{ instruction: 'enter a number. grouping separator is accepted' }}
        />
      </oj-form-layout>
      <b>Example 2</b>:<code class="prettyprint">
        {
          '{"style": "decimal", "minimumIntegerDigits": "2", "useGrouping": "false", "minimumFractionDigits": "1", "maximumFractionDigits": "1"}'
        }
      </code>
      <oj-form-layout id="fl5">
        <oj-input-number
          labelHint="no grouping"
          id="decimal11"
          value={decimal}
          onvalueChanged={handleValueChanged(setDecimal)}
          help={{ instruction: 'enter a number. grouping separator is ignored' }}
          converter={decimal1Converter}
        />
      </oj-form-layout>
      <b>Example 3</b>:<code class="prettyprint">
        {'{"style": "decimal", "decimalFormat": "short"}'}
      </code>
      <oj-form-layout id="fl6">
        <oj-input-number
          labelHint="readonly decimal short"
          id="decimal13"
          value={decimal}
          readonly
          converter={decimalShortConverter}
        />
      </oj-form-layout>
      <b>Example 4</b>:<code class="prettyprint">
        {
          '{"style": "decimal", "minimumIntegerDigits": "2", "useGrouping": "false", "decimalFormat": "short", "minimumFractionDigits": "1", "maximumFractionDigits": "1"}'
        }
      </code>
      .
      <oj-form-layout id="fl7">
        <oj-input-number
          labelHint="readonly decimal short minimumIntegerDigits 2"
          id="decimal14"
          value={decimal}
          readonly
          help={{ instruction: 'the number entered in the previous input in short format' }}
          converter={decimal2Converter}
        />
      </oj-form-layout>
      <b>Example 5</b>:<code class="prettyprint">
        {'{"style": "decimal", "decimalFormat": "long"}'}
      </code>
      <oj-form-layout id="fl8">
        <oj-input-number
          labelHint="readonly decimal long"
          id="decimal15"
          value={decimal}
          readonly
          help={{ instruction: 'the number entered in the previous input in long format' }}
          converter={decimalLongConverter}
        />
      </oj-form-layout>
      <h4>Decimal Converter with roundingMode</h4>
      <p>
        Converts between number and a locale specific string displayed in decimal format and sets
        the roundMode to HALF_UP, HALF_DOWN, or HALF_EVEN. By default, the converter rounds during
        format, but not parse, so the current component value may not match the display value. You
        would use roundDuringParse option if you want to round during parse.
      </p>
      <b>Example 1</b>:<code class="prettyprint">
        {'"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_UP"'}
      </code>
      <oj-form-layout id="fl9">
        <oj-input-number
          labelHint="round up"
          id="decimal21"
          value={decimalRoundingMode}
          onvalueChanged={handleValueChanged(setDecimalRoundingMode)}
          help={{ instruction: 'the number in HALF_UP rounding mode' }}
          converter={decimalHalfUpGroupConverter}
        />
      </oj-form-layout>
      <b>Example 2</b>:<code class="prettyprint">
        {'{"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_DOWN"}'}
      </code>
      <oj-form-layout id="fl10">
        <oj-input-number
          labelHint="round down"
          id="decimal22"
          value={decimalRoundingMode}
          onvalueChanged={handleValueChanged(setDecimalRoundingMode)}
          help={{ instruction: 'the number entered in the previous input in HALF_DOWN rounding mode' }}
          converter={decimalHalfDownGroupConverter}
        />
      </oj-form-layout>
      <b>Example 3</b>:<code class="prettyprint">
        {'{"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_EVEN"}'}
      </code>
      .
      <oj-form-layout id="fl11">
        <oj-input-number
          labelHint="round even"
          id="decimal23"
          value={decimalRoundingMode}
          onvalueChanged={handleValueChanged(setDecimalRoundingMode)}
          help={{ instruction: 'the number entered in the previous input in HALF_EVEN rounding mode' }}
          converter={decimalHalfEvenGroupConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="curr-decimalRoundingMode-value">{decimalRoundingMode ?? ''}</span>
      <br />
      <h4>Decimal Converter with roundingMode and roundDuringParse: true</h4>
      <p>
        Converts between number and a locale specific string displayed in decimal format and sets
        the roundMode to HALF_UP, HALF_DOWN, or HALF_EVEN. These examples also set
        roundDuringParse, and you will see the current component value matches the display value.
      </p>
      <b>Example 1</b>:<code class="prettyprint">
        {
          '{"style": "decimal", "maximumFractionDigits": "2", "roundingMode": "HALF_UP", "roundDuringParse": "true"}'
        }
      </code>
      <oj-form-layout id="fl12">
        <oj-input-number
          labelHint="roundDuringParse up"
          id="decimal31"
          value={decimalRoundingModeUpParse}
          onvalueChanged={handleValueChanged(setDecimalRoundingModeUpParse)}
          help={{
            instruction: 'enter a number and it will round to HALF_UP and round during parse'
          }}
          converter={decimalHalfUpGroupRoundConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="curr-value">{decimalRoundingModeUpParse ?? ''}</span>
      <br />
      <b>Example 2</b>:<code class="prettyprint">
        {
          '{"style": "decimal", "maximumFractionDigits": "2", "roundingMode": "HALF_DOWN", "roundDuringParse": "true"}'
        }
      </code>
      <oj-form-layout id="fl13">
        <oj-input-number
          labelHint="roundDuringParse down"
          id="decimal32"
          value={decimalRoundingModeDownParse}
          onvalueChanged={handleValueChanged(setDecimalRoundingModeDownParse)}
          help={{
            instruction: 'enter a number and it will round to HALF_DOWN and round during parse'
          }}
          converter={decimalHalfDownGroupRoundConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="curr-value2">{decimalRoundingModeDownParse ?? ''}</span>
      <br />
      <b>Example 3</b>:<code class="prettyprint">
        {
          '{"style": "decimal", "maximumFractionDigits": "2", "roundingMode": "HALF_EVEN", "roundDuringParse": "true"}'
        }
      </code>
      <oj-form-layout id="fl14">
        <oj-input-number
          labelHint="roundDuringParse even"
          id="decimal33"
          value={decimalRoundingModeEvenParse}
          onvalueChanged={handleValueChanged(setDecimalRoundingModeEvenParse)}
          help={{
            instruction: 'enter a number and it will round to HALF_EVEN and round during parse'
          }}
          converter={decimalHalfEvenGroupRoundConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="curr-valuerme">{decimalRoundingModeEvenParse ?? ''}</span>
      <br />

      <h3 class="oj-header-border">Percent</h3>
      <p>Converts between number and a locale specific string displayed in percent format.</p>
      <p></p>
      <b>Example</b>:<code class="prettyprint">
        {'{"style": "percent", "maximumFractionDigits": "2", "useGrouping": "false"}'}
      </code>
      <oj-form-layout id="fl15">
        <oj-input-number
          labelHint="percent"
          id="percent11"
          value={percent}
          onvalueChanged={handleValueChanged(setPercent)}
          help={{
            instruction: 'enter a number. note that percent values are divided by 100'
          }}
          converter={percent2Converter}
        />
      </oj-form-layout>

      <h4>Percent roundDuringParse</h4>
      <p>
        Converts between number and a locale specific string displayed in percent format with
        roundDuringParse.
      </p>
      <p></p>
      <b>Example</b>:<code class="prettyprint">
        {
          '{"style": "percent", "maximumFractionDigits": "2", "useGrouping": "false", "roundingMode": "HALF_DOWN", "roundDuringParse": "true"}'
        }
      </code>
      <oj-form-layout id="fl16">
        <oj-input-number
          labelHint="percent round down"
          id="percent21"
          value={percentRoundDuringParse}
          onvalueChanged={handleValueChanged(setPercentRoundDuringParse)}
          help={{
            instruction:
              'enter a number. note that percent values are divided by 100. The converter rounds down and rounds during parse'
          }}
          converter={percent1Converter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="curr-valuerme2">{percentRoundDuringParse ?? ''}</span>
      <br />
      <h4>Converters for digital units</h4>
      <p>Converts number to digital units and formats like 5MB, 5Mb</p>
      <p></p>
      <b>Example</b>:<code class="prettyprint">
        {
          '{"style": "unit", "unit": "bit", "minimumFractionDigits": "2", "maximumFractionDigits": "2"}'
        }
      </code>
      <oj-form-layout id="fl19">
        <oj-input-number
          labelHint="digital unit"
          id="inputNumberDigitalUnits"
          value={formatDigitalUnits}
          onvalueChanged={handleValueChanged(setFormatDigitalUnits)}
          help={{ instruction: 'enter a number and converter will format it to a digital unit' }}
          converter={unitConverter}
        />
      </oj-form-layout>
      <span>Current component value is:</span>
      <span id="curr-valuerme3">{formatDigitalUnits ?? ''}</span>
      <br />
    </div>
  );
};

export default ConvertersNumberConverter;
