import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/radioset";

import type { CRadiosetElement } from "oj-c/radioset";

interface RadioOption {
  value: string;
  label: string;
}

const useLaptopOptions = () =>
  useMemo<RadioOption[]>(
    () => [
      { value: "desktop", label: "Desktop" },
      { value: "laptop", label: "Laptop" },
      { value: "tablet", label: "Tablet" },
    ],
    [],
  );

const useLaptopOptionsWithHelp = () =>
  useMemo<RadioOption[]>(
    () => [
      { value: "desktop", label: "Desktop" },
      { value: "laptop", label: "Laptop" },
      { value: "tablet", label: "Tablet" },
      { value: "phone", label: "Phone" },
    ],
    [],
  );

const useLaptopOptionsWrapping = () =>
  useMemo<RadioOption[]>(
    () => [
      { value: "desktop", label: "Desktop" },
      { value: "laptop", label: "Laptop" },
      {
        value: "tablet",
        label: "Tablet - Apple - iPad with Wi-Fi - 32GB - Space Gray",
      },
      { value: "phone", label: "Phone" },
    ],
    [],
  );

const toOptionItems = (options: RadioOption[]) =>
  options.map(({ value, label }) => ({ value, label }));

const useMessages = () =>
  useMemo(() => ({
    error: [
      { severity: "error" as const, summary: "Error", detail: "error" },
    ],
    warning: [
      { severity: "warning" as const, summary: "Warning", detail: "warning" },
    ],
    info: [
      { severity: "info" as const, summary: "Information", detail: "information" },
    ],
    confirmation: [
      { severity: "confirmation" as const, summary: "Confirmation", detail: "confirmation" },
    ],
  }), []);

const handleValueChange = (setValue: (val: string) => void) =>
  (event: CRadiosetElement.valueChanged<string, RadioOption>) => {
    setValue(event.detail.value ?? "");
  };

export const RadiosetCorePackExample = () => {
  const [value, setValue] = useState("laptop");

  const laptopOptions = useLaptopOptions();
  const laptopOptionsWithHelp = useLaptopOptionsWithHelp();
  const laptopOptionsWrapping = useLaptopOptionsWrapping();
  const messages = useMessages();

 const onValueChanged = useCallback(handleValueChange(setValue), []);

  return (
    <div id="div1">
      <h5>States</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-radioset
          id="enabledRadioset"
          value={value}
          labelHint="Enabled"
          options={toOptionItems(laptopOptions)}
          onvalueChanged={onValueChanged}
        />
        <oj-c-radioset
          id="disabledRadioset"
          value={value}
          labelHint="Disabled"
          disabled
          options={toOptionItems(laptopOptions)}
        />
        <oj-c-radioset
          id="readonlyRadioset"
          value={value}
          labelHint="Readonly"
          readonly
          options={toOptionItems(laptopOptions)}
        />
      </oj-c-form-layout>

      <h5>Row Direction</h5>
      <oj-c-form-layout maxColumns={1} direction="row">
        <oj-c-radioset
          id="rowDirectionEnabledRadioset"
          value={value}
          direction="row"
          labelHint="Direction Row Enabled"
          options={toOptionItems(laptopOptions)}
          onvalueChanged={onValueChanged}
        />
        <oj-c-radioset
          value={value}
          direction="row"
          labelHint="Direction Row Disabled"
          disabled
          options={toOptionItems(laptopOptions)}
        />
        <oj-c-radioset
          value={value}
          direction="row"
          labelHint="Direction Row Readonly"
          readonly
          options={toOptionItems(laptopOptions)}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top">Label Edge</h5>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeInside"
            value={value}
            labelHint="label edge inside"
            labelEdge="inside"
            options={toOptionItems(laptopOptions)}
            onvalueChanged={onValueChanged}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeTop"
            value={value}
            labelHint="label edge top"
            labelEdge="top"
            options={toOptionItems(laptopOptions)}
            onvalueChanged={onValueChanged}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeStart"
            value={value}
            labelHint="label edge start"
            labelEdge="start"
            options={toOptionItems(laptopOptions)}
            onvalueChanged={onValueChanged}
          />
        </div>
      </div>

      <h5 class="oj-sm-margin-6x-top">Required &amp; Help</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-radioset
          required
          labelHint="Required"
          requiredMessageDetail="Nothing selected"
          options={toOptionItems(laptopOptionsWithHelp)}
        />

        <oj-c-radioset
          value={value}
          help={{ instruction: "help.instruction text" }}
          labelHint="Help Instruction"
          options={toOptionItems(laptopOptionsWithHelp)}
          onvalueChanged={onValueChanged}
        />

        <oj-c-radioset
          value={value}
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="Help-hints Definition"
          options={toOptionItems(laptopOptionsWithHelp)}
          onvalueChanged={onValueChanged}
        />

        <oj-c-radioset
          value={value}
          helpHints={{ source: "https://www.oracle.com", sourceText: "help-hints.source-text" }}
          labelHint="Help-hints Source"
          options={toOptionItems(laptopOptionsWithHelp)}
          onvalueChanged={onValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top"> Messages</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-radioset
          messagesCustom={messages.error}
          value={value}
          labelHint="Error"
          options={toOptionItems(laptopOptions)}
          onvalueChanged={onValueChanged}
        />

        <oj-c-radioset
          messagesCustom={messages.warning}
          value={value}
          labelHint="Warning"
          options={toOptionItems(laptopOptions)}
          onvalueChanged={onValueChanged}
        />

        <oj-c-radioset
          messagesCustom={messages.info}
          value={value}
          labelHint="Information"
          options={toOptionItems(laptopOptions)}
          onvalueChanged={onValueChanged}
        />

        <oj-c-radioset
          messagesCustom={messages.confirmation}
          value={value}
          labelHint="Confirmation"
          options={toOptionItems(laptopOptions)}
          onvalueChanged={onValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top">Wrapping</h5>
      <div class="demo-form-layout oj-text-color-danger">
        <oj-c-form-layout>
          <oj-c-radioset
            labelHint="Direction Column"
            value={value}
            options={toOptionItems(laptopOptionsWrapping)}
            onvalueChanged={onValueChanged}
          />

          <oj-c-radioset
            labelHint="Direction Row"
            value={value}
            direction="row"
            options={toOptionItems(laptopOptionsWrapping)}
            onvalueChanged={onValueChanged}
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
};

export default RadiosetCorePackExample;
