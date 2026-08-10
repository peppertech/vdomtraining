import "oj-c/checkbox";
import "oj-c/checkboxset";
import "oj-c/form-layout";
import "oj-c/input-date-mask";
import "oj-c/input-date-picker";
import "oj-c/input-date-text";
import "oj-c/input-month-mask";
import "oj-c/input-number";
import "oj-c/input-password";
import "oj-c/input-sensitive-text";
import "oj-c/input-text";
import "oj-c/input-time-mask";
import "oj-c/radioset";
import "oj-c/select-multiple";
import "oj-c/select-single";
import "oj-c/text-area";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type LabelEdge = "inside" | "start" | "top";
type ValueLength = "none" | "short" | "long";
type InputMonthMaskValue = ComponentProps<"oj-c-input-month-mask">["value"];

const labelEdgeDataProvider = new MutableArrayDataProvider(
  [
    { value: "inside", label: "inside" },
    { value: "start", label: "start" },
    { value: "top", label: "top" },
  ],
  { keyAttributes: "value" },
);

const valueLengthDataProvider = new MutableArrayDataProvider(
  [
    { value: "none", label: "None" },
    { value: "short", label: "Short" },
    { value: "long", label: "Long" },
  ],
  { keyAttributes: "value" },
);

const browserDataProvider = new MutableArrayDataProvider(
  [
    { value: "IE", label: "Windows Internet Explorer Version 11" },
    { value: "FF", label: "Android 11 Firefox" },
    { value: "CH", label: "Chrome" },
    { value: "OP", label: "Windows 10 Opera" },
    { value: "SA", label: "iOS Iphone 11Pro Safari" },
  ],
  { keyAttributes: "value" },
);

const colorOptions = new MutableArrayDataProvider(
  [
    { value: "blueopt", label: "Blue" },
    { value: "greenopt", label: "Green" },
    { value: "redopt", label: "Red" },
  ],
  { keyAttributes: "value" },
);

