import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import { DateTimeConverter, IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import "ojs/ojdatetimepicker";
import {
  type InputTimeProps,
  type InputTimeValueChangedEvent,
} from "./inputTime-shared";
import Validator = require("ojs/ojvalidator");

class TimeIncrementValidator implements Validator<string> {
  private converter: DateTimeConverter;

  constructor(options: { converter: DateTimeConverter }) {
    this.converter = options.converter;
  }

  validate(value: string): void {
    if (value) {
      const currentTime = IntlConverterUtils.isoToLocalDate(value);
      let previousValidValue: string;
      let nextValidValue: string;
      let sampleMinute: number;
      const minutes = currentTime.getMinutes();

      if (minutes % 15 !== 0) {
        sampleMinute = Math.floor(minutes / 15) * 15;
        currentTime.setMinutes(sampleMinute);
        previousValidValue = IntlConverterUtils.dateToLocalIso(currentTime);
        sampleMinute += 15;

        if (sampleMinute >= 60) {
          sampleMinute = 0;
          currentTime.setTime(currentTime.getTime() + 60 * 60 * 1000);
        }

        currentTime.setMinutes(sampleMinute);
        nextValidValue = IntlConverterUtils.dateToLocalIso(currentTime);

        throw new Error(
          `Only multiples of 15 minute intervals are allowed. For example, ${this.converter.format(
            previousValidValue,
          )} or ${this.converter.format(nextValidValue)}.`,
        );
      }
    }
  }

  getHint(): string {
    const currentTime = new Date();
    let hintMessage = "Only 15 minute intervals accepted, for example";

    for (let i = 0; i < 4; i += 1) {
      currentTime.setMinutes(i * 15);
      hintMessage += `, ${this.converter.format(
        IntlConverterUtils.dateToLocalIso(currentTime),
      )}`;
    }

    return hintMessage;
  }
}

const validatorConverter = new IntlDateTimeConverter({
  hour: "2-digit",
  minute: "2-digit",
});

export default function InputTimeCustomValidatorExample() {
  const [value, setValue] = useState(
    IntlConverterUtils.dateToLocalIso(new Date()),
  );

  const validators = useMemo(
    () =>
      [
        new TimeIncrementValidator({ converter: validatorConverter }),
      ] as InputTimeProps["validators"],
    [],
  );

  const handleValueChanged = useCallback((event: InputTimeValueChangedEvent) => {
    setValue(event.detail.value);
  }, []);

  return (
    <div id="inputTimeCustomValidator">
      <oj-label for="customValidator">Custom Validator</oj-label>
      <oj-input-time
        id="customValidator"
        value={value}
        validators={validators}
        onvalueChanged={handleValueChanged}
      />

      <br />
      <br />

      <span class="oj-label">Current component value is:</span> <span>{value}</span>
    </div>
  );
}
