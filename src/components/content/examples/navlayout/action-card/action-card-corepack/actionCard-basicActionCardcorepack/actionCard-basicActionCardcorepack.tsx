import "css!./demo.css";
import "oj-c/action-card";
import "ojs/ojlabel";
import 'preact';
import { type ComponentProps } from 'preact';
import { useState } from "preact/hooks";

type ActionCardActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-action-card">["onojAction"]>
>[0];

export const ActionCardBasicActionCardcorepack = () => {
  const [logMsg, setLogMsg] = useState<string>("none");

  const actionHandler = (event: ActionCardActionEvent) => {
    setLogMsg(
      `Action handler invoked - ${(event.currentTarget as HTMLElement).id}`,
    );
  };

  return (
    <div id="card-container">
      <oj-c-action-card
        id="Default"
        class="oj-sm-margin-2x demo-card-content"
        onojAction={actionHandler}
      >
        Action Card
      </oj-c-action-card>
      <div class="oj-sm-padding-4x-vertical">
        <oj-label for="changelog">Event:</oj-label>
        <span id="changelog">{logMsg}</span>
      </div>
    </div>
  );
};

export default ActionCardBasicActionCardcorepack;
