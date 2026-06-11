import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojselectcombobox";
import {
  confirmationMessages,
  createBrowserDataProvider,
  errorMessages,
  infoMessages,
  warningMessages,
} from "./comboboxMany-shared";

export default function ComboboxManyOverviewExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [requiredValue, setRequiredValue] = useState<string[]>([]);

  return (
    <div id="comboboxManyOverview">
      <h4>States inside oj-form-layout</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-many
          value={["CH", "SA"]}
          labelHint="enabled"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-many
          value={["CH", "SA"]}
          labelHint="disabled"
          disabled
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-many
          value={["CH", "SA"]}
          readonly
          labelHint="readonly"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-many
          labelHint="enabled no value"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-many
          labelHint="disabled no value"
          disabled
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
        <oj-combobox-many
          readonly
          labelHint="readonly no value"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <h4>States outside of oj-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-many
            value={["Chrome", "Safari"]}
            labelHint="enabled"
            labelEdge="inside"
          >
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-many>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-many
            value={["Chrome", "Safari"]}
            labelHint="disabled"
            labelEdge="inside"
            disabled
          >
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-many>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-combobox-many
            value={["Chrome", "Safari"]}
            readonly
            labelHint="readonly"
            labelEdge="inside"
          >
            <oj-option value="Internet Explorer">Internet Explorer</oj-option>
            <oj-option value="Firefox">Firefox</oj-option>
            <oj-option value="Chrome">Chrome</oj-option>
            <oj-option value="Opera">Opera</oj-option>
            <oj-option value="Safari">Safari</oj-option>
          </oj-combobox-many>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required &amp; Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-many
          value={requiredValue}
          required
          labelHint="required"
          options={dataProvider}
          class="oj-form-control-max-width-md"
          onvalueChanged={(event) => setRequiredValue((event.detail.value as string[] | null | undefined) ?? [])}
        />
        <oj-combobox-many
          labelHint="placeholder"
          placeholder="placeholder text"
          options={dataProvider}
          class="oj-form-control-max-width-md"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-combobox-many
          options={dataProvider}
          class="oj-form-control-max-width-md"
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        />
        <oj-combobox-many
          options={dataProvider}
          class="oj-form-control-max-width-md"
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        />
        <oj-combobox-many
          options={dataProvider}
          class="oj-form-control-max-width-md"
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={4} direction="row">
        <oj-combobox-many
          value={["CH", "SA"]}
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={errorMessages}
          labelHint="error"
        />
        <oj-combobox-many
          value={["CH", "SA"]}
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={warningMessages}
          labelHint="warning"
        />
        <oj-combobox-many
          value={["CH", "SA"]}
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={infoMessages}
          labelHint="info"
        />
        <oj-combobox-many
          value={["CH", "SA"]}
          options={dataProvider}
          class="oj-form-control-max-width-md"
          messagesCustom={confirmationMessages}
          labelHint="confirmation"
        />
      </oj-form-layout>
    </div>
  );
}
