import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojmenu";
import 'preact';
import { useState } from "preact/hooks";
import {
  renderCheckboxOptions,
  shapeOptions,
  type CheckboxsetValueChangedEvent,
} from "./checkBoxSet-shared";

export default function CheckBoxSetContextMenuExample() {
  const [currentValue, setCurrentValue] = useState<string[]>(["circle"]);

  return (
    <div>
      <oj-form-layout>
        <oj-checkboxset
          value={currentValue}
          labelHint="oj-checkboxset with a context menu"
          onvalueChanged={(event: CheckboxsetValueChangedEvent) => {
            setCurrentValue((event.detail.value as string[]) ?? []);
          }}
        >
          {renderCheckboxOptions(shapeOptions)}
          <oj-menu slot="contextMenu" aria-label="Order Actions">
            <oj-option value="zoomin">
              <span class="oj-ux-ico-zoom-in" slot="startIcon"></span>
              Zoom In
            </oj-option>
            <oj-option value="zoomout">
              <span class="oj-ux-ico-zoom-out" slot="startIcon"></span>
              Zoom Out
            </oj-option>
            <oj-option></oj-option>
            <oj-option value="save">
              <span class="oj-ux-ico-save" slot="startIcon"></span>
              Save
            </oj-option>
            <oj-option value="print" disabled>
              <span class="oj-ux-ico-print" slot="startIcon"></span>
              Print...
            </oj-option>
          </oj-menu>
        </oj-checkboxset>
      </oj-form-layout>

      <oj-label-value>
        <oj-label slot="label">Current component value is</oj-label>
        <span slot="value">{currentValue.join(", ")}</span>
      </oj-label-value>
    </div>
  );
}
