/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import { ComponentProps } from "preact";

// CorePack component import
import "oj-c/checkbox";
import "oj-c/form-layout";

// Type import
import { CCheckboxElement } from "oj-c/checkbox";
import Message = require("ojs/ojmessaging");

export const CheckBoxCorePack = () => {
  // Message arrays for different severities
  const errorMessages: Message[] = [
    {
      severity: "error" as const,
      summary: "Error message",
      detail: "This is an error",
    },
  ];
  const warningMessages: Message[] = [
    {
      severity: "warning" as const,
      summary: "Warning message",
      detail: "This is a warning",
    },
  ];
  const infoMessages: Message[] = [
    {
      severity: "info" as const,
      summary: "Info message",
      detail: "This is info",
    },
  ];
  const confirmationMessages: Message[] = [
    {
      severity: "confirmation" as const,
      summary: "Confirmation message",
      detail: "This is confirmation",
    },
  ];

  // External event handlers as per style guide
  const handleCheckboxChange = (event: any) => {
    console.log("Checkbox value changed:", event.detail.value);
  };

  return (
  <div class="oj-web-applayout-max-width oj-web-applayout-content">
    <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom"> States </h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-checkbox id="enabledCheckboxOn" value={true}>
          Enabled value true
        </oj-c-checkbox>
        <oj-c-checkbox id="disabledCheckboxOn" value={true} disabled={true}>
          Disabled value true
        </oj-c-checkbox>
        <oj-c-checkbox id="readonlyCheckboxOn" value={true} readonly={true}>
          Readonly value true
        </oj-c-checkbox>
        <oj-c-checkbox value={false}>Enabled value false</oj-c-checkbox>
        <oj-c-checkbox value={false} disabled={true}>
          Disabled value false
        </oj-c-checkbox>
        <oj-c-checkbox value={false} readonly={true}>
          Readonly value false
        </oj-c-checkbox>
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Help & Required</h5>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-checkbox value={false} required={true}>
          required
        </oj-c-checkbox>
        <oj-c-checkbox
          value={true}
          helpHints={{ definition: "help-hints.definition text" }}
        >
          help-hints.definition
        </oj-c-checkbox>
        <oj-c-checkbox
          value={true}
          helpHints={{
            definition: "help-hints.definition text",
            source: "https://www.oracle.com",
          }}
        >
          help-hints.source
        </oj-c-checkbox>
        <oj-c-checkbox
          value={true}
          helpHints={{
            definition: "help-hints.definition text",
            source: "https://www.oracle.com",
            sourceText: "help-hints.source-text",
          }}
        >
          help-hints.source-text
        </oj-c-checkbox>
        <oj-c-checkbox value={true} help={{ instruction: "help.instruction" }}>
          help.instruction
        </oj-c-checkbox>
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-checkbox value={false} messagesCustom={errorMessages as any}>
          Error
        </oj-c-checkbox>
        <oj-c-checkbox value={false} messagesCustom={warningMessages as any}>
          Warning
        </oj-c-checkbox>
        <oj-c-checkbox
          id="airplaneModeInformation"
          value={false}
          messagesCustom={infoMessages as any}
        >
          Information
        </oj-c-checkbox>
        <oj-c-checkbox
          id="airplaneModeConfirmation"
          value={false}
          messagesCustom={confirmationMessages as any}
        >
          Confirmation
        </oj-c-checkbox>
      </oj-c-form-layout>
    </div>
  );
};
