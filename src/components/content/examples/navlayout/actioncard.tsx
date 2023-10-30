import "ojs/ojactioncard";
import { ActionCardElement } from "ojs/ojactioncard";
import "ojs/ojlabel";
import "preact";
import { useState } from "preact/hooks";
import "css!./style/actioncard.css";

export const ActionCard = () => {
  const [logMsg, setLogMsg] = useState<string>("none");

  const actionHandler = (event: ActionCardElement.ojAction) => {
    setLogMsg(
      "Action handler invoked - " + (event.currentTarget as HTMLElement).id
    );
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-action-card
        id="Default"
        onojAction={actionHandler}
        class="oj-sm-margin-2x demo-card-content">
        Non-interactive content goes in here
      </oj-action-card>
      <div class="oj-sm-padding-4x-vertical">
        <oj-label for="changelog">Event:</oj-label>
        <span id="changelog">{logMsg}</span>
      </div>
    </div>
  );
};
