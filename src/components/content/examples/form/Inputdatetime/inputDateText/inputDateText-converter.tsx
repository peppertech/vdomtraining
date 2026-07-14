import "oj-c/form-layout";
import "oj-c/input-date-text";
import "oj-c/select-single";
import { LocalDateConverter } from "ojs/ojconverter-localdate";
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import {
  type InputDateTextValue,
  type InputDateTextValueChangedEvent,
  type SelectSingleValueChangedEvent,
} from "./inputDateText-shared";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type DateStyle = NonNullable<LocalDateConverter.ConverterOptions["dateStyle"]>;

type DateStyleOption = {
  value: DateStyle;
  label: string;
};

const dateStyles: DateStyleOption[] = [
  { value: "short", label: "dateStyle: 'short'" },
  { value: "medium", label: "dateStyle: 'medium'" },
  { value: "long", label: "dateStyle: 'long'" },
  { value: "full", label: "dateStyle: 'full'" },
];

const isDateStyle = (value: unknown): value is DateStyle =>
  value === "short" ||
  value === "medium" ||
  value === "long" ||
  value === "full";

export default function InputDateTextConverterExample() {
  const [dateValue, setDateValue] =
    useState<InputDateTextValue>("2023-04-27");
  const [selectVal, setSelectVal] = useState<DateStyle>("long");

  const dateConverter = useMemo(
    () =>
      new LocalDateConverter({
        dateStyle: selectVal,
      }),
    [selectVal],
  );

  const dateStylesDP = useMemo(
    () =>
      new ArrayDataProvider<DateStyle, DateStyleOption>(dateStyles, {
        keyAttributes: "value",
      }),
    [],
  );

  const handleDateValueChanged = useCallback(
    (event: InputDateTextValueChangedEvent) => {
      setDateValue(event.detail.value ?? null);
    },
    [],
  );

  const handleStyleChanged = useCallback(
    (event: SelectSingleValueChangedEvent<DateStyle, DateStyleOption>) => {
      const nextValue = event.detail.value;
      if (isDateStyle(nextValue)) {
        setSelectVal(nextValue);
      }
    },
    [],
  );

  return (
    <div id="inputDateTextConverter">
      <oj-c-form-layout>
        <oj-c-input-date-text
          id="date"
          labelHint="Date"
          value={dateValue}
          converter={dateConverter}
          onvalueChanged={handleDateValueChanged}
        />
        <oj-c-select-single
          id="select1"
          labelHint="Converter dateStyle options"
          labelEdge="inside"
          data={dateStylesDP}
          value={selectVal}
          onvalueChanged={handleStyleChanged}
          itemText="label"
        />
      </oj-c-form-layout>

      <div class="oj-sm-margin-4x-vertical">
        <span>Current component value is:</span> <span>{dateValue}</span>
      </div>
    </div>
  );
}
