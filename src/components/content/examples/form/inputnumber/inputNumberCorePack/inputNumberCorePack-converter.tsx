import { h } from "preact";
import { useState } from "preact/hooks";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import "oj-c/form-layout";
import "oj-c/input-number";
import { type InputNumberCorePackValueChangedEvent } from "./inputNumberCorePack-shared";

const eurNumberConverter = new IntlNumberConverter({ style: "currency", currency: "EUR", currencyDisplay: "symbol" });
const usdNumberConverter = new IntlNumberConverter({ style: "currency", currency: "USD", currencyDisplay: "code" });
const decimal1Converter = new IntlNumberConverter({ style: "decimal", minimumIntegerDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 3, useGrouping: false });
const decimalHalfDownConverter = new IntlNumberConverter({ style: "decimal", roundingMode: "HALF_DOWN", maximumFractionDigits: 0, useGrouping: false });
const decimalShortConverter = new IntlNumberConverter({ style: "decimal", decimalFormat: "short", minimumFractionDigits: 2, maximumFractionDigits: 3 });
const decimalLongConverter = new IntlNumberConverter({ style: "decimal", decimalFormat: "long", minimumFractionDigits: 2, maximumFractionDigits: 3 });
const percent1Converter = new IntlNumberConverter({ style: "percent", maximumFractionDigits: 2, useGrouping: false });
const percent2Converter = new IntlNumberConverter({ style: "percent", maximumFractionDigits: 2, useGrouping: false, roundDuringParse: true });

export default function InputNumberCorePackConverterExample() {
  const [decimal, setDecimal] = useState<number | null>(7100);
  const [percent, setPercent] = useState(0.09);
  const [percentRounded, setPercentRounded] = useState(0.09);
  const setNumber =
    (setter: (value: number) => void) =>
    (event: InputNumberCorePackValueChangedEvent) => setter(Number(event.detail.value ?? 0));

  return (
    <div id="inputNumberCorePackConverter">
      <oj-c-form-layout>
        <h3 class="oj-header-border">Default Converter</h3>
        <oj-c-input-number id="defaultInput" help={{ instruction: "enter a number, default converter has default option of numeric" }} value={decimal} labelHint="InputNumber default converter" onvalueChanged={(event: InputNumberCorePackValueChangedEvent) => setDecimal(event.detail.value ?? null)} />
        <h3 class="oj-header-border">Currency</h3>
        <span>style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'</span>
        <oj-c-input-number id="currency1" help={{ instruction: "enter an amount with or without grouping separator" }} value={decimal} converter={eurNumberConverter as any} labelHint="InputNumber currency EUR" onvalueChanged={(event: InputNumberCorePackValueChangedEvent) => setDecimal(event.detail.value ?? null)} />
        <span>style: 'currency', currency: 'USD', currencyDisplay: 'code'</span>
        <oj-c-input-number id="currency2" help={{ instruction: "enter an amount with or without grouping separator" }} value={decimal} converter={usdNumberConverter as any} labelHint="InputNumber currency USD" onvalueChanged={(event: InputNumberCorePackValueChangedEvent) => setDecimal(event.detail.value ?? null)} />
        <h3 class="oj-header-border">Decimal</h3>
        <span>style:'decimal', minimumIntegerDigits: 2, minimumFractionDigits: 2, maximumFractionDigits: 3, useGrouping: false</span>
        <oj-c-input-number id="decimal1" help={{ instruction: "enter a number. grouping separator is ignored" }} value={decimal} converter={decimal1Converter as any} labelHint="InputNumber decimal" onvalueChanged={(event: InputNumberCorePackValueChangedEvent) => setDecimal(event.detail.value ?? null)} />
        <span>style:'decimal', maximumFractionDigits: 0, roundingMode: 'HALF_DOWN', useGrouping: false</span>
        <oj-c-input-number id="decimal2" value={decimal} help={{ instruction: "enter a number and it rounds down. e.g., 2.5 rounds down to 2 during format" }} converter={decimalHalfDownConverter as any} labelHint="InputNumber decimal HALF_DOWN" onvalueChanged={(event: InputNumberCorePackValueChangedEvent) => setDecimal(event.detail.value ?? null)} />
        <span>style:'decimal', decimalFormat:'short', minimumFractionDigits: 2, maximumFractionDigits: 3<br />Can only use decimalFormat short in readonly mode.</span>
        <oj-c-input-number id="decimal1a" readonly value={decimal} converter={decimalShortConverter as any} labelHint="InputNumber decimalFormat short" />
        <span>style:'decimal', decimalFormat:'long', minimumFractionDigits: 2, maximumFractionDigits: 3<br />Can only use decimalFormat long in readonly mode.</span>
        <oj-c-input-number id="decimal1b" readonly value={decimal} converter={decimalLongConverter as any} labelHint="InputNumber decimalFormat long" />
      </oj-c-form-layout>

      <h3 class="oj-header-border">Percent</h3>
      <oj-c-form-layout>
        <span>style:'percent', maximumFractionDigits: 2, useGrouping: false</span>
        <oj-c-input-number id="percent1" help={{ instruction: "enter a number; percent values are divided by 100" }} value={percent} step={0.01} converter={percent1Converter as any} labelHint="InputNumber percent" onvalueChanged={setNumber(setPercent)} />
      </oj-c-form-layout>
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component value is:</span> <span>{percent}</span>
      </div>
      <oj-c-form-layout>
        <span>style:'percent', maximumFractionDigits: 2, useGrouping: false, roundDuringParse: true</span>
        <oj-c-input-number id="percent2" help={{ instruction: "enter a number; percent values are divided by 100 and rounded during parse" }} value={percentRounded} step={0.01} converter={percent2Converter as any} labelHint="InputNumber percent roundDuringParse" onvalueChanged={setNumber(setPercentRounded)} />
      </oj-c-form-layout>
      <span>Current component value is:</span> <span>{percentRounded}</span>
    </div>
  );
}
