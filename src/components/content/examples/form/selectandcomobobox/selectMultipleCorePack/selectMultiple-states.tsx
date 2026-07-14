import "oj-c/form-layout";
import "oj-c/select-multiple";
import 'preact';
import { type ComponentProps } from 'preact';
import {
  createBrowserDataProvider,
  getBrowserLabels,
} from "./selectMultiple-shared";

const browserDataProvider = createBrowserDataProvider();
const selectedBrowsers = new Set(["CH", "FF"]);

const errorMessages = [
  { summary: "Summary", detail: "Detail", severity: "error" },
];

const warningMessages = [
  { summary: "Summary", detail: "Detail", severity: "warning" },
];

const infoMessages = [
  { summary: "Summary", detail: "Detail", severity: "info" },
];

const confirmationMessages = [
  { summary: "Summary", detail: "Detail", severity: "confirmation" },
];

export default function SelectMultipleStatesExample() {
  return (
    <div class="oj-sm-padding-2x-vertical">
      <h6>States inside oj-c-form-layout</h6>
      <oj-c-form-layout
        id="selectMultipleStatesLayout"
        maxColumns={3}
        direction="row"
        labelEdge="inside"
        userAssistanceDensity="efficient"
      >
        <oj-c-select-multiple
          labelHint="Enabled"
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Disabled"
          disabled
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Readonly"
          readonly
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
      </oj-c-form-layout>

      <h6 class="oj-sm-margin-6x-top">States outside oj-c-form-layout</h6>
      <div class="oj-flex oj-sm-flex-wrap-wrap oj-sm-column-gap-4x oj-sm-row-gap-4x">
        <oj-c-select-multiple
          labelHint="Enabled"
          labelEdge="inside"
          maxWidth="md"
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Disabled"
          labelEdge="inside"
          maxWidth="md"
          disabled
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Readonly"
          labelEdge="inside"
          maxWidth="md"
          readonly
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
      </div>

      <h6 class="oj-sm-margin-6x-top">Required</h6>
      <oj-c-form-layout>
        <oj-c-select-multiple
          labelHint="Required"
          required
          data={browserDataProvider}
          itemText="label"
        ></oj-c-select-multiple>
      </oj-c-form-layout>

      <h6 class="oj-sm-margin-6x-top">Help</h6>
      <oj-c-form-layout>
        <oj-c-select-multiple
          labelHint="Placeholder"
          placeholder="Select browsers"
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Help"
          help={{ instruction: "Choose one or more browsers" }}
          helpHints={{
            definition: "Pick the browsers you want to support.",
            source: "https://www.oracle.com",
          }}
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
        ></oj-c-select-multiple>
      </oj-c-form-layout>

      <h6 class="oj-sm-margin-6x-top">Messages</h6>
      <oj-c-form-layout>
        <oj-c-select-multiple
          labelHint="Error"
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
          messagesCustom={errorMessages as ComponentProps<'oj-c-select-multiple'>['messagesCustom']}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Warning"
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
          messagesCustom={warningMessages as ComponentProps<'oj-c-select-multiple'>['messagesCustom']}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Info"
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
          messagesCustom={infoMessages as ComponentProps<'oj-c-select-multiple'>['messagesCustom']}
        ></oj-c-select-multiple>
        <oj-c-select-multiple
          labelHint="Confirmation"
          data={browserDataProvider}
          itemText="label"
          value={selectedBrowsers}
          messagesCustom={confirmationMessages as ComponentProps<'oj-c-select-multiple'>['messagesCustom']}
        ></oj-c-select-multiple>
      </oj-c-form-layout>

      <div class="oj-sm-margin-4x-top">
        Current selected values: {getBrowserLabels(selectedBrowsers)}
      </div>
    </div>
  );
}
