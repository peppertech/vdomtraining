import { useState } from "preact/hooks";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojformlayout";

import {
  confirmationMessages,
  errorMessages,
  helpDefinition,
  helpSource,
  infoMessages,
  lengthConfig,
  sampleValue,
  type TextAreaValueChangedEvent,
  warningMessages,
} from "./textArea-shared";

export default function TextAreaOverviewExample() {
  const [limitedValue, setLimitedValue] = useState("");

  return (
    <div>
      <h4>States inside oj-form-layout</h4>
      <oj-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-text-area value={sampleValue} labelHint="enabled" rows={3} />
        <oj-text-area
          value={sampleValue}
          labelHint="disabled"
          disabled={true}
          rows={3}
        />
        <oj-text-area
          value={sampleValue}
          labelHint="readonly"
          readonly={true}
          rows={3}
        />
        <oj-text-area labelHint="enabled no value" />
        <oj-text-area labelHint="disabled no value" disabled={true} />
        <oj-text-area labelHint="readonly no value" readonly={true} />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">States outside form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          value={sampleValue}
          labelHint="enabled"
          rows={3}
        />
        <oj-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          value={sampleValue}
          labelHint="disabled"
          disabled={true}
          rows={3}
        />
        <oj-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          value={sampleValue}
          labelHint="readonly"
          readonly={true}
          rows={3}
        />
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <oj-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          labelHint="enabled no value"
        />
        <oj-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          labelHint="disabled no value"
          disabled={true}
        />
        <oj-text-area
          class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal"
          labelHint="readonly no value"
          readonly={true}
        />
      </div>

      <h4 class="oj-sm-margin-4x-top">Required, Placeholder, and Max Length</h4>
      <oj-form-layout maxColumns={3} labelEdge="inside" direction="row">
        <oj-text-area required={true} labelHint="required" />
        <oj-text-area
          placeholder="Placeholder text"
          labelHint="placeholder"
        />
        <oj-text-area
          value={limitedValue}
          length={lengthConfig}
          labelHint="max length"
          onvalueChanged={(event: TextAreaValueChangedEvent) =>
            setLimitedValue(event.detail.value)
          }
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-text-area
          helpHints={helpDefinition}
          labelHint="help.definition"
        />
        <oj-text-area helpHints={helpSource} labelHint="help.source" />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="inside">
        <oj-text-area
          messagesCustom={errorMessages}
          value={sampleValue}
          labelHint="error"
          rows={3}
        />
        <oj-text-area
          messagesCustom={warningMessages}
          value={sampleValue}
          labelHint="warning"
          rows={3}
        />
        <oj-text-area
          messagesCustom={infoMessages}
          value={sampleValue}
          labelHint="info"
          rows={3}
        />
        <oj-text-area
          messagesCustom={confirmationMessages}
          value={sampleValue}
          labelHint="confirmation"
          rows={3}
        />
      </oj-form-layout>
    </div>
  );
}
