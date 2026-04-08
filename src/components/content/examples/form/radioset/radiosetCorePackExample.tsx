import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import 'oj-c/radioset';
import 'oj-c/form-layout';
import { CRadiosetElement } from 'oj-c/radioset';

type RadioOption = { value: string; label: string; };

const laptopOptions: RadioOption[] = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'tablet', label: 'Tablet' }
];

const laptopOptionsWithHelp: RadioOption[] = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'tablet', label: 'Tablet' }
];

const laptopOptionsWrapping: RadioOption[] = [
  { value: 'laptop', label: 'Laptop with a very long label that should wrap' },
  { value: 'desktop', label: 'Desktop with a very long label that should wrap' },
  { value: 'tablet', label: 'Tablet with a very long label that should wrap' }
];

const error = [{ severity: 'error' as const, summary: 'Error', detail: 'An error occurred' }];
const warning = [{ severity: 'warning' as const, summary: 'Warning', detail: 'A warning message' }];
const info = [{ severity: 'info' as const, summary: 'Information', detail: 'An info message' }];
const confirmation = [{ severity: 'confirmation' as const, summary: 'Confirmation', detail: 'A confirmation message' }];

export const RadiosetCorePackExample = () => {
  const [value, setValue] = useState('laptop');

  const handleValueChanged = useCallback((e: CRadiosetElement.valueChanged<string, RadioOption>) => {
    setValue(e.detail.value || 'laptop');
  }, []);

  return (
    <div id="div1">
      <h5>States</h5>
      <oj-c-form-layout max-columns="3" direction="row">
        <oj-c-radioset
          id="enabledRadioset"
          value={value}
          label-hint="Enabled"
          options={laptopOptions}
          onvalueChanged={handleValueChanged}
        />
        <oj-c-radioset
          id="disabledRadioset"
          value={value}
          label-hint="Disabled"
          disabled
          options={laptopOptions}
        />
        <oj-c-radioset
          id="readonlyRadioset"
          value={value}
          label-hint="Readonly"
          readonly
          options={laptopOptions}
        />
      </oj-c-form-layout>
      <h5>Row Direction</h5>
      <oj-c-form-layout max-columns="1" direction="row">
        <oj-c-radioset
          id="rowDirectionEnabledRadioset"
          value={value}
          direction="row"
          label-hint="Direction Row Enabled"
          options={laptopOptions}
          onvalueChanged={handleValueChanged}
        />
        <oj-c-radioset
          value={value}
          direction="row"
          label-hint="Direction Row Disabled"
          disabled
          options={laptopOptions}
        />
        <oj-c-radioset
          value={value}
          direction="row"
          label-hint="Direction Row Readonly"
          readonly
          options={laptopOptions}
        />
      </oj-c-form-layout>
      <h5 class="oj-sm-margin-6x-top">Label Edge</h5>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeInside"
            value={value}
            label-hint="label edge inside"
            label-edge="inside"
            options={laptopOptions}
            onvalueChanged={handleValueChanged}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeTop"
            value={value}
            label-hint="label edge top"
            label-edge="top"
            options={laptopOptions}
            onvalueChanged={handleValueChanged}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeStart"
            value={value}
            label-hint="label edge start"
            label-edge="start"
            options={laptopOptions}
            onvalueChanged={handleValueChanged}
          />
        </div>
      </div>

      <h5 class="oj-sm-margin-6x-top">Required & Help</h5>
      <oj-c-form-layout max-columns="4" direction="row">
        <oj-c-radioset
          required
          label-hint="Required"
          required-message-detail="Nothing selected"
          options={laptopOptionsWithHelp}
        />

        <oj-c-radioset
          value={value}
          help={{ instruction: "help.instruction text" }}
          label-hint="Help Instruction"
          options={laptopOptionsWithHelp}
          onvalueChanged={handleValueChanged}
        />

        <oj-c-radioset
          value={value}
          helpHints={{ definition: "help-hints.definition text" }}
          label-hint="Help-hints Definition"
          options={laptopOptionsWithHelp}
          onvalueChanged={handleValueChanged}
        />

        <oj-c-radioset
          value={value}
          helpHints={{ source: "https://www.oracle.com", sourceText: "help-hints.source-text" }}
          label-hint="Help-hints Source"
          options={laptopOptionsWithHelp}
          onvalueChanged={handleValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top">Standard Messages</h5>
      <oj-c-form-layout max-columns="4" direction="row">
        <oj-c-radioset
          messages-custom={error}
          value={value}
          label-hint="Error"
          options={laptopOptions}
          onvalueChanged={handleValueChanged}
        />

        <oj-c-radioset
          messages-custom={warning}
          value={value}
          label-hint="Warning"
          options={laptopOptions}
          onvalueChanged={handleValueChanged}
        />

        <oj-c-radioset
          messages-custom={info}
          value={value}
          label-hint="Information"
          options={laptopOptions}
          onvalueChanged={handleValueChanged}
        />

        <oj-c-radioset
          messages-custom={confirmation}
          value={value}
          label-hint="Confirmation"
          options={laptopOptions}
          onvalueChanged={handleValueChanged}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top">Wrapping</h5>
      <div class="demo-form-layout oj-text-color-danger">
        <oj-c-form-layout>
          <oj-c-radioset
            label-hint="Direction Column"
            value={value}
            options={laptopOptionsWrapping}
            onvalueChanged={handleValueChanged}
          />

          <oj-c-radioset
            label-hint="Direction Row"
            value={value}
            direction="row"
            options={laptopOptionsWrapping}
            onvalueChanged={handleValueChanged}
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
};