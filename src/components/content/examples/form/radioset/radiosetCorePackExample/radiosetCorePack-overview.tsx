import "oj-c/form-layout";
import "oj-c/radioset";
import 'preact';
import {
  radiosetMessages,
  technologyOptions,
  technologyOptionsWithHelp,
  wrappingOptions,
} from "./radiosetCorePack-shared";

export default function RadiosetCorePackOverviewExample() {
  return (
    <div id="radiosetCorePackOverview">
      <h5>States</h5>
      <oj-c-form-layout maxColumns={3} direction="row">
        <oj-c-radioset
          id="enabledRadioset"
          value="laptop"
          labelHint="Enabled"
          options={technologyOptions}
        />
        <oj-c-radioset
          id="disabledRadioset"
          value="laptop"
          labelHint="Disabled"
          disabled
          options={technologyOptions}
        />
        <oj-c-radioset
          id="readonlyRadioset"
          value="laptop"
          labelHint="Readonly"
          readonly
          options={technologyOptions}
        />
      </oj-c-form-layout>

      <h5>Row Direction</h5>
      <oj-c-form-layout maxColumns={1} direction="row">
        <oj-c-radioset
          id="rowDirectionEnabledRadioset"
          value="laptop"
          direction="row"
          labelHint="Direction Row Enabled"
          options={technologyOptions}
        />
        <oj-c-radioset
          value="laptop"
          direction="row"
          labelHint="Direction Row Disabled"
          disabled
          options={technologyOptions}
        />
        <oj-c-radioset
          value="laptop"
          direction="row"
          labelHint="Direction Row Readonly"
          readonly
          options={technologyOptions}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top">Label Edge</h5>
      <div class="oj-flex">
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeInside"
            value="laptop"
            labelHint="label edge inside"
            labelEdge="inside"
            options={technologyOptions}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeTop"
            value="laptop"
            labelHint="label edge top"
            labelEdge="top"
            options={technologyOptions}
          />
        </div>
        <div class="oj-sm-12 oj-md-6 oj-lg-4 oj-flex-item">
          <oj-c-radioset
            id="labelEdgeStart"
            value="laptop"
            labelHint="label edge start"
            labelEdge="start"
            options={technologyOptions}
          />
        </div>
      </div>

      <h5 class="oj-sm-margin-6x-top">Required &amp; Help</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-radioset
          required
          labelHint="Required"
          requiredMessageDetail="Nothing selected"
          options={technologyOptionsWithHelp}
        />

        <oj-c-radioset
          value="laptop"
          help={{ instruction: "help.instruction text" }}
          labelHint="Help Instruction"
          options={technologyOptionsWithHelp}
        />

        <oj-c-radioset
          value="laptop"
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="Help-hints Definition"
          options={technologyOptionsWithHelp}
        />

        <oj-c-radioset
          value="laptop"
          helpHints={{
            source: "https://www.oracle.com",
            sourceText: "help-hints.source-text",
          }}
          labelHint="Help-hints Source"
          options={technologyOptionsWithHelp}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top">Standard Messages</h5>
      <oj-c-form-layout maxColumns={4} direction="row">
        <oj-c-radioset
          messagesCustom={radiosetMessages.error}
          value="laptop"
          labelHint="Error"
          options={technologyOptions}
        />
        <oj-c-radioset
          messagesCustom={radiosetMessages.warning}
          value="laptop"
          labelHint="Warning"
          options={technologyOptions}
        />
        <oj-c-radioset
          messagesCustom={radiosetMessages.info}
          value="laptop"
          labelHint="Information"
          options={technologyOptions}
        />
        <oj-c-radioset
          messagesCustom={radiosetMessages.confirmation}
          value="laptop"
          labelHint="Confirmation"
          options={technologyOptions}
        />
      </oj-c-form-layout>

      <h5 class="oj-sm-margin-6x-top">Wrapping</h5>
      <div class="demo-form-layout oj-text-color-danger">
        <oj-c-form-layout>
          <oj-c-radioset
            labelHint="Direction Column"
            value="laptop"
            options={wrappingOptions}
          />

          <oj-c-radioset
            labelHint="Direction Row"
            value="laptop"
            direction="row"
            options={wrappingOptions}
          />
        </oj-c-form-layout>
      </div>
    </div>
  );
}
