import { useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/text-area";

import {
  confirmationMessages,
  errorMessages,
  helpDefinition,
  helpInstruction,
  helpSource,
  infoMessages,
  overviewLengthConfig,
  sampleValue,
  type TextAreaCorePackValueChangedEvent,
  warningMessages,
} from "./textAreaCorePack-shared";

export default function TextAreaCorePackOverviewExample() {
  const [limitedValue, setLimitedValue] = useState("");

  return (
    <div>
      <h4>States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-text-area value={sampleValue} labelHint="enabled" rows={3} />
        <oj-c-text-area
          value={sampleValue}
          labelHint="disabled"
          disabled={true}
          rows={3}
        />
        <oj-c-text-area
          value={sampleValue}
          labelHint="readonly"
          readonly={true}
          rows={3}
        />
        <oj-c-text-area labelHint="enabled no value" />
        <oj-c-text-area labelHint="disabled no value" disabled={true} />
        <oj-c-text-area labelHint="readonly no value" readonly={true} />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">States outside oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area value={sampleValue} labelHint="enabled" rows={3} />
        </div>
        <div class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area
            value={sampleValue}
            labelHint="disabled"
            disabled={true}
            rows={3}
          />
        </div>
        <div class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area
            value={sampleValue}
            labelHint="readonly"
            readonly={true}
            rows={3}
          />
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area labelHint="enabled no value" />
        </div>
        <div class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area labelHint="disabled no value" disabled={true} />
        </div>
        <div class="oj-sm-12 oj-md-4 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area labelHint="readonly no value" readonly={true} />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Label Edge</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-4x-top oj-sm-padding-2x-horizontal">
          <oj-c-text-area
            labelHint="Label Edge Inside"
            labelEdge="inside"
            value="This is sample text."
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area
            labelHint="Label Edge Top"
            labelEdge="top"
            value="This is sample text."
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-text-area
            labelHint="Label Edge Start"
            labelEdge="start"
            value="This is sample text."
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Text Align</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-text-area
          textAlign="start"
          labelHint="Start Align"
          value="This is sample text."
        />
        <oj-c-text-area
          textAlign="end"
          labelHint="End Align"
          value="This is sample text."
        />
        <oj-c-text-area
          textAlign="right"
          labelHint="Right Align"
          value="This is sample text."
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required, Placeholder and Max Length</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-text-area required={true} labelHint="required" />
        <oj-c-text-area
          placeholder="placeholder text"
          labelHint="placeholder"
        />
        <oj-c-text-area
          value={limitedValue}
          labelHint="max length"
          length={overviewLengthConfig}
          onvalueChanged={(event: TextAreaCorePackValueChangedEvent) =>
            setLimitedValue((event.detail.value as string))
          }
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={3} direction="row" labelEdge="top">
        <oj-c-text-area help={helpInstruction} labelHint="help.instruction" />
        <oj-c-text-area
          helpHints={helpDefinition}
          labelHint="help-hints.definition"
        />
        <oj-c-text-area helpHints={helpSource} labelHint="help-hints.source" />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-text-area
          messagesCustom={errorMessages}
          value={sampleValue}
          labelHint="error"
          rows={3}
        />
        <oj-c-text-area
          messagesCustom={warningMessages}
          value={sampleValue}
          labelHint="warning"
          rows={3}
        />
        <oj-c-text-area
          messagesCustom={infoMessages}
          value={sampleValue}
          labelHint="info"
          rows={3}
        />
        <oj-c-text-area
          messagesCustom={confirmationMessages}
          value={sampleValue}
          labelHint="confirmation"
          rows={3}
        />
      </oj-c-form-layout>
    </div>
  );
}
