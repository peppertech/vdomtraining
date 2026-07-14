import "oj-c/input-month-mask";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import {
  type InputMonthMaskProps,
  type InputMonthMaskValueChangedEvent,
} from "./inputMonthMask-shared";

const min = { year: 2024, month: 2 } as NonNullable<
  InputMonthMaskProps["min"]
>;
const max = { year: 2024, month: 7 } as NonNullable<
  InputMonthMaskProps["max"]
>;

export default function InputMonthMaskRestrictRangeExample() {
  const [value, setValue] = useState<InputMonthMaskProps["value"]>({
    year: 2024,
    month: 4,
  });

  const valueText = useMemo(() => JSON.stringify(value), [value]);

  const handleValueChanged = useCallback(
    (event: InputMonthMaskValueChangedEvent) => {
      setValue((event.detail.value as InputMonthMaskProps["value"]) ?? null);
    },
    [],
  );

  return (
    <div id="inputMonthMaskRestrictRange">
      <oj-c-input-month-mask
        id="date"
        labelHint="Date with Min + Max Restriction"
        maxWidth="md"
        value={value}
        min={min}
        max={max}
        onvalueChanged={handleValueChanged}
      />

      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{valueText}</span>
      </div>
    </div>
  );
}
