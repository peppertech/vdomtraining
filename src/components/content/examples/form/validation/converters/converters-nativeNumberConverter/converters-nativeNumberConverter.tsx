import 'oj-c/input-number';
import { JetElementCustomEvent } from 'ojs/index';
import { NumberConverter } from 'ojs/ojconverter-nativenumber';
import 'ojs/ojformlayout';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
export const ConvertersNativeNumberConverter = () => {
    const [currency, setCurrency] = useState<number | null>(12345);
    const [currencyRoundDuringParse, setCurrencyRoundDuringParse] = useState<number | null>(78000);
    const [decimal, setDecimal] = useState<number | null>(23450);
    const [decimalRoundingMode, setDecimalRoundingMode] = useState<number | null>(45000.5);
    const [decimalRoundingModeUpParse, setDecimalRoundingModeUpParse] = useState<number | null>(35450.54);
    const [decimalRoundingModeDownParse, setDecimalRoundingModeDownParse] = useState<number | null>(45999.62);
    const [decimalRoundingModeEvenParse, setDecimalRoundingModeEvenParse] = useState<number | null>(12500.51);
    const [percent, setPercent] = useState<number | null>(459);
    const [percentRoundDuringParse, setPercentRoundDuringParse] = useState<number | null>(890);
    const [formatDigitalUnits, setFormatDigitalUnits] = useState<number | null>(5000000);
    const eurNumberConverter = useMemo(() => new NumberConverter({
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol'
    }), [currency]);
    const eurAccountingNumberConverter = useMemo(() => new NumberConverter({
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol',
        currencySign: 'accounting'
    }), [currency]);
    const usdNumberConverter = useMemo(() => new NumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'code'
    }), [currency]);
    const currencyHalfUpConverter = useMemo(() => new NumberConverter({
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol',
        roundingMode: 'HALF_UP',
        roundDuringParse: true
    }), [currency]);
    const usdShortNumberConverter = useMemo(() => new NumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencyFormat: 'short',
        minimumFractionDigits: 0
    }), [currency]);
    const decimal1Converter = useMemo(() => new NumberConverter({
        style: 'decimal',
        minimumIntegerDigits: 2,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        useGrouping: false
    }), [decimal]);
    const decimal2Converter = useMemo(() => new NumberConverter({
        style: 'decimal',
        decimalFormat: 'short',
        minimumIntegerDigits: 2,
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        useGrouping: false
    }), [decimal]);
    const decimalHalfDownConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_DOWN',
        maximumFractionDigits: 0,
        useGrouping: false
    }), [decimal]);
    const decimalHalfDownGroupConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_DOWN',
        maximumFractionDigits: 0
    }), [decimal]);
    const decimalHalfUpGroupConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_UP',
        maximumFractionDigits: 0
    }), [decimal]);
    const decimalHalfEvenGroupConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_EVEN',
        maximumFractionDigits: 0
    }), [decimal]);
    const decimalHalfUpGroupRoundConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_UP',
        maximumFractionDigits: 2,
        roundDuringParse: true
    }), [decimal]);
    const decimalHalfDownGroupRoundConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_DOWN',
        maximumFractionDigits: 2,
        roundDuringParse: true
    }), [decimal]);
    const decimalHalfEvenGroupRoundConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        roundingMode: 'HALF_EVEN',
        maximumFractionDigits: 2,
        roundDuringParse: true
    }), [decimal]);
    const decimalShortConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        decimalFormat: 'short'
    }), [decimal]);
    const decimalLongConverter = useMemo(() => new NumberConverter({
        style: 'decimal',
        decimalFormat: 'long'
    }), [decimal]);
    const percent1Converter = useMemo(() => new NumberConverter({
        style: 'percent',
        maximumFractionDigits: 2,
        useGrouping: false,
        roundingMode: 'HALF_DOWN',
        roundDuringParse: true
    }), [percent]);
    const percent2Converter = useMemo(() => new NumberConverter({
        style: 'percent',
        maximumFractionDigits: 2,
        useGrouping: false
    }), [percent]);
    const unitConverter = useMemo(() => new NumberConverter({
        style: 'unit',
        unit: 'bit',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }), []);
    const handleDecimalValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setDecimal((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handleDecimalRoundingModeValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setDecimalRoundingMode((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handleDecimalRoundingModeUpParseValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setDecimalRoundingModeUpParse((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handleDecimalRoundingModeDownParseValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setDecimalRoundingModeDownParse((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handleDecimalRoundingModeEvenParseValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setDecimalRoundingModeEvenParse((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handlePercentValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setPercent((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handlePercentRoundDuringParseValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setPercentRoundDuringParse((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handleFormatDigitalUnitsValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setFormatDigitalUnits((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handleCurrencyValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setCurrency((event.detail.value as number | null | null | undefined) ?? null);
    };
    const handleCurrencyRoundDuringParseValueChanged = (event: JetElementCustomEvent<number | null | undefined>) => {
        setCurrencyRoundDuringParse((event.detail.value as number | null | null | undefined) ?? null);
    };
    const ojCInputNumberProps: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number. grouping separator is accepted"
        } };
    const ojCInputNumberProps2: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number. grouping separator is ignored"
        } };
    const ojCInputNumberProps3: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "the number entered in the previous input in short format"
        } };
    const ojCInputNumberProps4: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "the number entered in the previous input in long format"
        } };
    const ojCInputNumberProps5: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "the number in HALF_UP rounding mode"
        } };
    const ojCInputNumberProps6: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "the number entered in the previous input in HALF_DOWN rounding mode"
        } };
    const ojCInputNumberProps7: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "the number entered in the previous input in HALF_EVEN rounding mode"
        } };
    const ojCInputNumberProps8: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number and it will round to HALF_UP and round during parse"
        } };
    const ojCInputNumberProps9: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number and it will round to HALF_DOWN and round during parse"
        } };
    const ojCInputNumberProps10: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number and it will round to HALF_EVEN and round during parse"
        } };
    const ojCInputNumberProps11: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number. note that percent values are divided by 100"
        } };
    const ojCInputNumberProps12: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number. note that percent values are divided by 100. \n      The converter rounds down and rounds during parse"
        } };
    const ojCInputNumberProps13: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter a number and converter will format it to a digital unit"
        } };
    const ojCInputNumberProps14: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter an amount with or without grouping separator"
        } };
    const ojCInputNumberProps15: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter an amount with or without grouping separator"
        } };
    const ojCInputNumberProps16: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "enter an amount with or without grouping separator"
        } };
    const ojCInputNumberProps17: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "Enter an amount with or without grouping separator. It will round during parse"
        } };
    const ojCInputNumberProps18: Partial<ComponentProps<'oj-c-input-number'>> = { help: {
            instruction: "Enter an amount in field and the formatted currency\n                        will be displayed in readonly field below"
        } };
    return (<div id="number-converter-example">
            <h3 class="oj-header-border">Decimal</h3>
            <p>
                    Converts between number and a locale specific string displayed in decimal format.
                </p>
            <b>Example 1</b>
            : Default converter used on input number component demo (when
            <code class="prettyprint">converter</code>
            attribute is not set).
            <oj-form-layout id="fl4">
                    <oj-c-input-number labelHint="decimal default" id="decimal10" onvalueChanged={handleDecimalValueChanged} value={decimal} {...ojCInputNumberProps}/>
                </oj-form-layout>
            <b>Example 2</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "minimumIntegerDigits": "2", "useGrouping": "false", "minimumFractionDigits": "1", "maximumFractionDigits": "1"}`}</code>
            <oj-form-layout id="fl5">
                    <oj-c-input-number labelHint="no grouping" id="decimal11" onvalueChanged={handleDecimalValueChanged} value={decimal} converter={decimal1Converter} {...ojCInputNumberProps2}/>
                </oj-form-layout>
            <b>Example 3</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "decimalFormat": "short"}`}</code>
            <oj-form-layout id="fl6">
                    <oj-c-input-number labelHint="readonly decimal short" id="decimal13" onvalueChanged={handleDecimalValueChanged} value={decimal} readonly converter={decimalShortConverter}/>
                </oj-form-layout>
            <b>Example 4</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "minimumIntegerDigits": "2", "useGrouping": "false", "decimalFormat": "short", "minimumFractionDigits": "1", "maximumFractionDigits": "1"}`}</code>
            .
            <oj-form-layout id="fl7">
                    <oj-c-input-number labelHint="readonly decimal short minimumIntegerDigits 2" id="decimal14" onvalueChanged={handleDecimalValueChanged} value={decimal} readonly converter={decimal2Converter} {...ojCInputNumberProps3}/>
                </oj-form-layout>
            <b>Example 5</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "decimalFormat": "long"}`}</code>
            <oj-form-layout id="fl8">
                    <oj-c-input-number labelHint="readonly decimal long" id="decimal15" onvalueChanged={handleDecimalValueChanged} value={decimal} readonly converter={decimalLongConverter} {...ojCInputNumberProps4}/>
                </oj-form-layout>
            <h4>Decimal Converter with roundingMode</h4>
            <p>
                    Converts between number and a locale specific string displayed in decimal format and sets the roundMode to HALF_UP, HALF_DOWN, or HALF_EVEN. By default, the converter rounds during format, but not parse, so the current component value may not match the display value. You would use roundDuringParse option if you want to round during parse.
                </p>
            <b>Example 1</b>
            :
            <code class="prettyprint">"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_UP"</code>
            <oj-form-layout id="fl9">
                    <oj-c-input-number labelHint="round up" id="decimal21" onvalueChanged={handleDecimalRoundingModeValueChanged} value={decimalRoundingMode} converter={decimalHalfUpGroupConverter} {...ojCInputNumberProps5}/>
                </oj-form-layout>
            <b>Example 2</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_DOWN"}`}</code>
            <oj-form-layout id="fl10">
                    <oj-c-input-number labelHint="round down" id="decimal22" onvalueChanged={handleDecimalRoundingModeValueChanged} value={decimalRoundingMode} converter={decimalHalfDownGroupConverter} {...ojCInputNumberProps6}/>
                </oj-form-layout>
            <b>Example 3</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "maximumFractionDigits": "0", "roundingMode": "HALF_EVEN"}`}</code>
            .
            <oj-form-layout id="fl11">
                    <oj-c-input-number labelHint="round even" id="decimal23" onvalueChanged={handleDecimalRoundingModeValueChanged} value={decimalRoundingMode} converter={decimalHalfEvenGroupConverter} {...ojCInputNumberProps7}/>
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-decimalRoundingMode-value">{decimalRoundingMode}</span>
            <br />
            <h4>Decimal Converter with roundingMode and roundDuringParse: true</h4>
            <p>
                    Converts between number and a locale specific string displayed in decimal format and sets the roundMode to HALF_UP, HALF_DOWN, or HALF_EVEN. These examples also set roundDuringParse, and you will see the current component value matches the display value. To see the behavior, try entering a value with 3 fractional digits.
                </p>
            <b>Example 1</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "maximumFractionDigits": "2", "roundingMode": "HALF_UP", "roundDuringParse": "true"}`}</code>
            <oj-form-layout id="fl12">
                    <oj-c-input-number labelHint="roundDuringParse up" id="decimal31" onvalueChanged={handleDecimalRoundingModeUpParseValueChanged} value={decimalRoundingModeUpParse} converter={decimalHalfUpGroupRoundConverter} {...ojCInputNumberProps8}/>
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-value">{decimalRoundingModeUpParse}</span>
            <br />
            <br />
            <b>Example 2</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "maximumFractionDigits": "2", "roundingMode": "HALF_DOWN", "roundDuringParse": "true"}`}</code>
            <oj-form-layout id="fl13">
                    <oj-c-input-number labelHint="roundDuringParse down" id="decimal32" onvalueChanged={handleDecimalRoundingModeDownParseValueChanged} value={decimalRoundingModeDownParse} converter={decimalHalfDownGroupRoundConverter} {...ojCInputNumberProps9}/>
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-value2">{decimalRoundingModeDownParse}</span>
            <br />
            <br />
            <b>Example 3</b>
            :
            <code class="prettyprint">{`{"style": "decimal", "maximumFractionDigits": "2", "roundingMode": "HALF_EVEN", "roundDuringParse": "true"}`}</code>
            <oj-form-layout id="fl14">
                    <oj-c-input-number labelHint="roundDuringParse even" id="decimal33" onvalueChanged={handleDecimalRoundingModeEvenParseValueChanged} value={decimalRoundingModeEvenParse} converter={decimalHalfEvenGroupRoundConverter} {...ojCInputNumberProps10}/>
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-valuerme">{decimalRoundingModeEvenParse}</span>
            <br />
            <h3 class="oj-header-border">Percent</h3>
            <p>
                    Converts between number and a locale specific string displayed in percent format.
                </p>
            <p />
            <b>Example</b>
            :
            <code class="prettyprint">{`{"style": "percent", "maximumFractionDigits": "2", "useGrouping": "false"}`}</code>
            <oj-form-layout id="fl15">
                    <oj-c-input-number labelHint="percent" id="percent11" onvalueChanged={handlePercentValueChanged} value={percent} converter={percent2Converter} {...ojCInputNumberProps11}/>
                </oj-form-layout>
            <h4>Percent roundDuringParse</h4>
            <p>
                    Converts between number and a locale specific string displayed in percent format with roundDuringParse.
                </p>
            <p />
            <b>Example</b>
            :
            <code class="prettyprint">{`{"style": "percent", "maximumFractionDigits": "2", "useGrouping": "false", "roundingMode": "HALF_DOWN", "roundDuringParse": "true"}`}</code>
            <oj-form-layout id="fl16">
                    <oj-c-input-number labelHint="percent round down" id="percent21" onvalueChanged={handlePercentRoundDuringParseValueChanged} value={percentRoundDuringParse} converter={percent1Converter} {...ojCInputNumberProps12}/>
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-valuerme2">{percentRoundDuringParse}</span>
            <br />
            <h3>Converters for digital units</h3>
            <p>Converts number to digital units and formats like 5MB, 5Mb</p>
            <p />
            <b>Example</b>
            :
            <code class="prettyprint">{`{"style": "unit", "unit": "bit", "minimumFractionDigits": "2", "maximumFractionDigits": "2"}`}</code>
            <oj-form-layout id="fl19">
                    <oj-c-input-number labelHint="digital unit" id="inputNumberDigitalUnits" onvalueChanged={handleFormatDigitalUnitsValueChanged} value={formatDigitalUnits} converter={unitConverter} {...ojCInputNumberProps13}/>
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="curr-valuerme3">{formatDigitalUnits}</span>
            <br />
            <h3 class="oj-header-border">Currency</h3>
            <p>
                    Converts between number and a locale specific string displayed in currency format.
                </p>
            <p />
            <b>Example 1</b>
            :
            <code class="prettyprint">{`{"style": "currency", "currency": "EUR", "currencyDisplay": "symbol"}`}</code>
            <oj-form-layout id="fl1">
                    <oj-c-input-number labelHint="currency EUR" id="currency12" onvalueChanged={handleCurrencyValueChanged} value={currency} converter={eurNumberConverter} {...ojCInputNumberProps14}/>
                </oj-form-layout>
            <b>Example 2</b>
            :
            <code class="prettyprint">{`{"style": "currency", "currency": "USD", "currencyDisplay": "code"}`}</code>
            <oj-form-layout id="fl2">
                    <oj-c-input-number labelHint="currency USD" id="currency21" onvalueChanged={handleCurrencyValueChanged} value={currency} converter={usdNumberConverter} {...ojCInputNumberProps15}/>
                </oj-form-layout>
            <b>Example 3</b>
            :
            <code class="prettyprint">{`{"style": "currency", "currency": "EUR", "currencyDisplay": "symbol", "currencySign": "accounting"}`}</code>
            <oj-form-layout id="fl2a">
                    <oj-c-input-number labelHint="currency accounting" id="currency21a" onvalueChanged={handleCurrencyValueChanged} value={currency} converter={eurAccountingNumberConverter} {...ojCInputNumberProps16}/>
                </oj-form-layout>
            <h4 class="oj-header-border">Currency roundDuringParse</h4>
            <p>
                    Converts between number and a locale specific string displayed in currency format and rounds during parse.
                </p>
            <b>Example 1</b>
            :
            <code class="prettyprint">{`{"style": "currency", "currency": "EUR", "roundDuringParse": "true", "currencyDisplay": "symbol", "roundingMode": "HALF_UP"}`}</code>
            <oj-form-layout id="fl3">
                    <oj-c-input-number labelHint="currency round up" id="currency31" onvalueChanged={handleCurrencyRoundDuringParseValueChanged} value={currencyRoundDuringParse} converter={currencyHalfUpConverter} {...ojCInputNumberProps17}/>
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
            <code class="prettyprint">{`{"style": "currency", "currency": "USD", "currencyDisplay": "symbol", "currencyFormat":"short", "minimumFractionDigits":"0"}`}</code>
            <oj-form-layout id="flC1">
                    <oj-c-input-number labelHint="readonly currency short" id="inputTextShortNumber" onvalueChanged={handleCurrencyRoundDuringParseValueChanged} value={currencyRoundDuringParse} readonly converter={usdShortNumberConverter} {...ojCInputNumberProps18}/>
                </oj-form-layout>
            <span>Current component value is:</span>
            <span id="valueShortNumber">{currencyRoundDuringParse}</span>
            <br />
        </div>);
};
export default ConvertersNativeNumberConverter;
