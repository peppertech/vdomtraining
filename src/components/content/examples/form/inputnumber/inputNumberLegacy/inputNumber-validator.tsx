import { IntlNumberConverter } from "ojs/ojconverter-number";
import "ojs/ojinputnumber";
import 'preact';
import { type ComponentProps } from 'preact';
import { useState } from "preact/hooks";
import { type InputNumberValueChangedEvent } from "./inputNumber-shared";
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");
import AsyncNumberRangeValidator = require("ojs/ojasyncvalidator-numberrange");

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
const numberRangeValidator = new AsyncNumberRangeValidator({
  min: 10,
  max: 90,
  messageDetail: {
    rangeUnderflow: "Number should be between be at least {min}",
  },
  converter: new IntlNumberConverter(),
});

const translations = {
  numberRange: {
    messageDetail: {
      rangeUnderflow:
        "<html>Translations Option:<br/> The number {value} is not >= {min}</html>",
      rangeOverflow:
        "<html>Translations Option:<br/> The number {value} is not <= {max}</html>",
    },
  },
};

export default function InputNumberValidatorExample() {
  const [currentValue, setCurrentValue] = useState(10);
  const [rangeValue, setRangeValue] = useState(30);
  const [rangeCustomMessageValue, setRangeCustomMessageValue] = useState(40);
  const [regExpInputValue, setRegExpInputValue] = useState<number | null>(null);

  return (
    <div id="inputNumberValidator">
      <span>
        Remove the value, tab out, and the oj-input-number component will show
        an error.
      </span>
      <oj-input-number
        id="input-number-validator"
        value={currentValue}
        required
        labelHint="Required Validator"
        labelEdge="inside"
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setCurrentValue(Number(event.detail.value ?? 0));
        }}
      />
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component value is:</span> <span>{currentValue}</span>
      </div>
      <hr />
      <span>
        To see an error, type a number that is out of range (e.g., 110), and
        tab out.
      </span>
      <oj-input-number
        id="input-number-range-validator"
        value={rangeValue}
        min={0}
        max={100}
        step={10}
        labelHint="Range Validator"
        labelEdge="inside"
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setRangeValue(Number(event.detail.value ?? 0));
        }}
      />
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component value is:</span> <span>{rangeValue}</span>
      </div>
      <hr />
      <span>
        Type a number outside the min-max range, tab out, and observe the
        error; the translations option is used to customize the error messages.
      </span>
      <oj-input-number
        id="numberTranslations"
        value={rangeCustomMessageValue}
        min={0}
        max={44}
        labelHint="Range Validator with Custom Messages"
        labelEdge="inside"
        translations={translations as ComponentProps<'oj-input-number'>['translations']}
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setRangeCustomMessageValue(Number(event.detail.value ?? 0));
        }}
      />
      <div class="oj-sm-margin-4x-bottom">
        <span>Current component value is:</span>{" "}
        <span>{rangeCustomMessageValue}</span>
      </div>
      <hr />
      <span>
        To see an error, type a number that is invalid, like 1000, and tab out.
      </span>
      <oj-input-number
        id="regExpInputNumber"
        max={100}
        value={regExpInputValue}
        labelHint="Multiple RegExp Validators"
        labelEdge="inside"
        validators={
          [[regExpTwoDigitValidator, regExpTenMultipleValidator, numberRangeValidator]] as unknown as ComponentProps<'oj-input-number'>['validators']
        }
        onvalueChanged={(event: InputNumberValueChangedEvent) => {
          setRegExpInputValue((event.detail.value as number | null | null | undefined) ?? null);
        }}
      />
    </div>
  );
}
