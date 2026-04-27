import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import "ojs/ojdatetimepicker";
import { type InputDateProps, type InputDateValueChangedEvent } from "./inputDate-shared";

type DayFormatterInput = {
  fullYear: number;
  month: number;
  date: number;
};

const getWeekday = (dateInfo: DayFormatterInput) => {
  const jsDate = new Date(dateInfo.fullYear, dateInfo.month - 1, dateInfo.date);
  const df = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  return df.format(jsDate);
};

const externalDayMetadata: Record<string, any> = {
  "*": {
    "12": {
      "25": { disabled: true },
    },
  },
  "2014": {
    "1": {
      "*": { disabled: true },
      "1": { disabled: false },
    },
  },
};

const YEAR = 2014;
const MONTH = 2;
const DAYS_IN_MONTH = new Date(YEAR, MONTH, 0).getDate();
for (let date = 1; date <= DAYS_IN_MONTH; date += 1) {
  const weekday = getWeekday({ fullYear: YEAR, month: MONTH, date });
  if (weekday === "Mon") {
    const yearStr = String(YEAR);
    const monthStr = String(MONTH);
    const dayStr = String(date);
    if (!externalDayMetadata[yearStr]) externalDayMetadata[yearStr] = {};
    if (!externalDayMetadata[yearStr][monthStr]) {
      externalDayMetadata[yearStr][monthStr] = {};
    }
    externalDayMetadata[yearStr][monthStr][dayStr] = { disabled: true };
  }
}

function getMetadata(
  dayMetadata: any,
  position: number,
  dateArray: Array<number>,
): any {
  if (!dayMetadata || position === dateArray.length) {
    return dayMetadata;
  }
  const nextPos = position + 1;
  const exactMatch: any = getMetadata(
    dayMetadata[dateArray[position]],
    nextPos,
    dateArray,
  );
  if (exactMatch !== undefined) return exactMatch;
  return getMetadata(dayMetadata["*"], nextPos, dateArray);
}

export default function InputDateCustomizeDaysVdomExample() {
  const initialDate =
    IntlConverterUtils.dateToLocalIsoDateString(new Date(2014, 0, 1)) ?? "";
  const [dayFormatterValue, setDayFormatterValue] = useState(initialDate);
  const [dayFormatterValue2, setDayFormatterValue2] = useState(initialDate);

  const handleValueChanged = useCallback(
    (setter: (value: string) => void) =>
      (event: InputDateValueChangedEvent) => {
        setter(String(event.detail.value ?? ""));
      },
    [],
  );

  const dayFormatter = useCallback<NonNullable<InputDateProps["dayFormatter"]>>(
    (dateInfo: any) => {
      const info = dateInfo as DayFormatterInput;
      if (info.fullYear === 2014 && info.month === 1 && info.date !== 1) {
        return { disabled: true } as any;
      }
      if (info.month === 12 && info.date === 25) {
        return { disabled: true } as any;
      }
      if (getWeekday(info) === "Mon") {
        return { disabled: true } as any;
      }
      return null as any;
    },
    [],
  );

  const dayFormatterWithMetadata = useCallback<
    NonNullable<InputDateProps["dayFormatter"]>
  >((dateInfo: any) => {
    const info = dateInfo as DayFormatterInput;
    return (
      getMetadata(externalDayMetadata, 0, [info.fullYear, info.month, info.date]) ??
      null
    );
  }, []);

  return (
    <div id="inputDateCustomizeDaysVdom">
      <oj-input-date
        labelHint="dayFormatter"
        id="dayFormatterOption-vdom"
        value={dayFormatterValue}
        dayFormatter={dayFormatter}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged(setDayFormatterValue)}
      />

      <div class="oj-sm-margin-2x-vertical">
        <div>Current component value is:</div>
        <span>{dayFormatterValue}</span>
      </div>

      <div class="oj-sm-margin-8x-vertical"></div>

      <oj-input-date
        labelHint="dayFormatter with metadata"
        value={dayFormatterValue2}
        dayFormatter={dayFormatterWithMetadata}
        class="oj-form-control-max-width-md"
        onvalueChanged={handleValueChanged(setDayFormatterValue2)}
      />
      <div class="oj-sm-margin-2x-vertical">
        <div>Current component value is:</div>
        <span>{dayFormatterValue2}</span>
      </div>
    </div>
  );
}
