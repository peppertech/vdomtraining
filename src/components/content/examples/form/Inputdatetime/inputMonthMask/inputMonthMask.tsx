import { ComponentProps, h } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";

import "oj-c/input-month-mask";
import "oj-c/form-layout";

import { CInputMonthMaskElement } from "oj-c/input-month-mask";

type ValueType = CInputMonthMaskElement["value"];

export const InputMonthMask = () => {
  const [value, setValue] = useState<ValueType>({ year: 2024, month: 11 });
  const [valuem1, setValuem1] = useState<ValueType>({ year: 2024, month: 11 });
  const [valuem2, setValuem2] = useState<ValueType>({ year: 2024, month: 11 });
  const [valuem3, setValuem3] = useState<ValueType>({ year: 2024, month: 11 });
  const [valuem4, setValuem4] = useState<ValueType>({ year: 2024, month: 11 });

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

  const handleValueChanged = useCallback((event: any) => {
    setValue(event.detail.value as ValueType);
  }, []);

  const handleValuem1Changed = useCallback((event: any) => {
    setValuem1(event.detail.value as ValueType);
  }, []);

  const handleValuem2Changed = useCallback((event: any) => {
    setValuem2(event.detail.value as ValueType);
  }, []);

  const handleValuem3Changed = useCallback((event: any) => {
    setValuem3(event.detail.value as ValueType);
  }, []);

  const handleValuem4Changed = useCallback((event: any) => {
    setValuem4(event.detail.value as ValueType);
  }, []);

  return (
    <div id="div1">
      <h4 class="oj-sm-padding-2x-bottom">States </h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-month-mask labelHint="Enabled no date"></oj-c-input-month-mask>
        <oj-c-input-month-mask
          labelHint="Disabled no date"
          disabled
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          labelHint="Read only no date"
          readonly
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          value={value as any}
          labelHint="Enabled Date"
          onvalueChanged={handleValueChanged}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          value={value as any}
          labelHint="Disabled Date"
          disabled
          onvalueChanged={handleValueChanged}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          value={value as any}
          labelHint="Read Only Date"
          readonly
          onvalueChanged={handleValueChanged}
        ></oj-c-input-month-mask>
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-3x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            value={value as any}
            labelHint="Enabled Date"
            labelEdge="inside"
            onvalueChanged={handleValueChanged}
          ></oj-c-input-month-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            value={value as any}
            labelHint="Disabled Date"
            labelEdge="inside"
            disabled
            onvalueChanged={handleValueChanged}
          ></oj-c-input-month-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            value={value as any}
            labelHint="Read Only Date"
            labelEdge="inside"
            readonly
            onvalueChanged={handleValueChanged}
          ></oj-c-input-month-mask>
        </div>
      </div>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            labelHint="Enabled no date"
            labelEdge="inside"
          ></oj-c-input-month-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            labelHint="Disabled no date"
            labelEdge="inside"
            disabled
          ></oj-c-input-month-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            labelHint="Read only no date"
            labelEdge="inside"
            readonly
          ></oj-c-input-month-mask>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Label Edge</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-4x-top oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            id="labelEdgeInside"
            labelHint="Label Edge Inside"
            labelEdge="inside"
          ></oj-c-input-month-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            id="labelEdgeTop"
            labelHint="Label Edge Top"
            labelEdge="top"
          ></oj-c-input-month-mask>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-month-mask
            id="labelEdgeStart"
            labelHint="Label Edge Start"
            labelEdge="start"
          ></oj-c-input-month-mask>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Text Align</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-month-mask
          id="align-start"
          textAlign="start"
          labelHint="Start Align"
          value={value as any}
          onvalueChanged={handleValueChanged}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          id="align-end"
          textAlign="end"
          labelHint="End Align"
          value={value as any}
          onvalueChanged={handleValueChanged}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          id="align-right"
          textAlign="right"
          labelHint="Right Align"
          value={value as any}
          onvalueChanged={handleValueChanged}
        ></oj-c-input-month-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-month-mask
          id="required-date"
          required
          labelHint="Required"
        ></oj-c-input-month-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-month-mask
          labelHint="help.instruction"
          helpHints={{ instruction: "help-hints.instruction text" } as any}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          labelHint="help.definition"
          helpHints={{ definition: "help-hints.definition text" } as any}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          labelHint="help.source"
          helpHints={{ source: "https://www.oracle.com" } as any}
        ></oj-c-input-month-mask>
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-input-month-mask
          value={valuem1 as any}
          labelHint="Error"
          messagesCustom={error}
          onvalueChanged={handleValuem1Changed}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          value={valuem2 as any}
          labelHint="Warning"
          messagesCustom={warning}
          onvalueChanged={handleValuem2Changed}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          value={valuem3 as any}
          labelHint="Information"
          messagesCustom={info}
          onvalueChanged={handleValuem3Changed}
        ></oj-c-input-month-mask>
        <oj-c-input-month-mask
          value={valuem4 as any}
          labelHint="Confirmation"
          messagesCustom={confirmation}
          onvalueChanged={handleValuem4Changed}
        ></oj-c-input-month-mask>
      </oj-c-form-layout>
    </div>
  );
};

export default InputMonthMask;
