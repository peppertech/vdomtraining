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
import "oj-c/rich-checkboxset";
import "oj-c/form-layout";

// Type imports
import { CRichCheckboxsetElement } from "oj-c/rich-checkboxset";
import type { ojMessage } from "ojs/ojmessage";
//import Message = require("@oracle/oraclejet/dist/types/ojmessaging");


export const RichCheckBoxsetCorePack = () => {
  // Options arrays
  const options = useMemo(
    () => [
      {
        value: "automotive",
        label: "Automotive",
        secondaryText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnailSrc: "../../../../styles/images/formControls/automotive.jpg",
      },
      {
        value: "communications",
        label: "Communications",
        secondaryText:
          "Proin mauris ipsum, efficitur at dui ut, auctor iaculis felis.",
        thumbnailSrc: "../../../../styles/images/formControls/communications.jpg",
      },
      {
        value: "construction",
        label: "Construction",
        secondaryText:
          "Vivamus semper eleifend vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnailSrc: "../../../../styles/images/formControls/construction.jpg",
      },
    ],
    [],
  );

  const rangeOptions = useMemo(
    () => [
      {
        value: "construction",
        label: "Construction",
        secondaryText:
          "Vivamus semper eleifend vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnailSrc: "../../../../styles/images/formControls/construction.jpg",
      },
      {
        value: "distribution",
        label: "Distribution",
        secondaryText:
          "Maecenas urna augue, tempus vitae fringilla in, cursus sit amet magna. Praesent blandit nibh metus, id varius velit varius eget.",
        thumbnailSrc: "../../../../styles/images/formControls/distribution.jpg",
      },
      {
        value: "education",
        label: "Education",
        secondaryText:
          "Cras cursus, mi quis tincidunt tincidunt, augue dolor consequat mauris, iaculis sollicitudin ante purus eu eros.",
        thumbnailSrc: "../../../../styles/images/formControls/education.jpg",
      },
      {
        value: "travel",
        label: "Travel",
        secondaryText:
          "Fusce at nunc vehicula, viverra arcu vel, eleifend odio.",
        thumbnailSrc: "../../../../styles/images/formControls/travel.jpg",
      },
    ],
    [],
  );

  // Message arrays for different severities
  const error: ojMessage.Message[] = useMemo(
    () => [
      {
        severity: "error",
        summary: "Error message",
        detail: "This is an error",
      },
    ],
    [],
  );

  const warning: ojMessage.Message[] = useMemo(
    () => [
      {
        severity: "warning",
        summary: "Warning message",
        detail: "This is a warning",
      },
    ],
    [],
  );

  const info: ojMessage.Message[] = useMemo(
    () => [
      {
        severity: "info",
        summary: "Info message",
        detail: "This is info",
      },
    ],
    [],
  );

  const confirmation: ojMessage.Message[] = useMemo(
    () => [
      {
        severity: "confirmation",
        summary: "Confirmation message",
        detail: "This is confirmation",
      },
    ],
    [],
  );

  // External event handlers as per style guide
  const handleRichCheckboxsetChange = useCallback(
    (event: CRichCheckboxsetElement.valueChanged<any>) => {
      console.log("Rich Checkboxset value changed:", event.detail.value);
    },
    [],
  );

  return (
    <div id="div1">
      <h5>States</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          id="enabledCheckboxset"
          value={["automotive"] as any}
          options={options}
          labelHint="Enabled"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          id="disabledCheckboxset"
          value={["automotive"] as any}
          labelHint="Disabled"
          options={options}
          disabled
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          id="readonlyCheckboxset"
          value={["automotive"] as any}
          labelHint="Readonly"
          options={options}
          readonly
          onvalueChanged={handleRichCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5>Label Edge</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          id="labelEdgeInside"
          value={["automotive"] as any}
          labelHint="Label Edge Inside"
          options={options}
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          id="labelEdgeTop"
          value={["automotive"] as any}
          labelHint="Label Edge Top"
          labelEdge="top"
          options={options}
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          id="labelEdgeStart"
          value={["automotive"] as any}
          labelHint="Label Edge Start"
          labelEdge="start"
          options={options}
          onvalueChanged={handleRichCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5>Required & Help</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          required
          options={options}
          labelHint="Required"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"] as any}
          help={{ instruction: "help.instruction text" }}
          options={options}
          labelHint="Help Instruction"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"] as any}
          helpHints={{ definition: "help-hints.definition text" }}
          options={options}
          labelHint="Help-hints Definition"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"] as any}
          helpHints={{
            source: "https://www.oracle.com",
            sourceText: "Learn More",
          }}
          options={options}
          labelHint="Help-hints Source"
          onvalueChanged={handleRichCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5 className="oj-sm-margin-4x-top">Messages</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={error as any}
          value={["automotive"] as any}
          options={options}
          labelHint="Error"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={warning as any}
          value={["automotive"] as any}
          options={options}
          labelHint="Warning"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={info as any}
          value={["automotive"] as any}
          options={options}
          labelHint="Information"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          messagesCustom={confirmation as any}
          value={["automotive"] as any}
          options={options}
          labelHint="Confirmation"
          onvalueChanged={handleRichCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5 className="oj-sm-margin-4x-top">Min/Max</h5>
      <oj-c-form-layout direction="row" fullWidth>
        <oj-c-rich-checkboxset
          layout="sm"
          options={rangeOptions}
          labelHint="Range Selection, (min-selected=2 and max-selected=3)"
          help={{ instruction: "Select 2 to 3 employees." }}
          minSelected={2}
          maxSelected={3}
          onvalueChanged={handleRichCheckboxsetChange}
        />
      </oj-c-form-layout>

      <h5 className="oj-sm-margin-4x-top">Layouts</h5>
      <oj-c-form-layout fullWidth direction="row">
        <oj-c-rich-checkboxset
          layout="xl"
          value={["automotive"] as any}
          options={options}
          labelHint="XL Layout"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="md"
          value={["automotive"] as any}
          options={options}
          labelHint="MD Layout"
          onvalueChanged={handleRichCheckboxsetChange}
        />
        <oj-c-rich-checkboxset
          layout="sm"
          value={["automotive"] as any}
          options={options}
          labelHint="SM Layout"
          onvalueChanged={handleRichCheckboxsetChange}
        />
      </oj-c-form-layout>
    </div>
  );
};
