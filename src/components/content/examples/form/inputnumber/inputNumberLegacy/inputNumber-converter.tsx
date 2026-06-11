import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import { type InputNumberValueChangedEvent } from "./inputNumber-shared";

const eurNumberConverter = new IntlNumberConverter({
  style: "currency",
  currency: "EUR",
  currencyDisplay: "symbol",
});
const usdNumberConverter = new IntlNumberConverter({
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});
const decimal1Converter = new IntlNumberConverter({
  style: "decimal",
  minimumIntegerDigits: 2,
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
  useGrouping: false,
});
const decimalHalfDownConverter = new IntlNumberConverter({
  style: "decimal",
  roundingMode: "HALF_DOWN",
  maximumFractionDigits: 0,
  useGrouping: false,
});
const decimalShortConverter = new IntlNumberConverter({
  style: "decimal",
  decimalFormat: "short",
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});
const decimalLongConverter = new IntlNumberConverter({
  style: "decimal",
  decimalFormat: "long",
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});
const percent1Converter = new IntlNumberConverter({
  style: "percent",
  maximumFractionDigits: 2,
  useGrouping: false,
});
const percent2Converter = new IntlNumberConverter({
  style: "percent",
  maximumFractionDigits: 2,
  useGrouping: false,
  roundDuringParse: true,
});

export default function InputNumberConverterExample() {
  const [decimal, setDecimal] = useState<number | null>(7100);
  const [percent, setPercent] = useState(0.09);
  const [percentRounded, setPercentRounded] = useState(0.09);

  const handleDecimalChanged = useCallback(
    (event: InputNumberValueChangedEvent) => {
      setDecimal((event.detail.value as number | null | null | undefined) ?? null);
    },
    [],
  );
  const handlePercentChanged = useCallback(
    (setter: (value: number) => void) =>
      (event: InputNumberValueChangedEvent) => {
        setter(Number(event.detail.value ?? 0));
      },
    [],
  );

  return (
    <div id="inputNumberConverter">
      <oj-form-layout>
        <h3 class="oj-header-border">Default Converter</h3>
        <oj-input-number
          id="defaultInput"
          help={{ instruction: "enter a number, default converter has default option of numeric" }}
          value={decimal}
          labelHint="InputNumber default converter"
          onvalueChanged={handleDecimalChanged}
        />
        <h3 class="oj-header-border">Currency</h3>
        <span>style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'</span>
        <oj-input-number
          id="currency1"
          help={{ instruction: "enter an amount with or without grouping separator" }}
          value={decimal}
          converter={eurNumberConverter}
          labelHint="InputNumber currency EUR"
          onvalueChanged={handleDecimalChanged}
        />
        <span>style: 'currency', currency: 'USD', currencyDisplay: 'code'</span>
        <oj-input-number
          id="currency2"
          help={{ instruction: "enter an amount with or without grouping separator" }}
          value={decimal}
          converter={usdNumberConverter}
          labelHint="InputNumber currency USD"
          onvalueChanged={handleDecimalChanged}
        />
        <h3 class="oj-header-border">Decimal</h3>
        <span>
          style:'decimal', minimumIntegerDigits: 2, minimumFractionDigits: 2,
          maximumFractionDigits: 3, useGrouping: false
        </span>
        <oj-input-number
          id="decimal1"
          value={decimal}
          converter={decimal1Converter}
          labelHint="InputNumber decimal"
          onvalueChanged={handleDecimalChanged}
        />
        <span>
          style:'decimal', maximumFractionDigits: 0, roundingMode: 'HALF_DOWN',
          useGrouping: false
        </span>
        <oj-input-number
          id="decimal2"
          value={decimal}
          converter={decimalHalfDownConverter}
          labelHint="InputNumber decimal HALF_DOWN"
          onvalueChanged={handleDecimalChanged}
        />
        <span>
          style:'decimal', decimalFormat:'short', minimumFractionDigits: 2,
          maximumFractionDigits: 3
          <br />
          Can only use decimalFormat short in readonly mode.
        </span>
        <oj-input-number
          id="decimal1a"
          readonly
          value={decimal}
          converter={decimalShortConverter}
          labelHint="InputNumber decimalFormat short"
        />
        <span>
          style:'decimal', decimalFormat:'long', minimumFractionDigits: 2,
          maximumFractionDigits: 3
          <br />
          Can only use decimalFormat long in readonly mode.
        </span>
        <oj-input-number
          id="decimal1b"
          readonly
          value={decimal}
          converter={decimalLongConverter}
          labelHint="InputNumber decimalFormat long"
        />
      </oj-form-layout>

      <h3 class="oj-header-border">Percent</h3>
      <oj-form-layout>
        <span>style:'percent', maximumFractionDigits: 2, useGrouping: false</span>
        <oj-input-number
          id="percent1"
          help={{ instruction: "enter a number; percent values are divided by 100" }}
          value={percent}
          step={0.01}
          converter={percent1Converter}
          labelHint="InputNumber percent"
          onvalueChanged={handlePercentChanged(setPercent)}
        />
      </oj-form-layout>
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component value is:</span> <span>{percent}</span>
      </div>
      <oj-form-layout>
        <span>
          style:'percent', maximumFractionDigits: 2, useGrouping: false,
          roundDuringParse: true
        </span>
        <oj-input-number
          id="percent2"
          value={percentRounded}
          step={0.01}
          converter={percent2Converter}
          labelHint="InputNumber percent roundDuringParse"
          onvalueChanged={handlePercentChanged(setPercentRounded)}
        />
      </oj-form-layout>
      <span>Current component value is:</span> <span>{percentRounded}</span>
    </div>
  );
}
