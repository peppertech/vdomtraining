import { h } from "preact";
import "ojs/ojformlayout";
import Message = require("ojs/ojmessaging");
import "ojs/ojinputtext";

export const InputPassword = () => {
  const error: Message[] = [
    {
      severity: "error" as const,
      summary: "Error",
      detail: "This is an error message",
    },
  ];
  const warning: Message[] = [
    {
      severity: "warning" as const,
      summary: "Warning",
      detail: "This is a warning message",
    },
  ];
  const info: Message[] = [
    {
      severity: "info" as const,
      summary: "Info",
      detail: "This is an info message",
    },
  ];
  const confirmation: Message[] = [
    {
      severity: "confirmation" as const,
      summary: "Confirmation",
      detail: "This is a confirmation message",
    },
  ];

  return (
    <div>
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
          disabled={true}
        />
        <oj-input-password
          id="itro"
          value="passW0rd!"
          labelHint="readonly"
          readonly={true}
        />
        <oj-input-password labelHint="enabled no value" />
        <oj-input-password labelHint="disabled no value" disabled={true} />
        <oj-input-password labelHint="readonly no value" readonly={true} />
      </oj-form-layout>

      <h4 className="oj-sm-margin-4x-top">Mask Icon</h4>
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
          disabled={true}
        />
        <oj-input-password
          value="passW0rd!"
          labelHint="Mask icon visible - readonly"
          maskIcon="visible"
          readonly={true}
        />
      </oj-form-layout>

      <h4 className="oj-sm-margin-4x-top">Required & Placeholder</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-password required={true} labelHint="required" />
        <oj-input-password
          placeholder="placeholder text"
          labelHint="placeholder"
        />
      </oj-form-layout>

      <h4 className="oj-sm-margin-4x-top">Help</h4>
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

      <h4 className="oj-sm-margin-4x-top">Messages</h4>
      <oj-form-layout maxColumns={3} direction="row">
        <oj-input-password
          messagesCustom={error}
          value="value text"
          labelHint="error"
        />
        <oj-input-password
          messagesCustom={warning}
          value="value text"
          labelHint="warning"
        />
        <oj-input-password
          messagesCustom={info}
          value="value text"
          labelHint="info"
        />
        <oj-input-password
          messagesCustom={confirmation}
          value="value text"
          labelHint="confirmation"
        />
      </oj-form-layout>
    </div>
  );
};
