import "ojs/ojformlayout";
import "ojs/ojoption";
import "ojs/ojradioset";
import 'preact';
import {
  confirmationMessages,
  errorMessages,
  infoMessages,
  renderRadioOptions,
  technologyOptions,
  warningMessages,
  wrappingOptions,
} from "./radioset-shared";

export default function RadiosetOverviewExample() {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h5>States</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-radioset value="laptop" labelHint="Enabled">
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset value="laptop" labelHint="Disabled" disabled>
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset value="laptop" labelHint="Readonly" readonly>
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
      </oj-form-layout>

      <oj-form-layout maxColumns={1} direction="row">
        <oj-radioset
          value="laptop"
          class="oj-choice-direction-row"
          labelHint="Direction Row Enabled"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          value="laptop"
          class="oj-choice-direction-row"
          labelHint="Direction Row Disabled"
          disabled
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          value="laptop"
          class="oj-choice-direction-row"
          labelHint="Direction Row Readonly"
          readonly
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          value=""
          class="oj-choice-direction-row"
          labelHint="Readonly No Value Customized Text"
          readonly
          translations={{ readonlyNoValue: "Nothing selected" }}
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Required &amp; Help</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-radioset required labelHint="Label for Required Radioset">
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          value="laptop"
          help={{ instruction: "help.instruction text" }}
          labelHint="Help Instruction"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          value="laptop"
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="Help-hints Definition"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          value="laptop"
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="Help-hints Source"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Messages</h5>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-radioset
          messagesCustom={errorMessages}
          value="laptop"
          labelHint="Error"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          messagesCustom={warningMessages}
          value="laptop"
          labelHint="Warning"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          messagesCustom={infoMessages}
          value="laptop"
          labelHint="Information"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
        <oj-radioset
          messagesCustom={confirmationMessages}
          value="laptop"
          labelHint="Confirmation"
        >
          {renderRadioOptions(technologyOptions)}
        </oj-radioset>
      </oj-form-layout>

      <h5 class="oj-sm-margin-4x-top">Wrapping</h5>
      <oj-form-layout class="oj-sm-padding-2x-horizontal">
        <oj-radioset labelHint="Direction Column" value="laptop">
          {renderRadioOptions(wrappingOptions)}
        </oj-radioset>
        <oj-radioset
          labelHint="Direction Row"
          value="laptop"
          class="oj-choice-direction-row"
        >
          {renderRadioOptions(wrappingOptions)}
        </oj-radioset>
      </oj-form-layout>
    </div>
  );
}
