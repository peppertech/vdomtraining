import { ComponentProps, h } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";

// CorePack component imports
import "oj-c/input-time-mask";
import "oj-c/form-layout";

// Type imports
import { CInputTimeMaskElement } from "oj-c/input-time-mask";

type InputTimeMaskProps = ComponentProps<"oj-c-input-time-mask">;
type ValueType = CInputTimeMaskElement["value"];

export const InputTimeMask = () => {
  // State for time values
  const [value, setValue] = useState<ValueType>("T20:11");
  const [valueMinute, setValueMinute] = useState<ValueType>("T20:11");
  const [valueSecond, setValueSecond] = useState<ValueType>("T10:30:45");
  const [valueMillisecond, setValueMillisecond] =
    useState<ValueType>("T10:30:45.123");
  const [value24, setValue24] = useState<ValueType>("T14:30:00");
  const [value12, setValue12] = useState<ValueType>("T02:30:00");
  const [valuem1, setValuem1] = useState<ValueType>("T10:30:00");
  const [valuem2, setValuem2] = useState<ValueType>("T10:30:00");
  const [valuem3, setValuem3] = useState<ValueType>("T10:30:00");
  const [valuem4, setValuem4] = useState<ValueType>("T10:30:00");

  // Help hints
  const helpHints: InputTimeMaskProps["helpHints"] = {
    definition: "help-hints.definition text",
    source: "https://www.oracle.com",
  };

  // Message configurations
  const error = useMemo(
    () => [
      {
        summary: "Error message",
        detail: "This is an error message",
        severity: "error" as const,
      },
    ],
    [],
  );

  const warning = useMemo(
    () => [
      {
        summary: "Warning message",
        detail: "This is a warning message",
        severity: "warning" as const,
      },
    ],
    [],
  );

  const info = useMemo(
    () => [
      {
        summary: "Info message",
        detail: "This is an info message",
        severity: "info" as const,
      },
    ],
    [],
  );

  const confirmation = useMemo(
    () => [
      {
        summary: "Confirmation message",
        detail: "This is a confirmation message",
        severity: "confirmation" as const,
      },
    ],
    [],
  );

  // Event handlers
  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value);
  }, []);

  const handleValueMinuteChanged = useCallback((event: any) => {
    setValueMinute(event.detail.value);
  }, []);

  const handleValueSecondChanged = useCallback((event: any) => {
    setValueSecond(event.detail.value);
  }, []);

  const handleValueMillisecondChanged = useCallback((event: any) => {
    setValueMillisecond(event.detail.value);
  }, []);

  const handleValue24Changed = useCallback((event: any) => {
    setValue24(event.detail.value);
  }, []);

  const handleValue12Changed = useCallback((event: any) => {
    setValue12(event.detail.value);
  }, []);

  const handleValuem1Changed = useCallback((event: any) => {
    setValuem1(event.detail.value);
  }, []);

  const handleValuem2Changed = useCallback((event: any) => {
    setValuem2(event.detail.value);
  }, []);

  const handleValuem3Changed = useCallback((event: any) => {
    setValuem3(event.detail.value);
  }, []);

  const handleValuem4Changed = useCallback((event: any) => {
    setValuem4(event.detail.value);
  }, []);

  return (
    <div id="div1">
      <h4 class="oj-sm-padding-2x-bottom">States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-time-mask labelHint="Enabled no time"></oj-c-input-time-mask>
        <oj-c-input-time-mask
          labelHint="Disabled no time"
          disabled
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          labelHint="Read only no time"
          readonly
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          value={value}
          labelHint="Enabled Time"
          onvalueChanged={handleValueChanged}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          value={value}
          labelHint="Disabled Time"
          disabled
          onvalueChanged={handleValueChanged}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          value={value}
          labelHint="Read Only Time"
          readonly
          onvalueChanged={handleValueChanged}
        ></oj-c-input-time-mask>
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-3x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            value={value}
            labelHint="Enabled Time"
            labelEdge="inside"
            onvalueChanged={handleValueChanged}
          ></oj-c-input-time-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            value={value}
            labelHint="Disabled Time"
            labelEdge="inside"
            disabled={true}
            onvalueChanged={handleValueChanged}
          ></oj-c-input-time-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            value={value}
            labelHint="Read Only Time"
            labelEdge="inside"
            readonly={true}
            onvalueChanged={handleValueChanged}
          ></oj-c-input-time-mask>
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            labelHint="Enabled no time"
            labelEdge="inside"
          ></oj-c-input-time-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            labelHint="Disabled no time"
            labelEdge="inside"
            disabled={true}
          ></oj-c-input-time-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            labelHint="Read only no time"
            labelEdge="inside"
            readonly={true}
          ></oj-c-input-time-mask>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Granularity</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          granularity="minute"
          value={valueMinute}
          labelHint="Time in Minutes"
          onvalueChanged={handleValueMinuteChanged}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          granularity="second"
          value={valueSecond}
          labelHint="Time in Seconds"
          onvalueChanged={handleValueSecondChanged}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          granularity="millisecond"
          value={valueMillisecond}
          labelHint="Time in Milliseconds"
          onvalueChanged={handleValueMillisecondChanged}
        ></oj-c-input-time-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">HourClock and LeadingZeroForHour</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          hourClock="24"
          value={value24}
          labelHint="24-hour clock"
          onvalueChanged={handleValue24Changed}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          leadingZeroForHour="show"
          value={value12}
          labelHint="Leading Zero for Hour"
          onvalueChanged={handleValue12Changed}
        ></oj-c-input-time-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Label Edge</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-4x-top oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            id="labelEdgeInside"
            labelHint="Label Edge Inside"
            labelEdge="inside"
          ></oj-c-input-time-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            id="labelEdgeTop"
            labelHint="Label Edge Top"
            labelEdge="top"
          ></oj-c-input-time-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-time-mask
            id="labelEdgeStart"
            labelHint="Label Edge Start"
            labelEdge="start"
          ></oj-c-input-time-mask>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Text Align</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          id="align-start"
          textAlign="start"
          labelHint="Start Align"
          value={value}
          onvalueChanged={handleValueChanged}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          id="align-end"
          textAlign="end"
          labelHint="End Align"
          value={value}
          onvalueChanged={handleValueChanged}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          id="align-right"
          textAlign="right"
          labelHint="Right Align"
          value={value}
          onvalueChanged={handleValueChanged}
        ></oj-c-input-time-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          id="required-time"
          required={true}
          labelHint="Required"
        ></oj-c-input-time-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          labelHint="help.instruction"
          helpHints={helpHints}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          labelHint="help.definition"
          helpHints={helpHints}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          labelHint="help.source"
          helpHints={helpHints}
        ></oj-c-input-time-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-time-mask
          value={valuem1}
          labelHint="Error"
          messagesCustom={error}
          onvalueChanged={handleValuem1Changed}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          value={valuem2}
          labelHint="Warning"
          messagesCustom={warning}
          onvalueChanged={handleValuem2Changed}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          value={valuem3}
          labelHint="Information"
          messagesCustom={info}
          onvalueChanged={handleValuem3Changed}
        ></oj-c-input-time-mask>
        <oj-c-input-time-mask
          value={valuem4}
          labelHint="Confirmation"
          messagesCustom={confirmation}
          onvalueChanged={handleValuem4Changed}
        ></oj-c-input-time-mask>
      </oj-c-form-layout>
    </div>
  );
};
