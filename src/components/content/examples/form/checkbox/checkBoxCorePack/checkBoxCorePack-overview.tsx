import { h } from "preact";
import "oj-c/checkbox";
import "oj-c/form-layout";
import {
  confirmationMessages,
  errorMessages,
  infoMessages,
  warningMessages,
} from "./checkBoxCorePack-shared";

export default function CheckBoxCorePackOverviewExample() {
  return (
    <div class="oj-sm-padding-2x-horizontal">
      <h5 class="oj-sm-padding-2x-bottom">States</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-checkbox value={true}>Enabled value true</oj-c-checkbox>
        <oj-c-checkbox value={true} disabled>
          Disabled value true
        </oj-c-checkbox>
        <oj-c-checkbox value={true} readonly>
          Readonly value true
        </oj-c-checkbox>
        <oj-c-checkbox value={false}>Enabled value false</oj-c-checkbox>
        <oj-c-checkbox value={false} disabled>
          Disabled value false
        </oj-c-checkbox>
        <oj-c-checkbox value={false} readonly>
          Readonly value false
        </oj-c-checkbox>
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-4x-top">Help &amp; Required</h5>
      <oj-c-form-layout
        maxColumns={3}
        direction="row"
        class="oj-sm-padding-2x-bottom"
      >
        <oj-c-checkbox value={false} required>
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
        <oj-c-checkbox value={false} messagesCustom={errorMessages}>
          Error
        </oj-c-checkbox>
        <oj-c-checkbox value={false} messagesCustom={warningMessages}>
          Warning
        </oj-c-checkbox>
        <oj-c-checkbox value={false} messagesCustom={infoMessages}>
          Information
        </oj-c-checkbox>
        <oj-c-checkbox value={false} messagesCustom={confirmationMessages}>
          Confirmation
        </oj-c-checkbox>
      </oj-c-form-layout>
    </div>
  );
}
