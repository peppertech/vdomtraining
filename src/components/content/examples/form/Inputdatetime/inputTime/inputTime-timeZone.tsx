import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojradioset";
import { type RadiosetValueChangedEvent } from "./inputTime-shared";

type TimeFormatValue = IntlDateTimeConverter.ConverterOptions["timeFormat"];
type IsoStrFormatValue =
  IntlDateTimeConverter.ConverterOptions["isoStrFormat"];
type TimeConverterOptions = {
  timeFormat: TimeFormatValue;
  isoStrFormat: IsoStrFormatValue;
  timeZone: string;
};

const buildConverter = (options: TimeConverterOptions) =>
  new IntlDateTimeConverter({
    timeFormat: options.timeFormat,
    formatType: "time",
    isoStrFormat: options.isoStrFormat,
    timeZone: options.timeZone,
  });

export default function InputTimeTimeZoneExample() {
  const [timeFormatValue, setTimeFormatValue] = useState<TimeFormatValue>("long");
  const [isoStrFormatValue, setIsoStrFormatValue] =
    useState<IsoStrFormatValue>("zulu");
  const [timezoneValue, setTimezoneValue] = useState("America/Los_Angeles");
  const [timeValue, setTimeValue] = useState("T04:00:00Z");

  const timeConverter = useMemo(
    () =>
      buildConverter({
        timeFormat: timeFormatValue,
        isoStrFormat: isoStrFormatValue,
        timeZone: timezoneValue,
      }),
    [isoStrFormatValue, timeFormatValue, timezoneValue],
  );

  const refreshValueForOptions = useCallback(
    (
      nextTimeFormat: TimeFormatValue,
      nextIsoStrFormat: IsoStrFormatValue,
      nextTimeZone: string,
    ) => {
      const nextConverter = buildConverter({
        timeFormat: nextTimeFormat,
        isoStrFormat: nextIsoStrFormat,
        timeZone: nextTimeZone,
      });
      setTimeValue((prev) => {
        const parsed = nextConverter.parse(prev);
        return typeof parsed === "string"
          ? parsed
          : IntlConverterUtils.dateToLocalIso(parsed as unknown as Date);
      });
    },
    [],
  );

  const handleTimeFormatChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      const nextValue = (event.detail.value ?? "long") as TimeFormatValue;
      setTimeFormatValue(nextValue);
      refreshValueForOptions(nextValue, isoStrFormatValue, timezoneValue);
    },
    [isoStrFormatValue, refreshValueForOptions, timezoneValue],
  );

  const handleIsoStrFormatChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      const nextValue = (event.detail.value ?? "zulu") as IsoStrFormatValue;
      setIsoStrFormatValue(nextValue);
      refreshValueForOptions(timeFormatValue, nextValue, timezoneValue);
    },
    [refreshValueForOptions, timeFormatValue, timezoneValue],
  );

  const handleTimezoneChanged = useCallback(
    (event: RadiosetValueChangedEvent) => {
      const nextValue = String(event.detail.value ?? "America/Los_Angeles");
      setTimezoneValue(nextValue);
      refreshValueForOptions(timeFormatValue, isoStrFormatValue, nextValue);
    },
    [isoStrFormatValue, refreshValueForOptions, timeFormatValue],
  );

  const handleTimeValueChanged = useCallback((event: any) => {
    setTimeValue(String(event.detail.value ?? ""));
  }, []);

  return (
    <div id="inputTimeTimeZone">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-form-layout id="floptions" maxColumns={3} userAssistanceDensity="reflow">
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

      <oj-input-time
        id="timezone"
        value={timeValue}
        converter={timeConverter as any}
        labelHint="InputTime Timezone converter"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        onvalueChanged={handleTimeValueChanged}
      />

      <span class="oj-label">Parsed value is:</span> <span>{timeValue}</span>
    </div>
  );
}
