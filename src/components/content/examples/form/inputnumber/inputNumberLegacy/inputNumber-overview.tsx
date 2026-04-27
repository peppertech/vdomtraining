import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojinputnumber";
import "ojs/ojformlayout";
import {
  messageSets,
  type InputNumberValueChangedEvent,
} from "./inputNumber-shared";

export default function InputNumberOverviewExample() {
  const [currentValue, setCurrentValue] = useState(20);

  const handleValueChanged = useCallback(
    (event: InputNumberValueChangedEvent) => {
      setCurrentValue(Number(event.detail.value ?? 0));
    },
    [],
  );

  return (
    <div id="inputNumberOverview">
      <h4>States</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-number
          id="buttonId1"
          value={currentValue}
          labelHint="step 0 enabled"
          min={0}
          max={100}
          step={0}
          onvalueChanged={handleValueChanged}
        />
        <oj-input-number
          value={20}
          labelHint="step 0 disabled"
          disabled
          min={0}
          max={100}
          step={0}
        />
        <oj-input-number
          value={20}
          labelHint="step 0 readonly"
          readonly
          min={0}
          max={100}
          step={0}
        />
        <oj-input-number
          id="st1ena"
          value={20}
          labelHint="step 1 enabled"
          min={0}
          max={100}
          step={1}
        />
        <oj-input-number
          value={20}
          labelHint="step 1 disabled"
          disabled
          min={0}
          max={100}
          step={1}
        />
        <oj-input-number
          value={20}
          labelHint="step 1 readonly"
          readonly
          min={0}
          max={100}
          step={1}
        />
        <oj-input-number
          labelHint="step 1 enabled no value"
          min={0}
          max={100}
          step={1}
        />
        <oj-input-number
          labelHint="step 1 disabled no value"
          disabled
          min={0}
          max={100}
          step={1}
        />
        <oj-input-number
          labelHint="step 1 readonly no value"
          readonly
          min={0}
          max={100}
          step={1}
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required & Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-number required labelHint="required" />
        <oj-input-number placeholder="placeholder text" labelHint="placeholder" />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="top">
        <oj-input-number
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        />
        <oj-input-number
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        />
        <oj-input-number
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-number
          messagesCustom={messageSets.error}
          value={20}
          labelHint="error"
        />
        <oj-input-number
          messagesCustom={messageSets.warning}
          value={20}
          labelHint="warning"
        />
        <oj-input-number
          messagesCustom={messageSets.info}
          value={20}
          labelHint="info"
        />
        <oj-input-number
          messagesCustom={messageSets.confirmation}
          value={20}
          labelHint="confirmation"
        />
      </oj-form-layout>
    </div>
  );
}
