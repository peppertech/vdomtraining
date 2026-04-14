import { h } from "preact";
import { useState } from "preact/hooks";
import "oj-c/action-card";
import { CActionCardElement } from "oj-c/action-card";
import "ojs/ojlabel";
import "css!./actioncard-core-pack.css";

export const ActionCardCorePack = () => {
  const [logMsg, setLogMsg] = useState<string>("none");

  const actionHandler = (event: CActionCardElement.ojAction) => {
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

export default ActionCardCorePack;
