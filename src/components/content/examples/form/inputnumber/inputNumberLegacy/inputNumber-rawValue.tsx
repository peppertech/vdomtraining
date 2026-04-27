import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import "ojs/ojbutton";
import "ojs/ojinputnumber";
import {
  type InputNumberRawValueChangedEvent,
  type InputNumberTransientValueChangedEvent,
  type InputNumberValueChangedEvent,
} from "./inputNumber-shared";

const currencyConverter = new IntlNumberConverter({
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
});
const regExpTwoDigitValidator = new AsyncRegExpValidator({
  pattern: "[0-9]{2}",
  hint: "enter exactly 2 numbers",
  messageDetail: "You must enter exactly 2 numbers",
});
const regExpTenMultipleValidator = new AsyncRegExpValidator({
  pattern: "[1-9][0-9]*0",
  hint: "enter a number that is a multiple of 10",
  messageDetail: "You must enter a number that is a multiple of 10",
});

export default function InputNumberRawValueExample() {
  const [currentValue, setCurrentValue] = useState(0);
  const [transientValue, setTransientValue] = useState<number | null>(null);
  const [rawValue, setRawValue] = useState("");
  const [convertedCurrentValue, setConvertedCurrentValue] = useState(8);
  const [convertedTransientValue, setConvertedTransientValue] =
    useState<number | null>(null);
  const [convertedRawValue, setConvertedRawValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const buttonDisabled = rawValue == null || rawValue.trim() === "";

  return (
    <div id="inputNumberRawValue">
      <p>
        In this demo we enable the Submit button if the <code>rawValue</code>{" "}
        is not empty and disable it if the <code>rawValue</code> is empty.
      </p>
      <oj-input-number
        id="inputnumber-id"
        labelHint="Default Converter/Validators"
        labelEdge="inside"
        min={0}
        max={100}
        step={10}
        value={currentValue}
        transientValue={transientValue}
        rawValue={rawValue}
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setCurrentValue(Number(event.detail.value ?? 0));
        }}
        ontransientValueChanged={(event: InputNumberTransientValueChangedEvent) => {
          setTransientValue(event.detail.value ?? null);
        }}
        onrawValueChanged={(event: InputNumberRawValueChangedEvent) => {
          setRawValue(String(event.detail.value ?? ""));
        }}
      />
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component value is:</span> <span>{currentValue}</span>
      </div>
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component transientValue is:</span>{" "}
        <span>{transientValue ?? ""}</span>
      </div>
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component rawValue is:</span> <span>{rawValue}</span>
      </div>
      <div class="oj-sm-margin-4x-bottom">
        <oj-button
          id="buttonId1"
          disabled={buttonDisabled}
          onojAction={() => {
            setSubmitted(true);
          }}
        >
          Submit
        </oj-button>
        {submitted ? (
          <span class="oj-sm-margin-2x-start">
            We enable the Submit button when rawValue is not empty.
          </span>
        ) : null}
      </div>

      <p>
        This demo has a converter and validators so you can see that{" "}
        <code>transientValue</code> is only updated when the value in the field
        is valid.
      </p>
      <oj-input-number
        id="inputnumber-id1"
        min={0}
        max={1000000}
        step={10}
        value={convertedCurrentValue}
        transientValue={convertedTransientValue}
        rawValue={convertedRawValue}
        converter={currencyConverter}
        validators={[[regExpTwoDigitValidator, regExpTenMultipleValidator]] as any}
        labelHint="With Converter/Validators"
        labelEdge="inside"
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setConvertedCurrentValue(Number(event.detail.value ?? 0));
        }}
        ontransientValueChanged={(event: InputNumberTransientValueChangedEvent) => {
          setConvertedTransientValue(event.detail.value ?? null);
        }}
        onrawValueChanged={(event: InputNumberRawValueChangedEvent) => {
          setConvertedRawValue(String(event.detail.value ?? ""));
        }}
      />
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component converted value is:</span>{" "}
        <span>{convertedCurrentValue}</span>
      </div>
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component converted transientValue is:</span>{" "}
        <span>{convertedTransientValue ?? ""}</span>
      </div>
      <span>Current component converted rawValue is:</span>{" "}
      <span>{convertedRawValue}</span>
    </div>
  );
}
