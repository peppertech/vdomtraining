import "oj-c/form-layout";
import "oj-c/input-sensitive-text";
import 'preact';
import { useCallback,useState } from "preact/hooks";
import {
  messageSets,
  type InputSensitiveTextRawValueChangedEvent,
  type InputSensitiveTextValueChangedEvent,
} from "./inputSensitiveText-shared";

export default function InputSensitiveTextStatesVdomExample() {
  const [maxLengthValue, setMaxLengthValue] = useState("");
  const [maxLengthRawValue, setMaxLengthRawValue] = useState("");

  const handleMaxLengthValueChanged = useCallback(
    (event: InputSensitiveTextValueChangedEvent) => {
      setMaxLengthValue(String(event.detail.value ?? ""));
    },
    [],
  );

  const handleMaxLengthRawValueChanged = useCallback(
    (event: InputSensitiveTextRawValueChangedEvent) => {
      setMaxLengthRawValue(String(event.detail.value ?? ""));
    },
    [],
  );

  return (
    <div id="inputSensitiveTextStatesVdom">
      <h4>States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-sensitive-text value="555-55-5555" labelHint="enabled" />
        <oj-c-input-sensitive-text labelHint="enabled no value" />

        <oj-c-input-sensitive-text
          value="555-55-5555"
          labelHint="disabled"
          disabled
        />
        <oj-c-input-sensitive-text labelHint="disabled no value" disabled />

        <oj-c-input-sensitive-text
          value="555-55-5555"
          labelHint="readonly with mask-icon='hidden'"
          maskIcon="hidden"
          readonly
        />
        <oj-c-input-sensitive-text
          labelHint="readonly with mask-icon='hidden' no value"
          readonly
          maskIcon="hidden"
        />

        <oj-c-input-sensitive-text
          value="555-55-5555"
          labelHint="readonly with mask-icon='visible'"
          maskIcon="visible"
          readonly
        />
        <oj-c-input-sensitive-text
          maskIcon="visible"
          labelHint="readonly with mask-icon='visible' no value"
          readonly
        />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-3x-top">
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text value="555-55-5555" labelHint="enabled" />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            value="555-55-5555"
            labelHint="disabled"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            value="555-55-5555"
            labelHint="readonly with mask-icon='visible'"
            maskIcon="visible"
            readonly
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            value="555-55-5555"
            labelHint="readonly with mask-icon='hidden'"
            maskIcon="hidden"
            readonly
          />
        </div>
      </div>

      <div class="oj-flex oj-sm-padding-3x-top">
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text labelHint="enabled no value" />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text labelHint="disabled no value" disabled />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            labelHint="readonly with mask-icon='visible' no value"
            maskIcon="visible"
            readonly
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-3 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            labelHint="readonly with mask-icon='hidden' no value"
            maskIcon="hidden"
            readonly
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Label Edge</h4>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-4x-top oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            labelHint="Label Edge Inside"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text labelHint="Label Edge Top" labelEdge="top" />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-input-sensitive-text
            labelHint="Label Edge Start"
            labelEdge="start"
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Text Align</h4>
      <oj-c-form-layout maxColumns={3} direction="row" class="oj-sm-padding-2x-bottom">
        <oj-c-input-sensitive-text
          textAlign="start"
          labelHint="Start Align"
          value="555-55-5555"
        />
        <oj-c-input-sensitive-text
          textAlign="end"
          labelHint="End Align"
          value="555-55-5555"
        />
        <oj-c-input-sensitive-text
          textAlign="right"
          labelHint="Right Align"
          value="555-55-5555"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Mask Icon Hidden</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-sensitive-text
          value="sensitiveD@t@"
          labelHint="Mask icon hidden - enabled"
          maskIcon="hidden"
        />
        <oj-c-input-sensitive-text
          value="sensitiveD@t@"
          labelHint="Mask icon hidden - disabled"
          maskIcon="hidden"
          disabled
        />
        <oj-c-input-sensitive-text
          value="sensitiveD@t@"
          labelHint="Mask icon hidden - readonly"
          maskIcon="hidden"
          readonly
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required, Clear Icon, Placeholder & Max Length</h4>
      <oj-c-form-layout maxColumns={2} direction="row">
        <oj-c-input-sensitive-text required labelHint="required" />
        <oj-c-input-sensitive-text
          clearIcon="always"
          labelHint="clear-icon"
          value="value text"
        />
        <oj-c-input-sensitive-text
          placeholder="placeholder text"
          labelHint="placeholder"
        />
        <oj-c-input-sensitive-text
          value={maxLengthValue}
          length={{ max: 5, countBy: "codeUnit" }}
          labelHint="max length"
          onvalueChanged={handleMaxLengthValueChanged}
          onrawValueChanged={handleMaxLengthRawValueChanged}
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-sensitive-text
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        />
        <oj-c-input-sensitive-text
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        />
        <oj-c-input-sensitive-text
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-input-sensitive-text
          messagesCustom={messageSets.error}
          value="555-55-5555"
          labelHint="error"
        />
        <oj-c-input-sensitive-text
          messagesCustom={messageSets.warning}
          value="555-55-5555"
          labelHint="warning"
        />
        <oj-c-input-sensitive-text
          messagesCustom={messageSets.info}
          value="555-55-5555"
          labelHint="info"
        />
        <oj-c-input-sensitive-text
          messagesCustom={messageSets.confirmation}
          value="555-55-5555"
          labelHint="confirmation"
        />
      </oj-c-form-layout>

      <div class="oj-sm-margin-4x-top">
        <span>Current max length value is:</span> <span>{maxLengthValue}</span>
      </div>
      <div class="oj-sm-margin-2x-top">
        <span>Current max length rawValue is:</span>{" "}
        <span>{maxLengthRawValue}</span>
      </div>
    </div>
  );
}

