import { useState } from "preact/hooks";
import "ojs/ojactioncard";
import { ActionCardElement } from "ojs/ojactioncard";
import "ojs/ojlabel";
import "css!./actioncard.css";


export const ActioncardBasic = () => {
  const [logMsg, setLogMsg] = useState<string>("none");

  const actionHandler = (event: ActionCardElement.ojAction) => {
    setLogMsg(`Action handler invoked - ${(event.currentTarget as HTMLElement).id}`);
  };

  return (
    <div id="card-container">
      <oj-action-card
        id="Default"
        class="oj-sm-margin-2x demo-card-content"
        onojAction={actionHandler}
      >
        Action Card
      </oj-action-card>
      <div class="oj-sm-padding-4x-vertical">
        <oj-label for="changelog">Event:</oj-label>
        <span id="changelog">{logMsg}</span>
      </div>
    </div>
  );
};

export default ActioncardBasic;
