import "ojs/ojformlayout";
import "ojs/ojinputtext";
import 'preact';
import { messageSets } from "./inputPassword-shared";

export default function InputPasswordOverviewExample() {
  return (
    <div id="inputPasswordOverview">
      <h4>States</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-password
          id="password"
          value="passW0rd!"
          labelHint="enabled"
        />
        <oj-input-password
          id="itdis"
          value="passW0rd!"
          labelHint="disabled"
          disabled
        />
        <oj-input-password
          id="itro"
          value="passW0rd!"
          labelHint="readonly"
          readonly
        />
        <oj-input-password labelHint="enabled no value" />
        <oj-input-password labelHint="disabled no value" disabled />
        <oj-input-password labelHint="readonly no value" readonly />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Mask Icon</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-password
          value="passW0rd!"
          labelHint="Mask icon visible - enabled"
          maskIcon="visible"
        />
        <oj-input-password
          value="passW0rd!"
          labelHint="Mask icon visible - disabled"
          maskIcon="visible"
          disabled
        />
        <oj-input-password
          value="passW0rd!"
          labelHint="Mask icon visible - readonly"
          maskIcon="visible"
          readonly
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Required & Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-password required labelHint="required" />
        <oj-input-password
          placeholder="placeholder text"
          labelHint="placeholder"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="top">
        <oj-input-password
          help={{ instruction: "help.instruction text" }}
          labelHint="help.instruction"
        />
        <oj-input-password
          helpHints={{ definition: "help-hints.definition text" }}
          labelHint="help-hints.definition"
        />
        <oj-input-password
          helpHints={{ source: "https://www.oracle.com" }}
          labelHint="help-hints.source"
        />
      </oj-form-layout>

      <h4 class="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-password
          messagesCustom={messageSets.error}
          value="value text"
          labelHint="error"
        />
        <oj-input-password
          messagesCustom={messageSets.warning}
          value="value text"
          labelHint="warning"
        />
        <oj-input-password
          messagesCustom={messageSets.info}
          value="value text"
          labelHint="info"
        />
        <oj-input-password
          messagesCustom={messageSets.confirmation}
          value="value text"
          labelHint="confirmation"
        />
      </oj-form-layout>
    </div>
  );
}
