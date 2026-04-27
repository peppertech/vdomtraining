import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import {
  defaultTimeValue,
  messageSets,
  militaryTimeConverter,
  timeFullConverter,
  type InputTimeProps,
  type InputTimeValueChangedEvent,
} from "./inputTime-shared";

export default function InputTimeStatesExample() {
  const [value, setValue] = useState(defaultTimeValue);

  const handleValueChanged = useCallback((event: InputTimeValueChangedEvent) => {
    setValue(String(event.detail.value ?? ""));
  }, []);

  return (
    <div id="inputTimeStates">
      <h5 class="oj-sm-padding-2x-bottom">States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time labelHint="Enabled no value" />
        <oj-input-time labelHint="Disabled no value" disabled />
        <oj-input-time labelHint="Read only no value" readonly />
      </oj-form-layout>

      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time
          value={value}
          labelHint="Enabled"
          onvalueChanged={handleValueChanged}
        />
        <oj-input-time value={value} labelHint="Disabled" disabled />
        <oj-input-time value={value} labelHint="Read only" readonly />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Required</h5>
      <oj-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-input-time required labelHint="required" />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Time Variations</h5>
      <oj-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-input-time
          value={value}
          converter={militaryTimeConverter as InputTimeProps["converter"]}
          labelHint="Military Time (no am/pm)"
          onvalueChanged={handleValueChanged}
        />
        <oj-input-time
          value={value}
          converter={timeFullConverter as InputTimeProps["converter"]}
          labelHint="Time with seconds"
          onvalueChanged={handleValueChanged}
        />
      </oj-form-layout>

      <oj-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-input-time
          value={value}
          labelHint="help.instruction"
          help={{ instruction: "help-hints.instruction text" }}
          onvalueChanged={handleValueChanged}
        />
        <oj-input-time
          value={value}
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" }}
          onvalueChanged={handleValueChanged}
        />
        <oj-input-time
          value={value}
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" }}
          onvalueChanged={handleValueChanged}
        />
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-time value={value} labelHint="Error" messagesCustom={messageSets.error} />
        <oj-input-time value={value} labelHint="Warning" messagesCustom={messageSets.warning} />
        <oj-input-time value={value} labelHint="Information" messagesCustom={messageSets.info} />
        <oj-input-time
          value={value}
          labelHint="Confirmation"
          messagesCustom={messageSets.confirmation}
        />
      </oj-form-layout>
    </div>
  );
}