export default function FormLayoutCorePackFormInputsMixedExample() {
  const [labelEdge, setLabelEdge] = useState<LabelEdge>("start");
  const [valueLength, setValueLength] = useState<ValueLength>("short");

  const longTextSuffix =
    " that is longer to see how it renders when it is longer than the field.";
  const shortTextArea =
    "textarea is a field that has rows so that a user can see more text than an input text without needing to scroll.";
  const shortText = "text";
  const showValue = valueLength !== "none";
  const textValue =
    valueLength === "short"
      ? shortText
      : valueLength === "long"
        ? shortText + longTextSuffix
        : null;
  const textAreaValue =
    valueLength === "short"
      ? shortTextArea
      : valueLength === "long"
        ? shortTextArea + shortTextArea
        : null;
  const inputNumberValue =
    valueLength === "short"
      ? 10
      : valueLength === "long"
        ? 122334455667890.123
        : null;
  const inputDateValue = valueLength === "none" ? null : "2023-03-19";
  const inputMonthMaskValue: InputMonthMaskValue =
    valueLength === "none" ? null : { year: 2024, month: 11 };
  const inputTimeMaskValue =
    valueLength === "none" ? null : "T15:00:00.000";
  const selectMultipleValue =
    valueLength === "short"
      ? new Set(["CH", "SA"])
      : valueLength === "long"
        ? new Set(["CH", "SA", "IE", "FF", "OP"])
        : null;
  const selectSingleValue =
    valueLength === "long" ? "IE" : valueLength === "short" ? "CH" : null;

  return (
    <div id="form-container">
      <h6>Options To Control the Form Controls Below</h6>
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout id="formLayoutOptions" maxColumns={4} direction="row">
          <oj-c-radioset
            value={labelEdge}
            labelHint="Label Edge"
            aria-controls="myform"
            options={labelEdgeDataProvider}
            onvalueChanged={(event) => {
              setLabelEdge(
                (event.detail.value as LabelEdge | null) ?? "start",
              );
            }}
          />
          <oj-c-radioset
            labelHint="Value"
            id="valueLengthradio"
            value={valueLength}
            aria-controls="myform"
            options={valueLengthDataProvider}
            onvalueChanged={(event) => {
              setValueLength(
                (event.detail.value as ValueLength | null) ?? "short",
              );
            }}
          />
        </oj-c-form-layout>
      </div>

      <oj-c-form-layout
        id="myform"
        labelEdge={labelEdge}
        maxColumns={2}
        direction="row"
      >
        <oj-c-input-text id="f1" labelHint="input text" value={textValue} />
        <oj-c-input-text
          id="f1readonly"
          labelHint="readonly input text"
          value={textValue}
          readonly={true}
        />
        <oj-c-input-password
          id="f2"
          labelHint="input password"
          value={textValue}
        />
        <oj-c-input-password
          id="f2readonly"
          labelHint="readonly input password"
          value={textValue}
          readonly={true}
        />
        <oj-c-input-sensitive-text
          id="f2b"
          labelHint="input sensitive text"
          value={textValue}
        />
        <oj-c-input-sensitive-text
          id="f2breadonly"
          labelHint="readonly input sensitive text"
          value={textValue}
          readonly={true}
        />
        <oj-c-text-area
          id="f3"
          labelHint="textarea rows 3"
          rows={3}
          value={textAreaValue}
        />
        <oj-c-text-area
          id="f3readonly"
          labelHint="readonly textarea rows 3"
          rows={3}
          value={textAreaValue}
          readonly={true}
        />
        <oj-c-text-area
          id="f3a"
          labelHint="textarea max-rows -1"
          maxRows={-1}
          value={textAreaValue}
        />
        <oj-c-text-area
          id="f3areadonly"
          labelHint="readonly textarea max-rows -1"
          maxRows={-1}
          value={textAreaValue}
          readonly={true}
        />
        <oj-c-input-number
          id="f4"
          labelHint="input number"
          max={100}
          min={0}
          step={10}
          value={inputNumberValue}
        />
        <oj-c-input-number
          id="f4readonly"
          labelHint="readonly input number"
          max={100}
          min={0}
          step={10}
          value={inputNumberValue}
          readonly={true}
        />
        <oj-c-input-date-mask
          id="f6"
          labelHint="input date mask"
          value={inputDateValue}
        />
        <oj-c-input-date-mask
          id="f6readonly"
          labelHint="readonly input date mask"
          value={inputDateValue}
          readonly={true}
        />
        <oj-c-input-date-text
          id="f5"
          labelHint="input date text"
          value={inputDateValue}
          autocomplete="off"
        />
        <oj-c-input-date-text
          id="f5readonly"
          labelHint="readonly input date text"
          value={inputDateValue}
          readonly={true}
        />
        <oj-c-input-month-mask
          id="f6a"
          labelHint="input month mask"
          value={inputMonthMaskValue}
        />
        <oj-c-input-month-mask
          id="f6areadonly"
          labelHint="readonly input month mask"
          value={inputMonthMaskValue}
          readonly={true}
        />
        <oj-c-input-date-picker
          id="f18"
          labelHint="input date picker"
          value={inputDateValue}
        />
        <oj-c-input-date-picker
          id="f18readonly"
          labelHint="readonly input date picker"
          value={inputDateValue}
          readonly={true}
        />
        <oj-c-input-time-mask
          id="f7"
          labelHint="input time mask"
          value={inputTimeMaskValue}
        />
        <oj-c-input-time-mask
          id="f7readonly"
          labelHint="readonly input time mask"
          value={inputTimeMaskValue}
          readonly={true}
        />
        <oj-c-select-multiple
          id="f11a"
          labelHint="select multiple"
          value={selectMultipleValue}
          data={browserDataProvider}
          itemText="label"
        />
        <oj-c-select-multiple
          id="f11areadonly"
          labelHint="readonly select multiple"
          value={selectMultipleValue}
          data={browserDataProvider}
          itemText="label"
          readonly={true}
        />
        <oj-c-select-single
          id="f12"
          labelHint="select single"
          value={selectSingleValue}
          data={browserDataProvider}
          itemText="label"
        />
        <oj-c-select-single
          id="f13"
          labelHint="select single"
          value={selectSingleValue}
          data={browserDataProvider}
          itemText="label"
          readonly={true}
        />
        <oj-c-radioset
          id="f15"
          labelHint="radioset"
          value={showValue ? "blueopt" : null}
          options={colorOptions}
        />
        <oj-c-radioset
          id="f15readonly"
          labelHint="readonly radioset"
          value={showValue ? "blueopt" : null}
          options={colorOptions}
          readonly={true}
        />
        <oj-c-checkbox id="f17" value={showValue}>
          Agree
        </oj-c-checkbox>
        <oj-c-checkbox id="f17readonly" value={showValue} readonly={true}>
          Agree
        </oj-c-checkbox>
        <oj-c-checkboxset
          id="f16"
          labelHint="checkboxset"
          value={showValue ? ["blueopt"] : []}
          options={colorOptions}
        />
        <oj-c-checkboxset
          id="f16readonly"
          labelHint="readonly checkboxset"
          value={showValue ? ["blueopt"] : []}
          options={colorOptions}
          readonly={true}
        />
      </oj-c-form-layout>
    </div>
  );
}
