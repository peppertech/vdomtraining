import "oj-c/form-layout";
import "oj-c/select-single";
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from "preact/hooks";
import { createBrowserDataProvider } from "./selectSingle-shared";

type SelectSingleProps = ComponentProps<"oj-c-select-single">;

const errorMessages: NonNullable<SelectSingleProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "error" },
];
const warningMessages: NonNullable<SelectSingleProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "warning" },
];
const infoMessages: NonNullable<SelectSingleProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "info" },
];
const confirmationMessages: NonNullable<SelectSingleProps["messagesCustom"]> = [
  { summary: "summary", detail: "detail", severity: "confirmation" },
];

export default function SelectSingleStatesExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [requiredValue, setRequiredValue] = useState<string | null>(null);

  return (
    <div id="div1">
      <h4>States inside oj-c-form-layout</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-select-single data={dataProvider} itemText="label" value="CH" labelHint="enabled" />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          value="CH"
          labelHint="disabled"
          disabled
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          value="CH"
          labelHint="readonly"
          readonly
        />
        <oj-c-select-single data={dataProvider} itemText="label" labelHint="enabled no value" />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          labelHint="disabled no value"
          disabled
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          labelHint="readonly no value"
          readonly
        />
      </oj-c-form-layout>

      <h4>States outside of oj-c-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-select-single
            data={dataProvider}
            itemText="label"
            value="CH"
            labelHint="enabled"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-select-single
            data={dataProvider}
            itemText="label"
            value="CH"
            labelHint="disabled"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-select-single
            data={dataProvider}
            itemText="label"
            value="CH"
            labelHint="readonly"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-select-single
            data={dataProvider}
            itemText="label"
            labelHint="enabled no value"
            labelEdge="inside"
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-select-single
            data={dataProvider}
            itemText="label"
            labelHint="disabled no value"
            labelEdge="inside"
            disabled
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-c-select-single
            data={dataProvider}
            itemText="label"
            labelHint="readonly no value"
            labelEdge="inside"
            readonly
          />
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required &amp; Placeholder</h4>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          required
          value={requiredValue}
          labelHint="required"
          onvalueChanged={(event) => setRequiredValue((event.detail.value as string | null | null | undefined) ?? null)}
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          placeholder="placeholder text"
          labelHint="placeholder"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-c-form-layout maxColumns={3} direction="row" labelEdge="top">
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        />
      </oj-c-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={errorMessages}
          value="CH"
          labelHint="error"
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={warningMessages}
          value="CH"
          labelHint="warning"
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={infoMessages}
          value="CH"
          labelHint="info"
        />
        <oj-c-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={confirmationMessages}
          value="CH"
          labelHint="confirmation"
        />
      </oj-c-form-layout>
    </div>
  );
}
