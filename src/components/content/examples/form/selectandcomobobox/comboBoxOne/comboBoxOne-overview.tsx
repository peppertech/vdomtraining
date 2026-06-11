import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojselectcombobox";
import {
  browserOptionsWithDisabled,
  confirmationMessages,
  createBrowserDataProvider,
  errorMessages,
  infoMessages,
  warningMessages,
} from "./comboBoxOne-shared";

export default function ComboboxOneOverviewExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const disabledOptionProvider = useMemo(
    () => createBrowserDataProvider(browserOptionsWithDisabled),
    [],
  );
  const [requiredValue, setRequiredValue] = useState("Chrome");

  return (
    <div id="comboboxOneOverview">
      <h4>States inside oj-form-layout</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-one
          value="Chrome"
          labelHint="enabled"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-one
          value="Chrome"
          labelHint="disabled"
          disabled
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-one
          value="Chrome"
          readonly
          labelHint="readonly"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-one
          labelHint="enabled no value"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-one
          labelHint="disabled no value"
          disabled
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-one
          readonly
          labelHint="readonly no value"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-one
          value="Chrome"
          labelHint="disabled option item"
          options={disabledOptionProvider}
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <h4>States outside of oj-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one value="Chrome" labelHint="enabled" labelEdge="inside">
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one
            value="Chrome"
            labelHint="disabled"
            labelEdge="inside"
            disabled
          >
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-one value="Chrome" readonly labelHint="readonly" labelEdge="inside">
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-one>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required &amp; Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-one
          value={requiredValue}
          required
          labelHint="required"
          options={dataProvider}
          class="oj-form-control-max-width-md"
          onvalueChanged={(event) => setRequiredValue((event.detail.value as string | null | undefined) ?? "")}
        />
        <oj-combobox-one
          labelHint="placeholder"
          placeholder="placeholder text"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-one
          options={dataProvider}
          class="oj-form-control-max-width-md"
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        />
        <oj-combobox-one
          options={dataProvider}
          class="oj-form-control-max-width-md"
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        />
        <oj-combobox-one
          options={dataProvider}
          class="oj-form-control-max-width-md"
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={4} direction="row">
        <oj-combobox-one
          value="Chrome"
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={errorMessages}
          labelHint="error"
        />
        <oj-combobox-one
          value="Chrome"
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={warningMessages}
          labelHint="warning"
        />
        <oj-combobox-one
          value="Chrome"
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={infoMessages}
          labelHint="info"
        />
        <oj-combobox-one
          value="Chrome"
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={confirmationMessages}
          labelHint="confirmation"
        />
      </oj-form-layout>
    </div>
  );
}
