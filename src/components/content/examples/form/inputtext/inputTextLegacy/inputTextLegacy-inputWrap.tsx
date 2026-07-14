import "ojs/ojbutton";
import "ojs/ojdatetimepicker";
import "ojs/ojinputnumber";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { useState } from "preact/hooks";
import { nowIsoDateTime } from "./inputTextLegacy-shared";

export default function InputTextLegacyInputWrapExample() {
  const [dateTimeValue, setDateTimeValue] = useState(nowIsoDateTime);

  return (
    <div>
      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel1">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          ></oj-input-text>
          <oj-button slot="value" chroming="outlined">
            <span slot="startIcon" class="oj-ux-ico-plus"></span>
            button
          </oj-button>
        </oj-label-value>
      </div>
      <hr />

      <oj-input-text
        labelHint="inside label"
        labelEdge="inside"
        value="text"
        class="demo-form-control-max-width"
      ></oj-input-text>
      <oj-button chroming="outlined" class="oj-button-lg">
        <span slot="startIcon" class="oj-ux-ico-plus"></span>
        button
      </oj-button>
      <hr />

      <div>
        <oj-label-value>
          <oj-label slot="label" labelId="grouplabel2">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          ></oj-input-text>
          <oj-input-number
            slot="value"
            aria-label="input number"
            max={100}
            min={0}
            value={20}
            step={10}
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          ></oj-input-number>
          <oj-button slot="value" chroming="outlined">
            <span slot="startIcon" class="oj-ux-ico-plus"></span>
            button
          </oj-button>
        </oj-label-value>
      </div>
      <hr />

      <div>
        <oj-label-value labelEdge="top">
          <oj-label slot="label" labelId="grouplabel3">
            top label
          </oj-label>
          <oj-input-text
            slot="value"
            aria-label="input text"
            value="text"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
          ></oj-input-text>
          <oj-input-date-time
            slot="value"
            labelHint="input datetime"
            labelEdge="none"
            class="demo-form-control-max-width oj-sm-padding-1x-end"
            value={dateTimeValue}
            onvalueChanged={(event) => {
              setDateTimeValue(event.detail.value ?? nowIsoDateTime);
            }}
          ></oj-input-date-time>
          <oj-button slot="value" chroming="outlined">
            <span slot="startIcon" class="oj-ux-ico-plus"></span>
            button
          </oj-button>
        </oj-label-value>
      </div>
    </div>
  );
}
