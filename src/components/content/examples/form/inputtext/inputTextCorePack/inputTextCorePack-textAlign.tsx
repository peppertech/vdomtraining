import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/buttonset-single";
import "oj-c/form-layout";
import "oj-c/input-number";
import "oj-c/input-password";
import "oj-c/input-text";
import "oj-c/select-multiple";
import {
  buttonsetItems,
  createBrowserDataProvider,
} from "./inputTextCorePack-shared";

export default function InputTextCorePackTextAlignExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [textAlign, setTextAlign] = useState("start");
  const [textVal, setTextVal] = useState("text");
  const [passwordVal, setPasswordVal] = useState("mypassword");
  const [numberVal, setNumberVal] = useState(538499);
  const [selectMultipleVal, setSelectMultipleVal] = useState(
    new Set(["CH", "SA"]),
  );

  const textAlignValue = useMemo(
    () => (textAlign === "" ? undefined : textAlign),
    [textAlign],
  );

  const handleTextAlignChanged = useCallback((event: any) => {
    setTextAlign(event.detail.value ?? "");
  }, []);

  return (
    <div id="form-container">
      <div class="oj-sm-margin-4x-bottom oj-panel oj-bg-info-30">
        <h6>Set the text-align attribute</h6>
        <oj-c-buttonset-single
          id="textAlign"
          value={textAlign}
          items={buttonsetItems}
          aria-label="Choose only one format."
          onvalueChanged={handleTextAlignChanged}
        ></oj-c-buttonset-single>
      </div>

      <oj-c-form-layout id="myform">
        <oj-c-input-text
          textAlign={textAlignValue as any}
          value={textVal}
          labelHint="Input Text"
          onvalueChanged={(event: any) => {
            setTextVal(event.detail.value ?? "");
          }}
        ></oj-c-input-text>
        <oj-c-input-password
          textAlign={textAlignValue as any}
          value={passwordVal}
          labelHint="Input Password"
          onvalueChanged={(event: any) => {
            setPasswordVal(event.detail.value ?? "");
          }}
        ></oj-c-input-password>
        <oj-c-input-number
          textAlign={textAlignValue as any}
          value={numberVal}
          labelHint="Input Number"
          onvalueChanged={(event: any) => {
            setNumberVal(event.detail.value ?? 0);
          }}
        ></oj-c-input-number>
        <oj-c-select-multiple
          textAlign={textAlignValue as any}
          labelHint="Select Multiple"
          value={selectMultipleVal}
          data={dataProvider}
          itemText="label"
          onvalueChanged={(event: any) => {
            setSelectMultipleVal(event.detail.value ?? new Set());
          }}
        ></oj-c-select-multiple>
      </oj-c-form-layout>
    </div>
  );
}
