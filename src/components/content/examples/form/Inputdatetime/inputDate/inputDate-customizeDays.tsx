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
type DayMetadata = {
  disabled?: boolean;
  [key: string]: DayMetadata | boolean | undefined;
};

const getWeekday = (dateInfo: DayFormatterInput) => {
  const jsDate = new Date(dateInfo.fullYear, dateInfo.month - 1, dateInfo.date);
  const df = new Intl.DateTimeFormat("en-US", { weekday: "short" });
  return df.format(jsDate);
};

const externalDayMetadata: Record<string, DayMetadata> = {
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
    const yearMetadata = externalDayMetadata[yearStr] ?? {};
    externalDayMetadata[yearStr] = yearMetadata;
    if (!yearMetadata[monthStr]) {
      yearMetadata[monthStr] = {};
    }
    (yearMetadata[monthStr] as DayMetadata)[dayStr] = { disabled: true };
  }
}

function getMetadata(
  dayMetadata: DayMetadata | undefined,
  position: number,
  dateArray: Array<number>,
): DayMetadata | undefined {
  if (!dayMetadata || position === dateArray.length) {
    return dayMetadata;
  }
  const nextPos = position + 1;
  const exactMatch = getMetadata(
    dayMetadata[dateArray[position]] as DayMetadata | undefined,
    nextPos,
    dateArray,
  );
  if (exactMatch !== undefined) return exactMatch;
  return getMetadata(dayMetadata["*"] as DayMetadata | undefined, nextPos, dateArray);
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
    (dateInfo) => {
      const info = dateInfo as DayFormatterInput;
      if (info.fullYear === 2014 && info.month === 1 && info.date !== 1) {
        return { disabled: true };
      }
      if (info.month === 12 && info.date === 25) {
        return { disabled: true };
      }
      if (getWeekday(info) === "Mon") {
        return { disabled: true };
      }
      return null;
    },
    [],
  );

  const dayFormatterWithMetadata = useCallback<
    NonNullable<InputDateProps["dayFormatter"]>
  >((dateInfo) => {
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
