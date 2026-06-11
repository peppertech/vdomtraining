import { h, ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojselectsingle";
import { createBrowserDataProvider } from "./selectSingle-shared";

type SelectSingleProps = ComponentProps<"oj-select-single">;

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

export default function SelectSingleLegacyStatesExample() {
  const dataProvider = useMemo(() => createBrowserDataProvider(), []);
  const [requiredValue, setRequiredValue] = useState<string | null>(null);

  return (
    <div id="div1">
      <h4>States inside oj-form-layout</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-select-single
          data={dataProvider}
          itemText="label"
          value="CH"
          labelHint="enabled"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          value="CH"
          labelHint="disabled"
          disabled
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          value="CH"
          labelHint="readonly"
          readonly
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          labelHint="enabled no value"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          labelHint="disabled no value"
          disabled
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          labelHint="readonly no value"
          readonly
          class="oj-form-control-max-width-md"
        ></oj-select-single>
      </oj-form-layout>

      <h4>States outside of oj-form-layout</h4>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-single
            data={dataProvider}
            itemText="label"
            value="CH"
            labelHint="enabled"
            labelEdge="inside"
          ></oj-select-single>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-single
            data={dataProvider}
            itemText="label"
            value="CH"
            labelHint="disabled"
            labelEdge="inside"
            disabled
          ></oj-select-single>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-single
            data={dataProvider}
            itemText="label"
            value="CH"
            labelHint="readonly"
            labelEdge="inside"
            readonly
          ></oj-select-single>
        </div>
      </div>
      <div class="oj-flex oj-sm-padding-2x-vertical">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-single
            data={dataProvider}
            itemText="label"
            labelHint="enabled no value"
            labelEdge="inside"
          ></oj-select-single>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-single
            data={dataProvider}
            itemText="label"
            labelHint="disabled no value"
            labelEdge="inside"
            disabled
          ></oj-select-single>
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-select-single
            data={dataProvider}
            itemText="label"
            labelHint="readonly no value"
            labelEdge="inside"
            readonly
          ></oj-select-single>
        </div>
      </div>

      <h4 class="oj-sm-margin-4x-top">Required &amp; Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-select-single
          data={dataProvider}
          itemText="label"
          required
          value={requiredValue}
          labelHint="required"
          class="oj-form-control-max-width-md"
          onvalueChanged={(event) => setRequiredValue((event.detail.value as string | null | null | undefined) ?? null)}
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          placeholder="placeholder text"
          labelHint="placeholder"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="top">
        <oj-select-single
          data={dataProvider}
          itemText="label"
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={4} direction="row">
        <oj-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={errorMessages}
          value="CH"
          labelHint="error"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={warningMessages}
          value="CH"
          labelHint="warning"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={infoMessages}
          value="CH"
          labelHint="info"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
        <oj-select-single
          data={dataProvider}
          itemText="label"
          messagesCustom={confirmationMessages}
          value="CH"
          labelHint="confirmation"
          class="oj-form-control-max-width-md"
        ></oj-select-single>
      </oj-form-layout>
    </div>
  );
}
