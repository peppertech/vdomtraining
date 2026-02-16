/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import { useCallback, useMemo } from "preact/hooks";

// CorePack component imports
import "oj-c/checkboxset";
import "oj-c/form-layout";

// Type imports
import { CCheckboxsetElement } from "oj-c/checkboxset";

// Data provider
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

export const CheckBoxSetCorePack = () => {
  // Options data providers
  const options = useMemo(
    () =>
      new MutableArrayDataProvider(
        [
          { value: "chrome", label: "Chrome" },
          { value: "edge", label: "Edge" },
          { value: "firefox", label: "Firefox" },
          { value: "safari", label: "Safari" },
          { value: "opera", label: "Opera" },
        ],
        { keyAttributes: "value" },
      ),
    [],
  );

  const wrappingOptions = useMemo(
    () =>
      new MutableArrayDataProvider(
        [
          { value: "chrome", label: "Chrome" },
          { value: "edge", label: "Edge" },
          { value: "firefox", label: "Firefox" },
          { value: "safari", label: "Safari" },
          { value: "opera", label: "Opera" },
          { value: "ie", label: "Internet Explorer" },
          { value: "vivaldi", label: "Vivaldi" },
          { value: "brave", label: "Brave" },
        ],
        { keyAttributes: "value" },
      ),
    [],
  );

  // Message arrays for different severities
  const errorMessages = useMemo(
    () => [
      {
        severity: "error" as const,
        summary: "Error message",
        detail: "This is an error",
      },
    ],
    [],
  );

  const warningMessages = useMemo(
    () => [
      {
        severity: "warning" as const,
        summary: "Warning message",
        detail: "This is a warning",
      },
    ],
    [],
  );

  const infoMessages = useMemo(
    () => [
      {
        severity: "info" as const,
        summary: "Info message",
        detail: "This is info",
      },
    ],
    [],
  );

  const confirmationMessages = useMemo(
    () => [
      {
        severity: "confirmation" as const,
        summary: "Confirmation message",
        detail: "This is confirmation",
      },
    ],
    [],
  );

  // External event handlers as per style guide
  const handleCheckboxsetChange = useCallback((event: any) => {
    console.log("Checkboxset value changed:", event.detail.value);
  }, []);

  return (
    <div class="oj-sm-padding-2x-horizontal">
      <h5>States</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-checkboxset
          id="enabledCheckboxset"
          value={["chrome", "edge"]}
          options={options}
          labelHint="Enabled"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          id="disabledCheckboxset"
          value={["chrome", "edge"]}
          labelHint="Disabled"
          options={options}
          disabled
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          id="readonlyCheckboxset"
          value={["chrome", "edge"]}
          labelHint="Readonly"
          options={options}
          readonly
          onvalueChanged={handleCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5>Row Direction</h5>
      <oj-c-form-layout maxColumns={1} direction="row">
        <oj-c-checkboxset
          id="rowDirectionEnabledCheckboxset"
          value={["chrome", "edge"]}
          direction="row"
          options={options}
          labelHint="Direction Row Enabled"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          direction="row"
          labelHint="Direction Row Disabled"
          options={options}
          disabled
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          direction="row"
          labelHint="Direction Row Readonly"
          options={options}
          readonly
          onvalueChanged={handleCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5>Label Edge</h5>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item">
          <oj-c-checkboxset
            id="labelEdgeInside"
            labelHint="Label Edge Inside"
            labelEdge="inside"
            options={options}
            onvalueChanged={handleCheckboxsetChange}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item">
          <oj-c-checkboxset
            id="labelEdgeTop"
            labelHint="Label Edge Top"
            labelEdge="top"
            options={options}
            onvalueChanged={handleCheckboxsetChange}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item">
          <oj-c-checkboxset
            id="labelEdgeStart"
            labelHint="Label Edge Start"
            labelEdge="start"
            options={options}
            onvalueChanged={handleCheckboxsetChange}
          />
        </div>
      </div>

      <h5>Required & Help</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-checkboxset
          required
          options={options}
          labelHint="Required"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          help={{ instruction: "help.instruction text" }}
          options={options}
          labelHint="Help Instruction"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          helpHints={{ definition: "help-hints.definition text" }}
          options={options}
          labelHint="Help-hints Definition"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          value={["chrome", "edge"]}
          helpHints={{
            definition: "help-hints.definition text",
            source: "https://www.oracle.com",
            sourceText: "help-hints.source-text",
          }}
          options={options}
          labelHint="Help-hints Source"
          onvalueChanged={handleCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5>Standard Messages</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-checkboxset
          messagesCustom={errorMessages}
          value={["chrome", "edge"]}
          options={options}
          labelHint="Error"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          messagesCustom={warningMessages}
          value={["chrome", "edge"]}
          options={options}
          labelHint="Warning"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          messagesCustom={infoMessages}
          value={["chrome", "edge"]}
          options={options}
          labelHint="Information"
          onvalueChanged={handleCheckboxsetChange}
        />
        <oj-c-checkboxset
          messagesCustom={confirmationMessages}
          value={["chrome", "edge"]}
          options={options}
          labelHint="Confirmation"
          onvalueChanged={handleCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5>Wrapping</h5>
      <div class="demo-form-layout oj-sm-padding-2x-horizontal">
        <oj-c-form-layout>
          <oj-c-checkboxset
            labelHint="Direction Column"
            options={wrappingOptions}
            value={["chrome", "edge"]}
            onvalueChanged={handleCheckboxsetChange}
          />
          <oj-c-checkboxset
            labelHint="Direction Row"
            value={["chrome", "edge"]}
            options={wrappingOptions}
            direction="row"
            onvalueChanged={handleCheckboxsetChange}
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
};
