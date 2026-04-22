import { h } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "oj-c/input-number";
import "oj-c/input-text";
import {
  aprilFoolsValidator,
  asyncSyncValidator,
  currencyConverter,
  delayedRangeValidator,
} from "./componentValidation-shared";

export default function ValidationUsecasesAsyncValidatorsExample() {
  const [quantityLimit, setQuantityLimit] = useState<string | undefined>(
    undefined,
  );
  const [quantityLimitNumber, setQuantityLimitNumber] = useState<
    number | undefined
  >(undefined);
  const [inputValid, setInputValid] = useState("");
  const [inputNumberValid, setInputNumberValid] = useState("");
  const [dateValue, setDateValue] = useState<string | undefined>(undefined);
  const [inputDateValid, setInputDateValid] = useState("");

  return (
    <div id="validation-usecase">
      <oj-form-layout>
        <oj-c-input-text
          required={true}
          labelHint="Quantity Limit"
          onvalidChanged={(event: any) => {
            setInputValid(String(event.detail.value ?? ""));
          }}
          validators={[[asyncSyncValidator, delayedRangeValidator]] as any}
          value={quantityLimit}
          converter={currencyConverter as any}
          onvalueChanged={(event: any) => {
            setQuantityLimit(event.detail.value as string | undefined);
          }}
        />
        <span>[Component&apos;s valid property: {inputValid}]</span>
        <span>[Component&apos;s value property: {String(quantityLimit)}]</span>

        <oj-c-input-number
          required={true}
          labelHint="Quantity Limit Input Number"
          onvalidChanged={(event: any) => {
            setInputNumberValid(String(event.detail.value ?? ""));
          }}
          validators={[[asyncSyncValidator, delayedRangeValidator]] as any}
          value={quantityLimitNumber as any}
          converter={currencyConverter as any}
          onvalueChanged={(event: any) => {
            setQuantityLimitNumber(
              event.detail.value == null ? undefined : Number(event.detail.value),
            );
          }}
        />
        <span>[Component&apos;s valid property: {inputNumberValid}]</span>
        <span>[Component&apos;s value property: {String(quantityLimitNumber)}]</span>

        <oj-input-date
          value={dateValue as any}
          labelHint="Pick a Date"
          onvalidChanged={(event: any) => {
            setInputDateValid(String(event.detail.value ?? ""));
          }}
          validators={[[aprilFoolsValidator]] as any}
          onvalueChanged={(event: any) => {
            setDateValue(event.detail.value as string | undefined);
          }}
        />
        <span>[Component&apos;s valid property: {inputDateValid}]</span>
        <span>[Component&apos;s value property: {String(dateValue)}]</span>
      </oj-form-layout>
    </div>
  );
}
