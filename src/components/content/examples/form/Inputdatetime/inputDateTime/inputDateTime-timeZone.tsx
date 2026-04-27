import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojradioset";
import {
  type InputDateTimeValueChangedEvent,
  type RadiosetValueChangedEvent,
} from "./inputDateTime-shared";

type DateFormatValue = IntlDateTimeConverter.ConverterOptions["dateFormat"];
type TimeFormatValue = IntlDateTimeConverter.ConverterOptions["timeFormat"];
type IsoStrFormatValue =
  IntlDateTimeConverter.ConverterOptions["isoStrFormat"];

type DateTimeConverterOptions = {
  dateFormat: DateFormatValue;
  timeFormat: TimeFormatValue;
  isoStrFormat: IsoStrFormatValue;
  timeZone: string;
};

const buildConverter = (options: DateTimeConverterOptions) =>
  new IntlDateTimeConverter({
    dateFormat: options.dateFormat,
    timeFormat: options.timeFormat,
    formatType: "datetime",
    isoStrFormat: options.isoStrFormat,
    timeZone: options.timeZone,
  });

export default function InputDateTimeTimeZoneExample() {
  const [dateFormatValue, setDateFormatValue] =
    useState<DateFormatValue>("short");
  const [timeFormatValue, setTimeFormatValue] =
    useState<TimeFormatValue>("long");
  const [isoStrFormatValue, setIsoStrFormatValue] =
    useState<IsoStrFormatValue>("zulu");
  const [timezoneValue, setTimezoneValue] = useState("America/Los_Angeles");
  const [dateTimeValue, setDateTimeValue] = useState("2013-12-02T04:00:00Z");

  const dateTimeConverter = useMemo(
    () =>
      buildConverter({
        dateFormat: dateFormatValue,
        timeFormat: timeFormatValue,
        isoStrFormat: isoStrFormatValue,
        timeZone: timezoneValue,
      }),
    [dateFormatValue, isoStrFormatValue, timeFormatValue, timezoneValue],
  );

  const refreshValueForOptions = useCallback(
    (
      nextDateFormat: DateFormatValue,
      nextTimeFormat: TimeFormatValue,
      nextIsoStrFormat: IsoStrFormatValue,
      nextTimeZone: string,
    ) => {
      const nextConverter = buildConverter({
        dateFormat: nextDateFormat,
        timeFormat: nextTimeFormat,
        isoStrFormat: nextIsoStrFormat,
        timeZone: nextTimeZone,
      });

      setDateTimeValue((prev) => {
        const parsed = nextConverter.parse(prev);
        return typeof parsed === "string"
          ? parsed
          : IntlConverterUtils.dateToLocalIso(parsed as unknown as Date);
      });
    },
    [],
  );

  const handleDateFormatChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      const nextValue = (event.detail.value ?? "short") as DateFormatValue;
      setDateFormatValue(nextValue);
      refreshValueForOptions(
        nextValue,
        timeFormatValue,
        isoStrFormatValue,
        timezoneValue,
      );
    },
    [isoStrFormatValue, refreshValueForOptions, timeFormatValue, timezoneValue],
  );

  const handleTimeFormatChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      const nextValue = (event.detail.value ?? "long") as TimeFormatValue;
      setTimeFormatValue(nextValue);
      refreshValueForOptions(
        dateFormatValue,
        nextValue,
        isoStrFormatValue,
        timezoneValue,
      );
    },
    [dateFormatValue, isoStrFormatValue, refreshValueForOptions, timezoneValue],
  );

  const handleIsoStrFormatChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      const nextValue = (event.detail.value ?? "zulu") as IsoStrFormatValue;
      setIsoStrFormatValue(nextValue);
      refreshValueForOptions(
        dateFormatValue,
        timeFormatValue,
        nextValue,
        timezoneValue,
      );
    },
    [dateFormatValue, refreshValueForOptions, timeFormatValue, timezoneValue],
  );

  const handleTimezoneChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      const nextValue = String(event.detail.value ?? "America/Los_Angeles");
      setTimezoneValue(nextValue);
      refreshValueForOptions(
        dateFormatValue,
        timeFormatValue,
        isoStrFormatValue,
        nextValue,
      );
    },
    [dateFormatValue, isoStrFormatValue, refreshValueForOptions, timeFormatValue],
  );

  const handleDateTimeValueChanged = useCallback(
    (event: InputDateTimeValueChangedEvent) => {
      setDateTimeValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputDateTimeTimeZone">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-form-layout
          id="floptions"
          maxColumns={4}
          userAssistanceDensity="reflow"
        >
          <oj-radioset
            id="dateFormatSelector"
            value={dateFormatValue}
            labelHint="dateFormat options"
            onvalueChanged={handleDateFormatChanged}
          >
            <oj-option value="short">short</oj-option>
            <oj-option value="medium">medium</oj-option>
            <oj-option value="long">long</oj-option>
            <oj-option value="full">full</oj-option>
          </oj-radioset>
          <oj-radioset
            id="timeFormatSelector"
            value={timeFormatValue}
            labelHint="timeFormat options"
            onvalueChanged={handleTimeFormatChanged}
          >
            <oj-option value="short">short</oj-option>
            <oj-option value="medium">medium</oj-option>
            <oj-option value="long">long</oj-option>
            <oj-option value="full">full</oj-option>
          </oj-radioset>
          <oj-radioset
            id="isoStrFormatSelector"
            value={isoStrFormatValue}
            labelHint="isoStrFormat options"
            onvalueChanged={handleIsoStrFormatChanged}
          >
            <oj-option value="offset">offset</oj-option>
            <oj-option value="zulu">zulu</oj-option>
            <oj-option value="local">local</oj-option>
          </oj-radioset>
          <oj-radioset
            id="timezoneSelector"
            value={timezoneValue}
            labelHint="timeZone"
            onvalueChanged={handleTimezoneChanged}
          >
            <oj-option value="America/Los_Angeles">America/Los_Angeles</oj-option>
            <oj-option value="America/New_York">America/New_York</oj-option>
            <oj-option value="Europe/London">Europe/London</oj-option>
            <oj-option value="Asia/Hong_Kong">Asia/Hong_Kong</oj-option>
          </oj-radioset>
        </oj-form-layout>
      </div>

      <oj-input-date-time
        id="timezone"
        value={dateTimeValue}
        converter={dateTimeConverter}
        labelHint="InputDateTime Timezone converter"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        onvalueChanged={handleDateTimeValueChanged}
      />

      <span class="oj-label">Parsed value is:</span>{" "}
      <span>{dateTimeValue}</span>
    </div>
  );
}
