import { h } from 'preact';
import 'oj-c/input-password';
import 'ojs/ojformlayout';

export const InputPasswordCorePack = () => {
  const error = [{ severity: 'error' as const, summary: 'Error', detail: 'This is an error message' }];
  const warning = [{ severity: 'warning' as const, summary: 'Warning', detail: 'This is a warning message' }];
  const info = [{ severity: 'info' as const, summary: 'Info', detail: 'This is an info message' }];
  const confirmation = [{ severity: 'confirmation' as const, summary: 'Confirmation', detail: 'This is a confirmation message' }];

  return (
    <div>
      <h4>States</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-c-input-password value="passW0rd!" labelHint="enabled" />
        <oj-c-input-password value="passW0rd!" labelHint="disabled" disabled />
        <oj-c-input-password value="passW0rd!" labelHint="readonly" readonly />
        <oj-c-input-password labelHint="enabled no value" />
        <oj-c-input-password labelHint="disabled no value" disabled />
        <oj-c-input-password labelHint="readonly no value" readonly />
      </oj-form-layout>

      <h4 className="oj-sm-margin-4x-top">Mask Icon</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-c-input-password value="passW0rd!" labelHint="Mask icon visible - enabled" maskIcon="visible" />
        <oj-c-input-password value="passW0rd!" labelHint="Mask icon visible - disabled" maskIcon="visible" disabled />
        <oj-c-input-password value="passW0rd!" labelHint="Mask icon visible - readonly" maskIcon="visible" readonly />
      </oj-form-layout>

      <h4 className="oj-sm-margin-4x-top">Required, Clear icon & Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-c-input-password required labelHint="required" />
        <oj-c-input-password placeholder="placeholder text" labelHint="placeholder" />
           <oj-c-input-password clearIcon="always" labelHint="clear-icon" value="value text" />
      </oj-form-layout>

      <h4 className="oj-sm-margin-4x-top">Help</h4>
      <oj-form-layout maxColumns={3} direction="row" labelEdge="top">
        <oj-c-input-password help={{ instruction: "help.instruction text" }} labelHint="help.instruction" />
        <oj-c-input-password helpHints={{ definition: "help-hints.definition text" }} labelHint="help-hints.definition" />
        <oj-c-input-password helpHints={{ source: "https://www.oracle.com" }} labelHint="help-hints.source" />
      </oj-form-layout>

      <h4 className="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-c-input-password messagesCustom={error} value="value text" labelHint="error" />
        <oj-c-input-password messagesCustom={warning} value="value text" labelHint="warning" />
        <oj-c-input-password messagesCustom={info} value="value text" labelHint="info" />
        <oj-c-input-password messagesCustom={confirmation} value="value text" labelHint="confirmation" />
      </oj-form-layout>
    </div>
  );
};
