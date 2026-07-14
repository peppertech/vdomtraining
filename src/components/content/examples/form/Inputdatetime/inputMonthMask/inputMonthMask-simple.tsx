import "oj-c/input-month-mask";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import {
  todayMonthValue,
  type InputMonthMaskProps,
  type InputMonthMaskRawValueChangedEvent,
  type InputMonthMaskValueChangedEvent,
} from "./inputMonthMask-shared";

export default function InputMonthMaskSimpleExample() {
  const [value, setValue] =
    useState<InputMonthMaskProps["value"]>(todayMonthValue);
  const [rawValue, setRawValue] = useState<InputMonthMaskProps["rawValue"]>();

  const rawValueText = useMemo(() => JSON.stringify(rawValue), [rawValue]);
  const valueText = useMemo(() => JSON.stringify(value), [value]);

  const handleValueChanged = useCallback(
    (event: InputMonthMaskValueChangedEvent) => {
      setValue((event.detail.value as InputMonthMaskProps["value"]) ?? null);
    },
    [],
  );

  const handleRawValueChanged = useCallback(
    (event: InputMonthMaskRawValueChangedEvent) => {
      setRawValue(
        (event.detail.value as InputMonthMaskProps["rawValue"]) ?? undefined,
      );
    },
    [],
  );

  return (
    <div id="inputMonthMaskSimple">
      <oj-c-input-month-mask
        labelHint="Expiration"
        id="date"
        maxWidth="md"
        value={value}
        onvalueChanged={handleValueChanged}
        onrawValueChanged={handleRawValueChanged}
      />

      <div class="oj-sm-margin-4x-vertical">
        <div class="oj-sm-margin-4x-vertical">
          <span>Current component value is:</span> <span>{valueText}</span>
        </div>
        <div class="oj-sm-margin-4x-vertical">
          <span>Current raw value is:</span> <span>{rawValueText}</span>
        </div>
      </div>
    </div>
  );
}
