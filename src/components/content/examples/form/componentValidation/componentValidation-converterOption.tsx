import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojlabelvalue";
import "ojs/ojswitch";
import "oj-c/button";
import "oj-c/input-text";
import {
  dateLongConverter,
  dateShortConverter,
  decimalConverter,
  percentConverter,
} from "./componentValidation-shared";

export default function ValidationUsecasesConverterOptionExample() {
  const [birthDate, setBirthDate] = useState<string | undefined>(undefined);
  const [birthDateValid, setBirthDateValid] = useState("");
  const [numberValue, setNumberValue] = useState<number | null>(1000);
  const [numberValid, setNumberValid] = useState("");
  const [checkValue, setCheckValue] = useState(false);
  const [useLongDate, setUseLongDate] = useState(false);
  const [numberMode, setNumberMode] = useState<"decimal" | "percent" | "none">(
    "decimal",
  );

  const activeNumberConverter = useMemo(() => {
    if (numberMode === "none") {
      return null;
    }
    if (numberMode === "percent") {
      if (checkValue && numberValue != null && !Number.isFinite(numberValue)) {
        setNumberValue(null);
      }
      return percentConverter;
    }
    return decimalConverter;
  }, [checkValue, numberMode, numberValue]);

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-text
        id="birthdate"
        labelHint="Birth Date"
        autocomplete="off"
        required={true}
        value={birthDate as any}
        converter={(useLongDate ? dateLongConverter : dateShortConverter) as any}
        onvalidChanged={(event: any) => {
          setBirthDateValid(String(event.detail.value ?? ""));
        }}
        onvalueChanged={(event: any) => {
          setBirthDate(event.detail.value as string | undefined);
        }}
      />
      <oj-label-value>
        <span slot="value">[Component Value: {String(birthDate)}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">[Component Valid: {birthDateValid}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">
          <oj-c-button
            label="Change Converter"
            onojAction={() => setUseLongDate(true)}
          />
          <oj-c-button
            label="Remove Converter"
            onojAction={() => setUseLongDate(false)}
          />
        </span>
      </oj-label-value>

      <oj-c-input-text
        id="numberfield"
        labelHint="Number"
        autocomplete="off"
        value={numberValue as any}
        converter={activeNumberConverter as any}
        onvalidChanged={(event: any) => {
          setNumberValid(String(event.detail.value ?? ""));
        }}
        onvalueChanged={(event: any) => {
          const value = event.detail.value;
          setNumberValue(value == null ? null : Number(value));
        }}
      />
      <oj-label-value>
        <span slot="value">[Component Value: {String(numberValue)}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">[Component Valid: {numberValid}]</span>
      </oj-label-value>
      <oj-label-value>
        <span slot="value">
          <oj-c-button
            label="Change Number Converter"
            onojAction={() => setNumberMode("percent")}
          />
          <oj-c-button
            label="Remove Number Converter"
            onojAction={() => setNumberMode("none")}
          />
        </span>
      </oj-label-value>
      <oj-switch
        labelHint="Check value before adding converter"
        value={checkValue}
        onvalueChanged={(event: any) => {
          setCheckValue(Boolean(event.detail.value));
        }}
      ></oj-switch>
    </oj-form-layout>
  );
}
