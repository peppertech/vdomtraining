import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { BigDecimalStringConverter } from 'ojs/ojconverter-nativenumber';
import 'oj-c/input-text';
import 'ojs/ojformlayout';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const ConvertersBigDecimalConverter = () => {
  const [currency, setCurrency] = useState<string | null>('120345999000000000');
  const [currencyRoundDuringParse, setCurrencyRoundDuringParse] = useState<string | null>('78050090096500000');
  const [decimal, setDecimal] = useState<string | null>('23504206999000000');
  const [decimalRoundingMode, setDecimalRoundingMode] = useState<string | null>('9510999999999999.5');
  const [decimalRoundingModeUpParse, setDecimalRoundingModeUpParse] = useState<string | null>('30030050556000000.574');
  const [decimalRoundingModeDownParse, setDecimalRoundingModeDownParse] = useState<string | null>('12534475650000000.364');
  const [decimalRoundingModeEvenParse, setDecimalRoundingModeEvenParse] = useState<string | null>('19191250588000000.123');
  const [largePrecisionDecimal, setLargePrecisionDecimal] = useState<string | null>('9125000000000000');
  const [largeScaleDecimal, setLargeScaleDecimal] = useState<string | null>('1.123456789123456789');
  const [exponentialVal, setExponentialVal] = useState<string | null>('1e30');
  const [percent, setPercent] = useState<string | null>('.15123445500687798655');
  const [percentRoundDuringParse, setPercentRoundDuringParse] = useState<string | null>('81000900005200000');
  const [formatDigitalUnits, setFormatDigitalUnits] = useState<string | null>('1000000000000000000');

  const eurBigDecimalStringConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
  }), [currency]);
  const eurAccountingBigDecimalStringConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
      currencySign: 'accounting'
  }), [currency]);
  const usdBigDecimalStringConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'code'
  }), [currency]);
  const currencyHalfUpConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
      roundingMode: 'HALF_UP',
      roundDuringParse: true
  }), [currency]);
  const usdShortBigDecimalStringConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      currencyFormat: 'short',
      minimumFractionDigits: 0
  }), [currency]);
  const decimal1Converter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      minimumIntegerDigits: 2,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      useGrouping: false
  }), [decimal]);
  const decimal2Converter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      decimalFormat: 'short',
      minimumIntegerDigits: 2,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      useGrouping: false
  }), [decimal]);
  const decimalHalfDownConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      roundingMode: 'HALF_DOWN',
      maximumFractionDigits: 0,
      useGrouping: false
  }), [decimal]);
  const decimalHalfDownGroupConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      roundingMode: 'HALF_DOWN',
      maximumFractionDigits: 0
  }), [decimal]);
  const decimalHalfUpGroupConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      roundingMode: 'HALF_UP',
      maximumFractionDigits: 0
  }), [decimal]);
  const decimalHalfEvenGroupConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      roundingMode: 'HALF_EVEN',
      maximumFractionDigits: 0
  }), [decimal]);
  const decimalHalfUpGroupRoundConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      roundingMode: 'HALF_UP',
      maximumFractionDigits: 3,
      roundDuringParse: true
  }), [decimal]);
  const decimalHalfDownGroupRoundConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      roundingMode: 'HALF_DOWN',
      maximumFractionDigits: 3,
      roundDuringParse: true
  }), [decimal]);
  const decimalHalfEvenGroupRoundConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      roundingMode: 'HALF_EVEN',
      maximumFractionDigits: 3,
      roundDuringParse: true
  }), [decimal]);
  const decimalShortConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      decimalFormat: 'short'
  }), [decimal]);
  const decimalLongConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      decimalFormat: 'long'
  }), [decimal]);
  const percent1Converter = useMemo(() => new BigDecimalStringConverter({
      style: 'percent',
      maximumFractionDigits: 2,
      useGrouping: false,
      roundingMode: 'HALF_DOWN',
      roundDuringParse: true
  }), [percent]);
  const percent2Converter = useMemo(() => new BigDecimalStringConverter({
      style: 'percent',
      maximumFractionDigits: 20,
      useGrouping: false
  }), [percent]);
  const unitConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'unit',
      unit: 'bit',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }), []);
  const largePrecisionConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: 0
  }), [decimal]);
  const largeScaleConverter = useMemo(() => new BigDecimalStringConverter({
      style: 'decimal',
      useGrouping: false,
      maximumFractionDigits: 25
  }), [decimal]);

  const handleLargePrecisionDecimalValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setLargePrecisionDecimal((event.detail.value as string | null));
  };

  const handleLargeScaleDecimalValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setLargeScaleDecimal((event.detail.value as string | null));
  };

  const handleExponentialValValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setExponentialVal((event.detail.value as string | null));
  };

  const handleDecimalValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setDecimal((event.detail.value as string | null));
  };

  const handleDecimalRoundingModeValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setDecimalRoundingMode((event.detail.value as string | null));
  };

  const handleDecimalRoundingModeUpParseValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setDecimalRoundingModeUpParse((event.detail.value as string | null));
  };

  const handleDecimalRoundingModeDownParseValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setDecimalRoundingModeDownParse((event.detail.value as string | null));
  };

  const handleDecimalRoundingModeEvenParseValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setDecimalRoundingModeEvenParse((event.detail.value as string | null));
  };

  const handlePercentValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setPercent((event.detail.value as string | null));
  };

  const handlePercentRoundDuringParseValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setPercentRoundDuringParse((event.detail.value as string | null));
  };

  const handleFormatDigitalUnitsValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setFormatDigitalUnits((event.detail.value as string | null));
  };

  const handleCurrencyValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setCurrency((event.detail.value as string | null));
  };

  const handleCurrencyRoundDuringParseValueChanged = (event: PropertyChangedEvent<string | null>) => {
    setCurrencyRoundDuringParse((event.detail.value as string | null));
  };

  return (
      <div id="number-converter-example">
            <h3 class="oj-header-border">Decimal</h3>
            <p>
                    Converts between a big decimal string and a locale specific string displayed in decimal format.
                </p>
            <h4>Decimals with large scale and precision</h4>
            <b>Example 1</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "useGrouping": "true", maximumFractionDigits: 0}'}</code>
            <oj-form-layout id="fl4">
                    <oj-c-input-text label-hint="large precision decimal" id="pdecimal12" onvalueChanged={handleLargePrecisionDecimalValueChanged} value={largePrecisionDecimal} converter={largePrecisionConverter} />
                </oj-form-layout>
            <b>Example 2</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "decimalFormat": "long"}'}</code>
            <oj-form-layout>
                    <oj-c-input-text label-hint="readonly large precision decimal" onvalueChanged={handleLargePrecisionDecimalValueChanged} value={largePrecisionDecimal} readonly converter={decimalLongConverter} {...{ 'help.instruction': "the number entered in the previous input in long format" }} />
                </oj-form-layout>
            <b>Example 3</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "useGrouping": "false", maximumFractionDigits: 25}'}</code>
            <oj-form-layout>
                    <oj-c-input-text label-hint="large scale decimal" id="sdecimal12" onvalueChanged={handleLargeScaleDecimalValueChanged} value={largeScaleDecimal} converter={largeScaleConverter} />
                </oj-form-layout>
            <b>Example 4 (formatting scientific notation)</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "useGrouping": "true", maximumFractionDigits: 0}'}</code>
            <oj-form-layout>
                    <oj-c-input-text label-hint="value from exponent" id="edecimal1" onvalueChanged={handleExponentialValValueChanged} value={exponentialVal} converter={largePrecisionConverter} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="exponenntial-value">{exponentialVal}</span>
            <br />
            <h4>Decimals with decimalFormat</h4>
            <b>Example 1</b>
            :
            <code class="prettyprint">
                    {'{"style": "decimal", "minimumIntegerDigits": "2", "useGrouping": "false", "minimumFractionDigits": "1", "maximumFractionDigits": "1"}'}
                </code>
            <oj-form-layout id="fl5">
                    <oj-c-input-text label-hint="no grouping" id="decimal11" onvalueChanged={handleDecimalValueChanged} value={decimal} converter={decimal1Converter} {...{ 'help.instruction': "enter a number. grouping separator is ignored" }} />
                </oj-form-layout>
            <b>Example 2</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "decimalFormat": "short"}'}</code>
            <oj-form-layout id="fl6">
                    <oj-c-input-text label-hint="readonly decimal short" id="decimal13" onvalueChanged={handleDecimalValueChanged} value={decimal} readonly converter={decimalShortConverter} />
                </oj-form-layout>
            <b>Example 3</b>
            :
            <code class="prettyprint">
                    {'{"style": "decimal", "minimumIntegerDigits": "2", "useGrouping": "false", "decimalFormat": "short", "minimumFractionDigits": "1", "maximumFractionDigits": "1"}'}
                </code>
            .
            <oj-form-layout id="fl7">
                    <oj-c-input-text label-hint="readonly decimal short minimumIntegerDigits 2" id="decimal14" onvalueChanged={handleDecimalValueChanged} value={decimal} readonly converter={decimal2Converter} {...{ 'help.instruction': "the number entered in the previous input in short format" }} />
                </oj-form-layout>
            <b>Example 4</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "decimalFormat": "long"}'}</code>
            <oj-form-layout id="fl8">
                    <oj-c-input-text label-hint="readonly decimal long" id="decimal15" onvalueChanged={handleDecimalValueChanged} value={decimal} readonly converter={decimalLongConverter} {...{ 'help.instruction': "the number entered in the previous input in long format" }} />
                </oj-form-layout>
            <h4>Decimal Converter with roundingMode</h4>
            <p>
                    Converts between a big decimal string and a locale specific string displayed in decimal format and sets the roundMode to HALF_UP, HALF_DOWN, or HALF_EVEN. By default, the converter rounds during format, but not parse, so the current component value may not match the display value. You would use roundDuringParse option if you want to round during parse.
                </p>
            <b>Example 1</b>
            :
            <code class="prettyprint">"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_UP"</code>
            <oj-form-layout id="fl9">
                    <oj-c-input-text label-hint="round up" id="decimal21" onvalueChanged={handleDecimalRoundingModeValueChanged} value={decimalRoundingMode} converter={decimalHalfUpGroupConverter} {...{ 'help.instruction': "the number in HALF_UP rounding mode" }} />
                </oj-form-layout>
            <b>Example 2</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_DOWN"}'}</code>
            <oj-form-layout id="fl10">
                    <oj-c-input-text label-hint="round down" id="decimal22" onvalueChanged={handleDecimalRoundingModeValueChanged} value={decimalRoundingMode} converter={decimalHalfDownGroupConverter} {...{ 'help.instruction': "the number entered in the previous input in HALF_DOWN rounding mode" }} />
                </oj-form-layout>
            <b>Example 3</b>
            :
            <code class="prettyprint">{'{"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_EVEN"}'}</code>
            .
            <oj-form-layout id="fl11">
                    <oj-c-input-text label-hint="round even" id="decimal23" onvalueChanged={handleDecimalRoundingModeValueChanged} value={decimalRoundingMode} converter={decimalHalfEvenGroupConverter} {...{ 'help.instruction': "the number entered in the previous input in HALF_EVEN rounding mode" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-decimalRoundingMode-value">{decimalRoundingMode}</span>
            <br />
            <h4>Decimal Converter with roundingMode and roundDuringParse: true</h4>
            <p>
                    Converts between a big decimal string and a locale specific string displayed in decimal format and sets the roundMode to HALF_UP, HALF_DOWN, or HALF_EVEN. These examples also set roundDuringParse, and you will see the current component value matches the display value.
                </p>
            <b>Example 1</b>
            :
            <code class="prettyprint">
                    {'{"style": "decimal", "maximumFractionDigits": "3", "roundingMode": "HALF_UP", "roundDuringParse": "true"}'}
                </code>
            <oj-form-layout id="fl12">
                    <oj-c-input-text label-hint="roundDuringParse up" id="decimal31" onvalueChanged={handleDecimalRoundingModeUpParseValueChanged} value={decimalRoundingModeUpParse} converter={decimalHalfUpGroupRoundConverter} {...{ 'help.instruction': "enter a number and it will round to HALF_UP and round during parse" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-value">{decimalRoundingModeUpParse}</span>
            <br />
            <br />
            <b>Example 2</b>
            :
            <code class="prettyprint">
                    {'{"style": "decimal", "maximumFractionDigits": "3", "roundingMode": "HALF_DOWN", "roundDuringParse": "true"}'}
                </code>
            <oj-form-layout id="fl13">
                    <oj-c-input-text label-hint="roundDuringParse down" id="decimal32" onvalueChanged={handleDecimalRoundingModeDownParseValueChanged} value={decimalRoundingModeDownParse} converter={decimalHalfDownGroupRoundConverter} {...{ 'help.instruction': "enter a number and it will round to HALF_DOWN and round during parse" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-value2">{decimalRoundingModeDownParse}</span>
            <br />
            <br />
            <b>Example 3</b>
            :
            <code class="prettyprint">
                    {'{"style": "decimal", "maximumFractionDigits": "3", "roundingMode": "HALF_EVEN", "roundDuringParse": "true"}'}
                </code>
            <oj-form-layout id="fl14">
                    <oj-c-input-text label-hint="roundDuringParse even" id="decimal33" onvalueChanged={handleDecimalRoundingModeEvenParseValueChanged} value={decimalRoundingModeEvenParse} converter={decimalHalfEvenGroupRoundConverter} {...{ 'help.instruction': "enter a number and it will round to HALF_EVEN and round during parse" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-valuerme">{decimalRoundingModeEvenParse}</span>
            <br />
            <h3 class="oj-header-border">Percent</h3>
            <p>
                    Converts between a big decimal string and a locale specific string displayed in percent format.
                </p>
            <p />
            <b>Example</b>
            :
            <code class="prettyprint">{'{"style": "percent", "maximumFractionDigits": "20", "useGrouping": "false"}'}</code>
            <oj-form-layout id="fl15">
                    <oj-c-input-text label-hint="percent" id="percent11" onvalueChanged={handlePercentValueChanged} value={percent} converter={percent2Converter} {...{ 'help.instruction': "enter a number. note that percent values are divided by 100" }} />
                </oj-form-layout>
            <h4>Percent roundDuringParse</h4>
            <p>
                    Converts between a big decimal string and a locale specific string displayed in percent format with roundDuringParse.
                </p>
            <p />
            <b>Example</b>
            :
            <code class="prettyprint">
                    {'{"style": "percent", "maximumFractionDigits": "2", "useGrouping": "false", "roundingMode": "HALF_DOWN", "roundDuringParse": "true"}'}
                </code>
            <oj-form-layout id="fl16">
                    <oj-c-input-text label-hint="percent round down" id="percent21" onvalueChanged={handlePercentRoundDuringParseValueChanged} value={percentRoundDuringParse} converter={percent1Converter} {...{ 'help.instruction': "enter a number. note that percent values are divided by 100. \n      The converter rounds down and rounds during parse" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-valuerme2">{percentRoundDuringParse}</span>
            <br />
            <h3>Converters for digital units</h3>
            <p>Converts number to digital units and formats like 5MB, 5Mb</p>
            <p />
            <b>Example</b>
            :
            <code class="prettyprint">
                    {'{"style": "unit", "unit": "bit", "minimumFractionDigits": "2", "maximumFractionDigits": "2"}'}
                </code>
            <oj-form-layout id="fl19">
                    <oj-c-input-text label-hint="digital unit" id="inputNumberDigitalUnits" onvalueChanged={handleFormatDigitalUnitsValueChanged} value={formatDigitalUnits} converter={unitConverter} {...{ 'help.instruction': "enter a number and converter will format it to a digital unit" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-valuerme3">{formatDigitalUnits}</span>
            <br />
            <h3 class="oj-header-border">Currency</h3>
            <p>
                    Converts between a big decimal string and a locale specific string displayed in currency format.
                </p>
            <p />
            <b>Example 1</b>
            :
            <code class="prettyprint">{'{"style": "currency", "currency": "EUR", "currencyDisplay": "symbol"}'}</code>
            <oj-form-layout id="fl1">
                    <oj-c-input-text label-hint="currency EUR" id="currency12" onvalueChanged={handleCurrencyValueChanged} value={currency} converter={eurBigDecimalStringConverter} {...{ 'help.instruction': "enter an amount with or without grouping separator" }} />
                </oj-form-layout>
            <b>Example 2</b>
            :
            <code class="prettyprint">{'{"style": "currency", "currency": "USD", "currencyDisplay": "code"}'}</code>
            <oj-form-layout id="fl2">
                    <oj-c-input-text label-hint="currency USD" id="currency21" onvalueChanged={handleCurrencyValueChanged} value={currency} converter={usdBigDecimalStringConverter} {...{ 'help.instruction': "enter an amount with or without grouping separator" }} />
                </oj-form-layout>
            <b>Example 3</b>
            :
            <code class="prettyprint">
                    {'{"style": "currency", "currency": "EUR", "currencyDisplay": "symbol", "currencySign": "accounting"}'}
                </code>
            <oj-form-layout id="fl2a">
                    <oj-c-input-text label-hint="currency accounting" id="currency21s" onvalueChanged={handleCurrencyValueChanged} value={currency} converter={eurAccountingBigDecimalStringConverter} {...{ 'help.instruction': "enter an amount with or without grouping separator" }} />
                </oj-form-layout>
            <h4 class="oj-header-border">Currency roundDuringParse</h4>
            <p>
                    Converts between a big decimal string and a locale specific string displayed in currency format and rounds during parse.
                </p>
            <b>Example 1</b>
            :
            <code class="prettyprint">
                    {'{"style": "currency", "currency": "EUR", "roundDuringParse": "true", "currencyDisplay": "symbol", "roundingMode": "HALF_UP"}'}
                </code>
            <oj-form-layout id="fl3">
                    <oj-c-input-text label-hint="currency round up" id="currency31" onvalueChanged={handleCurrencyRoundDuringParseValueChanged} value={currencyRoundDuringParse} converter={currencyHalfUpConverter} {...{ 'help.instruction': "Enter an amount with or without grouping separator. It will round during parse" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-value-currency-round">{currencyRoundDuringParse}</span>
            <br />
            <h4 class="oj-header-border">CurrencyFormat: short</h4>
            <p>
                    Enter an amount in field above and the formatted currency will be displayed in readonly field below
                </p>
            <b>Example 2</b>
            :
            <code class="prettyprint">
                    {'{"style": "currency", "currency": "USD", "currencyDisplay": "symbol", "currencyFormat":"short", "minimumFractionDigits":"0"}'}
                </code>
            <oj-form-layout id="flC1">
                    <oj-c-input-text label-hint="readonly currency short" id="inputTextShortNumber" onvalueChanged={handleCurrencyRoundDuringParseValueChanged} value={currencyRoundDuringParse} readonly converter={usdShortBigDecimalStringConverter} {...{ 'help.instruction': "Enter an amount in field and the formatted currency\n                        will be displayed in readonly field below" }} />
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="valueShortNumber">{currencyRoundDuringParse}</span>
            <br />
        </div>
    );
};

export default ConvertersBigDecimalConverter;
