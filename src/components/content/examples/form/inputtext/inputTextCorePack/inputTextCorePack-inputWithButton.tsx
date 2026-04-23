import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/input-number";
import "oj-c/input-password";
import "oj-c/input-text";
import "oj-c/select-multiple";
import "oj-c/select-single";
import { createBrowserDataProvider } from "./inputTextCorePack-shared";

export default function InputTextCorePackInputWithButtonExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [selectMultipleValue, setSelectMultipleValue] = useState(
    new Set(["CH", "SA"]),
  );

  return (
    <div id="form-container">
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-1x-end">
          <oj-c-input-text
            labelHint="input text"
            labelEdge="start"
            value="text"
          ></oj-c-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item">
          <oj-c-button label="Button"></oj-c-button>
        </div>
      </div>
      <br />

      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-1x-end">
          <oj-c-input-number
            labelHint="input number"
            labelEdge="start"
            max={100}
            min={0}
            value={20}
            step={10}
          ></oj-c-input-number>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item">
          <oj-c-button label="Button"></oj-c-button>
        </div>
      </div>
      <br />

      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-1x-end">
          <oj-c-select-single
            labelHint="select single"
            labelEdge="start"
            value="FF"
            data={dataProvider}
            itemText="label"
          ></oj-c-select-single>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item">
          <oj-c-button label="Button"></oj-c-button>
        </div>
      </div>
      <br />

      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-1x-end">
          <oj-c-select-multiple
            labelHint="select multiple"
            labelEdge="start"
            value={selectMultipleValue}
            data={dataProvider}
            itemText="label"
            onvalueChanged={(event: any) => {
              setSelectMultipleValue(event.detail.value ?? new Set());
            }}
          ></oj-c-select-multiple>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item">
          <oj-c-button label="Button"></oj-c-button>
        </div>
      </div>
      <br />

      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-1x-end">
          <oj-c-input-text labelHint="input text" value="text"></oj-c-input-text>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item">
          <oj-c-button label="Button" size="lg"></oj-c-button>
        </div>
      </div>
      <br />

      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item oj-sm-padding-1x-end">
          <oj-c-input-password
            labelHint="input password"
            value="foo"
          ></oj-c-input-password>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-6 oj-flex-item">
          <oj-c-button label="Button" size="lg"></oj-c-button>
        </div>
      </div>
    </div>
  );
}
